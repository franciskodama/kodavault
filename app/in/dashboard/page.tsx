import { currentUser } from '@clerk/nextjs';

import { Asset, AssetsByType, UnpricedAsset } from '../../../lib/types';
import {
  fetchAssets,
  fetchAssetsWithPrices,
  groupAssetsByType,
} from '../../../lib/assets';
import Dashboard from './dashboard';
import NoAssets from '@/components/NoAssets';

export default async function DashboardPage() {
  const user = await currentUser();
  const uid = user?.emailAddresses?.[0]?.emailAddress;

  let unpricedAssets: UnpricedAsset[] = [];
  let assets: Asset[] = [];
  let assetsByType: AssetsByType = {};

  try {
    if (uid) {
      unpricedAssets = await fetchAssets(uid);
    }

    if (unpricedAssets.length > 0) {
      assets = await fetchAssetsWithPrices(unpricedAssets);
      assetsByType = groupAssetsByType(assets);
    }
  } catch (error) {
    console.error(error);
    throw new Error("Assets couldn't be fetched! 👻");
  }

  return (
    <>
      {assets && assetsByType ? (
        <Dashboard assets={assets} assetsByType={assetsByType} />
      ) : (
        <NoAssets />
      )}
    </>
  );
}
