'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { classError } from '@/lib/classes';
import { numberFormatterNoDecimals, numberFormatter } from '../lib/utils';
import { Button } from './ui/button';
import { PackagePlusIcon, PencilIcon, Trash2Icon } from 'lucide-react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useUser } from '@clerk/nextjs';
import { Inputs, KeyAssetsPriced } from '@/lib/types';
import { SubmitHandler, useForm } from 'react-hook-form';
import { addKeyAsset, deleteKeyAsset } from '@/lib/actions';
import { toast } from './ui/use-toast';
import { useState } from 'react';

type formData = {
  asset: string;
};

export const CardKeyAssets = ({
  keyAssetsPriced,
}: {
  keyAssetsPriced: KeyAssetsPriced[];
}) => {
  return (
    <Card className='flex-1'>
      <div className='flex flex-col justify-between h-full'>
        <div className='flex flex-col'>
          <CardHeader>
            <CardTitle className='capitalize flex items-center justify-between'>
              <span>{`Key Assets`}</span>
              <span className='text-3xl'>🔑</span>
            </CardTitle>
            <CardDescription className='text-xs'>
              Assets to keep an eye on!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='grid grid-cols-3 mb-2 font-semibold text-center'>
              <h3 className='text-left'>Asset</h3>
              <h3>Price</h3>
              <h3 className='text-right'>Total</h3>
            </div>
            {keyAssetsPriced.length > 0 ? (
              keyAssetsPriced.map((item: KeyAssetsPriced) => (
                <div key={item.id} className='grid grid-cols-3 gap-4 mb-1'>
                  <h3>{item.asset}</h3>
                  <p className='text-right mr-4'>
                    ${numberFormatterNoDecimals.format(item.price)}
                  </p>
                  <p className='text-right'>
                    ${numberFormatter.format(item.total)}
                  </p>
                </div>
              ))
            ) : (
              <div className='flex justify-between'>
                <h3>No Key Assets Yet</h3>
              </div>
            )}
          </CardContent>
        </div>
        <CardFooter className='flex justify-between text-sm text-slate-500 font-medium m-1 p-2'>
          <DialogEditKeyAssets keyAssetsPriced={keyAssetsPriced} />
        </CardFooter>
      </div>
    </Card>
  );
};

export function DialogEditKeyAssets({
  keyAssetsPriced,
}: {
  keyAssetsPriced: KeyAssetsPriced[];
}) {
  const [data, setData] = useState<string>('');
  const { user } = useUser();
  const uid = user?.emailAddresses?.[0]?.emailAddress;

  const {
    register,
    watch,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({});

  const processForm: SubmitHandler<formData> = async (data) => {
    if (!uid) {
      return console.log('User not logged in');
    }

    const result = await addKeyAsset({
      ...data,
      asset: data.asset.toUpperCase(),
      uid: uid,
    });

    if (result) {
      toast({
        title: 'Key Asset added! 🎉',
        description: 'Your new Key Asset is already available.',
        variant: 'success',
      });
    } else {
      toast({
        title: '👻 Boho! Error occurred!',
        description: 'Your Key Asset was NOT added.',
        variant: 'destructive',
      });
    }

    // reset();
    // setData(data);
  };

  const handleClickDelete = async (id: string) => {
    const result = await deleteKeyAsset(id);
    if (result) {
      toast({
        title: 'Key Asset deleted! 🎉',
        description: 'Your Key Asset was deleted.',
        variant: 'success',
      });
    } else {
      toast({
        title: '👻 Boho! Error occurred!',
        description: 'Your Key Asset was NOT deleted.',
        variant: 'destructive',
      });
    }
    // reset();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size='md'>
          {keyAssetsPriced.length > 0 ? (
            <div className='flex items-center'>
              <PencilIcon size={16} className='mr-2' />
              <p>Edit List ({keyAssetsPriced.length})</p>
            </div>
          ) : (
            <div className='flex items-center'>
              <PackagePlusIcon size={16} className='mr-2' />
              <p>Add Asset</p>
            </div>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Key Assets List</DialogTitle>
          <DialogDescription>Add or Delete a Key Asset</DialogDescription>
        </DialogHeader>
        <div className='flex items-center gap-2'>
          <form onSubmit={handleSubmit(processForm)} className='py-8'>
            <div className='flex items-center'>
              <input
                className='border border-slate-200 h-10 p-2 rounded-xs w-full mr-2'
                placeholder='Asset Symbol'
                {...register('asset', { required: "Asset can't be empty" })}
              />
              {errors.asset?.message && (
                <p className={classError}>{errors.asset.message}</p>
              )}
              <Button type='submit'>Add</Button>
            </div>
          </form>
        </div>
        <div className='flex items-center gap-2'>
          <div className='flex flex-wrap py-2'>
            {keyAssetsPriced.map((item: KeyAssetsPriced) => (
              <div
                key={item.id}
                className='flex items-center 2-full my-1 p-2 border mr-4'
              >
                <h3 className='w-[4ch] m-2 font-semibold'>{item.asset}</h3>
                <Button
                  size='sm'
                  variant='ghost'
                  onClick={() => {
                    handleClickDelete(item.id);
                  }}
                >
                  <Trash2Icon size={16} className='mr-2' />
                </Button>
              </div>
            ))}
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant='ghost'>Im done!</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
