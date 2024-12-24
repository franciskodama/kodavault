'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import {
  numberFormatterNoDecimals,
  getTotalByKey,
  numberFormatter,
  getQtyOfAssets,
} from '../lib/utils';
import { Asset } from '../lib/types';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { AddAssetForm } from './AddAssetForm';
import { Gem } from 'lucide-react';

export const CardTotal = ({
  assets,
  customKey,
  emoji = '',
  description = '',
  height = '',
  showQty,
}: {
  assets: Asset[];
  customKey: string;
  emoji?: string;
  description?: string;
  height?: string;
  showQty?: boolean;
}) => {
  const totalArray = getTotalByKey(assets, customKey);
  const sortedArray = totalArray.sort((a, b) => b.total - a.total);
  const total = totalArray.reduce((sum: number, item) => sum + item.total, 0);

  return (
    <Card className={`w-full sm:flex-1 ${height ? height : 'h-full'}`}>
      <div className='flex flex-col justify-between h-full'>
        <div className='flex flex-col'>
          <CardHeader>
            <CardTitle className='capitalize flex items-center justify-between'>
              <span>{`Total By ${customKey}`}</span>
              <span className='text-3xl'>
                {sortedArray.length < 1 ? '🤷🏻‍♂️' : emoji}
              </span>
            </CardTitle>
            <CardDescription className='text-xs'>{description}</CardDescription>
          </CardHeader>
          <CardContent>
            {sortedArray.length < 1 ? (
              <>
                <h3 className='text-sm font-bold my-1 capitalize'>
                  {customKey}
                  <span className='lowercase'>{`, where'd you go?`}</span>
                </h3>
                <p className='mb-[1px]'>{`Curious about your ${customKey} total?`}</p>
                <p>{`Let's fill in the blanks!`}</p>
              </>
            ) : (
              <>
                {sortedArray.map((item) => (
                  <div key={item.value} className='flex justify-between'>
                    <h3>{item.value}</h3>
                    <div className='flex'>
                      <p className='w-[8ch] text-right mr-4'>{`${numberFormatterNoDecimals.format(
                        item.total
                      )}`}</p>
                      <p
                        className={`text-white w-[8ch] px-1 m-1 text-center rounded-[2px] ${
                          (item.total / total) * 100 > 50
                            ? 'bg-red-500'
                            : 'bg-green-500'
                        }`}
                      >{`${numberFormatter.format(
                        (item.total / total) * 100
                      )}%`}</p>
                    </div>
                  </div>
                ))}
              </>
            )}
          </CardContent>
        </div>
        <CardFooter
          className={`flex justify-between text-sm text-slate-500 font-medium m-1 p-2 ${
            sortedArray.length > 0 && 'bg-slate-50'
          }`}
        >
          {sortedArray.length < 1 ? (
            <>
              <Sheet>
                <SheetTrigger className='inline-flex text-sm font-medium items-center h-8 rounded-[2px] px-3 bg-primary text-primary-foreground hover:bg-primary/90'>
                  <Gem size={16} className='mr-2' />
                  Add an Asset +
                  <span className='ml-1 capitalize'>{customKey}</span>
                </SheetTrigger>
                <SheetContent className='max-h-screen overflow-y-scroll'>
                  <SheetHeader>
                    <SheetTitle>Add a new Asset</SheetTitle>
                    <SheetDescription>
                      Add a New Asset and expand your investment portfolio.
                    </SheetDescription>
                  </SheetHeader>
                  <AddAssetForm />
                </SheetContent>
              </Sheet>
            </>
          ) : (
            <>
              <h3>
                Total
                {showQty && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <span className='ml-1 text-xs font-thin'>
                          ({getQtyOfAssets(assets)})
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Total of Items</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </h3>
              {numberFormatterNoDecimals.format(
                totalArray.reduce((sum: number, item) => sum + item.total, 0)
              )}
            </>
          )}
        </CardFooter>
      </div>
    </Card>
  );
};
