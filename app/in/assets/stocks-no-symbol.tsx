'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

import { Asset } from '@/lib/types';
import { Bomb, MessageCircle, X } from 'lucide-react';

export default function StocksNoSymbol({
  stocksNoTotal,
  setOpenNotification,
}: {
  stocksNoTotal: Asset[];
  setOpenNotification: (value: boolean) => void;
}) {
  return (
    <div className='relative'>
      <Alert
        style={{
          borderImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 5px,
              black 6px,
              black 6px,
              transparent 6px,
              transparent 6px
            ) 20 / 1rem`,
          borderStyle: 'solid',
          borderWidth: '1em',
        }}
      >
        {/* <AlertTitle className='flex justify-between'>
          <div className='flex items-center ml-2'>
            <Siren className='h-8 w-8' color='black' strokeWidth={1.5} />
            <h3 className='text-primary text-base ml-4'>Hi, Francis!</h3>
          </div>
        </AlertTitle> */}
        <AlertDescription className='flex items-start justify-between p-4'>
          <div className='flex flex-col'>
            <div className='flex items-center mb-2'>
              <Bomb size={24} color='black' strokeWidth={1.8} />
              <p className='font-bold text-lg ml-2'>Ops...</p>
            </div>
            <h3 className='text-primary text-xs w-[26ch]'>
              Looks like we’re missing
              <br />
              the price{stocksNoTotal?.length > 1 ? 's' : null} for{' '}
              {stocksNoTotal?.length > 1 ? 'these' : 'this'} asset
              {stocksNoTotal?.length > 1 ? 's' : null}:
            </h3>
            <div className='flex flex-wrap mt-4 w-[16em]'>
              {stocksNoTotal?.map((stock) => (
                <p
                  key={stock?.asset}
                  className='text-primary text-base text-center w-[5ch] border border-primary rounded-[2px] px-1 mr-2'
                >
                  {stock?.asset}
                </p>
              ))}
            </div>
          </div>

          <div className='flex justify-between'>
            <div className=''>
              <p className='font-bold text-lg mb-2'>Why?</p>
              <div className='flex'>
                <p className='text-xs w-[30ch]'>
                  Well, Francis is still pinching pennies and hasn’t paid for
                  that fancy API to fetch the stock prices automatically!
                </p>
                <p className='text-xs w-[30ch] ml-2'>
                  But don’t worry, once he manually updates the price in his
                  trusty spreadsheet, you’ll see it here.
                </p>
              </div>
            </div>
          </div>

          <div className='flex flex-col'>
            <p className='text-primary text-xs w-[35ch] mb-4'>
              As you’re Francis’ friend, do him a favor and send him a quick
              message to remind him to add this asset to the spreadsheet.
            </p>

            <Button
              // as='a'
              // href={`mailto:${process.env.NEXT_PUBLIC_MY_UID}`}
              variant={'outline'}
              className='flex items-center w-[24ch] border-2 border-primary capitalize'
            >
              Send him a message
              <MessageCircle className='ml-2' size={24} strokeWidth={1.8} />
            </Button>
          </div>

          <button onClick={() => setOpenNotification(false)}>
            <X size={24} color='black' strokeWidth={1.8} />
          </button>
        </AlertDescription>
      </Alert>
    </div>
  );
}
