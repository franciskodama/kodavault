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
import CashAlert from './cash-alert';
import NoNotifications from './no-notification';
import TagAlert from './tag-alert';

export default function NotificationsPanel({ cash }: { cash: Asset[] }) {
  return (
    <>
      <div className='flex flex-col gap-2 flex-1'>
        {cash.length > 0 && <CashAlert cash={cash} />}
        {cash.length < 1 && <NoNotifications />}

        <TagAlert />

        {/* <Card className='h-[240px]'>
          <div className='flex flex-col justify-between h-full'>
            <div className='flex flex-col'>
              <CardHeader>
                <CardTitle className='capitalize flex items-center justify-between'>
                  <span>{`Almost there!`}</span>
                  <span className='text-3xl'>🤑</span>
                </CardTitle>
                <CardDescription className='text-xs'>
                  {`I'm proud of you!`}
                </CardDescription>
              </CardHeader>
              <CardContent className='relative'>
                <p className='my-1 h-[3ch]'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                  elementum, diam id scelerisque volutpat, magna augue iaculis
                  felis.
                </p>
          
              </CardContent>
            </div>
            <CardFooter className='flex justify-between text-sm text-slate-500 font-medium m-1 p-2'>
              <Button>
                <RocketIcon size={16} className='mr-2' />
                Check now
              </Button>
            </CardFooter>
          </div>
        </Card> */}
      </div>
    </>
  );
}

{
  /* <Image
                  src='/mari.png'
                  width={200}
                  height={200}
                  alt='Mari in the middle of a buch of money'
                  className='absolute bottom-0 right-10 rounded-md object-cover opacity-[50%]'
                /> */
}
