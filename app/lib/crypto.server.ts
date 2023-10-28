export const getCryptos = async (symbol: string | null) => {
  try {
    const response = await fetch(
      // 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
      `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${symbol}`,
      {
        headers: {
          'X-CMC_PRO_API_KEY': process.env.NEXT_PUBLIC_COINMARKETCAP_KEY || '',
        },
      }
    ).then((res) => res.json());
    return response;
  } catch (error) {
    return { error };
  }
};
