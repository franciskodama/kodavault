import React, { Suspense } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';

import {
  Asset,
  AssetsByType,
  Currencies,
  netWorthChartData,
} from '@/lib/types';
import { currencyFormatter } from '@/lib/utils';
import { CardTotal } from '@/components/CardTotal';
import { CardTotalAllCurrency } from '@/components/CardAllCurrencies';
import { CardCryptosForTrading } from '@/components/CardCryptosForTrading';
import { GoalGaugeCard } from './charts/goal-gauge-card';
import NotificationsPanel from './notifications/notifications-panel';
import Welcome from './welcome';
import { CardNextPurchases } from '@/components/CardNextPurchases';
import { CardAssetsOnTheRise } from '@/components/CardAssetsOnTheRise';
import { CardLongsAndShorts } from '@/components/CardLongsAndShorts';

const NetWorthChart = dynamic(() => import('./charts/net-worth'), {
  loading: () => <div>Loading chart...</div>,
});

export default function Dashboard({
  usdBrl,
  currencyRates,
  assets,
  assetsByType,
  btcPrice,
  netWorthChartData,
  uid,
  userName,
  goal,
}: {
  usdBrl: number;
  currencyRates: Currencies;
  assets: Asset[];
  assetsByType: AssetsByType;
  btcPrice: number;
  netWorthChartData: netWorthChartData[];
  uid: string;
  userName: string;
  goal: number;
}) {
  const cash = assets.filter((asset) => asset?.type === 'Cash');

  return (
    <Suspense fallback={<SkeletonDashboard />}>
      {assets.length && assetsByType ? (
        <div className='flex flex-col gap-2 px-8 sm:p-0'>
          {/* -------- Legend --------------------------------------------------------------------------------------- */}
          <div className='flex flex-col sm:flex-row justify-end items-center'>
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
                {currencyRates.data && ` BRL: ${currencyFormatter(usdBrl)}`}
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
          {/* <div
            id='coincodex-widget-container'
            className='border-2 overflow-visible z-10 h-full w-full'
          >
            <Script
              src='https://widget.coincodex.com/include.js?type=4&ticker=top10&period=1D&textColor=000000&borderColor=dddddd&backgroundColor=ffffff&hoverColor=transparent&currency=USD&range=1D'
              strategy='afterInteractive'
            />
          </div> */}
          {/* -------- 1st Row Cards --------------------------------------------------------------------------------------- */}
          <div className='flex flex-col sm:flex-row gap-2'>
            <div className='flex flex-col sm:basis-4/5 gap-2'>
              <div className='flex flex-wrap gap-2'>
                {/* <CardKeyAssets /> */}
                <div className='sm:w-1/4 w-full'>
                  <CardTotal
                    emoji={'🧺'}
                    description={`Assets' Location Breakdown`}
                    assets={assets}
                    customKey={'wallet'}
                  />
                </div>
                <div className='flex flex-wrap sm:w-2/4 gap-2'>
                  <CardTotal
                    emoji={'💵'}
                    description={`Assets' Origin Breakdown`}
                    assets={assets}
                    customKey={'currency'}
                    height={'h-[250px]'}
                  />
                  <CardTotal
                    emoji={'💰'}
                    description={'Total value grouped by type'}
                    assets={assets}
                    customKey={'type'}
                    height={'h-[250px]'}
                  />
                  <div className='sm:w-1/2 w-full'>
                    <CardTotal
                      emoji={'🤑'}
                      description={'Total value grouped by currency'}
                      assets={assetsByType.Cash}
                      customKey={'cash'}
                      // height={'h-[250px]'}
                    />
                  </div>
                  {/* <GoalGaugeCard assets={assets} goal={goal} uid={uid} /> */}
                </div>
                <NotificationsPanel cash={cash} />
              </div>
              {/* <Transactions /> */}
              <div className='flex'>
                {/* <NetWorthChart netWorthChartData={netWorthChartData} /> */}
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
                <CardTotal
                  emoji={'🏷️'}
                  description={'Total value grouped by tag'}
                  assets={assets}
                  customKey={'tag'}
                />
              </div>
            </div>

            {/* -------- Right Panel  --------------------------------------------------------------------------------------- */}
            <div className='flex flex-col sm:basis-1/5 '>
              <CardTotalAllCurrency
                usdBrl={usdBrl}
                btcPrice={btcPrice}
                currencyRates={currencyRates}
                assets={assets}
                description={'Total Vault in USD, CAD, BRL.'}
              />
              <div className='rounded-sm border shadow-sm mb-2'>
                <Image
                  src='https://alternative.me/crypto/fear-and-greed-index.png'
                  alt='Latest Crypto Fear & Greed Index'
                  width={300}
                  height={300}
                  style={{ width: 'auto', height: 'auto' }}
                  priority
                />
              </div>
              <div className='flex flex-col mb-2 gap-2'>
                <CardNextPurchases />
                <CardAssetsOnTheRise />
                <CardCryptosForTrading assets={assets} />
                <CardLongsAndShorts assets={assets} />
              </div>

              {uid === process.env.NEXT_PUBLIC_HER_UID && (
                <div className='rounded-sm border shadow-sm mb-2'>
                  <div className='flex justify-between pl-4 pr-4 mt-6'>
                    <span className='font-semibold text-xl'>
                      Millionaire of the Year!
                    </span>
                    <span className='text-3xl'>🤑</span>
                  </div>
                  <span className='text-xs ml-4 text-slate-400'>
                    Swimming in Money, Yo!
                  </span>
                  <Image
                    src='/mari.png'
                    alt='Latest Crypto Fear & Greed Index'
                    width={300}
                    height={100}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <>
          <Welcome userName={userName} />
        </>
      )}
    </Suspense>
  );
}

function SkeletonDashboard() {
  return (
    <div className='p-8'>
      <div className='animate-pulse space-y-4'>
        <div className='h-8 bg-gray-300 rounded w-1/2'></div>
        <div className='h-6 bg-gray-300 rounded w-full'></div>
        <div className='h-6 bg-gray-300 rounded w-full'></div>
        <div className='h-6 bg-gray-300 rounded w-full'></div>
      </div>
    </div>
  );
}
