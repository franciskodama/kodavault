'use server';

import { fetchQuotesForCryptos, getCryptosData } from './crypto.server';
import { getCurrencies } from './currency.server';
import { getAssets } from './assets.server';
import {
  includePriceToCashAssets,
  includePriceToCryptoAssets,
  includePriceToStockAssets,
} from './prices';
import { UnpricedAsset } from './types';
import { groupAssetsBySomething, includeNewKeyForCardTitle } from './utils';

export const fetchCurrencies = async () => {
  const currencyRates = await getCurrencies();
  return currencyRates;
};

export const fetchAssetsWithoutPrices = async (userEmail: string) => {
  const assetData = await getAssets(userEmail);
  if (Array.isArray(assetData)) {
    return assetData as UnpricedAsset[];
  } else {
    console.error(assetData);
    return [];
  }
};

export const fetchAssetsWithPrices = async (
  unpricedAssets: UnpricedAsset[]
) => {
  const assetsGroupedByType = groupAssetsBySomething(unpricedAssets, 'type');

  const [cryptoAssetsWithPrice, cashAssetsWithPrice, stockAssetsWithPrice] =
    await Promise.all([
      assetsGroupedByType.Crypto
        ? includePriceToCryptoAssets(assetsGroupedByType.Crypto)
        : Promise.resolve([]),
      assetsGroupedByType.Cash
        ? includePriceToCashAssets(assetsGroupedByType.Cash)
        : Promise.resolve([]),
      assetsGroupedByType.Stock
        ? includePriceToStockAssets(assetsGroupedByType.Stock)
        : Promise.resolve([]),
    ]);

  const cryptoAssets = includeNewKeyForCardTitle(
    cryptoAssetsWithPrice,
    'crypto'
  );
  const stocksAssets = stockAssetsWithPrice
    ? includeNewKeyForCardTitle(stockAssetsWithPrice, 'stock')
    : [];
  const cashAssets = cashAssetsWithPrice
    ? includeNewKeyForCardTitle(cashAssetsWithPrice, 'cash')
    : [];

  const assets = [...cryptoAssets, ...stocksAssets, ...cashAssets];

  const assetsByType = {
    Crypto: cryptoAssets,
    Stock: stocksAssets,
    Cash: cashAssets,
  };

  return { assets, assetsByType };
};
