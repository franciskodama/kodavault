'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useForm, SubmitHandler } from 'react-hook-form';

import { addSentiment } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { SentimentType } from '@/lib/types';
import { useToast } from '@/components/ui/use-toast';
import { SheetClose } from '@/components/ui/sheet';
import { classError } from '@/lib/classes';

export function AddSentimentForm() {
  const { toast } = useToast();
  const { data: session } = useSession();
  const uid = session?.user?.email;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Omit<SentimentType, 'id' | 'created_at'>>({});

  const classInput =
    'border border-slate-200 h-10 p-2 rounded-xl w-full mt-2 text-sm';
  const classDiv = 'my-4';
  const classTitle = 'font-bold mb-2 text-sm text-slate-700';

  const processForm: SubmitHandler<Omit<SentimentType, 'id' | 'created_at'>> = async (data) => {
    if (!uid) {
      return console.log('User not logged in 🤷🏻‍♂️');
    }

    // Extract exchange and pair from URL
    // https://coinalyze.net/solana/usdt/binance/solusdt_perp/price-chart-live/
    let extractedExchange = 'Unknown';
    let extractedPair = 'Unknown';
    try {
      const urlSegments = data.url.split('/');
      // The pair is usually the 5th segment (index 4)
      if (urlSegments.length > 4) {
        extractedPair = urlSegments[4].toUpperCase();
      }
      // The exchange is usually the 6th segment (index 5)
      if (urlSegments.length > 5) {
        extractedExchange = urlSegments[5].charAt(0).toUpperCase() + urlSegments[5].slice(1);
      }
    } catch (e) {
      console.error('Failed to extract data from URL', e);
    }

    const submissionData = {
      ...data,
      exchange: extractedExchange,
      pair: extractedPair,
      uid: uid || '',
    };

    const result = await addSentiment(submissionData);

    if (result) {
      toast({
        title: 'Sentiment added! 🎉',
        description: `New sentiment for ${data.asset} on ${extractedExchange} added.`,
        variant: 'success',
      });
    } else {
      toast({
        title: 'Boho! Error occurred!',
        description: 'Your sentiment indicator was NOT added.',
        variant: 'destructive',
      });
    }

    reset();

    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit(processForm)} className='pb-8'>
      <div className='flex flex-col'>
        <div className={classDiv}>
          <label className={classTitle} htmlFor='asset'>
            Coin Symbol
          </label>
          <input
            id='asset'
            className={classInput}
            placeholder='ex: SOL'
            {...register('asset', { required: "Symbol can't be empty" })}
          />
          {errors.asset?.message && (
            <p className={classError}>{errors.asset.message}</p>
          )}
        </div>

        <div className={classDiv}>
          <label className={classTitle} htmlFor='url'>
            Coinalyze URL
          </label>
          <input
            id='url'
            className={classInput}
            placeholder='https://coinalyze.net/...'
            {...register('url', { 
              required: "URL can't be empty",
              pattern: {
                value: /coinalyze\.net/i,
                message: "Must be a valid Coinalyze URL"
              }
            })}
          />
          {errors.url?.message && (
            <p className={classError}>{errors.url.message}</p>
          )}
        </div>

        <Button className='mt-8 py-6 font-bold tracking-wider' type='submit'>
          Add Sentiment Link
        </Button>

        <SheetClose asChild>
          <Button className='my-4' variant='outline'>
            Cancel
          </Button>
        </SheetClose>
      </div>
    </form>
  );
}
