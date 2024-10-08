'use client';

import { useUser } from '@clerk/nextjs';
import { Bomb, MessageCircle, X } from 'lucide-react';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Asset } from '@/lib/types';

export default function StocksNoSymbol({
  stocksNoTotal,
  setOpenNotification,
}: {
  stocksNoTotal: Asset[];
  setOpenNotification: (value: boolean) => void;
}) {
  const firstName = useUser().user?.firstName;
  const symbols = stocksNoTotal.map((stock: Asset) => stock?.asset);

  const handleClickMessageButton = () => {
    const email = process.env.NEXT_PUBLIC_MY_UID;

    if (!email) {
      console.error('Email environment variable not set');
      return;
    }

    const subject = encodeURIComponent(
      '[KODAVAULT] Francis, a Friendly Reminder: Time to Update Your Assets List!'
    );
    const body = encodeURIComponent(`
      Hey Francis, 👋
      
      Looks like these assets are missing their prices in the app:
      ${symbols.map((symbol) => `- ${symbol}`).join('\n')}
      
      Could you please add them to your trusty spreadsheet when you get a moment? 🙏🏻
      Your users (like me!) thank you! 🙌
      
      Cheers! 🍻
      ${firstName}
      `);

    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`,
      '_blank'
    );
  };

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
        <AlertDescription className='relative flex flex-wrap items-start justify-between p-4'>
          <div className='flex flex-col'>
            <div className='flex items-center mb-2'>
              <Bomb size={24} color='black' strokeWidth={1.8} />
              <p className='font-bold text-lg ml-2'>Ops...</p>
            </div>
            <h3 className='text-primary text-xs w-[26ch]'>
              Looks like we’re missing
              <br />
              the price{stocksNoTotal?.length > 1 ? 's' : null} for{' '}
              {stocksNoTotal?.length > 1 ? 'these' : 'this'} Asset
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

          <div className='flex flex-wrap justify-between'>
            <div>
              <p className='font-bold text-lg mb-2'>Why?</p>
              <p className='text-xs w-[30ch]'>
                Well, Francis is still pinching pennies and hasn’t paid for that
                fancy API to fetch the stock prices automatically!
              </p>
            </div>
            <div>
              <p className='font-bold text-lg mb-2 text-transparent'>X</p>
              <p className='text-xs w-[30ch] ml-2'>
                But don’t worry, once he manually updates the price in his
                trusty spreadsheet, you’ll see it here.
              </p>
            </div>
          </div>

          <div className='flex flex-col mr-20'>
            <p className='text-primary text-xs w-[35ch] mb-4'>
              As his friend, give him a quick nudge to add
              {stocksNoTotal?.length > 1 ? ' these' : ' this'} Asset
              {stocksNoTotal?.length > 1 ? 's' : null} to the spreadsheet.
              <br />
              {`Help Francis Out. :)`}
            </p>
            <Button
              variant={'outline'}
              className='flex items-center border-2 border-primary capitalize'
              onClick={handleClickMessageButton}
            >
              Inform Francis now!
              <MessageCircle className='ml-2' size={24} strokeWidth={1.8} />
            </Button>
          </div>
          <button
            className='absolute top-2 right-2 p-2'
            onClick={() => setOpenNotification(false)}
          >
            <X size={24} color='black' strokeWidth={1.8} />
          </button>
        </AlertDescription>
      </Alert>
    </div>
  );
}
