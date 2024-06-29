'use client';

import { CardTotal } from '@/components/CardTotal';
import Transactions from './transactions/transactions';
import Chart from './chart/chart';
import { CardTotalAllCurrency } from '@/components/CardAllCurrencies';
import Notifications from './notifications/notifications';
import { CardNextPurchases } from '@/components/CardNextPurchases';
import { currencyFormatter } from '@/lib/utils';
import { Asset, AssetsByType, CurrencyData } from '@/lib/types';
import { useAssetsContext } from '@/context/AssetsContext';
import { CardKeyAssets } from '@/components/CardKeyAssets';
import { use } from 'react';
import { CardAssetsOnTheRise } from '@/components/CardAssetsOnTheRise';

export default function Dashboard({
  currencyRates,
}: {
  currencyRates: CurrencyData;
}) {
  const { assets, assetsByType, isLoading } = useAssetsContext();

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

                {currencyRates.data &&
                  ` CAD: ${currencyFormatter(currencyRates.data.CAD)}`}
              </div>
              <div className='ml-4'>
                <a
                  target='_blank'
                  href='https://ca.finance.yahoo.com/quote/USDBRL=X/'
                >
                  <span>🇧🇷</span>
                </a>
                {currencyRates.data &&
                  ` BRL: ${currencyFormatter(currencyRates.data.BRL)}`}
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
                {/* <CardKeyAssets /> */}
                <CardTotal
                  emoji={'🧺'}
                  description={`Assets' Location Breakdown`}
                  assets={assets}
                  customKey={'wallet'}
                />
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
              {/* <Transactions /> */}
              <div className='flex'>
                <Chart />
              </div>
            </div>

            {/* -------- Right Panel  --------------------------------------------------------------------------------------- */}
            <div className='flex flex-col basis-1/5'>
              <CardTotalAllCurrency
                currencyRates={currencyRates}
                assets={assets}
                description={'Total Vault in USD, CAD, BRL.'}
              />

              <div className='mb-2'>
                {/* <CardNextPurchases /> */}
                <CardAssetsOnTheRise />
              </div>

              <Notifications />
            </div>
          </div>

          {/* -------- 1st Row - After Chart --------------------------------------------------------------------------------------- */}
          <div className='flex flex-wrap gap-2'>
            {/* <div className='w-1/3 bg-slate-600 border-2' /> */}
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
