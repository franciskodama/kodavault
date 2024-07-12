const apiKey = process.env.NEXT_PUBLIC_COINCAP_KEY;

if (!apiKey) {
  throw new Error('API key is not defined');
}

const headers: HeadersInit = {
  'X-CMC_PRO_API_KEY': apiKey,
  'Cache-Control': 'no-cache',
  Pragma: 'no-cache',
  Expires: '0',
};

// Not using yet for now, but let's create a page to rank the coins
export const fetchCryptoListings = async () => {
  try {
    const response = await fetch(
      `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=1000&sort=market_cap&cryptocurrency_type=all&tag=all      `,
      {
        method: 'GET',
        headers: headers,
      }
    ).then((res) => res.json());
    return response;
  } catch (error) {
    return { error };
  }
};

export const fetchQuotesForCryptos = async (
  symbol: string | string[] | null
) => {
  try {
    const response = await fetch(
      `https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?symbol=${symbol}`,
      {
        method: 'GET',
        headers: headers,
      }
    ).then((res) => res.json());
    return response;
  } catch (error) {
    return { error };
  }
};

export const getAllTimeHighData = async () => {
  try {
    const url = 'https://api.coingecko.com/api/v3/coins/markets';

    interface Params {
      vs_currency: string;
      order: string;
      per_page: number;
      page: number;
      sparkline: boolean;
    }

    const params: Params = {
      vs_currency: 'usd',
      order: 'market_cap_desc',
      per_page: 100,
      page: 1,
      sparkline: false,
    };

    // Convert numeric values to strings before creating URLSearchParams
    const queryParams = new URLSearchParams(
      Object.entries(params).map(([key, value]) => [key, value.toString()])
    );

    const response = await fetch(`${url}?${queryParams}`);
    const data = await response.json();

    const allTimeHighData = data.map(
      (crypto: { symbol: string; ath: number }) => ({
        symbol: crypto.symbol.toUpperCase(),
        ath: crypto.ath,
      })
    );

    return allTimeHighData;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export const getGlobalData = async () => {
  try {
    const apiKeyCoinGecko = process.env.NEXT_PUBLIC_COINGECKO_KEY;

    if (!apiKeyCoinGecko) {
      throw new Error('API key is missing');
    }

    const options: RequestInit = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'x-cg-pro-api-key': apiKeyCoinGecko,
      },
    };

    const response = fetch(
      `https://pro-api.coingecko.com/api/v3/global`,
      options
    ).then((res) => res.json());
    return response;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
