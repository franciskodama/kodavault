'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

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
import { toast } from '@/components/ui/use-toast';
import { SentimentType } from '@/lib/types';
import { deleteSentiment } from '@/lib/actions';
import {
  Trash2,
  ExternalLink,
  BarChart3,
  TrendingUp,
} from 'lucide-react';

export function SentimentInteractions({
  sentiments,
}: {
  sentiments: SentimentType[];
}) {
  const handleDeleteSentiment = async (id: string) => {
    await deleteSentiment(id);
    window.location.reload();
  };

  return (
    <div className='w-full mt-12 px-4 sm:px-0 pb-20'>
      <div className='bg-white/40 backdrop-blur-md border border-slate-100 rounded-2xl shadow-sm overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full text-left border-collapse'>
            <thead>
              <tr className='border-b border-slate-100 bg-slate-50/50'>
                <th className='p-5 text-[10px] uppercase font-bold tracking-[0.2em] text-slate-400'>Coin</th>
                <th className='p-5 text-[10px] uppercase font-bold tracking-[0.2em] text-slate-400'>Exchange</th>
                <th className='p-5 text-[10px] uppercase font-bold tracking-[0.2em] text-slate-400'>Indicator Link</th>
                <th className='p-5 text-[10px] uppercase font-bold tracking-[0.2em] text-slate-400 text-right'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sentiments.map((sentiment, index) => (
                <motion.tr
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  key={sentiment.id}
                  className='group border-b border-slate-50 hover:bg-white/60 transition-colors'
                >
                  <td className='p-5'>
                    <div className='flex items-center gap-3'>
                      <div className='relative w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 border border-slate-100 shadow-sm group-hover:scale-110 transition-transform overflow-hidden'>
                        {sentiment.image ? (
                          <Image
                            src={sentiment.image}
                            alt={sentiment.asset}
                            fill
                            className='object-contain p-1.5'
                          />
                        ) : (
                          <BarChart3 size={18} className='text-indigo-600' />
                        )}
                      </div>
                      <span className='font-bold text-slate-900'>{sentiment.asset}</span>
                    </div>
                  </td>
                  <td className='p-5'>
                    <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600'>
                      {sentiment.exchange}
                    </span>
                  </td>
                  <td className='p-5'>
                    <Link
                      href={sentiment.url}
                      target='_blank'
                      className='inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors group/link'
                    >
                      <span className='truncate max-w-[300px]'>{sentiment.url}</span>
                      <ExternalLink size={14} className='shrink-0 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform' />
                    </Link>
                  </td>
                  <td className='p-5 text-right'>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button className='p-2 hover:bg-red-50 rounded-xl text-slate-400 hover:text-red-500 transition-all duration-200'>
                          <Trash2 size={16} />
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className='rounded-2xl border border-slate-100 shadow-2xl max-w-[400px] p-8'>
                        <AlertDialogHeader>
                          <div className='flex flex-col items-center justify-center mb-6'>
                            <p className='text-[10px] font-bold uppercase tracking-[0.4em] text-slate-400 leading-none mb-3'>
                              Action Required
                            </p>
                            <AlertDialogTitle className='text-xl font-bold text-slate-900 tracking-tight leading-none'>
                              Remove Sentiment?
                            </AlertDialogTitle>
                            <div className='w-8 h-1 bg-red-500 rounded-full mt-4' />
                          </div>

                          <div className='w-48 h-48 mx-auto mb-6'>
                            <AspectRatio ratio={1 / 1}>
                              <Image
                                src='/are-you-sure-michael.gif'
                                alt='Michael Scott'
                                fill
                                className='object-cover rounded-full border-2 border-slate-100 shadow-sm'
                              />
                            </AspectRatio>
                          </div>

                          <AlertDialogDescription className='text-sm text-center text-slate-500 font-medium mb-6 py-6'>
                            You are about to remove this sentiment
                            <br />
                            indicator for {sentiment.asset}.
                          </AlertDialogDescription>
                        </AlertDialogHeader>

                        <AlertDialogFooter className='flex gap-3 sm:justify-center mt-6'>
                          <AlertDialogCancel
                            className='rounded-lg flex-1 border-slate-200 text-slate-500 font-bold hover:bg-slate-50 transition-all'
                          >
                            Keep it
                          </AlertDialogCancel>
                          <AlertDialogAction
                            className='rounded-lg flex-1 font-bold bg-red-500 hover:bg-red-600 transition-all shadow-md shadow-red-100'
                            onClick={() => {
                              handleDeleteSentiment(sentiment.id);
                              toast({
                                title: 'Sentiment removed',
                                description: `The link has been deleted.`,
                              });
                            }}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
