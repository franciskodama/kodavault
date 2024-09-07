'use client';

import { useRouter } from 'next/navigation';
import { PiggyBank } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function NoNotifications() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/in/retirement');
  };

  return (
    <>
      <Card className='h-[250px]'>
        <div className='flex flex-col justify-between h-full'>
          <div className='flex flex-col'>
            <CardHeader>
              <CardTitle className='capitalize flex items-center justify-between'>
                <span>Notification Desert</span>
                <span className='text-3xl'>📭</span>
              </CardTitle>
              <CardDescription className='text-xs'>
                Your inbox is blissfully empty.
              </CardDescription>
            </CardHeader>
            <CardContent className='relative'>
              <h3 className='text-sm font-bold my-1'>Quiet inbox?</h3>
              <p className='pr-2'>
                Enjoy seeing how close you are to your Retirement Goal.
              </p>
            </CardContent>
          </div>
          <CardFooter className='flex justify-between text-sm text-slate-500 font-medium mx-1 px-2 pb-3'>
            <Button size='md' onClick={handleClick}>
              <PiggyBank size={16} className='mr-2' />
              Find your Goal
            </Button>
          </CardFooter>
        </div>
      </Card>
    </>
  );
}
