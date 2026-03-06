import { NextResponse } from 'next/server';

const SYMBOLS = [
  { id: 'SPX', symbol: '^GSPC', name: 'S&P 500' },
  { id: 'NDX', symbol: '^IXIC', name: 'NASDAQ' },
  { id: 'FTSE', symbol: '^FTSE', name: 'FTSE 100' },
  { id: 'BVSP', symbol: '^BVSP', name: 'IBOVESPA' },
  { id: 'N225', symbol: '^N225', name: 'NIKKEI 225' },
];

export async function GET() {
  try {
    const results = await Promise.all(
      SYMBOLS.map(async (item) => {
        try {
          const response = await fetch(
            `https://query2.finance.yahoo.com/v8/finance/chart/${item.symbol}?interval=15m&range=1d`,
            {
              headers: {
                'User-Agent':
                  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
              },
            }
          );

          if (!response.ok)
            throw new Error(`HTTP error! status: ${response.status}`);
          const data = await response.json();

          const result = data.chart.result[0];
          const quote = result.indicators.quote[0];
          const meta = result.meta;

          const prices = quote.close.filter((p: number | null) => p !== null);
          const currentPrice = meta.regularMarketPrice;
          const previousClose = meta.previousClose;
          const change = currentPrice - previousClose;
          const changePercent = (change / previousClose) * 100;

          // Generate sparkline (normalize to a reasonable number of points)
          const sparkline =
            prices.length > 20
              ? prices.filter(
                  (_: number, i: number) =>
                    i % Math.ceil(prices.length / 20) === 0
                )
              : prices;

          return {
            id: item.id,
            symbol: item.name,
            price: currentPrice.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }),
            change: change.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }),
            changePercent: changePercent.toFixed(2),
            sparkline: sparkline,
            isPositive: change >= 0,
          };
        } catch (error) {
          console.error(`Error fetching ${item.symbol}:`, error);
          return null;
        }
      })
    );

    const filteredResults = results.filter(Boolean);

    return NextResponse.json(filteredResults, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30',
      },
    });
  } catch (error) {
    console.error('Market Pulse API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch market data' },
      { status: 500 }
    );
  }
}
