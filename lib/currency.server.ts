import { Currency, Currencies } from './types';

export const getCurrencies = async (): Promise<Currencies> => {
  try {
    const csv = await fetch(
      `https://docs.google.com/spreadsheets/d/e/2PACX-1vRXhHkYpkVB8nx8Ws7Q4h8g6q7MJg-rotoQemAfPdRWXhWHJWjivg7fcDw4m-9YxnQvPyxEkwpTKopW/pub?gid=0&single=true&output=csv`,
      {
        method: 'GET',
        headers: {
          'Accept-Encoding': 'deflate',
          'Cache-Control': 'no-cache',
          Pragma: 'no-cache',
          Expires: '0',
        },
      }
    ).then((res) => res.text());
    const data = csv
      .split('\n')
      .slice(1)
      .map((row) => {
        const [coin, price] = row.split(',');
        return { coin, price: Number(price) };
      });

    const result = data.reduce<Currency>((acc, { coin, price }) => {
      const currencyCode = coin.slice(-3);
      acc[currencyCode] = price;
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
