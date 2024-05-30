export const getCurrency = async () => {
  try {
    const response = await fetch(
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
    return response;
  } catch (error) {
    return { error };
  }
};

export const currencyRatesApiStatus = async () => {
  try {
    const response = await fetch(
      `https://api.freecurrencyapi.com/v1/status?apikey=${process.env.NEXT_PUBLIC_FREECURRENCYAPI}`,
      {
        method: 'GET',
        headers: {
          'Accept-Encoding': 'deflate',
        },
      }
    ).then((res) => res.json());
    return response;
  } catch (error) {
    return { error };
  }
};
