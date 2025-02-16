'use server';

import { getAssets } from './assets.server';
import {
  includePriceToCashAssets,
  includePriceToCryptoAssets,
  includePriceToStockAssets,
} from './prices';
import { Asset, UnpricedAsset } from './types';
import { groupAssetsBySomething, includeNewKeyForCardTitle } from './utils';

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
  const stocksAssets = includeNewKeyForCardTitle(stockAssetsWithPrice, 'stock');
  const cashAssets = includeNewKeyForCardTitle(cashAssetsWithPrice, 'cash');

  const assets = [...cryptoAssets, ...stocksAssets, ...cashAssets];

  const assetsByType = {
    Crypto: cryptoAssets,
    Stock: stocksAssets,
    Cash: cashAssets,
  };

  return { assets, assetsByType };
};
