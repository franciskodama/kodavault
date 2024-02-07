'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { updateCoinShareGoal } from '@/lib/actions';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { MergedArrayItem } from './cryptos';
import { classError } from '@/lib/classes';
import { Label } from '@/components/ui/label';

export type InputProps = {
  uid: string;
  total?: number;
  goal: number | undefined;
  coin: string;
  obs?: string | null;
};

export const FormAllocationGoal = ({
  assetRow,
}: {
  assetRow: MergedArrayItem;
}) => {
  console.log('---  🚀 ---> | assetRow:', assetRow);
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
      obs: assetRow.obs,
    },
  });

  // TODO: For observation: https://ui.shadcn.com/docs/components/textarea

  const processForm: SubmitHandler<InputProps> = async (data) => {
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

  return (
    <div>
      <form onSubmit={handleSubmit(processForm)} className='flex items-center'>
        <div className='grid gap-4 py-4'>
          <h3 className='bg-slate-800 px-4 py-2 text-white text-sm'>
            Asset:
            <span className='font-semibold ml-2 text-base'>
              {assetRow.coin}
            </span>
          </h3>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='name' className='text-left text-xs'>
              Percentage Allocation Goal (%)
            </Label>
            <Input className='col-span-3' {...register('goal')} />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='username' className='text-left text-xs'>
              Observations:
            </Label>
            <Input className='col-span-3' {...register('obs')} />
          </div>
        </div>

        {/* <Input
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
        </Button> */}
      </form>
    </div>
  );
};

{
  /* <input type='text' value={obs} id='obs' /> */
}
