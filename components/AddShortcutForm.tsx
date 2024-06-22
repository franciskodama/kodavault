'use client';

import { useEffect, useState } from 'react';
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
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Check, ChevronsUpDown, Divide } from 'lucide-react';
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
  const [data, setData] = useState<ShortcutType>();
  const { toast } = useToast();
  const { user } = useUser();
  const uid = user?.emailAddresses?.[0]?.emailAddress;

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

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
  shortcutCategoriesKeys.map((category: string) => {
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

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant='outline'
              role='combobox'
              aria-expanded={open}
              className='w-[200px] justify-between'
            >
              {value ? (
                categories.find(
                  (category: shortcutCategory) => category.value === value
                )?.label
              ) : (
                <span className='text-xs font-normal opacity-60'>
                  Select category...
                </span>
              )}
              <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-[200px] p-0'>
            <Command>
              <CommandList>
                <CommandEmpty>No category found.</CommandEmpty>
                <CommandGroup>
                  {categories.map((category: shortcutCategory) => (
                    <CommandItem
                      key={category.value}
                      value={category.value}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? '' : currentValue);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          value === category.value ? 'opacity-100' : 'opacity-0'
                        )}
                      />
                      {category.label}
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
          {...register('name', { required: "Description can't be empty" })}
        />
        {errors.description?.message && (
          <p className={classError}>{errors.description.message}</p>
        )}

        <Button className='' type='submit'>
          Add Shortcut
        </Button>
      </form>
    </>
  );
}
