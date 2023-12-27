import { currentUser } from '@clerk/nextjs';

import { UnpricedAsset } from '../../../lib/types';
import { fetchAssets, fetchAssetsWithPrices } from '../../../lib/assets';
import NoAssets from '@/components/NoAssets';
import Dashboard from './dashboard';

export default async function DashboardPage() {
  const user = await currentUser();
  const uid = user?.emailAddresses?.[0]?.emailAddress;

  try {
    let unpricedAssets: UnpricedAsset[] = [];

    if (uid) {
      unpricedAssets = await fetchAssets(uid);
    }

    if (unpricedAssets.length > 0) {
      const assets = await fetchAssetsWithPrices(unpricedAssets);

      return <Dashboard assets={assets} />;
    } else {
      return <NoAssets />;
    }
  } catch (error) {
    console.error(error);
    return <div className='my-32'>🚨 Error loading assets</div>;
  }
}
