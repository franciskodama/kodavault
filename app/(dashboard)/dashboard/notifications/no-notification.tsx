'use client';

import { useRouter } from 'next/navigation';
import { PiggyBank, Bell, CheckCircle2 } from 'lucide-react';

import { Button } from '@/components/ui/button';

export default function NoNotifications() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/retirement');
  };

  return (
    <div className='relative group'>
      <div className='absolute inset-0 bg-slate-50/50 rounded-2xl -z-10 border border-slate-100' />
      <div className='flex flex-col md:flex-row items-center justify-between gap-4 p-4'>
        <div className='flex items-center gap-4'>
          <div className='flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 text-slate-400'>
            <Bell size={20} />
          </div>
          <div>
            <div className='flex items-center gap-2'>
              <h3 className='text-sm font-bold text-slate-700'>
                Notification Hub
              </h3>
              <CheckCircle2 size={14} className='text-emerald-500' />
            </div>
            <p className='text-xs text-slate-500'>
              Everything looks solid. You have no urgent alerts at the moment.
            </p>
          </div>
        </div>

        <Button
          variant='ghost'
          size='sm'
          onClick={handleClick}
          className='text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-900 border border-slate-100'
        >
          <PiggyBank size={14} className='mr-2' />
          Check Retirement Goal
        </Button>
      </div>
    </div>
  );
}
