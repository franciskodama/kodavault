'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { PieChart, X, ArrowRight, Plus, Coins } from 'lucide-react';

import { Asset } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { getLimitedNumberOfAssets, thousandFormatter } from '@/lib/utils';

export default function CashAlert({
  cash,
  totalCash,
  totalNetWorth,
}: {
  cash: NonNullable<Asset>[];
  totalCash: number;
  totalNetWorth: number;
}) {
  const [isVisible, setIsVisible] = useState(true);
  const router = useRouter();
  const firstFiveAssets = getLimitedNumberOfAssets(cash, 6);

  const handleClick = () => {
    router.push('/assets?type=Cash');
  };

  if (!isVisible) return null;

  return (
    <div className='relative group'>
      <div className='absolute inset-0 bg-gradient-to-r from-accent/50 via-accent/100 to-accent/50 rounded-2xl -z-10 border border-slate-100 shadow-sm' />

      <div className='flex flex-col md:flex-row items-stretch md:items-center gap-6 p-5'>
        {/* Priority Section: Header & Total */}
        <div className='flex items-center gap-4 shrink-0'>
          <div className='flex items-center justify-center w-12 h-12'>
            <Coins size={32} strokeWidth={2} />
          </div>
          <div>
            <span className='text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1 block'>
              Opportunity Alert
            </span>
            <h3 className='text-lg font-bold text-slate-900 leading-tight'>
              Cash Available to Invest
            </h3>
          </div>
        </div>

        {/* Divider */}
        <div className='hidden md:block w-px h-10 bg-slate-300' />

        <div className='flex items-center justify-between w-full'>
          {/* Account Breakdown: High-Density Info */}
          <div className='flex gap-8'>
            {firstFiveAssets.map((asset) => (
              <div key={asset?.id} className='flex flex-col min-w-0'>
                <span className='text-[9px] font-semibold text-slate-400 uppercase tracking-widest truncate'>
                  {asset?.wallet}
                </span>
                <span className='text-sm font-bold text-slate-700'>
                  ${asset?.total && thousandFormatter(asset?.total)}
                </span>
              </div>
            ))}
            {cash.length > 6 && (
              <div
                onClick={handleClick}
                className='flex items-center gap-1.5 text-[10px] font-bold text-slate-600 uppercase tracking-widest cursor-pointer hover:text-slate-900 transition-colors'
              >
                <Plus size={12} strokeWidth={3} /> {cash.length - 6} MORE
              </div>
            )}
          </div>

          {/* Summary */}
          <div className='flex items-center gap-6 shrink-0 border-t md:border-t-0 md:border-l border-slate-300 pt-4 md:pt-0 md:px-12'>
            <div className='flex flex-col items-end'>
              <div className='flex items-center gap-2 mb-1'>
                <div className='flex items-center justify-center gap-1 w-[4.5em] bg-slate-400 px-2 py-0.5 rounded-full'>
                  <PieChart size={10} className='text-white' />
                  <span className='text-[10px] font-bold text-white truncate'>
                    {((totalCash / totalNetWorth) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
              <div className='flex flex-col items-end'>
                <span className='text-[9px] font-bold text-slate-400 uppercase tracking-widest'>
                  Total Idle
                </span>
                <span className='text-2xl font-extrabold text-slate-900 tracking-tighter'>
                  ${thousandFormatter(totalCash)}
                </span>
              </div>
            </div>
            {/* CTA */}
            <Button
              onClick={handleClick}
              size='sm'
              className='self-end px-6 rounded-xl text-[10px] uppercase tracking-widest group/btn transition-all'
            >
              <span>Assets</span>
              <ArrowRight
                size={14}
                className='ml-2 group-hover/btn:translate-x-1 transition-transform'
              />
            </Button>
          </div>
        </div>

        {/* Dismiss Button */}
        <button
          onClick={() => setIsVisible(false)}
          className='absolute top-3 right-3 p-1 rounded-full text-slate-300 hover:text-slate-500 hover:bg-slate-100/50 transition-all'
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}
