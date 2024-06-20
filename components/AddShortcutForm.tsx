'use client';

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useForm, SubmitHandler } from 'react-hook-form';

import { addShortcut } from '@/lib/actions';
import { Button } from './ui/button';
import { ShortcutType } from '@/lib/types';
import { useToast } from './ui/use-toast';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';

type shortcutCategory = {
  label: string;
  value: string;
};

export function AddShortcutForm({
  shortcutCategoriesKeys,
}: {
  shortcutCategoriesKeys: string[];
}) {
  console.log('---  🚀 ---> | shortcutCategoriesKeys:', shortcutCategoriesKeys);
  const [data, setData] = useState<ShortcutType>();
  const { toast } = useToast();
  const { user } = useUser();
  const uid = user?.emailAddresses?.[0]?.emailAddress;

  //Combobox
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ShortcutType>({});

  const classInput = 'border border-slate-200 h-10 p-2 rounded-xs w-full mt-2';
  const classDiv = 'my-4';
  //   const classTitle = 'font-bold mb-2';
  const classError = 'text-red-500 font-bold my-2';

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

  let categoryArray: any = [];
  shortcutCategoriesKeys.map((category: string) => {
    const categoryObj = {
      value: category,
      label: category,
    };
    categoryArray.push(categoryObj);
  });
  console.log('---  🚀 ---> | categoryArray:', categoryArray);

  return (
    <>
      <form
        onSubmit={handleSubmit(processForm)}
        className='border items-center flex p-1 gap-2'
      >
        <div className={classDiv}>
          {/* <label className={classTitle} htmlFor='name'>
            Title
          </label> */}
          <input
            className={classInput}
            placeholder='Title'
            {...register('name', { required: "Title can't be empty" })}
          />
          {errors.name?.message && (
            <p className={classError}>{errors.name.message}</p>
          )}
        </div>

        <div className={classDiv}>
          {/* <label className={classTitle} htmlFor='from'>
            From
          </label> */}
          <input
            className={classInput}
            placeholder='From (ex.: Coinglass)'
            {...register('from', { required: "From can't be empty" })}
          />
          {errors.from?.message && (
            <p className={classError}>{errors.from.message}</p>
          )}
        </div>

        <div className={classDiv}>
          {/* <h3 className={classTitle}>Category</h3> */}

          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant='outline'
                role='combobox'
                aria-expanded={open}
                className='w-[200px] justify-between'
              >
                {value
                  ? categoryArray.find(
                      (category: shortcutCategory) => category.value === value
                    )?.label
                  : 'Select category...'}
                <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-[200px] p-0'>
              <Command>
                <CommandInput placeholder='Search framework...' />
                <CommandEmpty>No category found.</CommandEmpty>
                <CommandGroup>
                  {shortcutCategoriesKeys
                    ? categoryArray.map((category: shortcutCategory) => (
                        <CommandItem
                          key={category.value}
                          value={category.value}
                          onSelect={(currentValue) => {
                            setValue(
                              currentValue === value ? '' : currentValue
                            );
                            setOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              'mr-2 h-4 w-4',
                              value === category.value
                                ? 'opacity-100'
                                : 'opacity-0'
                            )}
                          />
                          {category.label}
                        </CommandItem>
                      ))
                    : console.log(
                        '---  🚀 ---> | categoryArray:',
                        categoryArray
                      )}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        <div className={classDiv}>
          {/* <label className={classTitle} htmlFor='description'>
            Description
          </label> */}
          <input
            // className={classInput}
            className={`${classInput} w-[50em]`}
            placeholder='Description'
            {...register('name', { required: "Description can't be empty" })}
          />
          {errors.description?.message && (
            <p className={classError}>{errors.description.message}</p>
          )}
        </div>

        {/* <Button className='' type='submit'>
          Add Shortcut
        </Button> */}
      </form>
    </>
  );
}
