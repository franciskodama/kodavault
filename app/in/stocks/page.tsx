'use client';

import { CardStocksBy } from '@/components/CardStocksBy';
import { CardTotal } from '@/components/CardTotal';
import { useAssetsContext } from '@/context/AssetsContext';

export default function StocksPage() {
  const { assets, isLoading } = useAssetsContext();
  const stocksAssets = assets.filter((asset) => asset?.type === 'Stock');

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
            <CardStocksBy
              emoji={'🪙'}
              description={'USD, CAD, and BRL'}
              assets={stocksAssets}
              customKey={'currency'}
            />
            <CardStocksBy
              emoji={'🔖'}
              description={'Stocks by Country'}
              assets={stocksAssets}
              customKey={'subtype'}
            />
            <CardStocksBy
              emoji={'🔖'}
              description={'Stocks by Exchange'}
              assets={stocksAssets}
              customKey={'wallet'}
            />
            <CardStocksBy
              emoji={'🔖'}
              description={'Stocks by Account Type'}
              assets={stocksAssets}
              customKey={'account'}
            />

            <div className='w-[90em] border-2' />
          </div>
        )}
      </div>
    </>
  );
}
