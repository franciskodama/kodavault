'use client';

import { CardAssetsBy } from '@/components/CardAssetsBy';
import { CardTotal } from '@/components/CardTotal';
import { Loading } from '@/components/Loading';
import { useAssetsContext } from '@/context/AssetsContext';

export default function StocksPage() {
  const { assets, isLoading } = useAssetsContext();
  const stocksAssets = assets.filter((asset) => asset?.type === 'Stock');

  return (
    <>
      {isLoading ? (
        <div className='flex justify-center items-center h-[70em]'>
          <Loading />
        </div>
      ) : (
        <div>
          {stocksAssets.length > 0 && (
            <div className='flex flex-wrap gap-2'>
              <CardTotal
                emoji={'🔖'}
                description={'Total value grouped by Stocks'}
                assets={stocksAssets}
                customKey={'stock'}
              />
              <CardAssetsBy
                emoji={'🪙'}
                description={'USD, CAD, and BRL'}
                assets={stocksAssets}
                customKey={'currency'}
              />
              <CardAssetsBy
                emoji={'🌎'}
                description={'Assets by Country Stocks'}
                assets={stocksAssets}
                customKey={'subtype'}
              />
              <CardAssetsBy
                emoji={'🏦'}
                description={'Stocks by Exchange'}
                assets={stocksAssets}
                customKey={'wallet'}
              />
              <CardAssetsBy
                emoji={'🧺'}
                description={'Stocks by Account Type'}
                assets={stocksAssets}
                customKey={'account'}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
}
