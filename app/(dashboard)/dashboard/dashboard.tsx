'use client';

import React, { Suspense } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';

import { Wallet, Landmark, Coins, Tag } from 'lucide-react';
import { CoinCodexWidget } from './coin-codex-widget';

import {
  Asset,
  AssetsByType,
  Currencies,
  KeyAssetsPriced,
  netWorthChartData,
} from '@/lib/types';

import Welcome from './welcome';
import NotificationsPanel from './notifications/notifications-panel';
import { CardTotal } from '@/components/dashboard/CardTotal';
import { CardTotalAllCurrency } from '@/components/dashboard/CardAllCurrencies';
import { CardCryptosForTrading } from '@/components/dashboard/CardCryptosForTrading';
import { CardKeyAssets } from '@/components/dashboard/CardKeyAssets';
import { CardAllocationByCurrency } from '@/components/dashboard/CardAllocationByCurrency';
import { CardAthDrawdown } from '@/components/dashboard/CardAthDrawdown';
import { CardFreedomRunway } from '@/components/dashboard/CardFreedomRunway';
import { CardFredEvents } from '@/components/dashboard/CardFredEvents';
import { CardProgressGoal } from '@/components/dashboard/CardProgressGoal';
import CardTag from '@/components/dashboard/CardTag';
import Transactions from './transactions/transactions';
import { CardLongsAndShorts } from '@/components/dashboard/CardLongsAndShorts';
import { CardBtcDominance } from '@/components/dashboard/CardBtcDominance';

const NetWorthChart = dynamic(() => import('./charts/net-worth'), {
  ssr: false,
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
  keyAssetsPriced,
  allCryptos,
  monthlyBurn,
  globalData,
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
  keyAssetsPriced: KeyAssetsPriced[];
  monthlyBurn: number;
  allCryptos: any;
  globalData: any;
}) {
  const netWorthTotal =
    assets.reduce((sum, item) => sum + (item?.total || 0), 0) || 0;

  return (
    <Suspense fallback={<SkeletonDashboard />}>
      {assets.length && assetsByType ? (
        <div className='flex flex-col'>
          <div className='mb-4'>
            <NotificationsPanel assets={assets} />
          </div>

          {/* Consolidated Balance */}
          <div className='flex flex-col lg:flex-row gap-8 items-start'>
            <div className='flex flex-col lg:basis-3/4 w-full gap-4'>
              <CardTotalAllCurrency
                usdBrl={usdBrl}
                btcPrice={btcPrice}
                currencyRates={currencyRates}
                assets={assets}
                description={'Total consolidated vault across all currencies'}
              />

              {/* Chart */}
              <div className='w-full'>
                <NetWorthChart netWorthChartData={netWorthChartData} />
              </div>

              {/* Primary Success Metrics */}
              <h2 className='mt-4 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 '>
                Success Metrics
              </h2>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                <CardProgressGoal assets={assets} goal={goal} uid={uid} />
                <CardFreedomRunway
                  netWorth={netWorthTotal}
                  monthlyBurn={monthlyBurn}
                  uid={uid}
                />
                <CardAllocationByCurrency assets={assets} />
              </div>

              {/* Strategy & Actions */}
              <h2 className='mt-4 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 '>
                Strategy & Actions
              </h2>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                <CardKeyAssets keyAssetsPriced={keyAssetsPriced} />
                <CardTag />
                <CardCryptosForTrading assets={assets} />
              </div>
            </div>

            {/* RIGHT COLUMN: Daily Market Context */}
            <div className='flex flex-col lg:basis-1/4 gap-8 w-full'>
              {/* Market Sentiment */}
              <div className='bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden p-6'>
                <h3 className='text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-6'>
                  Market Sentiment
                </h3>
                <Image
                  src='https://alternative.me/crypto/fear-and-greed-index.png'
                  alt='Latest Crypto Fear & Greed Index'
                  width={300}
                  height={300}
                  className='w-full h-auto rounded-xl grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105'
                  priority
                />
              </div>

              {/* News */}
              <CardFredEvents />
              <CardBtcDominance globalData={globalData} />
              <CardAthDrawdown
                userAssets={assets}
                allCryptosData={allCryptos}
              />
            </div>
          </div>

          {/* Lettering Row: Market Hub */}
          {/* <div className='mt-4'>
            <CoinCodexWidget />
          </div> */}

          {/* Portfolio Structure Row: Categorized Asset Deep-Dive */}
          <div className='flex flex-col mt-4'>
            <div className='flex items-center gap-4'>
              <h2 className='my-4 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 '>
                Portfolio Structure
              </h2>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
              <CardTotal
                Icon={Landmark}
                description={`Vault Locations`}
                assets={assets}
                customKey={'wallet'}
              />
              <CardTotal
                Icon={Coins}
                description={'Asset Taxonomy'}
                assets={assets}
                customKey={'type'}
              />
              <CardTotal
                Icon={Wallet}
                description={'Liquid Assets'}
                assets={assetsByType.Cash}
                customKey={'cash'}
              />

              <CardTotal
                Icon={Tag}
                description={'Personal Tags'}
                assets={assets}
                customKey={'tag'}
              />
            </div>
          </div>
        </div>
      ) : (
        <Welcome userName={userName} />
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
