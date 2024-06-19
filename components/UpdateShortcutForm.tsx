'use client';

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useForm, SubmitHandler } from 'react-hook-form';

import { ShortcutType } from '@/lib/types';
import { updateShortcut } from '@/lib/actions';

import { Button } from './ui/button';
import { SheetClose } from './ui/sheet';
import { useToast } from './ui/use-toast';

export function UpdateShortcutForm({
  shortcut,
  shortcutCategoriesKeys,
}: {
  shortcut: ShortcutType;
  shortcutCategoriesKeys: string[];
}) {
  const [data, setData] = useState<ShortcutType>();
  const { toast } = useToast();
  const { user } = useUser();
  const uid = user?.emailAddresses?.[0]?.emailAddress;

  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ShortcutType>({
    defaultValues: {
      uid: uid,
      id: shortcut?.id,
      name: shortcut?.name,
      url: shortcut?.url,
      description: shortcut?.description,
      category: shortcut?.category,
      from: shortcut?.from,
    },
  });

  const classInput = 'border border-slate-200 h-10 p-2 rounded-xs w-full mt-2';
  const classDiv = 'my-4';
  const classUl = 'flex flex-wrap gap-2';
  const classTitle = 'font-bold mb-2';
  const classError = 'text-red-500 font-bold my-2';
  const classLabelRadio =
    'inline-flex items-center justify-center py-1 w-[8em] h-[2.5em] border-2 rounded-[2px] cursor-pointer text-primary border-gray-200 peer-checked:font-bold peer-checked:border-slate-500 peer-checked:text-primary peer-checked:bg-accent hover:text-slate-600 hover:bg-gray-100';

  const processForm: SubmitHandler<ShortcutType> = async (data) => {
    if (!uid) {
      return console.log('User not logged in');
    }

    const result = await updateShortcut({ ...data, uid: uid });

    if (result) {
      toast({
        title: 'Shortcut Updated! 🎉',
        description: 'Your Shortcut is already updated.',
        variant: 'success',
      });
    } else {
      toast({
        title: '🚨 Uh oh! Something went wrong!',
        description: 'Your Shortcut was NOT Updated.',
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
    <>
      <form onSubmit={handleSubmit(processForm)} className='py-8'>
        <div className='flex flex-col'>
          <div className={classDiv}>
            <label className={classTitle} htmlFor='name'>
              Title
            </label>
            <input
              className={classInput}
              placeholder='Name Shortcut'
              {...register('name', { required: "Name can't be empty" })}
            />
            {errors.name?.message && (
              <p className={classError}>{errors.name.message}</p>
            )}
          </div>

          <div className={classDiv}>
            <label className={classTitle} htmlFor='from'>
              From
            </label>
            <input
              className={classInput}
              placeholder='From where?'
              {...register('from', {
                required: 'We need to know where it came from',
              })}
            />
            {errors.from?.message && (
              <p className={classError}>{errors.from.message}</p>
            )}
          </div>

          <div className={classDiv}>
            <label className={classTitle} htmlFor='description'>
              Description
            </label>
            <input
              className={classInput}
              placeholder='Description'
              {...register('description', {
                required: "Description can't be empty",
              })}
            />
            {errors.description?.message && (
              <p className={classError}>{errors.description.message}</p>
            )}
          </div>

          <div className={classDiv}>
            <h3 className={classTitle}>Wallet</h3>
            <ul className={classUl}>
              {shortcutCategoriesKeys.map((categoriesKey) => (
                <li key={categoriesKey}>
                  <input
                    className='hidden peer'
                    type='radio'
                    value={categoriesKey}
                    id={categoriesKey}
                    {...register('category')}
                  />
                  <label className={classLabelRadio} htmlFor={categoriesKey}>
                    <span>{categoriesKey}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <Button className='mt-8' type='submit'>
            Update a Shortcut
          </Button>

          <SheetClose asChild>
            <Button className='my-4' type='submit' variant={'outline'}>
              Close
            </Button>
          </SheetClose>
        </div>
      </form>
    </>
  );
}
