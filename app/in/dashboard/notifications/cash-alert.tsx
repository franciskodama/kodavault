'use client';

import { useRouter } from 'next/navigation';
import { SirenIcon, PieChartIcon } from 'lucide-react';

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
    router.push('/in/assets?type=Cash');
  };

  return (
    <>
      <Card className='h-[250px]'>
        <div className='flex flex-col justify-between h-full bg-accent border-4 border-white'>
          <div className='flex flex-col'>
            <CardHeader>
              <CardTitle className='capitalize flex items-center justify-between'>
                <span>Cash Available</span>
                <span className='text-3xl'>🚨</span>
              </CardTitle>
              <CardDescription className='text-xs text-slate-800'>
                Time to put your money to work!
              </CardDescription>
            </CardHeader>
            <CardContent className='relative'>
              {firstFiveAssets.map((asset) => {
                return (
                  <div key={asset?.id} className='my-[4px] relative'>
                    <div className='flex w-full'>
                      <div className='flex w-3/5'>
                        <p className='text-[10px]'>Account:</p>
                        <p className='ml-1 font-bold'>{asset?.wallet}</p>
                      </div>
                      <div className='flex w-2/5'>
                        <p className='text-[10px]'>Total:</p>
                        <p className='ml-1 font-bold'>
                          {asset?.total && thousandFormatter(asset?.total)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
              {cash.length > 3 && <p className='absolute bottom-1'>...</p>}
            </CardContent>
          </div>
          <CardFooter className='flex justify-between text-sm font-medium mx-1 px-2 pb-2'>
            <Button size='md' onClick={handleClick}>
              <SirenIcon size={16} className='mr-2' />
              {cash.length > 3 ? (
                <p>See all ({cash.length})</p>
              ) : (
                <p>Go to Assets</p>
              )}
            </Button>
            <div className='flex gap-4 text-[12px] items-end'>
              <div>
                <p>Total:</p>
                <p>
                  {thousandFormatter(
                    cash.reduce((sum: number, item: any) => sum + item.total, 0)
                  )}
                </p>
              </div>
              <div>
                <PieChartIcon size={16} className='mr-2' />
                <p>{`${numberFormatter.format(
                  (totalCash / totalNetWorth) * 100
                )}%`}</p>
              </div>
            </div>
          </CardFooter>
        </div>
      </Card>
    </>
  );
}
