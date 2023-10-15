// const symbol = 'BVMF:IVVB11';

export const getStockBr = async (symbol: string) => {
  try {
    const response = await fetch(
      `https://serpapi.com/search.json?engine=google_finance&q=${symbol}&api_key=${process.env.NEXT_PUBLIC_SERPAPI}`
    ).then((res) => res.json());
    return response;
  } catch (error) {
    return { error };
  }
};
