'use client';

import { CardTotal } from '@/components/CardTotal';
import { CardTotalAllCurrency } from '@/components/CardAllCurrencies';
import Notifications from './notifications/notifications';
import { currencyFormatter } from '@/lib/utils';
import {
  Asset,
  AssetsByType,
  netWorthChartData,
  CurrencyData,
} from '@/lib/types';
import NetWorthEvolutionChart from './charts/net-worth-evolution';
import { CardCryptosForTrading } from '@/components/CardCryptosForTrading';
import Image from 'next/image';
import Script from 'next/script';

export default function Dashboard({
  currencyRates,
  assets,
  assetsByType,
  btcPrice,
  netWorthChartData,
  uid,
}: {
  currencyRates: CurrencyData;
  assets: Asset[];
  assetsByType: AssetsByType;
  btcPrice: number;
  netWorthChartData: netWorthChartData[];
  uid: string;
}) {
  return (
    <>
      {assets.length && assetsByType && (
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
          {/* <div className='h-[5em] border-2'>
            <Script
              src='https://widget.coincodex.com/include.js?type=4&ticker=top10&period=1D&textColor=000000&borderColor=dddddd&backgroundColor=ffffff&hoverColor=transparent&currency=USD&range=1D'
              strategy='lazyOnload'
            />
          </div> */}
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
                <NetWorthEvolutionChart netWorthChartData={netWorthChartData} />
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

            {/* -------- Right Panel  --------------------------------------------------------------------------------------- */}
            <div className='flex flex-col basis-1/5'>
              <CardTotalAllCurrency
                currencyRates={currencyRates}
                assets={assets}
                description={'Total Vault in USD, CAD, BRL.'}
              />

              <div className='mb-2'>
                {/* <CardNextPurchases /> */}
                {/* <CardAssetsOnTheRise /> */}
                <CardCryptosForTrading assets={assets} />
              </div>

              <div className='rounded-sm border shadow-sm mb-2'>
                <Image
                  src='https://alternative.me/crypto/fear-and-greed-index.png'
                  alt='Latest Crypto Fear & Greed Index'
                  width={300}
                  height={300}
                />
              </div>

              <div className='h-[5em] border-2 border-red-500'>
                <Script
                  strategy='lazyOnload'
                  // strategy='afterInteractive'
                  src='https://widget.coincodex.com/include.js?type=1&ticker=bitfinex-bitcoin-dominance-perps&history_days=30&chartLineColor=1f79e1&chartFillColor=e8f1fc&textColor1=1e2e42&textColor2=617283&linkColor=4a90e2&borderColor=dddddd&backgroundColor=ffffff'
                />

                {/* https://coinmarketcap.com/widget/price-marquee/ */}
                <Script
                  strategy='lazyOnload'
                  type='text/javascript'
                  src='https://files.coinmarketcap.com/static/widget/coinMarquee.js'
                ></Script>
                <div
                  id='coinmarketcap-widget-marquee'
                  // coins='1,1027,825'
                  // currency='USD'
                  // theme='light'
                  // transparent='true'
                  // show-symbol-logo='true'
                ></div>

                <Script src='https://widgets.coingecko.com/gecko-coin-price-marquee-widget.js'></Script>
                {/* <gecko-coin-price-marquee-widget
                locale='en'
                outlined='true'
                coin-ids=''
                initial-currency='usd'
                ></gecko-coin-price-marquee-widget> */}
              </div>
              {uid === 'marianazorzo@gmail.com' && (
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

              <Notifications />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
