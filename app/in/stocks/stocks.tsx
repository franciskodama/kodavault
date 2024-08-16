'use client';

import { Asset } from '@/lib/types';
import { Loading } from '@/components/Loading';
import { CardTotal } from '@/components/CardTotal';
import { CardAssetsBy } from '@/components/CardAssetsBy';
// import { useAssetsContext } from '@/context/AssetsContext';

export default function Stocks({ stockAssets }: { stockAssets: Asset[] }) {
  // const { assets, isLoading } = useAssetsContext();
  // const stockAssets = assets.filter((asset) => asset?.type === 'Stock');

  return (
    <>
      {stockAssets.length > 0 ? (
        <div>
          {stockAssets.length > 0 && (
            <div className='flex flex-wrap gap-2'>
              <CardTotal
                emoji={'🔖'}
                description={'Total value grouped by Stocks'}
                assets={stockAssets}
                customKey={'stock'}
              />
              <CardAssetsBy
                assetType={'Stocks'}
                emoji={'🪙'}
                description={'USD, CAD, and BRL'}
                assets={stockAssets}
                customKey={'currency'}
              />
              <CardAssetsBy
                assetType={'Stocks'}
                emoji={'🌎'}
                description={'Assets by Country Stocks'}
                assets={stockAssets}
                customKey={'subtype'}
              />
              <CardAssetsBy
                assetType={'Stocks'}
                emoji={'🏦'}
                description={'Stocks by Exchange'}
                assets={stockAssets}
                customKey={'wallet'}
              />
              <CardAssetsBy
                assetType={'Stocks'}
                emoji={'🧺'}
                description={'Stocks by Account Type'}
                assets={stockAssets}
                customKey={'account'}
              />
            </div>
          )}
        </div>
      ) : (
        <div className='flex justify-center items-center h-[70em]'>
          <Loading />
        </div>
      )}
    </>
  );
}
