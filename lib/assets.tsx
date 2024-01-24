'use server';

import { getAssets } from './assets.server';
import {
  includePriceToCashAssets,
  includePriceToCryptoAssets,
  includePriceToStockAssets,
} from './prices';
import { Asset, UnpricedAsset } from './types';
import { changeKeyForTitle } from './utils';

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
  const assetsGroupedByType = groupAssetsByType(unpricedAssets);

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
      changeKeyForTitle(cryptoAssetsWithPrice, 'crypto')) ||
    [];
  const stocksAssets =
    (stockAssetsWithPrice &&
      changeKeyForTitle(stockAssetsWithPrice, 'stock')) ||
    [];
  const cashAssets =
    (cashAssetsWithPrice && changeKeyForTitle(cashAssetsWithPrice, 'cash')) ||
    [];

  const assets = [
    ...(cryptoAssets || []),
    ...(stocksAssets || []),
    ...(cashAssets || []),
  ];

  const assetsByType = {
    Crypto: cryptoAssets || [],
    Stock: stocksAssets || [],
    Cash: cashAssets || [],
  };

  const result = {
    _assets: assets,
    _assetsByType: assetsByType,
  };

  return result;
};

export const groupAssetsByType = (assets: Asset[]) => {
  return assets.reduce((groupedAssets: any, asset: any) => {
    const type = asset.type;
    if (!groupedAssets[type]) groupedAssets[type] = [];
    groupedAssets[type].push(asset);

    return groupedAssets;
  }, {});
};
