'use client';

import { Loading } from '@/components/Loading';
import { CardTotal } from '@/components/CardTotal';
import { CardAssetsBy } from '@/components/CardAssetsBy';
import { useAssetsContext } from '@/context/AssetsContext';
import MessageInTable from '@/components/MessageInTable';

export default function Stocks() {
  const { assets, isLoading } = useAssetsContext();
  const stockAssets = assets.filter((asset) => asset?.type === 'Stock');

  return (
    <>
      {isLoading ? (
        <div className='flex justify-center items-center h-[70em]'>
          <Loading />
        </div>
      ) : (
        <div>
          {stockAssets.length > 0 ? (
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
          ) : (
            <MessageInTable
              image={'/searching.webp'}
              objectPosition={'50% 10%'}
              alt={'I am broke'}
              title={'🤷🏻‍♂️ No stocks in your portfolio yet!'}
              subtitle={
                'Time to start building that empire. Add some stocks and watch your investments take off!'
              }
              buttonCopy={'Add a Stock'}
              hasNoButton={false}
              formTitle={'Add a new Asset'}
              formSubtitle={
                'Add a New Asset and expand your investment portfolio.'
              }
            />
          )}
        </div>
      )}
    </>
  );
}
