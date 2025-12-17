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
  numberFormatterNoDecimals,
  getTotalByKey,
  numberFormatter,
} from '../lib/utils';
import { Asset, keyAssets } from '../lib/types';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import {
  CircleDashedIcon,
  PackagePlusIcon,
  PencilIcon,
  Trash2Icon,
} from 'lucide-react';
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

export const CardKeyAssets = () => {
  const router = useRouter();

  const keyAssets: string[] = ['BTC', 'ETH', 'MATIC', 'IVVB11'];

  const handleClick = () => {
    router.push('/in/assets?type=Cash');
  };

  return (
    <Card className='flex-1'>
      <div className='flex flex-col justify-between h-full'>
        <div className='flex flex-col'>
          <CardHeader>
            <CardTitle className='capitalize flex items-center justify-between'>
              <span>{`Crucial Assets`}</span>
              <span className='text-3xl'>🔑</span>
            </CardTitle>
            <CardDescription className='text-xs'>
              Assets to keep an eye on!
            </CardDescription>
          </CardHeader>
          <CardContent>
            {keyAssets.map((item: string) => (
              <div key={item} className='flex justify-between'>
                <h3>{item}</h3>
                <div className='flex'>
                  <p className='w-[8ch] text-right mr-4'>{`${numberFormatterNoDecimals.format(
                    // item.price
                    10
                  )}`}</p>
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
            ))}
          </CardContent>
        </div>
        <CardFooter className='flex justify-between text-sm text-slate-500 font-medium m-1 p-2'>
          <DialogEditAssetsList
            keyAssets={keyAssets}
            handleClick={handleClick}
          />
        </CardFooter>
      </div>
    </Card>
  );
};

export function DialogEditAssetsList({
  keyAssets,
}: // handleClick,
{
  keyAssets: keyAssets[];
  // handleClick: () => void[];
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {/* <Button variant='outline'>Share</Button> */}
        <Button
          size='md'
          // onClick={handleClick}
        >
          <PencilIcon size={16} className='mr-2' />
          {keyAssets.length > 3 ? (
            <p>
              Edit List
              {/* ({keyAssets.length}) */}
            </p>
          ) : (
            <p>
              <PackagePlusIcon size={16} className='mr-2' />
              Add Asset
            </p>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Crucial Assets List</DialogTitle>
          <DialogDescription>Delete or Add a Crucial Asset</DialogDescription>
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
          <Label htmlFor='link' className='sr-only'>
            Link
          </Label>
          <Input id='link' className='w-[12ch]' />
          <DialogClose asChild>
            <Button type='button'>Add</Button>
          </DialogClose>
        </div>
        {/* <DialogFooter className='sm:justify-start'>
         
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}
