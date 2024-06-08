'use server';

import { fetchCryptoQuote } from './crypto.server';
import { getCurrency } from './currency.server';
import {
  fetchHardcodedStockPrices,
  fetchStockPricesFromSheets,
} from './stock.server';
import { Asset, UnpricedAsset } from './types';

type CurrencyData = {
  data?: {
    [key: string]: number;
  };
  error?: unknown;
};

type StockData = {
  body?: {
    symbol: string;
    regularMarketPrice: number;
    currency: string;
  }[];
  error?: unknown;
};

export const includePriceToCryptoAssets = async (
  cryptoAssetsArray: UnpricedAsset[]
): Promise<Asset[]> => {
  const transformedAssets = await Promise.all(
    cryptoAssetsArray.map(async (item: UnpricedAsset) => {
      const thisCryptoQuote = await fetchCryptoQuote(item.asset);
      const quote = !thisCryptoQuote.data?.[item.asset][0].quote
        ? 0
        : thisCryptoQuote.data?.[item.asset][0].quote.USD.price;

      const total = quote * item.qty;

      const formattedPrice =
        quote === 0
          ? 0
          : Math.floor(quote) > 99
          ? Number(quote.toFixed(2))
          : Number(quote.toFixed(4));

      const formattedTotal =
        Math.floor(total) > 99
          ? Number(total.toFixed(2))
          : Number(total.toFixed(4));

      return {
        ...item,
        qty: item.qty,
        price: formattedPrice,
        total: formattedTotal,
      };
    })
  );

  return transformedAssets;
};

export const includePriceToStockAssets = async (
  stockAssetsArray: UnpricedAsset[]
) => {
  const currencyRates = await getCurrency();
  let symbolAndExchange: string[] = [];

  stockAssetsArray.map(async (item: UnpricedAsset) => {
    symbolAndExchange.push(
      `${item.asset}${item.exchange === null ? '' : `.${item.exchange}`}`
    );
  });
  const symbolsToMakeACall = symbolAndExchange.toString();
  const symbolsToCheckResultFromTheCall = symbolsToMakeACall.split(',');

  const result = await fetchHardcodedStockPrices(symbolsToMakeACall);
  console.log('---  🚀 ---> | result:', result);

  const stockQuotes: StockData = await fetchStockPricesFromSheets();
  console.log('---  🚀 ---> | stockQuotes:', stockQuotes);

  const missingSymbols = symbolsToCheckResultFromTheCall.filter(
    (item) => !result.body.find((el: any) => el.symbol === item)
  );
  console.log('---  🚀 ---> | missingSymbols:', missingSymbols);

  missingSymbols.map((item: any) =>
    result.body.push({
      symbol: item,
      regularMarketPrice: 0,
      // currency: 'USD',
    })
  );

  try {
    if (currencyRates && currencyRates.data) {
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
            price: Number(thisStock.price).toFixed(2),
            total: Number(Number(thisStock.price * item.qty).toFixed(2)),
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
  const currencyRates: CurrencyData = await getCurrency();

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
