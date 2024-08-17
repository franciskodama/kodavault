import { assetsSignal, fetchAssets } from '@/context/signals';
import Stocks from './stocks';
import { currentUser } from '@clerk/nextjs/server';
import { Loading } from '@/components/Loading';
import { Divide } from 'lucide-react';

export default async function StocksPage() {
  // try {
  //   const user = await currentUser();
  //   const uid = user?.emailAddresses?.[0]?.emailAddress;

  //   if (uid && !assetsSignal.value) {
  //     await fetchAssets(uid);
  //   }

  //   if (assetsSignal.value && uid) {
  //     return (
  //       <Stocks stockAssets={assetsSignal.value?.assetsByType.Stocks} />
  //     );
  //   } else {
  //     return <Loading />;
  //   }
  // } catch (error) {
  //   console.error('Error loading DashboardPage:', error);
  //   return <Loading />;
  // }

  return (
    <>
      {assetsSignal.value ? (
        <Stocks stockAssets={assetsSignal.value?.assetsByType.Stocks} />
      ) : (
        <div>Nothing yet!</div>
      )}
    </>
  );
}
