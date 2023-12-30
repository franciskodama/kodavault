import { currentUser } from '@clerk/nextjs';

import { UnpricedAsset } from '../../../lib/types';
import { fetchAssets, fetchAssetsWithPrices } from '../../../lib/assets';
import NoAssets from '@/components/NoAssets';
import Dashboard from './dashboard';

export default async function DashboardPage() {
  const user = await currentUser();
  const uid = user?.emailAddresses?.[0]?.emailAddress;

  // If appears again the hydration error, check if we need to include
  // a loading state here and a conditional return if there is assets
  // or the loading state with there is no assets (outside of the try/catch block)

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
