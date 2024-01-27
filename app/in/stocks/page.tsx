'use client';

import { CardTotal } from '@/components/CardTotal';
import WorkInProgress from '@/components/WorkInProgress';
import { useAssetsContext } from '@/context/AssetsContext';

export default function StocksPage() {
  const { assets, isLoading } = useAssetsContext();
  const stocksAssets = assets.filter((asset) => asset?.type === 'Stock');
  // .sort((a, b) => {
  //   if (a.name < b.name) {
  //     return -1;
  //   }
  //   if (a.name > b.name) {
  //     return 1;
  //   }
  //   return 0;
  // });

  return (
    <>
      {/* <div className='bg-white flex flex-col items-center mt-12 text-4xl w-full h-screen text-center mx-auto'>
        <h1 className='mt-32 uppercase font-extrabold border-2 border-slate-500 w-[10em] p-4'>
          Stocks
        </h1>
        <WorkInProgress />
      </div> */}
      <div>
        {stocksAssets.length > 0 && (
          <div className='flex flex-wrap gap'>
            <CardTotal
              emoji={'🔖'}
              description={'Total value grouped by stocks'}
              assets={stocksAssets}
              customKey={'stock'}
            />
            <div className='w-[90em] border-2' />
          </div>
        )}
      </div>
    </>
  );
}
