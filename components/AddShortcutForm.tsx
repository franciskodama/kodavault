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
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { allCategories, getColor } from '@/app/in/shortcut/shortcut';
import { spawn } from 'child_process';

type comboOptions = {
  label: string;
  value: string;
};

export function AddShortcutForm() {
  const [data, setData] = useState<ShortcutType>();
  const { toast } = useToast();
  const { user } = useUser();
  const uid = user?.emailAddresses?.[0]?.emailAddress;

  const [openCategory, setOpenCategory] = useState(false);
  const [valueCategory, setValueCategory] = useState('');

  const [openColor, setOpenColor] = useState(false);
  const [valueColor, setValueColor] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ShortcutType>({});

  const classInput = 'border border-slate-200 h-10 p-2 rounded-xs';
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

  let categories: any = [];
  allCategories.map((category: string) => {
    const categoryObj = {
      value: category,
      label: category,
    };
    categories.push(categoryObj);
  });

  return (
    <>
      <form
        onSubmit={handleSubmit(processForm)}
        className='items-center flex gap-2'
      >
        <input
          className={`${classInput} w-[28ch]`}
          placeholder='Title'
          {...register('name', { required: "Title can't be empty" })}
        />
        {errors.name?.message && (
          <p className={classError}>{errors.name.message}</p>
        )}

        <input
          className={`${classInput} w-[28ch]`}
          placeholder='From (ex.: Coinglass)'
          {...register('from', { required: "From can't be empty" })}
        />
        {errors.from?.message && (
          <p className={classError}>{errors.from.message}</p>
        )}

        <input
          className={`${classInput} w-[28ch]`}
          placeholder='Url'
          {...register('url', { required: "Url can't be empty" })}
        />
        {errors.url?.message && (
          <p className={classError}>{errors.url.message}</p>
        )}

        <Popover open={openCategory} onOpenChange={setOpenCategory}>
          <PopoverTrigger asChild>
            <Button
              variant='outline'
              role='combobox'
              aria-expanded={openCategory}
              className='w-[220px] justify-between'
            >
              {valueCategory ? (
                categories.find(
                  (category: comboOptions) => category.value === valueCategory
                )?.label
              ) : (
                <span className='text-xs font-normal opacity-60'>
                  Select category...
                </span>
              )}
              <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-[160px] p-0'>
            <Command>
              <CommandList>
                <CommandEmpty>No category found.</CommandEmpty>
                <CommandGroup>
                  {categories.map((category: comboOptions) => (
                    <CommandItem
                      key={category.value}
                      value={category.value}
                      onSelect={(currentValue) => {
                        setValueCategory(
                          currentValue === valueCategory ? '' : currentValue
                        );
                        setOpenCategory(false);
                      }}
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          valueCategory === category.value
                            ? 'opacity-100'
                            : 'opacity-0'
                        )}
                      />
                      <span className='text-xs'>{category.label}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <Popover open={openColor} onOpenChange={setOpenColor}>
          <PopoverTrigger asChild>
            <Button
              variant='outline'
              role='combobox'
              aria-expanded={openColor}
              className='w-[160px] justify-between'
            >
              <div
                className={`${getColor(
                  valueColor
                )} flex items-center justify-center w-4 h-4 rounded-full mr-2`}
              />
              {valueColor ? (
                <span className='text-xs font-normal opacity-60'>
                  {
                    colors.find(
                      (colors: comboOptions) => colors.value === valueColor
                    )?.label
                  }
                </span>
              ) : (
                <span className='text-xs font-normal opacity-60'>Color</span>
              )}
              <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-[125px] p-0'>
            <Command>
              <CommandList>
                <CommandEmpty>No color found.</CommandEmpty>
                <CommandGroup>
                  {colors.map((color: comboOptions) => (
                    <CommandItem
                      key={color.value}
                      value={color.value}
                      onSelect={(currentValue) => {
                        setValueColor(
                          currentValue === valueColor ? '' : currentValue
                        );
                        setOpenColor(false);
                      }}
                      className='flex w-full text-xs'
                    >
                      <div
                        className={`${getColor(
                          color.value
                        )} flex items-center justify-center w-4 h-4 rounded-full mr-2`}
                      >
                        <Check
                          className={cn(
                            'h-3 w-3 text-white',
                            valueColor === color.value
                              ? 'opacity-100'
                              : 'opacity-0'
                          )}
                        />
                      </div>
                      {color.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <input
          className={`${classInput} w-[50em]`}
          placeholder='Description'
          {...register('description', {
            required: "Description can't be empty",
          })}
        />
        {errors.description?.message && (
          <p className={classError}>{errors.description.message}</p>
        )}

        <Button className='' type='submit' variant='darkerOutline'>
          Add Shortcut
        </Button>
      </form>
    </>
  );
}

const colors = [
  {
    value: 'blue',
    label: 'Blue',
  },

  {
    value: 'green',
    label: 'Green',
  },
  {
    value: 'red',
    label: 'Red',
  },
  {
    value: 'orange',
    label: 'Orange',
  },
  {
    value: 'pink',
    label: 'Pink',
  },
  {
    value: 'black',
    label: 'Black',
  },
  {
    value: 'gray',
    label: 'Gray',
  },
];
