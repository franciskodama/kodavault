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
import { CardTotalAllCurrency } from '../../components/CardAllCurrencies';
import { CardAth } from '../../components/CardAth';
import { CardTotalByCrypto } from '@/components/CardTotalByCrypto';

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

      //----------------------------------------------------------------------------------------------
      // TODO: Refactor this 3 function to 1 function
      //----------------------------------------------------------------------------------------------
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

      // Prompt AI: I have this app to manage my investments where I show a spreadsheet with each asset, with its proprieties, and also many cards to summarize specific data. Each card has a Title (name) and a description. I will have a card that shows the total amount of the whole vault in 3 different currencies (USD, CAD, BRL). How can I can this card and its description? It must be short.

      // https://css-generators.com/ribbon-shapes/
      // TODO: to hover Total by Subtype and then see the next tier of details
      // TODO: Generate Report + Send it by Email + Download it
      // TODO: At the end of the Month close a Report
      // TODO: Input, Edit, Delete, new Asset
      // TODO: Search Asset
      // TODO: On mouse over on Crypto, show the foundamentals explanation of this coin
      // TODO: Filter By Key Column

      // TODO: If Asset has 0 total value, make the code more resilient so it doesn't crash
      // TODO: If there is cash on TFSA or HFSA, show it on the card or send a alert
      // TODO: think about other alerts
      // TODO: Place to save videos about coins for future reference

      //----------------------------------------------------------------------------------------------
      // TODO: Home beofre Dashboard - ref.: Kajabi
      //----------------------------------------------------------------------------------------------

      return (
        <>
          <div className='flex flex-col gap-2 border-2'>
            <div className='flex justify-end items-center text-xs font-base text-slate-600 gap-2 mr-8'>
              <p>Legend:</p>
              <div className='h-[10px] w-4 bg-green-500' />
              <div>{`> 50%,`}</div>
              <div className='h-[10px] w-4 bg-red-500' />
              <div>{`< 50%`}</div>
            </div>
            {/* -------- 1st Row --------------------------------------------------------------------------------------- */}
            <div className='flex flex-wrap gap-2'>
              <CardTotalAllCurrency
                assets={assetsWithPricesArray}
                description={'Total Vault in USD, CAD, BRL.'}
              />
              <CardTotal
                emoji={'💵'}
                description={`Assets' Origin Breakdown`}
                assets={assetsWithPricesArray}
                customKey={'currency'}
              />
              <CardTotal
                emoji={'💰'}
                description={'Total value grouped by type'}
                assets={assetsWithPricesArray}
                customKey={'type'}
              />
              <CardTotal
                emoji={'🧺'}
                description={'Total value grouped by wallet'}
                assets={assetsWithPricesArray}
                customKey={'wallet'}
              />
              <CardTotal
                emoji={'🗂️'}
                description={'Total value grouped by subtype'}
                assets={assetsWithPricesArray}
                customKey={'subtype'}
              />
            </div>
            {/* -------- 2nd Row -------------------------------------------------------------------------------------- */}
            <div className='flex flex-wrap gap-4'>
              <CardTotal
                emoji={'🪙'}
                description={'Total value grouped by crypto'}
                assets={changeKeyAssetToCryptoForTitleOnCard}
                customKey={'crypto'}
              />
              {/* <CardTotalByCrypto
                emoji={'🪙'}
                description={'Only Cryptos'}
                assets={changeKeyAssetToCryptoForTitleOnCard}
                customKey={'crypto'}
              /> */}
              <CardAth
                emoji={'📈'}
                description={'All-Time High Estimation'}
                assets={assetsWithPricesByType.Crypto}
              />
            </div>
            {/* -------- 3rd Row-------------------------------------------------------------------------------------- */}
            <div className='flex flex-wrap gap-4'>
              <CardTotal
                emoji={'🔖'}
                description={'Total value grouped by stocks'}
                assets={changeKeyAssetToStockForTitleOnCard}
                customKey={'stock'}
              />
              <CardTotal
                emoji={'🤑'}
                description={'Total value grouped by currency'}
                assets={changeKeyAssetToCashForTitleOnCard}
                customKey={'cash'}
              />
            </div>
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
