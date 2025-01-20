'use client';

import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { updateProjection } from '@/lib/actions';
import { useState } from 'react';
import { Form, SubmitHandler, useForm } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { CryptoProjection, CryptoWithAthAndProjections } from '@/lib/types';
import { useUser } from '@clerk/nextjs';
export const FormProjections = ({
  assetRow,
}: {
  assetRow: CryptoWithAthAndProjections;
}) => {
  const [data, setData] = useState<CryptoProjection>();
  const { toast } = useToast();
  const { user } = useUser();
  const email = user?.emailAddresses[0]?.emailAddress;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CryptoProjection>({
    defaultValues: {
      uid: email,
      asset: assetRow.asset,
      projection: assetRow.projection ? Number(assetRow.projection) : 0,
      source: assetRow.source,
    },
  });

  const processForm: SubmitHandler<CryptoProjection> = async (data) => {
    if (!email) {
      toast({
        title: 'Error',
        description: 'You must be logged in to update projections',
        variant: 'destructive',
      });
      return;
    }

    const formData: CryptoProjection = {
      uid: email,
      asset: assetRow.asset,
      projection: Number(data.projection),
      source: data.source || '',
    };

    const result = await updateProjection(formData);

    if (result) {
      toast({
        title: 'Projection Updated! 🎉',
        description: 'Your new Projection is already set.',
        variant: 'success',
      });
    } else {
      toast({
        title: '👻 Boho! Error occurred!',
        description: 'Your Projection was NOT updated.',
        variant: 'destructive',
      });
    }

    reset();
    setData(data);
    // setTimeout(() => {
    //   window.location.reload();
    // }, 2000);
  };

  // Tirar reload in this page, and all the others that have it
  // Total projected
  // Total Boost %
  // Total Boost X

  return (
    <div>
      <form onSubmit={handleSubmit(processForm)} className='flex items-center'>
        <div className='grid gap-4 py-4'>
          <h3 className='bg-slate-800 px-4 py-2 text-white text-sm'>
            Asset:
            <span className='font-semibold ml-2 text-base'>
              {assetRow.asset}
            </span>
          </h3>

          <div className='flex items-center '>
            <Label className='text-left text-xs w-1/3'>Projection</Label>
            <Input className='ml-2' {...register('projection')} />
          </div>

          <div className='flex items-center gap-4'>
            <Label className='text-left text-xs'>Source:</Label>
            <Input className='ml-2' {...register('source')} />
          </div>

          {/* Make this work */}
          <Button className='mt-8' variant='outline'>
            Clear
          </Button>

          <Button type='submit'>Save Changes</Button>
        </div>
      </form>
    </div>
  );
};
