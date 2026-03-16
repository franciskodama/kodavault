export const fetchStockPricesFromSheets = async () => {
  try {
    let url = process.env.SPREADSHEET_STOCK_PRICES_URL || '';
    if (url.includes('/edit')) {
      const urlObj = new URL(url);
      const gid = urlObj.searchParams.get('gid');
      url = url.split('/edit')[0] + '/export?format=tsv' + (gid ? `&gid=${gid}` : '');
    } else if (url.includes('/pubhtml')) {
      url = url.replace('/pubhtml', '/pub?output=tsv');
    }

    const tsv = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept-Encoding': 'deflate',
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
        Expires: '0',
      },
    }).then((res) => res.text());
    
    const data = tsv
      .split('\n')
      .slice(1)
      .filter((row) => row.trim() !== '')
      .map((row) => {
        const isTsv = row.includes('\t');
        const cols = isTsv ? row.split('\t') : row.split(',');
        const symbol = cols[0] || '';
        const price = cols[1] || '';
        const currency = cols[2] || 'USD';
        
        const cleanPrice = price.replace(/,/g, '').trim();
        const numericPrice = Number(cleanPrice);

        return {
          symbol: symbol.trim(),
          regularMarketPrice: isNaN(numericPrice) ? 0 : numericPrice,
          currency: (currency.trim() || 'USD').slice(0, 3),
        };
      });
    return { body: data };
  } catch (error) {
    return { error };
  }
};

// ============ FMP API ========================================================================

// https://site.financialmodelingprep.com/developer/docs/batch-quote-quote
// https://rapidapi.com/my-saved-apis

// const apiKeyNew = process.env.NEXT_PUBLIC_FMP_KEY;

// if (!apiKeyNew) {
//   throw new Error('API key is not defined');
// }

// export const fetchStockPricesNew = async (symbols: string) => {
//   try {
//     const response = await fetch(
//       `https://financialmodelingprep.com/api/v3/profile/${symbols}?apikey=${apiKeyNew}`,
//       {
//         method: 'GET',
//       }
//     ).then((res) => res.json());
//     return response;
//   } catch (error) {
//     return { error };
//   }
// };

// export const fetchStockPricesCad = async (symbols: string) => {
//   try {
//     const response = await fetch(
//       `https://financialmodelingprep.com/api/v3/quotes/TSX?apikey=${apiKeyNew}`,
//       {
//         method: 'GET',
//       }
//     ).then((res) => res.json());
//     return response;
//   } catch (error) {
//     return { error };
//   }
// };

// ============ YAHOO ========================================================================

// const apiKey = process.env.NEXT_PUBLIC_RAPIDAPI_KEY;

// if (!apiKey) {
//   throw new Error('API key is not defined');
// }

// const options = {
//   method: 'GET',
//   headers: {
//     'X-RapidAPI-Key': apiKey,
//     'X-RapidAPI-Host': 'yahoo-finance15.p.rapidapi.com',
//   },
// };

// export const fetchUSStockPrices = async (symbols: string) => {
//   try {
//     const response = await fetch(
//       `https://yahoo-finance15.p.rapidapi.com/api/v1/markets/quote?ticker=${symbols}&type=STOCKS`,
//       options
//     );
//     const result = await response.text();
//     console.log(result);
//   } catch (error) {
//     console.error(error);
//   }
// };
