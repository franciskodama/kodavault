// ============ UNIBIT ============

const apiKeyUniBit = process.env.NEXT_PUBLIC_UNIBIT_KEY;

if (!apiKeyUniBit) {
  throw new Error('API key is not defined');
}

export const fetchStockPricesUniBit = async (symbols: string) => {
  try {
    const response = await fetch(
      `https://api.unibit.ai/api/realtimestock/${symbols}?size=10&AccessKey=${apiKeyUniBit}`,
      {
        method: 'GET',
      }
    ).then((res) => res.json());
    return response;
  } catch (error) {
    return { error };
  }
};

// ============ TWELVE DATA ============

// Small Credits - 🙁

export const fetchStockPricesUsd = async (symbol: string) => {
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

// ============ FMP ============

// https://site.financialmodelingprep.com/developer/docs/batch-quote-quote
// https://rapidapi.com/my-saved-apis

const apiKeyNew = process.env.NEXT_PUBLIC_FMP_KEY;

if (!apiKeyNew) {
  throw new Error('API key is not defined');
}

export const fetchStockPricesNew = async (symbols: string) => {
  try {
    const response = await fetch(
      `https://financialmodelingprep.com/api/v3/profile/${symbols}?apikey=${apiKeyNew}`,
      {
        method: 'GET',
      }
    ).then((res) => res.json());
    return response;
  } catch (error) {
    return { error };
  }
};

export const fetchStockPricesCad = async (symbols: string) => {
  try {
    const response = await fetch(
      `https://financialmodelingprep.com/api/v3/quotes/TSX?apikey=${apiKeyNew}`,
      {
        method: 'GET',
      }
    ).then((res) => res.json());
    return response;
  } catch (error) {
    return { error };
  }
};

// ============ YAHOO ============

const apiKey = process.env.NEXT_PUBLIC_RAPIDAPI_KEY;

if (!apiKey) {
  throw new Error('API key is not defined');
}

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': apiKey,
    'X-RapidAPI-Host': 'yahoo-finance15.p.rapidapi.com',
  },
};

export const fetchUSStockPrices = async (symbols: string) => {
  try {
    const response = await fetch(
      `https://yahoo-finance15.p.rapidapi.com/api/v1/markets/quote?ticker=${symbols}&type=STOCKS`,
      options
    );
    const result = await response.text();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
};

// ============ HARDCODED ============

export const fetchStockPrices = async (symbols: string) => {
  return resultHardcoded;
};

const resultHardcoded: any = {
  body: [
    { symbol: 'PYPL34.SA', regularMarketPrice: 15.15, currency: 'BRL' },
    { symbol: 'CSU.TO', regularMarketPrice: 3694.98, currency: 'CAD' },
    { symbol: 'EU.V', regularMarketPrice: 5.91, currency: 'CAD' },
    { symbol: 'ATD.TO', regularMarketPrice: 79.65, currency: 'CAD' },
    { symbol: 'VFV.TO', regularMarketPrice: 116.64, currency: 'CAD' },
    { symbol: 'TSND.TO', regularMarketPrice: 2.8, currency: 'CAD' },
    { symbol: 'T.TO', regularMarketPrice: 24.35, currency: 'CAD' },
    { symbol: 'DOL.TO', regularMarketPrice: 99.26, currency: 'CAD' },
    { symbol: 'ATZ.TO', regularMarketPrice: 34.21, currency: 'CAD' },
    { symbol: 'IVVB11.SA', regularMarketPrice: 266.83, currency: 'BRL' },
    { symbol: 'GLXY.TO', regularMarketPrice: 9.72, currency: 'CAD' },
    { symbol: 'HOOD', regularMarketPrice: 10.79, currency: 'USD' },
    { symbol: 'KLBN11.SA', regularMarketPrice: 21.93, currency: 'BRL' },
    { symbol: 'VALE3.SA', regularMarketPrice: 69.5, currency: 'BRL' },
    { symbol: 'WEED.TO', regularMarketPrice: 6.13, currency: 'CAD' },
    { symbol: 'PETR4.SA', regularMarketPrice: 39.96, currency: 'BRL' },
  ],
};
