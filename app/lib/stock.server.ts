export const getStock = async (symbol: string) => {
  try {
    const response = await fetch(
      `https://yahoo-finance15.p.rapidapi.com/api/yahoo/qu/quote/${symbol}`,
      {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': `${process.env.NEXT_PUBLIC_RAPIDAPI_KEY}`,
          'X-RapidAPI-Host': 'yahoo-finance15.p.rapidapi.com',
        },
      }
    ).then((res) => res.json());
    return response;
  } catch (error) {
    return { error };
  }
};

export const getStockUsd = async (symbol: string) => {
  try {
    const response = await fetch(
      `https://api.twelvedata.com/quote?symbol=${symbol}&apikey=${process.env.NEXT_PUBLIC_TWELVEDATA_KEY}`,
      {
        headers: {
          'Accept-Encoding': 'deflate',
          Authorization: `apikey ${process.env.NEXT_PUBLIC_TWELVEDATA_KEY}`,
        },
      }
    ).then((res) => res.json());
    return response;
  } catch (error) {
    return { error };
  }
};
