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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { toast } from '@/components/ui/use-toast';
import { SentimentType } from '@/lib/types';
import { useState, useMemo } from 'react';
import { deleteSentiment, toggleFavoriteSentiment } from '@/lib/actions';
import { UpdateSentimentForm } from '@/components/forms/UpdateSentimentForm';
import {
  Trash2,
  ExternalLink,
  BarChart3,
  Pencil,
  Star,
} from 'lucide-react';

export function SentimentInteractions({
  sentiments: initialSentiments,
}: {
  sentiments: SentimentType[];
}) {
  const [localSentiments, setLocalSentiments] = useState(initialSentiments);

  const sortedSentiments = useMemo(() => {
    return [...localSentiments].sort((a, b) => {
      if (a.isFavorite === b.isFavorite) {
        return a.asset.localeCompare(b.asset);
      }
      return a.isFavorite ? -1 : 1;
    });
  }, [localSentiments]);

  const handleDeleteSentiment = async (id: string) => {
    // Optimistic update
    setLocalSentiments((prev) => prev.filter((s) => s.id !== id));
    
    const result = await deleteSentiment(id);
    if (!result) {
      // Revert if failed
      setLocalSentiments(initialSentiments);
      toast({
        title: 'Error',
        description: 'Failed to delete sentiment',
        variant: 'destructive',
      });
    }
  };

  const handleToggleFavorite = async (id: string, currentStatus: boolean) => {
    const newStatus = !currentStatus;
    
    // Optimistic update
    setLocalSentiments((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isFavorite: newStatus } : s))
    );

    const result = await toggleFavoriteSentiment(id, newStatus);
    if (!result) {
      // Revert if failed
      setLocalSentiments((prev) =>
        prev.map((s) => (s.id === id ? { ...s, isFavorite: currentStatus } : s))
      );
      toast({
        title: 'Error',
        description: 'Failed to update favorite status',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className='w-full mt-12 px-4 sm:px-0 pb-20'>
      <div className='bg-white/40 backdrop-blur-md border border-slate-100 rounded-2xl shadow-sm overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full text-left border-collapse'>
            <thead>
              <tr className='border-b border-slate-100 bg-slate-50/50'>
                <th className='py-3 px-5 text-[10px] uppercase font-bold tracking-[0.2em] text-slate-400'>Coin</th>
                <th className='py-3 px-5 text-[10px] uppercase font-bold tracking-[0.2em] text-slate-400'>Pair</th>
                <th className='py-3 px-5 text-[10px] uppercase font-bold tracking-[0.2em] text-slate-400'>Exchange</th>
                <th className='py-3 px-5 text-[10px] uppercase font-bold tracking-[0.2em] text-slate-400'>Indicator Link</th>
                <th className='py-3 px-5 text-[10px] uppercase font-bold tracking-[0.2em] text-slate-400 text-right'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedSentiments.map((sentiment, index) => (
                <motion.tr
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  key={sentiment.id}
                  onClick={() => window.open(sentiment.url, '_blank')}
                  className='group border-b border-slate-50 hover:bg-accent cursor-pointer transition-colors'
                >
                  <td className='py-2 px-5'>
                    <div className='flex items-center gap-3'>
                      <div className='relative w-8 h-8 flex items-center justify-center rounded-lg bg-slate-50 border border-slate-100 shadow-sm group-hover:scale-110 transition-transform overflow-hidden'>
                        {sentiment.image ? (
                          <Image
                            src={sentiment.image}
                            alt={sentiment.asset}
                            fill
                            className='object-contain p-1'
                          />
                        ) : (
                          <BarChart3 size={14} className='text-indigo-600' />
                        )}
                      </div>
                      <span className='font-bold text-slate-900 text-sm'>{sentiment.asset}</span>
                    </div>
                  </td>
                  <td className='py-2 px-5'>
                    <span className='font-semibold text-slate-700 text-sm'>{sentiment.pair}</span>
                  </td>
                  <td className='py-2 px-5'>
                    <span className='inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/80 border border-slate-100 text-slate-500 uppercase tracking-wider'>
                      {sentiment.exchange}
                    </span>
                  </td>
                  <td className='py-2 px-5'>
                    <div className='inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 group-hover:text-indigo-600 transition-colors'>
                      <span className='truncate max-w-[250px]'>{sentiment.url}</span>
                      <ExternalLink size={12} className='shrink-0 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5' />
                    </div>
                  </td>
                  <td className='py-2 px-5 text-right' onClick={(e) => e.stopPropagation()}>
                    <div className='flex items-center justify-end gap-2'>
                      <button
                        onClick={() => handleToggleFavorite(sentiment.id, sentiment.isFavorite)}
                        className={cn(
                          'p-2 rounded-xl transition-all duration-200',
                          sentiment.isFavorite
                            ? 'bg-yellow-50 text-yellow-500 shadow-sm'
                            : 'hover:bg-slate-50 text-slate-300 hover:text-yellow-500'
                        )}
                      >
                        <Star
                          size={16}
                          className={cn(sentiment.isFavorite && 'fill-yellow-500')}
                        />
                      </button>

                      <Sheet>
                        <SheetTrigger asChild>
                          <button className='p-2 hover:bg-indigo-50 rounded-xl text-slate-400 hover:text-indigo-600 transition-all duration-200'>
                            <Pencil size={16} />
                          </button>
                        </SheetTrigger>
                        <SheetContent className='max-h-screen overflow-y-auto'>
                          <SheetHeader>
                            <SheetTitle>Update Sentiment</SheetTitle>
                            <SheetDescription>
                              Modify the details for {sentiment.asset} indicator.
                            </SheetDescription>
                          </SheetHeader>
                          <UpdateSentimentForm sentiment={sentiment} />
                        </SheetContent>
                      </Sheet>

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
                  </div>
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
