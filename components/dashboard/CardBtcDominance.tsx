/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Bitcoin } from 'lucide-react';

export function CardBtcDominance({ globalData }: { globalData: any }) {
  // Extract BTC Dominance from CoinMarketCap global data
  const btcDominance = globalData?.data?.btc_dominance || 0;

  return (
    <div className='bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden p-6'>
      <div className='flex justify-between items-start mb-6'>
        <div>
          <h3 className='text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-1'>
            BTC Dominance
          </h3>
          <p className='text-xs text-slate-500 font-medium'>Market Cap Share</p>
        </div>
        <div className='flex items-center gap-2'>
          <a
            href='https://www.tradingview.com/chart/?symbol=CRYPTOCAP:BTC.D'
            target='_blank'
            rel='noreferrer'
            title='Open BTC Dominance chart on TradingView'
            className='p-2 bg-slate-50 hover:bg-slate-100 border border-slate-100 rounded-xl transition-all duration-200 opacity-70 hover:opacity-100'
          >
            <img
              src='https://www.tradingview.com/favicon.ico'
              alt='TradingView'
              className='w-5 h-5 rounded-full'
            />
          </a>
          <div className='p-2 bg-orange-50 rounded-xl'>
            <Bitcoin size={20} className='text-orange-500' />
          </div>
        </div>
      </div>

      <div className='flex flex-col mb-6'>
        <div className='flex items-baseline gap-2'>
          <span className='text-4xl font-bold text-slate-900 tracking-tighter'>
            {btcDominance.toFixed(2)}
          </span>
          <span className='text-lg font-semibold text-slate-400'>%</span>
        </div>
      </div>

      {/* Visual representation since historical chart data isn't available in the free API */}
      <div className='w-full'>
        <div className='flex justify-between text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2'>
          <span>BTC</span>
          <span>Altcoins</span>
        </div>
        <div className='h-3 w-full bg-slate-100 rounded-full overflow-hidden flex'>
          <div
            className='h-full bg-orange-400 rounded-full'
            style={{ width: `${btcDominance}%` }}
          />
        </div>
        <div className='flex justify-between mt-2 text-xs font-semibold text-slate-500'>
          <span className='text-orange-500'>{btcDominance.toFixed(1)}%</span>
          <span>{(100 - btcDominance).toFixed(1)}%</span>
        </div>
      </div>
    </div>
  );
}
