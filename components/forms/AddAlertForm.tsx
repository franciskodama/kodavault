'use client';

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useForm, SubmitHandler } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { AlertType } from '@/lib/types';
import { useToast } from '@/components/ui/use-toast';
import { SheetClose } from '@/components/ui/sheet';
import { classError } from '@/lib/classes';
import { addAlert } from '@/lib/actions/alerts';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Controller } from 'react-hook-form';

export function AddAlertForm() {
  const [data, setData] = useState<AlertType>();
  const { toast } = useToast();
  const { user } = useUser();
  const uid = user?.emailAddresses?.[0]?.emailAddress;

  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    formState: { errors },
  } = useForm<AlertType>({});

  const classInput =
    'border border-slate-200 h-10 p-2 rounded-xl w-full mt-2 text-sm';
  const classDiv = 'my-4';
  const classUl = 'grid grid-cols-3 gap-2';
  const classTitle = 'font-bold mb-2 text-sm text-slate-700';
  const classLabelRadio =
    'capitalize inline-flex items-center justify-center py-1 w-full h-[2.5em] border-2 rounded-xl cursor-pointer text-xs text-primary border-gray-200 peer-checked:font-bold peer-checked:border-slate-500 peer-checked:text-primary peer-checked:bg-accent hover:text-slate-600 hover:bg-gray-100 transition-all duration-200';

  const processForm: SubmitHandler<AlertType> = async (data) => {
    if (!uid) {
      return console.log('User not logged in 🤷🏻‍♂️');
    }

    const submissionData = {
      ...data,
      //   category:
      //     data.category === 'Custom'
      //       ? data.customCategory || 'Miscellaneous'
      //       : data.category,
      uid: uid,
    };

    const result = await addAlert(submissionData);

    if (result) {
      toast({
        title: 'Shortcut added! 🎉',
        description: 'Your new alert is already available.',
        variant: 'success',
      });
    } else {
      toast({
        title: 'Boho! Error occurred!',
        description: 'Your alert was NOT added.',
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
    <form onSubmit={handleSubmit(processForm)} className='pb-8'>
      <div className='flex flex-col'>
        <div className={classDiv}>
          <label className={classTitle} htmlFor='asset'>
            Asset
          </label>
          <input
            id='asset'
            className={classInput}
            placeholder='Asset'
            {...register('asset', { required: "Asset can't be empty" })}
          />
          {errors.asset?.message && (
            <p className={classError}>{errors.asset.message}</p>
          )}
        </div>

        <div className={classDiv}>
          <label className={classTitle} htmlFor='price'>
            Price
          </label>
          <input
            id='price'
            className={classInput}
            placeholder='When Asset reaches this Price'
            {...register('price', { required: "Price can't be empty" })}
          />
          {errors.price?.message && (
            <p className={classError}>{errors.price.message}</p>
          )}
        </div>

        <div className={classDiv}>
          <label className={classTitle} htmlFor='note'>
            Note (optional)
          </label>
          <textarea
            id='note'
            className={classInput}
            style={{ height: '100px' }}
            placeholder='Some notes...'
          />
          {errors.note?.message && (
            <p className={classError}>{errors.note.message}</p>
          )}
        </div>

        <div className='flex items-center gap-2 mt-4 p-2'>
          <Controller
            name='emailOptin'
            control={control}
            defaultValue={true}
            render={({ field }) => (
              <Checkbox
                id='emailOptin'
                className='h-6 w-6 border-slate-300 transition-all data-[state=checked]:bg-slate-900 data-[state=checked]:border-slate-900'
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
          <Label htmlFor='emailOptin' className='font-bold'>
            Email Notification
          </Label>
        </div>

        <div className='flex items-center gap-2 mt-4 p-2'>
          <Controller
            name='whatsappOptin'
            control={control}
            defaultValue={true}
            render={({ field }) => (
              <Checkbox
                id='whatsappOptin'
                className='h-6 w-6 border-slate-300 transition-all data-[state=checked]:bg-slate-900 data-[state=checked]:border-slate-900'
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
          <Label htmlFor='whatsappOptin' className='font-bold'>
            Whatsapp Notification
          </Label>
        </div>

        <Button className='mt-8 py-6 font-bold tracking-wider' type='submit'>
          Add Alert
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
