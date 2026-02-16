'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { classError } from '@/lib/classes';
import { numberFormatterNoDecimals, numberFormatter } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { PackagePlusIcon, PencilIcon, Trash2Icon, Key } from 'lucide-react';
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
import { addKeyAsset, deleteKeyAsset, getKeyAssets } from '@/lib/actions';
import { toast } from '@/components/ui/use-toast';
import { useState } from 'react';
import { v4 } from 'uuid';
import { useAssetsContext } from '@/context/AssetsContext';

type formData = {
  asset: string;
};

export const CardKeyAssets = ({
  keyAssetsPriced,
}: {
  keyAssetsPriced: KeyAssetsPriced[];
}) => {
  const [keyAssetsState, setKeyAssetsState] =
    useState<KeyAssetsPriced[]>(keyAssetsPriced);

  return (
    <Card className='flex-1 border-none shadow-sm'>
      <div className='flex flex-col h-full'>
        <div className='flex flex-col'>
          <CardHeader>
            <CardTitle className='capitalize flex items-center justify-between'>
              <span className='font-semibold tracking-tight text-slate-900'>
                Key Assets
              </span>
              <Key size={24} className='text-slate-400' />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='grid grid-cols-3 mb-4 text-[10px] font-bold uppercase tracking-widest text-slate-400'>
              <h3 className='text-left'>Asset</h3>
              <h3 className='text-center'>Price</h3>
              <h3 className='text-right'>Total</h3>
            </div>
            {keyAssetsState.length > 0 ? (
              <div className='flex flex-col gap-3'>
                {keyAssetsState.map((item: KeyAssetsPriced) => (
                  <div
                    key={item.id}
                    className='grid grid-cols-3 items-center group'
                  >
                    <h3 className='text-sm font-bold text-slate-600 group-hover:text-slate-900 transition-colors uppercase'>
                      {item.asset}
                    </h3>
                    <p className='text-sm font-semibold text-slate-900 tracking-tight text-center'>
                      ${numberFormatter.format(item.price)}
                    </p>
                    <p className='text-sm font-semibold text-slate-900 tracking-tight text-right'>
                      ${numberFormatter.format(item.total)}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className='flex justify-center py-6'>
                <h3 className='text-xs font-bold text-slate-400'>
                  No Key Assets Yet
                </h3>
              </div>
            )}
          </CardContent>
        </div>
        <CardFooter className='flex items-center justify-between p-6 pt-0 border-t border-slate-50 mt-auto'>
          <DialogEditKeyAssets
            keyAssetsState={keyAssetsState}
            setKeyAssetsState={setKeyAssetsState}
          />
          <div className='flex flex-col items-end'>
            <span className='text-[10px] font-semibold uppercase tracking-widest text-slate-400'>
              Total
            </span>
            <span className='text-lg font-semibold text-slate-900 tracking-tighter'>
              {numberFormatterNoDecimals.format(
                keyAssetsState.reduce(
                  (sum: number, item) => sum + item.total,
                  0
                )
              )}
            </span>
          </div>
        </CardFooter>
      </div>
    </Card>
  );
};

export function DialogEditKeyAssets({
  keyAssetsState,
  setKeyAssetsState,
}: {
  keyAssetsState: KeyAssetsPriced[];
  setKeyAssetsState: (data: KeyAssetsPriced[]) => void;
}) {
  const { user } = useUser();
  const uid = user?.emailAddresses?.[0]?.emailAddress;
  const { assets } = useAssetsContext();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({});

  const processForm: SubmitHandler<formData> = async (data) => {
    if (!uid) {
      return console.log('User not logged in');
    }

    const idKeyAsset = v4();

    const result = await addKeyAsset({
      ...data,
      asset: data.asset.toUpperCase(),
      uid: uid,
      id: idKeyAsset,
    });

    const assetTyped = assets.find(
      (item: any) => item.asset === data.asset.toUpperCase()
    );

    setKeyAssetsState([
      ...keyAssetsState,
      {
        asset: data.asset.toUpperCase(),
        uid: uid,
        id: idKeyAsset,
        price: assetTyped?.price || 0,
        total: assetTyped?.total || 0,
      },
    ]);

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
    reset();
  };

  const handleClickDelete = async (id: string) => {
    const result = await deleteKeyAsset(id);

    setKeyAssetsState(
      keyAssetsState.filter((item: KeyAssetsPriced) => item.id !== id)
    );

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
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size='md' className='ml-3'>
          {keyAssetsState.length > 0 ? (
            <div className='flex items-center'>
              <PencilIcon size={16} className='mr-2' />
              <p>
                Edit List{' '}
                <span className='text-xs font-light ml-1'>
                  ({keyAssetsState.length})
                </span>
              </p>
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
                className='border border-slate-200 h-10 p-2 rounded-xl w-full mr-2'
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
            {keyAssetsState.map((item: KeyAssetsPriced) => (
              <div
                key={item.id}
                className='flex items-center 2-full my-1 p-2 border mr-4'
              >
                <h3 className='w-[4ch] m-2 font-semibold'>{item.asset}</h3>
                <Button
                  size='sm'
                  variant='ghost'
                  onClick={() => {
                    handleClickDelete(item.id?.toString() ?? '');
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
