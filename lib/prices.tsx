'use server';

import { fetchQuotesForCryptos } from './crypto.server';
import { getCurrencies } from './currency.server';
import { fetchStockPricesFromSheets } from './stock.server';
import { Asset, Currencies, UnpricedAsset } from './types';

type StockQuote = {
  symbol: string;
  regularMarketPrice: number;
  currency: string;
};

type StockData = {
  body?: StockQuote[];
  error?: unknown;
};

export const includePriceToCryptoAssets = async (
  cryptoAssetsArray: UnpricedAsset[]
): Promise<Asset[]> => {
  const symbols = cryptoAssetsArray.reduce(
    (acc: string[], item: UnpricedAsset) => {
      acc.push(item.asset);
      return acc;
    },
    []
  );

  const quotes = await fetchQuotesForCryptos(symbols);

  const quoteLookup: { [symbol: string]: any } = {};
  for (const symbol in quotes.data) {
    if (Array.isArray(quotes.data[symbol]) && quotes.data[symbol].length > 0) {
      quoteLookup[symbol] = quotes.data[symbol][0];
    }
  }

  const transformedAssets = cryptoAssetsArray.map((item: UnpricedAsset) => {
    const foundAsset = quoteLookup[item.asset] || null;
    const quote = foundAsset?.quote?.USD?.price ?? 0;
    const total = quote * item.qty;

    const formattedPrice =
      quote === 0
        ? 0
        : Math.floor(quote) > 99
        ? Number(
            typeof quote === 'number' && !isNaN(quote) ? quote.toFixed(2) : 0
          )
        : Number(
            typeof quote === 'number' && !isNaN(quote) ? quote.toFixed(4) : 0
          );

    const formattedTotal =
      Math.floor(total) > 99
        ? Number(
            typeof total === 'number' && !isNaN(total) ? total.toFixed(2) : 0
          )
        : Number(
            typeof total === 'number' && !isNaN(total) ? total.toFixed(4) : 0
          );

    return {
      ...item,
      qty: item.qty,
      price: formattedPrice,
      total: formattedTotal,
    };
  });

  return transformedAssets;
};

const getFirstObject = (data: any, symbol: string) => {
  if (
    data.hasOwnProperty(symbol) &&
    Array.isArray(data[symbol]) &&
    data[symbol].length > 0
  ) {
    return data[symbol][0];
  }
  return null;
};
// ------------ History of includePriceToStockAssets fuction ------------
// This piece of code was written to use APIs, but they didn't give us for free the symbols we need (Canadian and Brazilian stocks).
// So, as the APIs asks for upgrade, we created a spreadsheet using Google Finance Formulas that needs to be updated manually
// Although we have this solution, the code will maintain the collection of symbols to make a call in the future with an API.
// ----------------------------------------------------------------------

export const includePriceToStockAssets = async (
  stockAssetsArray: UnpricedAsset[]
) => {
  const currencyRates = await getCurrencies();
  let symbolAndExchange: string[] = [];

  stockAssetsArray.forEach((item: UnpricedAsset) => {
    symbolAndExchange.push(item.asset);
  });
  const symbolsToMakeACall = symbolAndExchange.toString();
  const symbolsToCheckResultFromTheCall = symbolsToMakeACall.split(',');

  let stockPrices: StockData = { body: [] };
  let result: StockData = await fetchStockPricesFromSheets();

  if (!result.body) {
    symbolsToCheckResultFromTheCall.map((item: string) => {
      stockPrices.body?.push({
        symbol: item,
        regularMarketPrice: 0,
        currency: 'USD',
      });
    });
    result = stockPrices;
  }

  const missingSymbols = symbolsToCheckResultFromTheCall.filter(
    (item) => !result.body!.find((el: StockQuote) => el.symbol === item)
  );

  missingSymbols.map((item: any) =>
    result.body!.push({
      symbol: item,
      regularMarketPrice: 0,
      currency: 'USD',
    })
  );

  try {
    if (result.body && currencyRates && currencyRates.data) {
      const onlySymbolAndPriceArray = result.body.map((item: any) => {
        return {
          asset: item.symbol.split('.')[0],
          price:
            item.regularMarketPrice /
            (item.currency === 'CAD'
              ? Number(currencyRates.data?.CAD)
              : item.currency === 'BRL'
              ? Number(currencyRates.data?.BRL)
              : 1),
        };
      });

      const stockAssetsWithPrices: Asset[] = stockAssetsArray.map(
        (item: any) => {
          const thisStock = onlySymbolAndPriceArray.find(
            (el: any) => el.asset === item.asset
          );

          return {
            ...item,
            price: Number(thisStock?.price ?? 0).toFixed(2),
            total: Number(
              (Number(thisStock?.price ?? 0) * item.qty).toFixed(2)
            ),
          };
        }
      );
      return stockAssetsWithPrices;
    }
  } catch (error) {
    console.error(error);
  }
};

export const includePriceToCashAssets = async (
  cashAssetsArray: UnpricedAsset[]
) => {
  const currencyRates: Currencies = await getCurrencies();

  if (!currencyRates.data) {
    return cashAssetsArray.map((item: UnpricedAsset) => ({
      ...item,
      price: 1,
      total: item.qty,
    }));
  }

  const transformedAssets = cashAssetsArray.map((item: UnpricedAsset) => {
    let price = 1;
    let total = item.qty;

    if (item.currency === 'CAD') {
      price = 1 / (currencyRates.data?.CAD || 1);
      total = item.qty / (currencyRates.data?.CAD || 1);
    } else if (item.currency === 'BRL') {
      price = 1 / (currencyRates.data?.BRL || 1);
      total = item.qty / (currencyRates.data?.BRL || 1);
    }

    return {
      ...item,
      qty: item.qty,
      price: Number(Number(price).toFixed(2)),
      total: Number(Number(total).toFixed(2)),
    };
  });

  return transformedAssets;
};
