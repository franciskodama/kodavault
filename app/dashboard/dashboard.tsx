'use client';

import { CardTotal } from '@/components/CardTotal';
import { changeKeyForTitle, currencyFormatter } from '@/lib/utils';
import Transactions from './transactions/transactions';
import Chart from './chart/chart';
import { CardTotalAllCurrency } from '@/components/CardAllCurrencies';
import Notifications from './notifications/notifications';
import { CardAth } from '@/components/CardAth';
import { groupAssetsByType } from '@/lib/assets';
import { currencyRates } from '@/lib/prices';
import { CardNextPurchases } from '@/components/CardNextPurchases';
import { Asset } from '@/lib/types';
import { useContext } from 'react';
import { AssetsContext } from '@/context/AssetsContext';

export default function Dashboard({ assets }: { assets: Asset[] }) {
  const { setAssets } = useContext(AssetsContext);
  setAssets(assets);

  const assetsByType = groupAssetsByType(assets);
  const cryptoAssets = changeKeyForTitle(assetsByType.Crypto, 'crypto');
  const stocksAssets = changeKeyForTitle(assetsByType.Stock, 'stock');
  const cashAssets = changeKeyForTitle(assetsByType.Cash, 'cash');

  return (
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
  );
}
