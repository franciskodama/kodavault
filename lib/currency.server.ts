import { Currency, Currencies } from './types';

export const getCurrencies = async (): Promise<Currencies> => {
  try {
    let url = process.env.SPREADSHEET_CURRENCY_URL || '';
    if (url.includes('/edit')) {
      const urlObj = new URL(url);
      const gid = urlObj.searchParams.get('gid');
      url = url.split('/edit')[0] + '/export?format=csv' + (gid ? `&gid=${gid}` : '');
    } else if (url.includes('/pubhtml')) {
      url = url.replace('/pubhtml', '/pub?output=csv');
    }

    const csv = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept-Encoding': 'deflate',
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
        Expires: '0',
      },
    }).then((res) => res.text());
    
    const data = csv
      .split('\n')
      .slice(1)
      .filter((row) => row.trim() !== '')
      .map((row) => {
        const isTsv = row.includes('\t');
        const cols = isTsv ? row.split('\t') : row.split(',');
        const coin = cols[0]?.trim() || '';
        const priceStr = cols[1]?.trim() || '0';
        
        // Remove quotes or extra commas from numbers
        const cleanPrice = priceStr.replace(/"/g, '').replace(/,/g, '');
        const price = Number(cleanPrice);

        return { coin, price: isNaN(price) ? 0 : price };
      });

    const result = data.reduce<Currency>((acc, { coin, price }) => {
      if (coin) {
        const currencyCode = coin.slice(-3);
        acc[currencyCode] = price;
      }
      return acc;
    }, {});

    return { data: result };
  } catch (error) {
    return { data: null, error };
  }
};

// Using this  API only for BRL because Yahoo Finance stop working with the pair USDBRL
export const getCurrenciesFromApi = async (): Promise<{
  data: Record<string, number>;
} | null> => {
  try {
    const data = await fetch(
      `https://api.freecurrencyapi.com/v1/latest?apikey=${process.env.NEXT_PUBLIC_FREECURRENCYAPI}`,
      {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-cache',
          Pragma: 'no-cache',
          Expires: '0',
        },
      }
    ).then((res) => res.json());
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

// Just for getting the Currency API Status
// export const currencyRatesApiStatus = async () => {
//   try {
//     const response = await fetch(
//       `https://api.freecurrencyapi.com/v1/status?apikey=${process.env.NEXT_PUBLIC_FREECURRENCYAPI}`,
//       {
//         method: 'GET',
//         headers: {
//           'Accept-Encoding': 'deflate',
//           'Cache-Control': 'no-cache',
//           Pragma: 'no-cache',
//           Expires: '0',
//         },
//       }
//     ).then((res) => res.json());
//     return response;
//   } catch (error) {
//     return { error };
//   }
// };
