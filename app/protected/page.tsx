import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import MainTable from '../assets/page';
import { CardTotal } from '../../components/CardTotal';
import { AssetWithoutPrice } from '../lib/types';
import {
  fetchAssets,
  fetchAssetsWithPrices,
  groupAssetsByType,
} from '../lib/assets';
import { CardTotalAllCurrency } from '@/components/CardAllCurrencies';

export default async function ProtectedRoute() {
  const session = await getServerSession();

  if (!session || !session.user) {
    redirect('/api/auth/signin');
  }

  try {
    let assets: AssetWithoutPrice[] = [];
    if (session?.user?.email) {
      assets = await fetchAssets(session.user.email);
    }

    if (assets.length > 0) {
      const assetsWithPricesArray = await fetchAssetsWithPrices(assets);
      const assetsWithPricesByType = groupAssetsByType(assetsWithPricesArray);

      const changeKeyAssetToCryptoForTitleOnCard =
        assetsWithPricesByType.Crypto.map((item: any) => ({
          ...item,
          crypto: item.asset,
        }));

      return (
        <>
          <div className='flex flex-wrap gap-2 justify-between my-3'>
            <CardTotalAllCurrency
              assets={assetsWithPricesArray}
              description={'Do we need a description here?'}
            />
          </div>
          <div className='flex flex-wrap gap-2 justify-between'>
            <CardTotal
              emoji={'🧺'}
              description={'This is a description'}
              assets={assetsWithPricesArray}
              customKey={'wallet'}
            />
            {/* 🤑 👛 🅱️*/}
            <CardTotal
              emoji={'💰'}
              description={'This is a description'}
              assets={assetsWithPricesArray}
              customKey={'type'}
            />
            <CardTotal
              emoji={'🗂️'}
              description={'This is a description'}
              assets={assetsWithPricesArray}
              customKey={'subtype'}
            />
            <CardTotal
              emoji={'💵'}
              description={'Currency, babe!'}
              assets={assetsWithPricesArray}
              customKey={'currency'}
            />
            <CardTotal
              emoji={'🪙'}
              description={'Only Cryptos'}
              assets={changeKeyAssetToCryptoForTitleOnCard}
              customKey={'crypto'}
            />
          </div>
          <div className='flex justify-end items-center text-xs font-base text-slate-600 my-2 gap-2'>
            <p>Legend:</p>
            <div className='h-[10px] w-4 bg-green-500' />
            <div>{`> 50%,`}</div>
            <div className='h-[10px] w-4 bg-red-500' />
            <div>{`< 50%`}</div>
          </div>
          {assetsWithPricesArray.length > 0 ? (
            <div className='my-4'>
              <MainTable assets={assetsWithPricesArray} />
            </div>
          ) : (
            <div className='my-32'>🙅🏻‍♀️ Not loaded yet</div>
          )}
        </>
      );
    } else {
      return <div className='my-32'>🙅🏻‍♀️ No assets found</div>;
    }
  } catch (error) {
    console.error(error);
    return <div className='my-32'>🚨 Error loading assets</div>;
  }
}
