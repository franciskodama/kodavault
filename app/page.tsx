import { auth, currentUser } from '@clerk/nextjs';

import Home from './../components/Home';
import DashboardPage from './dashboard/page';
import { fetchAssets, fetchAssetsWithPrices } from '@/lib/assets';
import { UnpricedAsset } from '@/lib/types';

export default async function HomePage() {
  const { userId } = auth();
  const user = await currentUser();
  // let unpricedAssets: UnpricedAsset[] = [];

  // try {
  //   if (user) {
  //     unpricedAssets = await fetchAssets(user.emailAddresses[0].emailAddress);
  //   }
  //   const assets = await fetchAssetsWithPrices(unpricedAssets);

  // } catch (error) {
  //   console.log(error);
  //   return <div className='my-32'>🚨 Error loading assets</div>;
  // }

  return (
    <main className='flex w-full h-screen flex-col items-center justify-between p-14'>
      <div className='flex max-w-5xl w-full h-full items-start mt-32 justify-center'>
        {!userId ? <Home /> : <DashboardPage />}
      </div>
    </main>
  );
}
