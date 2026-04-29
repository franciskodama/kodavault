'use server';

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

export async function fetchRadarData(): Promise<RadarCoin[]> {
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

    // 1. Fetch 24h Ticker to get top coins by volume
    console.log('Fetching Binance tickers...');
    const tickerRes = await fetch('https://fapi.binance.com/fapi/v1/ticker/24hr', { cache: 'no-store' });
    
    if (!tickerRes.ok) {
      const errorText = await tickerRes.text();
      console.error(`Binance Ticker API error: ${tickerRes.status} - ${errorText}`);
      throw new Error(`Binance Ticker API failed with status ${tickerRes.status}`);
    }

    const tickers = await tickerRes.json();

    if (!Array.isArray(tickers)) {
      console.error('Binance tickers is not an array:', tickers);
      throw new Error('Failed to fetch tickers: Invalid response format');
    }

    // Filter USDT perpetuals and sort by quoteVolume desc
    // Reducing to 50 for production stability testing
    const validTickers = tickers
      .filter((t: any) => t.symbol.endsWith('USDT') && !t.symbol.includes('_'))
      .sort((a: any, b: any) => parseFloat(b.quoteVolume) - parseFloat(a.quoteVolume))
      .slice(0, 70); 

    console.log(`Found ${validTickers.length} valid tickers`);
    const symbols = validTickers.map((t: any) => t.symbol);

    // 2. Fetch Funding Rates
    console.log('Fetching Binance premium index...');
    const premiumRes = await fetch('https://fapi.binance.com/fapi/v1/premiumIndex', { cache: 'no-store' });
    const premiumMap = new Map();
    if (premiumRes.ok) {
      const premiumData = await premiumRes.json();
      if (Array.isArray(premiumData)) {
        premiumData.forEach((p: any) => premiumMap.set(p.symbol, parseFloat(p.lastFundingRate)));
      }
    } else {
      console.warn(`Binance premium index fetch failed: ${premiumRes.status}`);
    }

    const safeParse = (val: any) => {
      const parsed = parseFloat(val);
      return isNaN(parsed) ? 0 : parsed;
    };

    // 3. Fetch 1h Open Interest and Long Short Ratio
    const chunkSize = 20; // Smaller chunks
    const finalData: RadarCoin[] = [];

    console.log(`Fetching detailed data for ${symbols.length} symbols in chunks...`);
    for (let i = 0; i < symbols.length; i += chunkSize) {
      const chunk = symbols.slice(i, i + chunkSize);
      console.log(`Processing chunk ${i / chunkSize + 1} (${chunk.length} symbols)`);
      
      const chunkPromises = chunk.map(async (symbol) => {
        try {
          const [oiRes, lsrRes] = await Promise.all([
            fetch(`https://fapi.binance.com/futures/data/openInterestHist?symbol=${symbol}&period=1h&limit=2`, { cache: 'no-store' }),
            fetch(`https://fapi.binance.com/futures/data/globalLongShortAccountRatio?symbol=${symbol}&period=1h&limit=2`, { cache: 'no-store' })
          ]);

          const oiData = oiRes.ok ? await oiRes.json() : null;
          const lsrData = lsrRes.ok ? await lsrRes.json() : null;

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
        await new Promise(r => setTimeout(r, 100));
      }
    }

    console.log(`fetchRadarData completed successfully with ${finalData.length} items`);
    return finalData;
  } catch (error: any) {
    console.error('CRITICAL ERROR in fetchRadarData:', error);
    // Return an empty array or partial data instead of throwing to avoid crashing the page
    // Actually, throwing might be better for Next.js to show the error state if we want to debug,
    // but in production we might want to return what we have.
    // Let's throw a more descriptive error.
    throw new Error(`Failed to fetch radar data: ${error.message || 'Unknown error'}`);
  }
}
