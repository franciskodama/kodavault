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
  try {
    const user = await currentUser();
    const uid = user?.emailAddresses?.[0]?.emailAddress;

    let unpricedAssets: UnpricedAsset[] = [];
    let assets: Asset[] = [];
    let assetsByType: AssetsByType = {};

    if (uid) {
      unpricedAssets = await fetchAssets(uid);

      if (unpricedAssets.length > 0) {
        assets = await fetchAssetsWithPrices(unpricedAssets);
        assetsByType = groupAssetsByType(assets);
      }
    }

    return (
      <>
        {assets.length > 0 ? (
          <Dashboard assets={assets} assetsByType={assetsByType} />
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
