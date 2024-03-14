'use server';

import { fetchCryptoPrice } from './crypto.server';
import { getCurrency } from './currency.server';
import { fetchStockPrices } from './stock.server';
import { Asset, UnpricedAsset } from './types';

export const includePriceToCryptoAssets = async (
  cryptoAssetsArray: UnpricedAsset[]
): Promise<Asset[]> => {
  const transformedAssets = await Promise.all(
    cryptoAssetsArray.map(async (item: UnpricedAsset) => {
      const thisCryptoPrice = await fetchCryptoPrice(item.asset);
      const price = !thisCryptoPrice.data[0]
        ? 0
        : thisCryptoPrice.data[0].priceUsd;
      const total = price * item.qty;

      return {
        ...item,
        qty: item.qty,
        price:
          price === 0
            ? 0
            : price.split('.')[0] > 99
            ? Number(Number(price).toFixed(2))
            : Number(Number(price).toFixed(4)),
        total:
          Number(total.toString().split('.')[0]) > 99
            ? Number(Number(total).toFixed(2))
            : Number(Number(total).toFixed(4)),
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

  const result = await fetchStockPrices(symbolsToMakeACall);

  const missingSymbols = symbolsToCheckResultFromTheCall.filter(
    (item) => !result.body.find((el: any) => el.symbol === item)
  );

  missingSymbols.map((item: any) =>
    result.body.push({
      symbol: item,
      regularMarketPrice: 0,
    })
  );

  try {
    if (currencyRates) {
      const onlySymbolAndPriceArray = result.body.map((item: any) => {
        return {
          asset: item.symbol.split('.')[0],
          price:
            item.regularMarketPrice /
            (item.currency === 'CAD'
              ? Number(currencyRates.data.CAD)
              : item.currency === 'BRL'
              ? Number(currencyRates.data.BRL)
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
  const currencyRates = await getCurrency();

  const transformedAssets = cashAssetsArray.map((item: UnpricedAsset) => {
    let price = 1;
    let total = item.qty;

    if (item.currency === 'CAD') {
      price = 1 / currencyRates.data.CAD;
      total = item.qty / currencyRates.data.CAD;
    } else if (item.currency === 'BRL') {
      price = 1 / currencyRates.data.BRL;
      total = item.qty / currencyRates.data.BRL;
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
