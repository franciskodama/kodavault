import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import MainTable from '../assets/page';
import { CardTotal } from './card-total';
import { AssetWithoutPrice } from '../lib/types';
import { fetchAssets, fetchAssetsWithPrices } from '../lib/assets';

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

      return (
        <>
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
              assets={assetsWithPricesArray}
              customKey={'crypto'}
            />
          </div>
          {assetsWithPricesArray.length > 0 ? (
            <div className='my-8'>
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
