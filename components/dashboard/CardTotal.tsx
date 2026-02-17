'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  numberFormatterNoDecimals,
  getTotalByKey,
  numberFormatter,
  getQtyOfAssets,
} from '@/lib/utils';
import { Asset } from '@/lib/types';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { AddAssetForm } from '@/components/forms/AddAssetForm';
import { Gem, LucideIcon } from 'lucide-react';

export const CardTotal = ({
  assets,
  customKey,
  Icon,
  description = '',
  height = '',
  showQty,
}: {
  assets: Asset[];
  customKey: string;
  Icon?: LucideIcon;
  description?: string;
  height?: string;
  showQty?: boolean;
}) => {
  const totalArray = getTotalByKey(assets, customKey);
  const sortedArray = totalArray.sort((a, b) => b.total - a.total);
  const total = totalArray.reduce((sum: number, item) => sum + item.total, 0);

  return (
    <Card
      className={`w-full sm:flex-1 border-none shadow-sm ${
        height ? height : 'h-full'
      }`}
    >
      <div className='flex flex-col justify-between h-full'>
        <div className='flex flex-col'>
          <CardHeader>
            <CardTitle className='capitalize flex items-center justify-between'>
              <span className='font-semibold tracking-tight text-slate-900'>{`By ${customKey}`}</span>
              {Icon && <Icon size={24} className='text-slate-400' />}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {sortedArray.length < 1 ? (
              <div className='flex flex-col gap-2 py-4'>
                <h3 className='text-sm font-bold text-slate-900 capitalize'>
                  {customKey}
                  <span className='lowercase'>{`, where'd you go?`}</span>
                </h3>
                <p className='text-xs text-slate-500'>{`Curious about your ${customKey} total?`}</p>
                <p className='text-xs text-slate-500'>{`Let's fill in the blanks!`}</p>
              </div>
            ) : (
              <div className='flex flex-col gap-3'>
                {sortedArray.map((item) => (
                  <div
                    key={item.value}
                    className='flex justify-between items-center group'
                  >
                    <h3 className='text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors'>
                      {item.value}
                    </h3>
                    <div className='flex items-center gap-2'>
                      <p className='text-sm font-medium text-slate-900 tracking-tight'>{`${numberFormatterNoDecimals.format(
                        item.total
                      )}`}</p>
                      <p
                        className={`text-[10px] font-semibold w-[50px] py-1 text-center rounded-lg transition-all ${
                          (item.total / total) * 100 > 50
                            ? 'bg-red-50 text-red-600'
                            : 'bg-green-50 text-green-600'
                        }`}
                      >{`${numberFormatter.format(
                        (item.total / total) * 100
                      )}%`}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </div>
        <CardFooter
          className={`flex justify-between items-center px-6 py-4 border-t border-slate-50 ${
            sortedArray.length > 0 && 'bg-slate-50/50'
          }`}
        >
          {sortedArray.length < 1 ? (
            <>
              <Sheet>
                <SheetTrigger className='inline-flex text-xs font-semibold uppercase tracking-widest items-center h-10 rounded-xl px-4 bg-slate-900 text-white hover:bg-slate-800 transition-all'>
                  <Gem size={14} className='mr-2' />
                  Add {customKey}
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
              <h3 className='text-xs font-semibold uppercase tracking-widest text-slate-400'>
                Total
                {showQty && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <span className='ml-1 text-[10px] font-medium'>
                          ({getQtyOfAssets(assets)})
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Total items in category</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </h3>
              <span className='text-lg font-semibold text-slate-900 tracking-tighter'>
                {numberFormatterNoDecimals.format(
                  totalArray.reduce((sum: number, item) => sum + item.total, 0)
                )}
              </span>
            </>
          )}
        </CardFooter>
      </div>
    </Card>
  );
};
