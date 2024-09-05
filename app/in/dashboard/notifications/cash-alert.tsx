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
import { thousandFormatter } from '@/lib/utils';

export default function CashAlert({ cash }: { cash: Asset[] }) {
  const router = useRouter();

  const handleClick = () => {
    router.push('/in/assets');
  };

  return (
    <>
      <Card className='h-[240px]'>
        <div className='flex flex-col justify-between h-full'>
          <div className='flex flex-col'>
            <CardHeader>
              <CardTitle className='capitalize flex items-center justify-between'>
                <span>{`Cash Available`}</span>
                <span className='text-3xl'>🚨</span>
              </CardTitle>
              <CardDescription className='text-xs'>
                Time to put your money to work!
              </CardDescription>
            </CardHeader>
            <CardContent className='relative'>
              {cash.map((asset) => {
                return (
                  <div key={asset?.id} className='my-1'>
                    <div className='flex w-full'>
                      <div className='flex w-1/2'>
                        <p className='text-[10px]'>Account:</p>
                        <p className='ml-1 font-bold'>{asset?.wallet}</p>
                      </div>
                      <div className='flex w-1/2'>
                        <p className='text-[10px]'>Total:</p>
                        <p className='ml-1 font-bold'>
                          {asset?.total && thousandFormatter(asset?.total)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </div>
          <CardFooter className='flex justify-between text-sm text-slate-500 font-medium mx-1 px-2'>
            <Button size='mds' onClick={handleClick} className='mb-0'>
              <SirenIcon size={16} className='mr-2' />
              Go to Assets
            </Button>
          </CardFooter>
        </div>
      </Card>
    </>
  );
}
