'use server';

import { getAssets } from './assets.server';
import {
  includePriceToCashAssets,
  includePriceToCryptoAssets,
  includePriceToStockAssets,
} from './prices';
import { Asset, UnpricedAsset } from './types';

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
  console.log('---  🚀 ---> | assetsGroupedByType ---- :', assetsGroupedByType);

  const [cryptoAssetsWithPrice, cashAssetsWithPrice, stockAssetsWithPrice] =
    await Promise.all([
      assetsGroupedByType.Crypto &&
        includePriceToCryptoAssets(assetsGroupedByType.Crypto),
      assetsGroupedByType.Cash &&
        includePriceToCashAssets(assetsGroupedByType.Cash),
      assetsGroupedByType.Stock &&
        includePriceToStockAssets(assetsGroupedByType.Stock),
    ]);

  // const result = [
  //   ...(cryptoAssetsWithPrice || []),
  //   ...(cashAssetsWithPrice || []),
  //   ...(stockAssetsWithPrice || []),
  // ];

  const result = {
    Crypto: cryptoAssetsWithPrice || [],
    Cash: cashAssetsWithPrice || [],
    Stock: stockAssetsWithPrice || [],
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
