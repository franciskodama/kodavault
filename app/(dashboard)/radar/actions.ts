'use server';

export type RadarCoin = {
  symbol: string;
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
    // 1. Fetch 24h Ticker to get top 150 coins by volume
    const tickerRes = await fetch('https://fapi.binance.com/fapi/v1/ticker/24hr', { cache: 'no-store' });
    const tickers = await tickerRes.json();

    // Ensure it's an array
    if (!Array.isArray(tickers)) throw new Error('Failed to fetch tickers');

    // Filter USDT perpetuals and sort by quoteVolume desc
    const validTickers = tickers
      .filter((t: any) => t.symbol.endsWith('USDT') && !t.symbol.includes('_'))
      .sort((a: any, b: any) => parseFloat(b.quoteVolume) - parseFloat(a.quoteVolume))
      .slice(0, 150);

    const symbols = validTickers.map((t: any) => t.symbol);

    // 2. Fetch Funding Rates (premium index returns for all)
    const premiumRes = await fetch('https://fapi.binance.com/fapi/v1/premiumIndex', { cache: 'no-store' });
    const premiumData = await premiumRes.json();
    const premiumMap = new Map();
    if (Array.isArray(premiumData)) {
      premiumData.forEach((p: any) => premiumMap.set(p.symbol, parseFloat(p.lastFundingRate)));
    }

    // 3. Fetch 1h Open Interest and Long Short Ratio for the Top N coins
    // Since we need to fetch for 150 symbols, we should batch them to avoid too many simultaneous connections causing issues
    const chunkSize = 50;
    const finalData: RadarCoin[] = [];

    for (let i = 0; i < symbols.length; i += chunkSize) {
      const chunk = symbols.slice(i, i + chunkSize);
      
      const chunkPromises = chunk.map(async (symbol) => {
        try {
          const [oiData, lsrData] = await Promise.all([
            fetch(`https://fapi.binance.com/futures/data/openInterestHist?symbol=${symbol}&period=1h&limit=2`).then(r => r.json()),
            fetch(`https://fapi.binance.com/futures/data/globalLongShortAccountRatio?symbol=${symbol}&period=1h&limit=2`).then(r => r.json())
          ]);

          let oi = 0, oiChg1h = 0, lsr = 0, lsrChg1h = 0;

          if (Array.isArray(oiData) && oiData.length >= 2) {
            const oldOi = parseFloat(oiData[0].sumOpenInterestValue);
            const currentOi = parseFloat(oiData[1].sumOpenInterestValue);
            oi = currentOi;
            oiChg1h = oldOi > 0 ? ((currentOi - oldOi) / oldOi) * 100 : 0;
          } else if (Array.isArray(oiData) && oiData.length === 1) {
            oi = parseFloat(oiData[0].sumOpenInterestValue);
          }

          if (Array.isArray(lsrData) && lsrData.length >= 2) {
            const oldLsr = parseFloat(lsrData[0].longShortRatio);
            const currentLsr = parseFloat(lsrData[1].longShortRatio);
            lsr = currentLsr;
            lsrChg1h = oldLsr > 0 ? ((currentLsr - oldLsr) / oldLsr) * 100 : 0;
          } else if (Array.isArray(lsrData) && lsrData.length === 1) {
            lsr = parseFloat(lsrData[0].longShortRatio);
          }

          const ticker = validTickers.find((t: any) => t.symbol === symbol);
          
          return {
            symbol,
            price: parseFloat(ticker.lastPrice),
            priceChg1h: parseFloat(ticker.priceChangePercent), // Using 24h for now since 1h requires klines
            volume: parseFloat(ticker.volume),
            quoteVolume: parseFloat(ticker.quoteVolume),
            fundingRate: premiumMap.get(symbol) || 0,
            openInterest: oi,
            openInterestChg1h: oiChg1h,
            longShortRatio: lsr,
            longShortRatioChg1h: lsrChg1h,
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
      
      // Small delay between chunks to be safe with rate limits
      if (i + chunkSize < symbols.length) {
        await new Promise(r => setTimeout(r, 200));
      }
    }

    return finalData;
  } catch (error) {
    console.error('Error fetching radar data:', error);
    throw new Error('Failed to fetch radar data');
  }
}
