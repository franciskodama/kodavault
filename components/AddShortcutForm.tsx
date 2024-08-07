'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useForm, SubmitHandler, Form } from 'react-hook-form';

import { addShortcut } from '@/lib/actions';
import { Button } from './ui/button';
import { ShortcutType } from '@/lib/types';
import { useToast } from './ui/use-toast';
import {
  Command,
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
import { allCategories, allColors, getColor } from '@/app/in/shortcut/shortcut';
import { category_enum_f421eb4b, color_enum_bd2ecc46 } from '@prisma/client';

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
  const [valueCategory, setValueCategory] = useState<string | null>(null);

  const [openColor, setOpenColor] = useState(false);
  const [valueColor, setValueColor] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ShortcutType>({});

  const classLi = 'flex flex-col';
  const classInput = 'border border-slate-200 h-10 p-2 rounded-xs';
  const classError = 'text-red-500 font-bold my-2 ml-2';

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

  let colors: any = [];
  allColors.map((color: string) => {
    const colorObj = {
      value: color,
      label: color,
    };
    colors.push(colorObj);
  });

  useEffect(() => {
    setValue('color', valueColor as color_enum_bd2ecc46 | null);
  }, [valueColor, setValue]);

  useEffect(() => {
    setValue('category', valueCategory as category_enum_f421eb4b | null);
  }, [valueCategory, setValue]);

  return (
    <>
      <form onSubmit={handleSubmit(processForm)}>
        <ul className='flex items-start gap-2'>
          <li className={classLi}>
            <input
              className={`${classInput} w-[20ch]`}
              placeholder='Title'
              {...register('name', { required: "Title can't be empty" })}
            />
            {errors.name?.message && (
              <p className={classError}>{errors.name.message}</p>
            )}
          </li>

          <li className={classLi}>
            <input
              className={`${classInput} w-[20ch]`}
              placeholder='From (ex.: Coinglass)'
              {...register('from', { required: "From can't be empty" })}
            />
            {errors.from?.message && (
              <p className={classError}>{errors.from.message}</p>
            )}
          </li>

          <li className={classLi}>
            <input
              className={`${classInput} w-[20ch]`}
              placeholder='Url'
              {...register('url', { required: "Url can't be empty" })}
            />
            {errors.url?.message && (
              <p className={classError}>{errors.url.message}</p>
            )}
          </li>

          <li className={classLi}>
            <Popover open={openCategory} onOpenChange={setOpenCategory}>
              <PopoverTrigger asChild>
                <Button
                  variant='outline'
                  role='combobox'
                  aria-expanded={openCategory}
                  className='w-[125px]'
                >
                  {valueCategory ? (
                    <span className='text-xs font-normal opacity-60 capitalize'>
                      {
                        categories.find(
                          (category: comboOptions) =>
                            category.value === valueCategory
                        )?.label
                      }
                    </span>
                  ) : (
                    <span className='text-xs font-normal opacity-60'>
                      Category
                    </span>
                  )}
                  <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-[125px] p-0'>
                <Command>
                  <CommandList>
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
                          <span className='text-xs capitalize'>
                            {category.label}
                          </span>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </li>

          <li className={classLi}>
            <Popover open={openColor} onOpenChange={setOpenColor}>
              <PopoverTrigger asChild>
                <Button
                  variant='outline'
                  role='combobox'
                  aria-expanded={openColor}
                  className='w-[125px]'
                >
                  <div
                    className={`${
                      valueColor && getColor(valueColor)
                    } flex items-center justify-center w-4 h-4 rounded-full mr-2`}
                  />
                  {valueColor ? (
                    <span className='text-xs font-normal opacity-60 capitalize'>
                      {
                        colors.find(
                          (color: comboOptions) => color.value === valueColor
                        )?.label
                      }
                    </span>
                  ) : (
                    <span className='text-xs font-normal opacity-60'>
                      Color
                    </span>
                  )}
                  <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-[125px] p-0'>
                <Command>
                  <CommandList>
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
          </li>

          <li className={`${classLi} w-full`}>
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
          </li>

          <li>
            <Button className='' variant='darkerOutline'>
              Add Shortcut
            </Button>
          </li>
        </ul>
      </form>
    </>
  );
}
