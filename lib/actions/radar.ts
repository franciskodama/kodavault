
export type RadarCoin = {
  symbol: string;
  coingeckoId: string;
  price: number;
  priceChg1h: number; // Ticker only gives 24h change, but for 1h we need klines. Let's just give 24h for now or try to fetch 1h price.
  volume: number;
  quoteVolume: number;
  fundingRate: number;
  openInterest: number;
  openInterestChg1h: number;
  longShortRatio: number;
  longShortRatioChg1h: number;
};

export async function getRadarData(): Promise<RadarCoin[]> {
  const BINANCE_MIRRORS = [
    'https://fapi.binance.com',
    'https://fapi1.binance.com',
    'https://fapi2.binance.com',
    'https://fapi3.binance.com',
    'https://fapi.binance.me',
  ];

  try {
    console.log('Starting fetchRadarData...');
    // Fetch CoinGecko List for Coinalyze URL mapping
    let cgMap = new Map<string, string>();
    try {
      console.log('Fetching CoinGecko markets...');
      const [cgRes1, cgRes2] = await Promise.all([
        fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1', { next: { revalidate: 3600 } }),
        fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=2', { next: { revalidate: 3600 } })
      ]);
      
      if (cgRes1.ok && cgRes2.ok) {
        const [cgList1, cgList2] = await Promise.all([cgRes1.json(), cgRes2.json()]);
        const cgList = [...(Array.isArray(cgList1) ? cgList1 : []), ...(Array.isArray(cgList2) ? cgList2 : [])];
        
        cgList.forEach((c: any) => {
          const sym = c.symbol.toLowerCase();
          if (!cgMap.has(sym)) cgMap.set(sym, c.id);
        });
        console.log(`Mapped ${cgMap.size} symbols from CoinGecko markets`);
      } else {
        console.warn(`CoinGecko markets fetch failed: ${cgRes1.status} ${cgRes2.status}`);
      }

      console.log('Fetching CoinGecko complete list...');
      const cgResAll = await fetch('https://api.coingecko.com/api/v3/coins/list', { next: { revalidate: 86400 } });
      if (cgResAll.ok) {
        const cgListAll = await cgResAll.json();
        if (Array.isArray(cgListAll)) {
          cgListAll.forEach((c: any) => {
            const sym = c.symbol.toLowerCase();
            if (!cgMap.has(sym)) cgMap.set(sym, c.id);
          });
          console.log(`Mapped total ${cgMap.size} symbols from CoinGecko`);
        }
      } else {
        console.warn(`CoinGecko list fetch failed: ${cgResAll.status}`);
      }
    } catch (cgErr) {
      console.warn("Could not fetch CoinGecko mapping:", cgErr);
    }

    // 1. Fetch 24h Ticker to get top coins by volume - Try mirrors
    console.log('Fetching Binance tickers with mirror fallback...');
    let tickers: any[] = [];
    let successfulMirror = BINANCE_MIRRORS[0];
    let mirrorFound = false;

    for (const mirror of BINANCE_MIRRORS) {
      try {
        console.log(`Trying Binance mirror: ${mirror}`);
        const tickerRes = await fetch(`${mirror}/fapi/v1/ticker/24hr`, { cache: 'no-store', signal: AbortSignal.timeout(5000) });
        
        if (tickerRes.ok) {
          tickers = await tickerRes.json();
          if (Array.isArray(tickers)) {
            successfulMirror = mirror;
            mirrorFound = true;
            console.log(`Successfully fetched tickers from ${mirror}`);
            break;
          }
        } else {
          console.warn(`Mirror ${mirror} returned status ${tickerRes.status}`);
        }
      } catch (err) {
        console.warn(`Mirror ${mirror} failed:`, err);
      }
    }

    if (!mirrorFound || tickers.length === 0) {
      console.error('All Binance mirrors failed to provide tickers.');
      return [];
    }

    // Filter USDT perpetuals and sort by quoteVolume desc
    // Reducing to 30 for maximum stability
    const validTickers = tickers
      .filter((t: any) => t.symbol.endsWith('USDT') && !t.symbol.includes('_'))
      .sort((a: any, b: any) => parseFloat(b.quoteVolume) - parseFloat(a.quoteVolume))
      .slice(0, 30); 

    console.log(`Found ${validTickers.length} valid tickers`);
    const symbols = validTickers.map((t: any) => t.symbol);

    // 2. Fetch Funding Rates (using successful mirror)
    console.log('Fetching Binance premium index...');
    const premiumMap = new Map();
    try {
      const premiumRes = await fetch(`${successfulMirror}/fapi/v1/premiumIndex`, { cache: 'no-store' });
      if (premiumRes.ok) {
        const premiumData = await premiumRes.json();
        if (Array.isArray(premiumData)) {
          premiumData.forEach((p: any) => premiumMap.set(p.symbol, parseFloat(p.lastFundingRate)));
        }
      }
    } catch (err) {
      console.warn('Funding rates fetch failed (non-critical):', err);
    }

    const safeParse = (val: any) => {
      const parsed = parseFloat(val);
      return isNaN(parsed) ? 0 : parsed;
    };

    // 3. Fetch 1h Open Interest and Long Short Ratio (using successful mirror)
    const chunkSize = 10;
    const finalData: RadarCoin[] = [];

    console.log(`Fetching detailed data for ${symbols.length} symbols in chunks...`);
    for (let i = 0; i < symbols.length; i += chunkSize) {
      const chunk = symbols.slice(i, i + chunkSize);
      
      const chunkPromises = chunk.map(async (symbol) => {
        try {
          const [oiRes, lsrRes] = await Promise.all([
            fetch(`${successfulMirror}/futures/data/openInterestHist?symbol=${symbol}&period=1h&limit=2`, { cache: 'no-store', signal: AbortSignal.timeout(4000) }).catch(() => ({ ok: false })),
            fetch(`${successfulMirror}/futures/data/globalLongShortAccountRatio?symbol=${symbol}&period=1h&limit=2`, { cache: 'no-store', signal: AbortSignal.timeout(4000) }).catch(() => ({ ok: false }))
          ]);

          const oiData = (oiRes as any).ok ? await (oiRes as any).json() : null;
          const lsrData = (lsrRes as any).ok ? await (lsrRes as any).json() : null;

          let oi = 0, oiChg1h = 0, lsr = 0, lsrChg1h = 0;

          if (Array.isArray(oiData) && oiData.length >= 2) {
            const oldOi = safeParse(oiData[0].sumOpenInterestValue);
            const currentOi = safeParse(oiData[1].sumOpenInterestValue);
            oi = currentOi;
            oiChg1h = oldOi > 0 ? ((currentOi - oldOi) / oldOi) * 100 : 0;
          } else if (Array.isArray(oiData) && oiData.length === 1) {
            oi = safeParse(oiData[0].sumOpenInterestValue);
          }

          if (Array.isArray(lsrData) && lsrData.length >= 2) {
            const oldLsr = safeParse(lsrData[0].longShortRatio);
            const currentLsr = safeParse(lsrData[1].longShortRatio);
            lsr = currentLsr;
            lsrChg1h = oldLsr > 0 ? ((currentLsr - oldLsr) / oldLsr) * 100 : 0;
          } else if (Array.isArray(lsrData) && lsrData.length === 1) {
            lsr = safeParse(lsrData[0].longShortRatio);
          }

          const ticker = validTickers.find((t: any) => t.symbol === symbol);
          
          return {
            symbol,
            coingeckoId: cgMap.get(symbol.replace('USDT', '').toLowerCase()) || symbol.replace('USDT', '').toLowerCase(),
            price: safeParse(ticker.lastPrice),
            priceChg1h: safeParse(ticker.priceChangePercent), 
            volume: safeParse(ticker.volume),
            quoteVolume: safeParse(ticker.quoteVolume),
            fundingRate: premiumMap.get(symbol) || 0,
            openInterest: oi,
            openInterestChg1h: isNaN(oiChg1h) ? 0 : oiChg1h,
            longShortRatio: lsr,
            longShortRatioChg1h: isNaN(lsrChg1h) ? 0 : lsrChg1h,
          };
        } catch (err) {
          console.error(`Error fetching individual data for ${symbol}:`, err);
          return null;
        }
      });

      const chunkResult = await Promise.all(chunkPromises);
      chunkResult.forEach((item) => {
        if (item) finalData.push(item);
      });
      
      // Delay between chunks
      if (i + chunkSize < symbols.length) {
        await new Promise(r => setTimeout(r, 150));
      }
    }

    console.log(`fetchRadarData completed successfully with ${finalData.length} items`);
    return finalData;
  } catch (error: any) {
    console.error('CRITICAL ERROR in getRadarData:', error);
    return [];
  }
}
