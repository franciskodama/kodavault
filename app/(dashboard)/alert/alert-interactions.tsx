'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn, colors } from '@/lib/utils';

import { AspectRatio } from '@/components/ui/aspect-ratio';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { toast } from '@/components/ui/use-toast';
import { AlertType } from '@/lib/types';
import { deleteAlert } from '@/lib/actions/alerts';
import { Pencil, Trash2 } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export function AlertInteractions({ alerts }: { alerts: AlertType[] }) {
  console.log('---  🚀 ---> | alerts:', alerts);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleDeleteAlert = async (id: string) => {
    await deleteAlert(id);
    window.location.reload();
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div>
      <div className='flex flex-col gap-4 pb-10 order-1 lg:order-2'>
        {alerts.length === 0 ? (
          <Card className='flex flex-col items-center justify-center py-20'>
            <p className='text-slate-400 font-medium italic'>
              No releases found for the selected period.
            </p>
            {/* {filter === 'high_impact' && (
              <Button
                variant='link'
                onClick={() => setFilter('all')}
                className='mt-2'
              >
                View all releases
              </Button>
            )} */}
          </Card>
        ) : (
          <Card
          // key={date}
          // className={cn(
          //   'overflow-hidden transition-all duration-500 relative bg-white',
          //   today &&
          //     'ring-2 ring-[#22C55E]/20 shadow-xl shadow-green-100/50 border-green-200'
          // )}
          >
            {/* <CardHeader
              className={cn(
                'bg-slate-50 py-2 px-4 border-b flex flex-row items-center justify-between space-y-0',
                today && 'bg-green-50 border-green-100'
              )}
            >
              <CardTitle
                className={cn(
                  'text-[10px] uppercase font-bold flex items-center gap-2 tracking-wider text-slate-500',
                  today && 'text-green-700'
                )}
              >
                {dateWithDayFormatter(date)}
              </CardTitle>
              <div className='flex gap-2 items-center'>
                {today && (
                  <span className='text-[10px] bg-[#22C55E] text-white px-2.5 py-1 rounded-lg font-bold tracking-wider shadow-sm flex items-center gap-1.5 animate-in fade-in zoom-in duration-500'>
                    <Sparkles className='w-2.5 h-2.5 fill-white/20' />
                    TODAY
                  </span>
                )}
                {isThisWeek(date) && !today && (
                  <span className='text-[10px] bg-slate-200 text-slate-500 px-2 py-0.5 rounded-lg font-bold uppercase tracking-tight'>
                    THIS WEEK
                  </span>
                )}
              </div>
            </CardHeader> */}
            <CardContent className='p-0 overflow-x-auto'>
              <div className='min-w-[600px]'>
                <div className='grid grid-cols-[100px_1fr_90px_90px_90px] bg-slate-50/80 border-b text-[10px] uppercase font-bold text-slate-400 tracking-wider'>
                  <div className='px-6 py-3'>Time</div>
                  <div className='px-6 py-3'>Event</div>
                  <div className='px-6 py-3 text-right'>Actual</div>
                  <div className='px-6 py-3 text-right'>Forecast</div>
                  <div className='px-6 py-3 text-right'>Previous</div>
                </div>
                <div className='divide-y divide-slate-100 flex flex-col'>
                  {/* {groupedData[date].map((release, idx) => {
                    return (
                      <div
                        key={`${release.title}-${idx}`}
                        className='grid grid-cols-[100px_1fr_90px_90px_90px] hover:bg-slate-50/50 transition-colors items-center'
                      >
                        <div className='px-6 py-4 text-[11px] font-bold text-slate-400 tracking-tight'>
                          {release.time || 'All Day'}
                        </div>
                        <div className='px-6 py-4 font-bold text-sm text-slate-800'>
                          {release.title}
                        </div>
                        <div
                          className={cn(
                            'px-6 py-4 text-right font-bold text-sm',
                            release.actual && release.forecast
                              ? parseFloat(release.actual) >=
                                parseFloat(release.forecast)
                                ? 'text-green-600'
                                : 'text-red-600'
                              : 'text-slate-600'
                          )}
                        >
                          {release.actual || '-'}
                        </div>
                        <div className='px-6 py-4 text-right text-sm text-slate-500 font-bold'>
                          {release.forecast || '-'}
                        </div>
                        <div className='px-6 py-4 text-right text-sm text-slate-400/80 font-semibold'>
                          {release.previous || '-'}
                        </div>
                      </div>
                    );
                  })} */}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
