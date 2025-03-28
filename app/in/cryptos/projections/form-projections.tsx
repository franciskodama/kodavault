'use client';

import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { updateProjection } from '@/lib/actions';
import { useForm } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { CryptoProjection, CryptoWithAthAndProjections } from '@/lib/types';
import { useUser } from '@clerk/nextjs';
import { useAssetsContext } from '@/context/AssetsContext';
import { Textarea } from '@/components/ui/textarea';
import {
  currencyFormatter,
  numberFormatter,
  numberFormatterNoDecimals,
} from '@/lib/utils';

export const FormProjections = ({
  assetRow,
  onClose,
  setTableData,
}: {
  assetRow: CryptoWithAthAndProjections;
  onClose: () => void;
  setTableData: React.Dispatch<
    React.SetStateAction<CryptoWithAthAndProjections[]>
  >;
}) => {
  const { refreshAssets } = useAssetsContext();
  const { toast } = useToast();
  const { user } = useUser();
  const uid = user?.emailAddresses[0]?.emailAddress;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CryptoProjection>({
    defaultValues: {
      uid: uid || '',
      asset: assetRow.asset,
      projection: assetRow.projection ? Number(assetRow.projection) : undefined,
      source: assetRow.source || '',
      note: assetRow.note || '',
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
      note: formData.note || '',
    };

    try {
      const result = await updateProjection({ data });

      if (result) {
        toast({
          title: 'Projection Updated! 🎉',
          description: 'Your new Projection is already set.',
          variant: 'success',
        });

        setValue('projection', undefined, { shouldValidate: true });
        setValue('source', '', { shouldValidate: true });
        setTableData((prev) =>
          prev.map((item) =>
            item.asset === assetRow.asset
              ? {
                  ...item,
                  projection: data.projection,
                  source: data.source,
                  note: data.note,
                  projectionTotal: data.projection
                    ? currencyFormatter(data.projection * item.qtyNumber)
                    : currencyFormatter(item.priceNumber * item.qtyNumber),
                  projectionXPotential: data.projection
                    ? numberFormatter.format(
                        (data.projection * item.qtyNumber) /
                          (item.priceNumber * item.qtyNumber)
                      )
                    : 0,
                  projectionPercentagePotential: data.projection
                    ? numberFormatterNoDecimals.format(
                        ((data.projection - assetRow.priceNumber) /
                          assetRow.priceNumber) *
                          100
                      )
                    : 0,
                }
              : item
          )
        );
        onClose();
        await refreshAssets();
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
    setValue('projection', 0, { shouldValidate: false });
    setValue('source', '', { shouldValidate: false });
    setValue('note', '', { shouldValidate: false });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(processForm)} className='flex items-center'>
        <div className='grid gap-4 py-4'>
          <h3 className='bg-slate-800 px-4 py-2 text-white text-sm mb-8'>
            Asset:
            <span className='font-semibold ml-2 text-base'>
              {assetRow.asset}
            </span>
          </h3>

          <div className='flex items-center'>
            <Label className='text-left text-xs w-1/2'>Projection:</Label>
            <div>
              <Input
                type='number'
                step='any'
                {...register('projection', {
                  required: 'Projection is required',
                  valueAsNumber: true,
                })}
              />
              {errors.projection && (
                <p className='flex items-center justify-center text-xs text-white bg-red-500 py-1'>
                  {errors.projection.message}
                </p>
              )}
            </div>
          </div>

          <div className='flex items-center gap-4'>
            <Label className='text-left text-xs w-1/2'>Source:</Label>
            <Input {...register('source')} />
          </div>

          <div className='flex items-center gap-4'>
            <Label className='text-left text-xs w-1/2'>Note:</Label>
            <Textarea {...register('note')} />
          </div>

          <div className='flex gap-4 mt-8'>
            <Button
              type='button'
              variant='outline'
              onClick={handleClear}
              className='flex-1'
            >
              Clear
            </Button>

            <Button
              type='submit'
              disabled={!uid || isSubmitting}
              className='flex-1'
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
