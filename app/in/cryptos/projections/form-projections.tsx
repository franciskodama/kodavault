'use client';

import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { updateProjection } from '@/lib/actions';
import { useState } from 'react';
import { Form, SubmitHandler, useForm } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { CryptoProjection, CryptoWithAthAndProjections } from '@/lib/types';
import { useUser } from '@clerk/nextjs';
import { MergedArrayItem } from '../allocation-goals';
export const FormProjections = ({
  assetRow,
}: {
  assetRow: CryptoWithAthAndProjections;
}) => {
  const [data, setData] = useState<CryptoProjection>();
  const { toast } = useToast();
  const uid = useUser().user?.emailAddresses[0].emailAddress;
  const form = useForm();

  const {
    setValue,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CryptoProjection>({
    defaultValues: {
      id: assetRow.id,
      uid: assetRow.uid,
      asset: assetRow.asset,
      projection: assetRow.projection,
      source: assetRow.source,
    },
  });

  const processForm: SubmitHandler<CryptoProjection> = async (data) => {
    if (!assetRow.uid) {
      return console.log('User not logged in');
    }

    const result = await updateProjection(data);

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

          <div className='flex items-center '>
            <Label className='text-left text-xs w-1/3'>Projection</Label>
            <Input className='w-1/4 text-center' {...register('projection')} />
            {/* <p className='w-1/4 text-lg text-left ml-4'>%</p> */}
          </div>

          {/* <div className='flex items-center gap-4'></div> */}

          <div className='grid grid-cols-3 items-center gap-4'>
            <Label className='text-left text-xs'>Source:</Label>
            <Textarea className='col-span-3' {...register('source')} />
          </div>

          <Button className='mt-8' type='submit'>
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
};
