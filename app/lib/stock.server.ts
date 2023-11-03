export const getStock = async (symbol: string) => {
  try {
    const response = await fetch(
      `https://yahoo-finance15.p.rapidapi.com/api/yahoo/qu/quote/${symbol}`,
      {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key':
            '87f00feabcmsh70885b5cd147e1ep1122b9jsnf8834660f934',
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

// export const getStockUsd = async (symbol: string) => {
//   try {
//     const response = await fetch(
//       // `https://serpapi.com/search.json?engine=google_finance&q=${symbol}&api_key=${process.env.NEXT_PUBLIC_SERPAPI}`
//       `https://api.twelvedata.com/quote?symbol=${symbol}&apikey=${process.env.NEXT_PUBLIC_TWELVEDATA_KEY}`,
//       {
//         headers: {
//           'Accept-Encoding': 'deflate',
//           Authorization: `apikey ${process.env.NEXT_PUBLIC_TWELVEDATA_KEY}`,
//         },
//       }
//     ).then((res) => res.json());
//     return response;
//   } catch (error) {
//     return { error };
//   }
// };

// const symbol = 'BVMF:IVVB11';
// `https://serpapi.com/search.json?engine=google_finance&q=${symbol}&api_key=${process.env.NEXT_PUBLIC_SERPAPI}`
// `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=5min&apikey=${process.env.NEXT_PUBLIC_TWELVEDATA_KEY}`,

// export const getStock = async (symbol: string) => {
//   try {
//     const response = await fetch(
//       `https://yahoo-finance15.p.rapidapi.com/api/yahoo/qu/quote/${symbol}`,
//       {
//         method: 'GET',
//         headers: {
//           'X-RapidAPI-Key':
//             '87f00feabcmsh70885b5cd147e1ep1122b9jsnf8834660f934',
//           'X-RapidAPI-Host': 'yahoo-finance15.p.rapidapi.com',
//         },
//       }
//     ).then((res) => res.json());
//     return response;
//   } catch (error) {
//     return { error };
//   }
// };
