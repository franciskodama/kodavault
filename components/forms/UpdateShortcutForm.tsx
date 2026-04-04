'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useForm, SubmitHandler } from 'react-hook-form';

import { ShortcutType } from '@/lib/types';
import { updateShortcut } from '@/lib/actions';

import { Button } from '@/components/ui/button';
import { SheetClose } from '@/components/ui/sheet';
import { useToast } from '@/components/ui/use-toast';
import {
  allCategories,
  categoryDisplayMap,
} from '@/app/(dashboard)/shortcut/shortcut';
import { classError } from '@/lib/classes';

export function UpdateShortcutForm({ shortcut }: { shortcut: ShortcutType }) {
  const [data, setData] = useState<ShortcutType>();
  const { toast } = useToast();
  const { data: session } = useSession();
  const uid = session?.user?.email;

  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ShortcutType>({
    defaultValues: {
      uid: uid || '',
      id: shortcut?.id,
      name: shortcut?.name,
      url: shortcut?.url,
      description: shortcut?.description,
      category: allCategories.includes(shortcut?.category as string)
        ? shortcut?.category
        : 'Custom',
      customCategory: allCategories.includes(shortcut?.category as string)
        ? ''
        : (shortcut?.category as string),
      from: shortcut?.from,
    },
  });

  const watchCategory = watch('category');
  const isCustom = watchCategory === 'Custom';

  const classInput =
    'border border-slate-200 h-10 p-2 rounded-xl w-full mt-2 text-sm';
  const classDiv = 'my-4';
  const classUl = 'grid grid-cols-3 gap-2';
  const classTitle = 'font-bold mb-2';
  const classLabelRadio =
    'capitalize inline-flex items-center justify-center py-1 w-full h-[2.5em] border-2 rounded-xl cursor-pointer text-sm text-primary border-gray-200 peer-checked:font-bold peer-checked:border-slate-500 peer-checked:text-primary peer-checked:bg-accent hover:text-slate-600 hover:bg-gray-100';

  const processForm: SubmitHandler<ShortcutType> = async (data) => {
    if (!uid) {
      return console.log('User not logged in 🤷🏻‍♂️');
    }

    const submissionData = {
      ...data,
      category:
        data.category === 'Custom'
          ? data.customCategory || 'Miscellaneous'
          : data.category,
      uid: uid || '',
    };

    const result = await updateShortcut(submissionData);

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
            <h3 className={classTitle}>Category</h3>
            <ul className={classUl}>
              {allCategories.map((categoriesKey) => (
                <li key={categoriesKey}>
                  <input
                    className='hidden peer'
                    type='radio'
                    value={categoriesKey}
                    id={`update-${categoriesKey}`}
                    {...register('category')}
                  />
                  <label
                    className={classLabelRadio}
                    htmlFor={`update-${categoriesKey}`}
                  >
                    <span>
                      {categoryDisplayMap[categoriesKey] || categoriesKey}
                    </span>
                  </label>
                </li>
              ))}
              <li>
                <input
                  className='hidden peer'
                  type='radio'
                  value='Custom'
                  id='update-custom'
                  {...register('category')}
                />
                <label className={classLabelRadio} htmlFor='update-custom'>
                  <span>Other...</span>
                </label>
              </li>
            </ul>

            {isCustom && (
              <div className='mt-4 animate-in fade-in slide-in-from-top-2 duration-300'>
                <label className={classTitle} htmlFor='customCategory'>
                  Custom Category Name
                </label>
                <input
                  id='customCategory'
                  className={classInput}
                  placeholder='Type your category name...'
                  {...register('customCategory', {
                    required: isCustom
                      ? 'Please specify the category name'
                      : false,
                  })}
                />
              </div>
            )}
          </div>

          <Button className='mt-8' type='submit'>
            Update a Shortcut
          </Button>

          <SheetClose asChild>
            <Button className='my-4' variant={'outline'}>
              Close
            </Button>
          </SheetClose>
        </div>
      </form>
    </>
  );
}
