import { currentUser } from '@clerk/nextjs';

import Dashboard from './dashboard';
import NoAssets from '@/components/NoAssets';
import {
  fetchAssets,
  fetchAssetsWithPrices,
  groupAssetsByType,
} from '@/lib/assets';
import { Asset, AssetsByType, UnpricedAsset } from '@/lib/types';

export default async function DashboardPage() {
  try {
    const user = await currentUser();
    const uid = user?.emailAddresses?.[0]?.emailAddress;

    let unpricedAssets: UnpricedAsset[] = [];
    let pricedAssets: AssetsByType = {};

    if (uid) {
      unpricedAssets = await fetchAssets(uid);

      if (unpricedAssets.length > 0) {
        pricedAssets = await fetchAssetsWithPrices(unpricedAssets);
      }
    }

    return (
      <>
        {pricedAssets ? (
          <Dashboard assetsByType={pricedAssets} />
        ) : (
          <NoAssets />
        )}
      </>
    );
  } catch (error) {
    console.error('Error fetching assets:', error);
    return <NoAssets />;
  }
}
