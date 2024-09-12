'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

import { Asset } from '@/lib/types';
import { SendHorizontal, Siren, X } from 'lucide-react';

export default function StocksNoSymbol({
  stocksNoTotal,
  setOpenNotification,
}: {
  stocksNoTotal: Asset[];
  setOpenNotification: (value: boolean) => void;
}) {
  // https://freefrontend.com/css-border-examples/#google_vignette
  // https://codepen.io/natszafraniec/pen/abYQxKV

  //  className='bg-orange-400 p-4 rounded-sm drop-shadow-lg border-none'

  return (
    <div className='relative'>
      <div
      // className=''
      // style={{
      //   content: '',
      //   position: 'absolute',
      //   top: '-1rem',
      //   left: '-1rem',
      //   right: '-1rem',
      //   bottom: '-1rem',
      //   display: 'block',
      //   backgroundColor: '#ffffff',
      //   backgroundImage: `linear-gradient(45deg, transparent 49%, black 50%, transparent 51%)`,
      //   backgroundSize: '5px 5px',
      //   zIndex: -1,
      // }}
      >
        {/* <Alert className='p-4 border border-red-600 rounded-xs'> */}
        <Alert
          className='p-4 border border-red-600 rounded-xs'
          style={{
            borderImage: `repeating-linear-gradient(
        45deg,
        transparent,
        transparent 5px,
        black 6px,
        black 15px,
        transparent 16px,
        transparent 20px
      ) 20 / 1rem`,
            borderStyle: 'solid',
            borderWidth: '1rem',
          }}
        >
          <AlertTitle className='flex justify-between'>
            <div className='flex items-center'>
              <Siren
                className='h-8 w-8 m-4'
                color='primary'
                strokeWidth={1.5}
              />
              <h3 className='text-primary text-base w-[20ch] mr-4'>
                Looks like we’re missing
                <br />
                the prices for these assets:
              </h3>

              {stocksNoTotal?.map((stock) => (
                <p
                  key={stock?.asset}
                  className='text-primary text-base text-center w-[5ch] border rounded-[2px] px-1 m-2'
                >
                  {stock?.asset}
                </p>
              ))}
            </div>
            <Button
              variant={'ghost'}
              onClick={() => setOpenNotification(false)}
            >
              <X className='h-6 w-6' color='primary' strokeWidth={1.5} />
            </Button>
          </AlertTitle>
          <AlertDescription className='text-primary m-2'>
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
                  className='text-orange-400 bg-accent w-[20ch] mb-4'
                >
                  Send him a message
                  <SendHorizontal
                    className='h-6 w-6 ml-2'
                    color='orange'
                    strokeWidth={1.5}
                  />
                </Button>
                <p className='text-primary text-xs w-[35ch]'>
                  As you’re Francis’ friend, do him a favor and send him a quick
                  message to remind him to add this asset to the spreadsheet.
                </p>
              </div>
            </div>
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
