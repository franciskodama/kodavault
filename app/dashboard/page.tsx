import { currentUser } from '@clerk/nextjs';

import { UnpricedAsset } from '../../lib/types';
import { fetchAssets, fetchAssetsWithPrices } from '../../lib/assets';
import NoAssets from '@/components/NoAssets';
import Dashboard from './dashboard';

export default async function DashboardPage() {
  const user = await currentUser();

  try {
    let unpricedAssets: UnpricedAsset[] = [];

    if (user) {
      unpricedAssets = await fetchAssets(user.emailAddresses[0].emailAddress);
    }

    if (unpricedAssets.length > 0) {
      const assets = await fetchAssetsWithPrices(unpricedAssets);

      return (
        <>
          <Dashboard assets={assets} />
        </>
      );
    } else {
      return <NoAssets />;
    }
  } catch (error) {
    console.error(error);
    return <div className='my-32'>🚨 Error loading assets</div>;
  }
}
