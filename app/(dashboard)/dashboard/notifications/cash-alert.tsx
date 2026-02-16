'use client';

import { useRouter } from 'next/navigation';
import { AlarmClock, PieChart, Wallet, SirenIcon } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Asset } from '@/lib/types';
import { Button } from '@/components/ui/button';
import {
  getLimitedNumberOfAssets,
  numberFormatter,
  thousandFormatter,
} from '@/lib/utils';

export default function CashAlert({
  cash,
  totalCash,
  totalNetWorth,
}: {
  cash: Asset[];
  totalCash: number;
  totalNetWorth: number;
}) {
  const router = useRouter();
  const firstFiveAssets = getLimitedNumberOfAssets(cash, 5);

  const handleClick = () => {
    router.push('/assets?type=Cash');
  };

  return (
    <>
      <Card className='h-[250px] border-none shadow-sm overflow-hidden'>
        <div className='flex flex-col justify-between h-full'>
          <div className='flex flex-col'>
            <CardHeader>
              <CardTitle className='capitalize flex items-center justify-between'>
                <span className='font-semibold tracking-tight text-slate-900'>
                  Cash Available
                </span>
                <AlarmClock size={24} className='text-slate-400' />
              </CardTitle>
            </CardHeader>
            <CardContent className='relative'>
              <div className='flex flex-col gap-2'>
                {firstFiveAssets.map((asset) => (
                  <div
                    key={asset?.id}
                    className='flex items-center justify-between group'
                  >
                    <div className='flex items-center gap-2'>
                      <span className='text-[10px] font-bold text-slate-400 uppercase tracking-widest'>
                        Account
                      </span>
                      <p className='text-xs font-bold text-slate-600 group-hover:text-slate-900 transition-colors'>
                        {asset?.wallet}
                      </p>
                    </div>
                    <div className='flex items-center gap-2'>
                      <span className='text-[10px] font-bold text-slate-400 uppercase tracking-widest'>
                        Total
                      </span>
                      <p className='text-sm font-semibold text-slate-900 tracking-tight'>
                        {asset?.total && thousandFormatter(asset?.total)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              {cash.length > 5 && (
                <p className='text-[10px] text-slate-400 mt-2 italic'>
                  + {cash.length - 5} more accounts
                </p>
              )}
            </CardContent>
          </div>
          <CardFooter className='flex justify-between items-center p-6 pt-0 border-t border-slate-50 mt-auto bg-slate-50/30'>
            <Button
              size='sm'
              onClick={handleClick}
              variant='secondary'
              className='h-8 text-[10px] font-semibold uppercase tracking-widest'
            >
              <Wallet size={14} className='mr-2' />
              {cash.length > 5 ? (
                <span>See all ({cash.length})</span>
              ) : (
                <span>Go to Assets</span>
              )}
            </Button>
            {cash.length > 0 && (
              <div className='flex flex-col items-end gap-0'>
                <div className='flex items-center gap-2'>
                  <span className='text-[10px] font-bold text-slate-400 uppercase tracking-widest'>
                    Portfolio Share
                  </span>
                  <div className='flex items-center gap-1 bg-rose-50 px-2 py-0.5 rounded-full'>
                    <PieChart size={10} className='text-rose-600' />
                    <span className='text-[10px] font-semibold text-rose-600'>{`${numberFormatter.format(
                      (totalCash / totalNetWorth) * 100
                    )}%`}</span>
                  </div>
                </div>
                <div className='flex items-center gap-2 mt-1'>
                  <span className='text-[10px] font-semibold text-slate-400 uppercase tracking-widest'>
                    Total
                  </span>
                  <span className='text-lg font-semibold text-slate-900 tracking-tighter'>
                    {thousandFormatter(
                      cash.reduce(
                        (sum: number, item: any) => sum + item.total,
                        0
                      )
                    )}
                  </span>
                </div>
              </div>
            )}
          </CardFooter>
        </div>
      </Card>
    </>
  );
}
