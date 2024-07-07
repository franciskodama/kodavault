'use server';

import { getAssets } from './assets.server';
import {
  includePriceToCashAssets,
  includePriceToCryptoAssets,
  includePriceToStockAssets,
} from './prices';
import { Asset, UnpricedAsset } from './types';
import { groupAssetsBySomething, includeNewKeyForCardTitle } from './utils';

export const fetchAssets = async (userEmail: string) => {
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
      assetsGroupedByType.Crypto &&
        includePriceToCryptoAssets(assetsGroupedByType.Crypto),
      assetsGroupedByType.Cash &&
        includePriceToCashAssets(assetsGroupedByType.Cash),
      assetsGroupedByType.Stock &&
        includePriceToStockAssets(assetsGroupedByType.Stock),
    ]);

  const cryptoAssets =
    (cryptoAssetsWithPrice &&
      includeNewKeyForCardTitle(cryptoAssetsWithPrice, 'crypto')) ||
    [];
  const stocksAssets =
    (stockAssetsWithPrice &&
      includeNewKeyForCardTitle(stockAssetsWithPrice, 'stock')) ||
    [];
  const cashAssets =
    (cashAssetsWithPrice &&
      includeNewKeyForCardTitle(cashAssetsWithPrice, 'cash')) ||
    [];

  const assets = [...cryptoAssets, ...stocksAssets, ...cashAssets];

  const assetsByType = {
    Crypto: cryptoAssets || [],
    Stock: stocksAssets || [],
    Cash: cashAssets || [],
  };

  const result = {
    assets,
    assetsByType,
  };

  return result;
};
