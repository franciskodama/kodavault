'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

import { Asset } from '@/lib/types';
import {
  BellRing,
  Bomb,
  Mail,
  Mailbox,
  MessageCircle,
  SendHorizontal,
  Siren,
  Terminal,
  X,
} from 'lucide-react';
import { useState } from 'react';

export default function StocksNoSymbol({
  stocksNoTotal,
}: {
  stocksNoTotal: Asset[];
}) {
  // https://freefrontend.com/css-border-examples/#google_vignette
  // https://codepen.io/natszafraniec/pen/abYQxKV

  const [open, setOpen] = useState(true);

  return (
    <>
      {open ? (
        <Alert className='bg-orange-400 p-4 rounded-sm drop-shadow-lg border-none'>
          <AlertTitle className='flex justify-between'>
            <div className='flex items-center'>
              <Siren className='h-8 w-8 m-4' color='white' strokeWidth={1.5} />
              <h3 className='text-white text-base w-[20ch] mr-4'>
                Looks like we’re missing
                <br />
                the prices for these assets:
              </h3>

              {stocksNoTotal?.map((stock) => (
                <p
                  key={stock?.asset}
                  className='text-white text-base text-center w-[5ch] border rounded-[2px] px-1 m-2'
                >
                  {stock?.asset}
                </p>
              ))}
            </div>
            <Button variant={'ghost'} onClick={() => setOpen(false)}>
              <X className='h-6 w-6' color='white' strokeWidth={1.5} />
            </Button>
          </AlertTitle>
          <AlertDescription className='text-white m-2'>
            <div className='flex justify-between mt-4'>
              <div className=''>
                <p className='font-bold text-lg mb-1'>Why?</p>
                <div className='flex'>
                  <p className='text-xs w-[30ch]'>
                    Well, Francis is still pinching pennies and hasn’t paid for
                    that fancy API to fetch the stock prices automatically! 😅
                  </p>
                  <p className='text-xs w-[30ch] ml-8'>
                    But don’t worry, once he manually updates the price in his
                    trusty spreadsheet, you’ll see it here.
                  </p>
                </div>
              </div>

              <div className='flex flex-col'>
                <Button
                  // as='a'
                  // href={`mailto:${process.env.NEXT_PUBLIC_MY_UID}`}
                  size={'sm'}
                  className='text-orange-400 bg-white w-[20ch] mb-4'
                >
                  Send him a message
                  <SendHorizontal
                    className='h-6 w-6 ml-2'
                    color='orange'
                    strokeWidth={1.5}
                  />
                </Button>
                <p className='text-white text-xs w-[35ch]'>
                  As you’re Francis’ friend, do him a favor and send him a quick
                  message to remind him to add this asset to the spreadsheet.
                </p>
              </div>
            </div>
          </AlertDescription>
        </Alert>
      ) : (
        <div className='flex justify-between pl-9'>
          <div></div>
          {/* <div className='flex items-center w-[23ch] bg-orange-400 p-2 rounded-sm border-none'>
            <Button variant={'ghost'} size={'sm'} onClick={() => setOpen(true)}>
              <BellRing className='h-4 w-4' color='white' strokeWidth={1.5} />
              <p className='text-xs text-white ml-2'>Open notification</p>
            </Button>
          </div> */}
          <Button variant={'ghost'} onClick={() => setOpen(true)}>
            <BellRing className='h-4 w-4' color='black' strokeWidth={1.5} />
            <p className='text-xs text-primary ml-2'>Open notification</p>
          </Button>
        </div>
      )}
    </>
  );
}
