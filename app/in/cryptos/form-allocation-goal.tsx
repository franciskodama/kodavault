'use client';

import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { updateCoinShareGoal } from '@/lib/actions';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { MergedArrayItem } from './cryptos';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export type InputProps = {
  id: string;
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
  const [data, setData] = useState<InputProps>();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InputProps>({
    defaultValues: {
      id: assetRow.id,
      uid: assetRow.uid,
      goal: assetRow.goal,
      coin: assetRow.coin,
      obs: assetRow.obs,
    },
  });

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
            <Textarea className='col-span-3' {...register('obs')} />
          </div>

          <Button className='mt-8' type='submit'>
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
};
