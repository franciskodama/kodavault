'use client';

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useForm, SubmitHandler } from 'react-hook-form';

import { addShortcut } from '@/lib/actions';
import { Button } from './ui/button';
import { ShortcutType } from '@/lib/types';
import { SheetClose } from './ui/sheet';
import { useToast } from './ui/use-toast';

export function AddShortcutForm({
  shortcutCategoriesKeys,
}: {
  shortcutCategoriesKeys: string[];
}) {
  const [data, setData] = useState<ShortcutType>();
  const { toast } = useToast();
  const { user } = useUser();
  const uid = user?.emailAddresses?.[0]?.emailAddress;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ShortcutType>({});

  const classInput = 'border border-slate-200 h-10 p-2 rounded-xs w-full mt-2';
  const classDiv = 'my-4';
  const classUl = 'flex flex-wrap gap-2';
  const classTitle = 'font-bold mb-2';
  const classError = 'text-red-500 font-bold my-2';
  const classLabelRadio =
    'inline-flex items-center justify-center py-1 w-[8em] h-[2.5em] border-2 rounded-[2px] cursor-pointer text-primary border-gray-200 peer-checked:font-bold peer-checked:border-slate-500 peer-checked:text-primary peer-checked:bg-accent hover:text-slate-600 hover:bg-gray-100';

  const processForm: SubmitHandler<ShortcutType> = async (data) => {
    if (!uid) {
      return console.log('User not logged in 🤷🏻‍♂️');
    }

    const result = await addShortcut({
      ...data,
      uid: uid,
    });

    if (result) {
      toast({
        title: 'Shortcut added! 🎉',
        description: 'Your new shortcut is already available.',
        variant: 'success',
      });
      console.log('Success');
    } else {
      toast({
        title: '👻 Boho! Error occurred!',
        description: 'Your shortcut was NOT added.',
        variant: 'destructive',
      });
      console.log('Error updating shortcut');
    }

    reset();
    setData(data);

    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(processForm)}
        className='border items-center flex p-2 gap-2'
      >
        <div className={classDiv}>
          <label className={classTitle} htmlFor='name'>
            Title
          </label>
          <input
            className={classInput}
            placeholder='Ex.: Fear and Greed Index'
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
            className={classInput}
            placeholder='Ex.: Coinglass'
            {...register('from', { required: "From can't be empty" })}
          />
          {errors.from?.message && (
            <p className={classError}>{errors.from.message}</p>
          )}
        </div>

        <div className={classDiv}>
          <h3 className={classTitle}>Category</h3>
          <ul className={classUl}>
            {shortcutCategoriesKeys.map((category) => (
              <li key={category}>
                <input
                  className='hidden peer'
                  type='radio'
                  value={category}
                  id={category}
                  {...register('category')}
                />
                <label className={classLabelRadio} htmlFor={category}>
                  <span>{category}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>

        <div className={classDiv}>
          <label className={classTitle} htmlFor='description'>
            Description
          </label>
          <input
            className={classInput}
            placeholder='Description'
            {...register('name', { required: "Description can't be empty" })}
          />
          {errors.description?.message && (
            <p className={classError}>{errors.description.message}</p>
          )}
        </div>

        <Button className='' type='submit'>
          Add Asset
        </Button>
      </form>
    </>
  );
}
