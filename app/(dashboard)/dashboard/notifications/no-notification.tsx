'use client';

import { useRouter } from 'next/navigation';
import { PiggyBank, Bell } from 'lucide-react';

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
    router.push('/retirement');
  };

  return (
    <>
      <Card className='h-[250px] border-none shadow-sm'>
        <div className='flex flex-col h-full'>
          <div className='flex flex-col flex-1'>
            <CardHeader>
              <CardTitle className='capitalize flex items-center justify-between'>
                <span className='font-semibold tracking-tight text-slate-900'>
                  Notification Hub
                </span>
                <Bell size={24} className='text-slate-400' />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className='text-sm font-bold text-slate-700 mb-2'>
                Quiet moment?
              </h3>
              <p className='text-xs text-slate-500 leading-relaxed'>
                Everything looks solid. Why not check how close you are to your
                Retirement Goal?
              </p>
            </CardContent>
          </div>
          <CardFooter className='p-6 pt-0'>
            <Button size='sm' onClick={handleClick} className='w-full'>
              <PiggyBank size={14} className='mr-2' />
              Find your Goal
            </Button>
          </CardFooter>
        </div>
      </Card>
    </>
  );
}
