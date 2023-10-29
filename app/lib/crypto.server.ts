export const getCryptos = async (symbol: string | null) => {
  try {
    const response = await fetch(
      // 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
      // `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${symbol}`,
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
