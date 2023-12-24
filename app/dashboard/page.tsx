import { auth, currentUser } from '@clerk/nextjs';

import MainTable from './assets/page';
import { CardTotal } from '../../components/CardTotal';
import { UnpricedAsset } from '../../lib/types';
import {
  fetchAssets,
  fetchAssetsWithPrices,
  groupAssetsByType,
} from '../../lib/assets';
import { CardTotalAllCurrency } from '../../components/CardAllCurrencies';
import { CardAth } from '../../components/CardAth';
import { currencyRates } from '../../lib/prices';
import { changeKeyForTitle, currencyFormatter } from '../../lib/utils';
import { CardNextPurchases } from '@/components/CardNextPurchases';
import NoAssets from '@/components/NoAssets';
import Transactions from './transactions/transactions';
import Chart from './chart/chart';
import Notifications from './notifications/notifications';
import { CardTotalByCrypto } from '@/components/CardTotalByCrypto';

export default async function DashboardPage() {
  const { userId } = auth();
  const user = await currentUser();

  try {
    let unpricedAssets: UnpricedAsset[] = [];

    if (user) {
      unpricedAssets = await fetchAssets(user.emailAddresses[0].emailAddress);
    }

    if (unpricedAssets.length > 0) {
      const assets = await fetchAssetsWithPrices(unpricedAssets);
      const assetsByType = groupAssetsByType(assets);

      const cryptoAssets = changeKeyForTitle(assetsByType.Crypto, 'crypto');
      const stocksAssets = changeKeyForTitle(assetsByType.Stock, 'stock');
      const cashAssets = changeKeyForTitle(assetsByType.Cash, 'cash');

      return (
        <>
          <div className='flex flex-col gap-2'>
            {/* -------- Legend --------------------------------------------------------------------------------------- */}
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

            {/* -------- 1st Row Cards --------------------------------------------------------------------------------------- */}

            <div className='flex gap-2'>
              <div className='flex flex-col basis-4/5 gap-2'>
                <div className='flex flex-wrap gap-2'>
                  <CardTotal
                    emoji={'💵'}
                    description={`Assets' Origin Breakdown`}
                    assets={assets}
                    customKey={'currency'}
                  />
                  <CardTotal
                    emoji={'💰'}
                    description={'Total value grouped by type'}
                    assets={assets}
                    customKey={'type'}
                  />
                  <CardTotal
                    emoji={'🤑'}
                    description={'Total value grouped by currency'}
                    assets={cashAssets}
                    customKey={'cash'}
                  />
                  <CardTotal
                    emoji={'🤑'}
                    description={'Total value grouped by currency'}
                    assets={cashAssets}
                    customKey={'cash'}
                  />
                </div>
                <Transactions />
                <Chart />
              </div>
              {/* -------- Right Panel  --------------------------------------------------------------------------------------- */}
              <div className='flex flex-col basis-1/5'>
                <CardTotalAllCurrency
                  assets={assets}
                  description={'Total Vault in USD, CAD, BRL.'}
                />
                <Notifications />
              </div>
            </div>

            {/* -------- 1st Row - After Chart --------------------------------------------------------------------------------------- */}
            <div className='flex flex-wrap gap-2'>
              <CardTotal
                emoji={'🧺'}
                description={'Total value grouped by wallet'}
                assets={assets}
                customKey={'wallet'}
              />
              <CardTotal
                emoji={'🗂️'}
                description={'Total value grouped by subtype'}
                assets={assets}
                customKey={'subtype'}
              />
            </div>
            {/* -------- 2nd Row - After Chart -------------------------------------------------------------------------------------- */}
            <div className='flex flex-wrap gap-2'>
              <CardTotal
                emoji={'🪙'}
                description={'Total value grouped by crypto'}
                assets={changeKeyForTitle(assetsByType.Crypto, 'crypto')}
                customKey={'crypto'}
              />
              {/* <CardTotalByCrypto
                emoji={'🪙'}
                description={'Only Cryptos'}
                assets={changeKeyAssetToCryptoForTitleOnCard}
                customKey={'crypto'}
              /> */}
              <CardAth
                emoji={'🔮'}
                description={'All-Time High Estimation'}
                assets={assetsByType.Crypto}
              />
            </div>
            {/* -------- 3rd Row - After Chart-------------------------------------------------------------------------------------- */}
            <div className='flex flex-wrap gap'>
              <CardTotal
                emoji={'🔖'}
                description={'Total value grouped by stocks'}
                assets={stocksAssets}
                customKey={'stock'}
              />

              <CardNextPurchases />
            </div>
          </div>

          {/* {assetsWithPricesArray.length > 0 ? (
            <div className='my-4'>
              <AssetsPage assets={assetsWithPricesArray} />
            </div>
          ) : (
            <div className='my-32'>🙅🏻‍♀️ Not loaded yet</div>
          )} */}
        </>
      );
    } else {
      return <NoAssets />;
    }
  } catch (error) {
    console.error(error);
    return <div className='my-32'>🚨 Error loading assets</div>;
  }
}
