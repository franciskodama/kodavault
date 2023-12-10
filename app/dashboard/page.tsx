import { redirect } from 'next/navigation';

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
import { useDebugValue } from 'react';
import { currencyRates } from '../lib/prices';
import { currencyFormatter } from '../lib/utils';
import Link from 'next/link';
import { CardNextPurchases } from '@/components/CardNextPurchases';

export default async function DashboardPage() {
  // if (!session || !session.user) {
  //   redirect('/api/auth/signin');
  // }

  try {
    let assets: AssetWithoutPrice[] = [];
    // if (session?.user?.email) {
    //   assets = await fetchAssets(session.user.email);
    // }

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

      return (
        <>
          <div className='flex flex-col gap-2'>
            <div className='flex justify-end items-center text-xs font-base text-slate-600'>
              <div className='flex items-center mr-8'>
                <div>
                  <a
                    target='_blank'
                    href='https://ca.finance.yahoo.com/quote/USDCAD=X/'
                  >
                    <span>🇨🇦</span>
                  </a>

                  {` CAD: ${currencyFormatter(currencyRates.quotes.USDCAD)}`}
                </div>
                <div className='ml-4'>
                  <a
                    target='_blank'
                    href='https://ca.finance.yahoo.com/quote/USDBRL=X/'
                  >
                    <span>🇧🇷</span>
                  </a>

                  {` BRL: ${currencyFormatter(currencyRates.quotes.USDBRL)}`}
                </div>
              </div>

              <div className='flex justify-end items-center gap-2 mr-8'>
                <p>Legend:</p>
                <div className='h-[10px] w-4 bg-green-500' />
                <div>{`> 50%,`}</div>
                <div className='h-[10px] w-4 bg-red-500' />
                <div>{`< 50%`}</div>
              </div>
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
              {/* 📈 */}
              <CardAth
                emoji={'🔮'}
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
              <CardNextPurchases />
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
