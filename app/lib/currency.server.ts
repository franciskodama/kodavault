export const getCurrency = async () => {
  try {
    const response = await fetch(
      `http://apilayer.net/api/live?access_key=${process.env.NEXT_PUBLIC_APILAYER_KEY}`,
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

// https://currencylayer.com/dashboard
