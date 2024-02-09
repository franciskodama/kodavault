'use client';

import { CardTotal } from '@/components/CardTotal';
import Transactions from './transactions/transactions';
import Chart from './chart/chart';
import { CardTotalAllCurrency } from '@/components/CardAllCurrencies';
import Notifications from './notifications/notifications';
import { CardNextPurchases } from '@/components/CardNextPurchases';
import { currencyFormatter } from '@/lib/utils';
import { Asset, AssetsByType } from '@/lib/types';
import { useAssetsContext } from '@/context/AssetsContext';
import { CardKeyAssets } from '@/components/CardKeyAssets';
// import { currencyRates } from '@/lib/prices';

const currencyRates = {
  quotes: {
    USDCAD: 1.34,
    USDBRL: 4.86,
  },
};

export default function Dashboard() {
  const { assets, assetsByType, isLoading } = useAssetsContext();

  // ------------------------------------------------------------------------
  // const athCoins = await getAllTimeHighData();
  // ------------------------------------------------------------------------

  let btcPrice;
  if (assetsByType.Crypto?.length > 0) {
    btcPrice = Number(
      assetsByType.Crypto.find((item: any) => item.asset === 'BTC')?.price
    );
  }

  return (
    <>
      {assets.length > 0 && assetsByType && (
        <div className='flex flex-col gap-2'>
          {/* -------- Legend --------------------------------------------------------------------------------------- */}
          <div className='flex justify-end items-center'>
            <div className='flex items-center mr-8'>
              <div className='mr-4'>
                <a
                  target='_blank'
                  href='https://ca.finance.yahoo.com/quote/BTC-USD?p=BTC-USD'
                >
                  <span>🪙</span>
                </a>
                {btcPrice && ` BTC/USD: ${currencyFormatter(btcPrice)}`}
              </div>
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
                {/* <div className='w-1/4 bg-slate-600 border-2' /> */}

                {/* <CardKeyAssets /> */}
                <CardNextPurchases />
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
                  assets={assetsByType.Cash}
                  customKey={'cash'}
                />
              </div>
              <Transactions />
              <div className='flex'>
                <Chart />
                <div className='w-1/2 bg-slate-600 border-2' />
              </div>
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
            <div className='w-1/3 bg-slate-600 border-2' />
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
        </div>
      )}
    </>
  );
}
