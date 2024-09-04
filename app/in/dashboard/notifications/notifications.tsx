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

export default function Notifications() {
  return (
    <>
      <div className='flex flex-col gap-2 flex-1'>
        <Card className='h-[240px]'>
          <div className='flex flex-col justify-between h-full'>
            <div className='flex flex-col'>
              <CardHeader>
                <CardTitle className='capitalize flex items-center justify-between'>
                  <span>{`Alert`}</span>
                  <span className='text-3xl'>🚨</span>
                </CardTitle>
                <CardDescription className='text-xs'>
                  Check this out!
                </CardDescription>
              </CardHeader>
              <CardContent className='relative'>
                <p className='my-1 h-[3ch] text-ellipsis'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                  elementum, diam id scelerisque volutpat, magna augue iaculis
                  felis.
                </p>
                {/* <Image
                  src='/goat.gif'
                  width={100}
                  height={100}
                  alt='Logo Koda Vault'
                  className='absolute bottom-0 right-10 rounded-md object-cover opacity-20'
                /> */}
              </CardContent>
            </div>
            <CardFooter className='flex justify-between text-sm text-slate-500 font-medium m-1 p-2'>
              <Button>
                <SirenIcon size={16} className='mr-2' />
                Check now
              </Button>
            </CardFooter>
          </div>
        </Card>

        <Card className='h-[240px]'>
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
                {/* <Image
                  src='/mari.png'
                  width={200}
                  height={200}
                  alt='Mari in the middle of a buch of money'
                  className='absolute bottom-0 right-10 rounded-md object-cover opacity-[50%]'
                /> */}
              </CardContent>
            </div>
            <CardFooter className='flex justify-between text-sm text-slate-500 font-medium m-1 p-2'>
              <Button>
                <RocketIcon size={16} className='mr-2' />
                Check now
              </Button>
            </CardFooter>
          </div>
        </Card>
      </div>
    </>
  );
}
