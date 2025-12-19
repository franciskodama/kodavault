'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import {
  classDiv,
  classError,
  classInput,
  classLabelRadio,
  classTitle,
  classUl,
} from '@/lib/classes';
import {
  numberFormatterNoDecimals,
  getTotalByKey,
  numberFormatter,
} from '../lib/utils';
import { useRouter } from 'next/navigation';
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { KeyAsset } from '@prisma/client';
import { useUser } from '@clerk/nextjs';
import { Inputs } from '@/lib/types';
import { SubmitHandler, useForm } from 'react-hook-form';
import { addKeyAsset } from '@/lib/actions';
import { toast } from './ui/use-toast';
import { useRef, useState } from 'react';

export const CardKeyAssets = ({ keyAssets }: { keyAssets: KeyAsset[] }) => {
  const router = useRouter();

  console.log('---  🚀 ---> | keyAssets from CardKeyAssets:', keyAssets);

  const handleClick = () => {
    // router.push('/in/assets?type=Cash');
    console.log('Click');
  };

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
            {keyAssets.length > 0 ? (
              keyAssets.map((item: KeyAsset) => (
                <div key={item.asset} className='flex justify-between'>
                  <h3>{item.asset}</h3>
                  <div className='flex'>
                    TEST
                    {/* <p className='w-[8ch] text-right mr-4'>{`${numberFormatterNoDecimals.format(
                      10
                    )}`}</p> */}
                    {/* <p
                    className={`text-white w-[8ch] px-1 m-1 text-center rounded-[2px] ${
                      (item.total / total) * 100 > 50
                        ? 'bg-red-500'
                        : 'bg-green-500'
                    }`}
                  >{`${numberFormatter.format(
                    (item.total / total) * 100
                  )}%`}</p> */}
                  </div>
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
          <DialogEditKeyAssets
            keyAssets={keyAssets}
            handleClick={handleClick}
          />
        </CardFooter>
      </div>
    </Card>
  );
};

type formData = {
  asset: string;
};

export function DialogEditKeyAssets({
  keyAssets,
  handleClick,
}: {
  keyAssets: KeyAsset[];
  handleClick: () => void;
}) {
  // const closeRef = useRef<HTMLButtonElement>(null);
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
    console.log('---  🚀 ---> | data:', data);
    if (!uid) {
      return console.log('User not logged in');
    }

    const result = await addKeyAsset({
      ...data,
      uid: uid,
    });
    console.log('---  🚀 ---> | result:', result);

    if (result) {
      toast({
        title: 'Key Asset added! 🎉',
        description: 'Your new Key Asset is already available.',
        variant: 'success',
      });
      // await refreshAssets();
      // closeRef.current?.click();
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

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size='md' onClick={handleClick}>
          {keyAssets.length > 0 ? (
            <div className='flex items-center'>
              <PencilIcon size={16} className='mr-2' />
              <p>Edit List ({keyAssets.length})</p>
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
          <DialogTitle>Crucial Assets List</DialogTitle>
          <DialogDescription>Add or Delete a Key Asset</DialogDescription>
        </DialogHeader>
        <div className='flex items-center gap-2'>
          <div className='flex flex-wrap py-2'>
            {keyAssets.map((item: any) => (
              <div
                key={item}
                className='flex items-center w-26 my-1 mr-4 p-3 border'
              >
                <h3 className='w-[6ch] mr-2 font-semibold'>{item}</h3>
                <Trash2Icon size={16} className='mr-2' />
              </div>
            ))}
          </div>
        </div>
        <div className='flex items-center gap-2'>
          {/* <Label htmlFor='link' className='sr-only'>
            Link
          </Label> */}
          <form onSubmit={handleSubmit(processForm)} className='py-8'>
            {/* <Input id='link' className='w-[12ch]' /> */}
            <div>
              {/* <label htmlFor='asset'> */}
              {/* Asset */}
              {/* </label> */}
              <input
                // className='w-[12ch]'
                className={classInput}
                placeholder='Asset Symbol'
                {...register('asset', { required: "Asset can't be empty" })}
              />
              {errors.asset?.message && (
                <p className={classError}>{errors.asset.message}</p>
              )}
            </div>
            <DialogClose asChild>
              <Button type='submit'>Add</Button>
            </DialogClose>
          </form>
        </div>
        {/* <DialogFooter className='sm:justify-start'>
         
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}
