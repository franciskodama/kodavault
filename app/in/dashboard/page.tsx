import { currentUser } from '@clerk/nextjs';

import Dashboard from './dashboard';
import NoAssets from '@/components/NoAssets';
import {
  fetchAssets,
  fetchAssetsWithPrices,
  groupAssetsByType,
} from '@/lib/assets';
import { Asset, AssetsByType, UnpricedAsset } from '@/lib/types';

type resultProps = {
  assets: Asset[];
  assetsByType: AssetsByType;
};

export default async function DashboardPage() {
  let unpricedAssets: UnpricedAsset[] = [];

  try {
    const user = await currentUser();
    const uid = user?.emailAddresses?.[0]?.emailAddress;

    if (uid) {
      unpricedAssets = await fetchAssets(uid);

      // if (unpricedAssets.length > 1) {
      //   const result = await fetchAssetsWithPrices(unpricedAssets);
      //   console.log('---  🚀 ---> | result:', result);
      // }
    }
  } catch (error) {
    console.error('Error fetching assets:', error);
  }

  return (
    <>
      <Dashboard />
    </>
  );
}
