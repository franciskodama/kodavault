'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { updateCoinShareGoal } from '@/lib/actions';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { MergedArrayItem } from './cryptos';
import { classError } from '@/lib/classes';

export type InputProps = {
  uid: string;
  total?: number;
  goal: number | undefined;
  coin: string;
};

export const FormGoalInput = ({ assetRow }: { assetRow: MergedArrayItem }) => {
  const [data, setData] = useState<InputProps>();
  const { toast } = useToast();

  const {
    register,
    watch,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<InputProps>({
    defaultValues: {
      uid: assetRow.uid,
      goal: assetRow.goal,
      coin: assetRow.coin,
    },
  });

  const processForm: SubmitHandler<InputProps> = async (data) => {
    console.log('---  🚀 ---> | data:', data);

    //--------------------------------------------------------------
    // TODO: IT'S NOT SAVING YET
    //--------------------------------------------------------------

    if (!assetRow.uid) {
      return console.log('User not logged in');
    }

    const result = await updateCoinShareGoal(data);

    if (result) {
      toast({
        title: 'Goal Updated! 🎉',
        description: 'Your new goal is already set.',
        variant: 'success',
      });
    } else {
      toast({
        title: '👻 Boho! Error occurred!',
        description: 'Your goal was NOT updated.',
        variant: 'destructive',
      });
    }

    reset();
    setData(data);
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  //--------------------------------------------------------------
  // TODO: Why the first asset is coming with 0% share?

  //   const share = assetRow.share;
  //   console.log('---  🚀 ---> | share:', Number(share.toString().split('.')[0]));
  //   console.log('---  🚀 ---> | share Number():', Number(share));
  //   console.log('---  🚀 ---> | goal:', assetRow.goal);
  //   console.log('---  🚀 ---> | goal:', assetRow);
  //--------------------------------------------------------------

  return (
    <div>
      <form onSubmit={handleSubmit(processForm)} className='flex items-center'>
        <Input
          className='w-[3em] h-6'
          {...register('goal', { required: "Goal can't be empty" })}
        />
        {errors.goal?.message && (
          <p className={classError}>{errors.goal.message}</p>
        )}
        <span className='ml-1 mr-4'>%</span>

        {assetRow && (
          <p
            className={`flex items-center justify-center uppercase text-white h-6 w-[12ch] px-1 m-1 text-center rounded-[2px] ${
              assetRow.goal === 0
                ? 'border border-slate-300 bg-slate-300'
                : Number(assetRow.share.toString().split('.')[0]) >
                  (assetRow.goal || 0)
                ? 'bg-green-500'
                : 'bg-red-500'
            }`}
          >
            {assetRow.goal === 0
              ? 'set a goal'
              : Number(assetRow.share.toString().split('.')[0]) >
                (assetRow.goal || 0)
              ? 'buy'
              : 'sell'}
          </p>
        )}

        <Button
          className='py-0 px-6 ml-8'
          type='submit'
          variant='outline'
          size='sm'
        >
          Update
        </Button>
      </form>
    </div>
  );
};

{
  /* <input type='text' value={obs} id='obs' /> */
}
