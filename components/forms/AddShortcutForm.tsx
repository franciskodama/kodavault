'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useForm, SubmitHandler } from 'react-hook-form';

import { addShortcut } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { ShortcutType } from '@/lib/types';
import { useToast } from '@/components/ui/use-toast';
import { SheetClose } from '@/components/ui/sheet';
import {
  allCategories,
  categoryDisplayMap,
} from '@/app/(dashboard)/shortcut/shortcut';
import { classError } from '@/lib/classes';

export function AddShortcutForm() {
  const [data, setData] = useState<ShortcutType>();
  const { toast } = useToast();
  const { data: session } = useSession();
  const uid = session?.user?.email;

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<ShortcutType>({});

  const watchCategory = watch('category');
  const isCustom = watchCategory === 'Custom';

  const classInput =
    'border border-slate-200 h-10 p-2 rounded-xl w-full mt-2 text-sm';
  const classDiv = 'my-4';
  const classUl = 'grid grid-cols-3 gap-2';
  const classTitle = 'font-bold mb-2 text-sm text-slate-700';
  const classLabelRadio =
    'capitalize inline-flex items-center justify-center py-1 w-full h-[2.5em] border-2 rounded-xl cursor-pointer text-xs text-primary border-gray-200 peer-checked:font-bold peer-checked:border-slate-500 peer-checked:text-primary peer-checked:bg-accent hover:text-slate-600 hover:bg-gray-100 transition-all duration-200';

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

    const result = await addShortcut(submissionData);

    if (result) {
      toast({
        title: 'Shortcut added! 🎉',
        description: 'Your new shortcut is already available.',
        variant: 'success',
      });
    } else {
      toast({
        title: 'Boho! Error occurred!',
        description: 'Your shortcut was NOT added.',
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
          <label className={classTitle} htmlFor='name'>
            Title
          </label>
          <input
            id='name'
            className={classInput}
            placeholder='Shortcut Name'
            {...register('name', { required: "Title can't be empty" })}
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
            id='from'
            className={classInput}
            placeholder='Where is it from? (ex: YouTube)'
            {...register('from', { required: "From can't be empty" })}
          />
          {errors.from?.message && (
            <p className={classError}>{errors.from.message}</p>
          )}
        </div>

        <div className={classDiv}>
          <label className={classTitle} htmlFor='url'>
            URL
          </label>
          <input
            id='url'
            className={classInput}
            placeholder='Link to the resource'
            {...register('url', { required: "Url can't be empty" })}
          />
          {errors.url?.message && (
            <p className={classError}>{errors.url.message}</p>
          )}
        </div>

        <div className={classDiv}>
          <label className={classTitle} htmlFor='description'>
            Description
          </label>
          <input
            id='description'
            className={classInput}
            placeholder='Short description of the shortcut'
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
            {allCategories.map((category) => (
              <li key={category}>
                <input
                  className='hidden peer'
                  type='radio'
                  value={category}
                  id={`add-${category}`}
                  {...register('category', {
                    required: 'Please select a category',
                  })}
                />
                <label className={classLabelRadio} htmlFor={`add-${category}`}>
                  <span>{categoryDisplayMap[category] || category}</span>
                </label>
              </li>
            ))}
            <li>
              <input
                className='hidden peer'
                type='radio'
                value='Custom'
                id='add-custom'
                {...register('category', {
                  required: 'Please select a category',
                })}
              />
              <label className={classLabelRadio} htmlFor='add-custom'>
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

          {errors.category?.message && (
            <p className={classError}>{errors.category.message}</p>
          )}
          {errors.customCategory?.message && (
            <p className={classError}>{errors.customCategory.message}</p>
          )}
        </div>

        <Button className='mt-8 py-6 font-bold tracking-wider' type='submit'>
          Add Shortcut
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
