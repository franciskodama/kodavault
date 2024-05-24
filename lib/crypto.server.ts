export const fetchCryptoListings = async () => {
  try {
    const response = await fetch(
      `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=1000&sort=market_cap&cryptocurrency_type=all&tag=all      `,
      {
        method: 'GET',
        headers: {
          'Accept-Encoding': 'deflate',
          // Authorization: `Authorization=Bearer ${process.env.NEXT_PUBLIC_COINCAP_KEY}`,
          'X-CMC_PRO_API_KEY': process.env.NEXT_PUBLIC_COINCAP_KEY,
        },
      }
    ).then((res) => res.json());
    return response;
  } catch (error) {
    return { error };
  }
};

export const fetchCryptoPrice = async (symbol: string | null) => {
  try {
    const response = await fetch(
      `https://api.coincap.io/v2/assets?search=${symbol}`,
      {
        method: 'GET',
        headers: {
          'Accept-Encoding': 'deflate',
          Authorization: `Authorization=Bearer ${process.env.NEXT_PUBLIC_COINCAP_KEY}`,
        },
      }
    ).then((res) => res.json());
    return response;
  } catch (error) {
    return { error };
  }
};

export const fetchCryptoPriceCoinGecko = async (symbol: string | null) => {
  try {
    const response = await fetch(
      // `https://api.coingecko.com/api/v3/simple/supported_vs_currencies`,
      // `https://api.coingecko.com/api/v3/simple/token_price/${symbol}`,
      // `https://api.coingecko.com/api/v3/simple/token_price/id`,
      // `https://api.coingecko.com/api/v3/ping`,
      // `https://api.coingecko.com/api/v3/simple/price?ids=btc&vs_currencies=usd`,
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=btc`,
      {
        method: 'GET',
        headers: {
          'x-cg-pro-api-key': `${process.env.NEXT_PUBLIC_COINGECKO_KEY}`,
        },
      }
    ).then((res) => res.json());
    return response;
  } catch (error) {
    return { error };
  }
};

// We need to upgrade the plan to have it
export const fetchGlobalMetrics = async () => {
  try {
    const response = await fetch(
      `https://api.coinmarketcap.com/v1/global-metrics/quotes/latest?convert=BTC,SGD`,
      {
        method: 'GET',
        headers: {
          'Accept-Encoding': 'deflate',
          Authorization: `Authorization=Bearer ${process.env.NEXT_PUBLIC_COINCAP_KEY}`,
        },
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
