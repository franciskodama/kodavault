import { getAssets } from './assets.server';
import {
  includePriceToCashAssets,
  includePriceToCryptoAssets,
  includePriceToStockAssets,
} from './prices';
import { AssetWithoutPrice } from './types';

export const fetchAssets = async (userEmail: string) => {
  const assetData = await getAssets(userEmail);
  if (Array.isArray(assetData)) {
    return assetData as AssetWithoutPrice[];
  } else {
    console.error(assetData);
    return [];
  }
};

export const fetchAssetsWithPrices = async (assets: AssetWithoutPrice[]) => {
  const assetsGroupedByType = groupAssetsByType(assets);

  const [cryptoAssetsWithPrice, cashAssetsWithPrice, stockAssetsWithPrice] =
    await Promise.all([
      includePriceToCryptoAssets(assetsGroupedByType.Crypto),
      includePriceToCashAssets(assetsGroupedByType.Cash),
      includePriceToStockAssets(assetsGroupedByType.Stock),
    ]);

  const assetsWithPricesArray = [
    ...(cryptoAssetsWithPrice || []),
    ...(cashAssetsWithPrice || []),
    ...(stockAssetsWithPrice || []),
  ];

  return assetsWithPricesArray;
};

function groupAssetsByType(assets: AssetWithoutPrice[]) {
  return assets.reduce((groupedAssets: any, asset: AssetWithoutPrice) => {
    const type = asset.type;
    if (!groupedAssets[type]) groupedAssets[type] = [];
    groupedAssets[type].push(asset);
    return groupedAssets;
  }, {});
}
