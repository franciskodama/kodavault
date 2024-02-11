export const fetchCryptoPrice = async (symbol: string | null) => {
  try {
    const response = await fetch(
      `https://api.coincap.io/v2/assets?search=${symbol}`,
      {
        method: 'GET',
        // TODO: Commented headers to get the right price of the Crypto Asset.
        // TODO: Perhaps, I reached the limit of calls to this API
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
