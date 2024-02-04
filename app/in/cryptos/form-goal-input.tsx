'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { updateCoinShareGoal } from '@/lib/actions';
import { useUser } from '@clerk/nextjs';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { MergedArrayItem } from './cryptos';

type InputProps = {
  uid: string;
  total: number;
  goal: number | undefined;
};

export const FormGoalInput = (assetRow: MergedArrayItem) => {
  const [data, setData] = useState<InputProps>();
  const { toast } = useToast();

  const {
    register,
    watch,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<InputProps>({});

  const processForm: SubmitHandler<InputProps> = async (data) => {
    console.log('---  🚀 ---> | data:', data);
    if (!assetRow.uid) {
      return console.log('User not logged in');
    }

    // const result = await updateCoinShareGoal({
    //   assetRow,
    // });

    // if (result) {
    //   toast({
    //     title: 'Goal Updated! 🎉',
    //     description: 'Your new goal is already set.',
    //     variant: 'success',
    //   });
    // } else {
    //   toast({
    //     title: '👻 Boho! Error occurred!',
    //     description: 'Your goal was NOT updated.',
    //     variant: 'destructive',
    //   });
    // }

    reset();
    setData(data);
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(processForm)} className='flex items-center'>
        <Input
          type='text'
          value={assetRow.goal}
          id='shareGoal'
          className='w-[3em] h-6'
          {...register('goal')}
        />
        <span className='ml-1 mr-4'>%</span>
        {/* 
        {goal && (
          <p
            className={`flex items-center justify-center uppercase text-white h-6 w-[6ch] px-1 m-1 text-center rounded-[2px] ${
              total > goal ? 'bg-green-500' : 'bg-red-500'
            }`}
          >
            {total > goal ? 'buy' : 'sell'}
          </p>
        )} */}

        <Button className='py-0 ml-8' type='submit' variant='outline' size='sm'>
          Update
        </Button>
      </form>
    </div>
  );
};

{
  /* <input type='text' value={obs} id='obs' /> */
}
