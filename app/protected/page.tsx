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
import { CardAthPage } from '../../components/CardAth/page';

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

      // TODO: Refactor this 3 function to 1 function
      const changeKeyAssetToCryptoForTitleOnCard =
        assetsWithPricesByType.Crypto.map((item: any) => ({
          ...item,
          crypto: item.asset,
        }));

      const changeKeyAssetToStockForTitleOnCard =
        assetsWithPricesByType.Stock.map((item: any) => ({
          ...item,
          stock: item.asset,
        }));

      const changeKeyAssetToCashForTitleOnCard =
        assetsWithPricesByType.Cash.map((item: any) => ({
          ...item,
          cash: item.asset,
        }));

      // https://css-generators.com/ribbon-shapes/

      // I have this app to manage my investments where I show a spreadsheet with each asset, with its proprieties, and also many cards to summarize specific data. Each card has a Title (name) and a description. I will have a card that shows the total amount of the whole vault in 3 different currencies (USD, CAD, BRL). How can I can this card and its description? It must be short.

      // https://ui.shadcn.com/docs/components/hover-card
      // to hover Total by Subtype and then see the next tier of details

      return (
        <>
          <div className='flex flex-col gap-2'>
            <div className='flex flex-wrap gap-2'>
              <CardTotalAllCurrency
                assets={assetsWithPricesArray}
                description={
                  // 'View the overall portfolio value in USD, CAD, and BRL at a glance.'
                  'Total in USD, CAD, BRL.'
                }
              />
              <CardTotal
                emoji={'💵'}
                description={'Currency, babe!'}
                assets={assetsWithPricesArray}
                customKey={'currency'}
              />
              <CardTotal
                emoji={'💰'}
                description={'This is a description'}
                assets={assetsWithPricesArray}
                customKey={'type'}
              />
              <CardTotal
                emoji={'🧺'}
                description={'This is a description'}
                assets={assetsWithPricesArray}
                customKey={'wallet'}
              />
              <CardTotal
                emoji={'🗂️'}
                description={'This is a description'}
                assets={assetsWithPricesArray}
                customKey={'subtype'}
              />
            </div>

            <div className='flex flex-wrap gap-4'>
              <CardTotal
                emoji={'🪙'}
                description={'Only Cryptos'}
                assets={changeKeyAssetToCryptoForTitleOnCard}
                customKey={'crypto'}
              />
              <CardAth
                // emoji={'📈'}
                // description={
                //   'All time high Estimation: Asset, Qty, Price, Total, ATH, ATH Estimation'
                // }
                assets={assetsWithPricesByType.Crypto}
              />
            </div>

            <div className='flex flex-wrap gap-4'>
              <CardTotal
                emoji={'🔖'}
                description={'Only Stocks'}
                assets={changeKeyAssetToStockForTitleOnCard}
                customKey={'stock'}
              />
              <CardTotal
                emoji={'🤑'}
                description={'Only Cash'}
                assets={changeKeyAssetToCashForTitleOnCard}
                customKey={'cash'}
              />
            </div>
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
