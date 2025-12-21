'use client';

import { useRouter } from 'next/navigation';
import { SirenIcon } from 'lucide-react';

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
import { getFirstThreeAssets, thousandFormatter } from '@/lib/utils';

export default function CashAlert({ cash }: { cash: Asset[] }) {
  const router = useRouter();
  const firstThreeAssets = getFirstThreeAssets(cash);

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
              <CardDescription className='text-xs'>
                Time to put your money to work!
              </CardDescription>
            </CardHeader>
            <CardContent className='relative'>
              {firstThreeAssets.map((asset) => {
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
          <CardFooter className='flex justify-between text-sm text-slate-500 font-medium mx-1 px-2 pb-3'>
            <Button size='md' onClick={handleClick}>
              <SirenIcon size={16} className='mr-2' />
              {cash.length > 3 ? (
                <p>See all ({cash.length})</p>
              ) : (
                <p>Go to Assets</p>
              )}
            </Button>
          </CardFooter>
        </div>
      </Card>
    </>
  );
}
