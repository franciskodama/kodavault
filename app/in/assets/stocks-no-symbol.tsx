import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

import { Asset } from '@/lib/types';
import { Bomb, Siren, Terminal } from 'lucide-react';

export default function StocksNoSymbol({
  stocksNoTotal,
}: {
  stocksNoTotal: Asset[];
}) {
  return (
    <div>
      <Alert className='bg-orange-400'>
        <AlertTitle className=' flex items-center'>
          <Siren className='h-8 w-8 m-4' color='white' strokeWidth={1.5} />
          <h3 className='text-white text-base w-[20ch]'>
            Looks like we’re missing the prices for these assets:
          </h3>

          {stocksNoTotal.map((stock) => (
            <p key={stock?.asset} className='text-white text-base w-[20ch]'>
              {stock?.asset}
            </p>
          ))}

          <p></p>
        </AlertTitle>
        <AlertDescription className='text-white'>
          <p>
            <span className='font-bold mr-1'>Why?</span>
            Well, Francis is still pinching pennies and hasn’t paid for that
            fancy API to fetch prices automatically! 😅
            <br /> But don’t worry, once he manually updates the price in his
            trusty spreadsheet, you’ll see it here.w
          </p>

          <p className='border p-2 m-4'>
            As you’re Francis’ friend, do him a favor and send him a quick
            message to remind him to add this asset to the spreadsheet. 😉”
          </p>
        </AlertDescription>
      </Alert>
    </div>
  );
}
