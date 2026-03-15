'use server';

export async function getMonthlyReturns(symbol: string = 'BTC-USD') {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1mo&range=10y`;
  
  try {
    const res = await fetch(url, { next: { revalidate: 86400 } }); // Cache for 1 day
    const data = await res.json();
    
    const result = data.chart.result[0];
    const timestamps = result.timestamp;
    const closes = result.indicators.quote[0].close;
    
    // Group prices by year and month
    const monthlyPrices: Record<number, Record<number, number>> = {};
    for (let i = 0; i < timestamps.length; i++) {
        if (closes[i] === null) continue;
        const date = new Date(timestamps[i] * 1000);
        const year = date.getUTCFullYear();
        const month = date.getUTCMonth(); // 0-11
        
        if (!monthlyPrices[year]) monthlyPrices[year] = {};
        monthlyPrices[year][month] = closes[i];
    }
    
    // Calculate returns
    const returns: Record<number, Record<string, number | null>> = {};
    const years = Object.keys(monthlyPrices).sort((a, b) => Number(b) - Number(a)); // Descending
    
    for (const yearStr of years) {
      const year = Number(yearStr);
      returns[year] = {};
      
      let yearlySum = 0;
      let monthCount = 0;
      
      for (let month = 0; month < 12; month++) {
        const currentMonthPrice = monthlyPrices[year][month];
        let prevMonthPrice;
        if (month === 0) {
          prevMonthPrice = monthlyPrices[year - 1]?.[11];
        } else {
          prevMonthPrice = monthlyPrices[year]?.[month - 1];
        }
        
        if (currentMonthPrice && prevMonthPrice) {
          const ret = ((currentMonthPrice / prevMonthPrice) - 1) * 100;
          returns[year][month.toString()] = ret;
          yearlySum += ret;
          monthCount++;
        } else {
          returns[year][month.toString()] = null;
        }
      }
      if (monthCount > 0) {
          returns[year]['total'] = yearlySum / monthCount;
      }
    }
    
    return returns;
  } catch (e) {
    console.error('Error fetching monthly returns from Yahoo Finance:', e);
    return { error: 'Failed to fetch returns' };
  }
}
