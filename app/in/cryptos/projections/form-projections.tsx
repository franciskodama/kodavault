'use client';

import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { updateProjection } from '@/lib/actions';
import { useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { CryptoProjection, CryptoWithAthAndProjections } from '@/lib/types';
import { useUser } from '@clerk/nextjs';
import { useAssetsContext } from '@/context/AssetsContext';
export const FormProjections = ({
  assetRow,
  onClose,
}: {
  assetRow: CryptoWithAthAndProjections;
  onClose: () => void;
}) => {
  const { refreshAssets } = useAssetsContext();
  // const [data, setData] = useState<CryptoProjection>();
  const { toast } = useToast();
  const { user } = useUser();
  const uid = user?.emailAddresses[0]?.emailAddress;
  const closeRef = useRef<HTMLButtonElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CryptoProjection>({
    defaultValues: {
      uid: uid || '',
      asset: assetRow.asset,
      projection: assetRow.projection ? Number(assetRow.projection) : 0,
      source: assetRow.source || '',
    },
  });

  const processForm = async (formData: CryptoProjection) => {
    if (!uid) {
      toast({
        title: 'Error',
        description: 'You must be logged in to update projections',
        variant: 'destructive',
      });
      return;
    }

    const data: CryptoProjection = {
      uid,
      asset: assetRow.asset,
      projection: Number(formData.projection),
      source: formData.source || '',
    };

    try {
      const result = await updateProjection({ data });

      if (result) {
        toast({
          title: 'Projection Updated! 🎉',
          description: 'Your new Projection is already set.',
          variant: 'success',
        });
        reset();
        onClose();

        // Then refresh assets
        await refreshAssets();
        // closeRef.current?.click();
      } else {
        toast({
          title: '👻 Boho! Error occurred!',
          description: 'Your Projection was NOT updated.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error updating projection:', error);
      toast({
        title: 'Error',
        description: 'Failed to update projection. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleClear = () => {
    reset({
      uid: uid || '',
      asset: assetRow.asset,
      projection: 0,
      source: '',
    });
  };

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
            <Input
              className='ml-2'
              type='number'
              step='any'
              {...register('projection', {
                required: true,
                valueAsNumber: true,
              })}
            />
          </div>

          <div className='flex items-center gap-4'>
            <Label className='text-left text-xs'>Source:</Label>
            <Input className='ml-2' {...register('source')} />
          </div>

          <Button
            type='button'
            className='mt-8'
            variant='outline'
            onClick={handleClear}
          >
            Clear
          </Button>

          <Button
            // ref={closeRef}
            type='submit'
            disabled={!uid || isSubmitting}
            className='flex-1'
          >
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </div>
  );
};
