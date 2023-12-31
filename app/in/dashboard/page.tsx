import { currentUser } from '@clerk/nextjs';

import { Asset, UnpricedAsset } from '../../../lib/types';
import { fetchAssets, fetchAssetsWithPrices } from '../../../lib/assets';
import NoAssets from '@/components/NoAssets';
import Dashboard from './dashboard';
import { Loading } from '@/components/Loading';

export default async function DashboardPage() {
  const user = await currentUser();
  const uid = user?.emailAddresses?.[0]?.emailAddress;

  // If appears again the hydration error, check if we need to include
  // a loading state here and a conditional return if there is assets
  // or the loading state with there is no assets (outside of the try/catch block)

  // https://nextjs.org/docs/messages/react-hydration-error

  let unpricedAssets: UnpricedAsset[] = [];
  let assets: Asset[] = [];

  try {
    if (uid) {
      unpricedAssets = await fetchAssets(uid);
    }

    if (unpricedAssets.length > 0) {
      assets = await fetchAssetsWithPrices(unpricedAssets);
    }
  } catch (error) {
    console.error(error);
    throw new Error("Assets couldn't be loaded");
  }

  return (
    <>
      {!assets ? (
        <Loading className='h-5 w-5 mr-1' />
      ) : (
        <Dashboard assets={assets} />
      )}
    </>
  );
}

// try {
//   let unpricedAssets: UnpricedAsset[] = [];

//   if (uid) {
//     unpricedAssets = await fetchAssets(uid);
//   }

//   if (unpricedAssets.length > 0) {
//     const assets = await fetchAssetsWithPrices(unpricedAssets);

//     return <Dashboard assets={assets} />;
//   } else {
//     return <NoAssets />;
//   }
// } catch (error) {
//   console.error(error);
//   return <div className='my-32'>🚨 Error loading assets</div>;
// }
