import { RocketIcon, SirenIcon } from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Asset } from '@/lib/types';

export default function CashAlert({ cash }: { cash: Asset[] }) {
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
                  <div key={asset?.id} className='my-1 h-[3ch]'>
                    <p>
                      Account:
                      <span className='ml-1 font-bold'>{asset?.wallet}</span>
                      {` | Total: `}
                      <span className='font-bold'>{asset?.total}</span>
                    </p>
                  </div>
                );
              })}
            </CardContent>
          </div>
          <CardFooter className='flex justify-between text-sm text-slate-500 font-medium mx-1 px-2'>
            <Button>
              <SirenIcon size={16} className='mr-2' />
              Go to Assets
            </Button>
          </CardFooter>
        </div>
      </Card>
    </>
  );
}
