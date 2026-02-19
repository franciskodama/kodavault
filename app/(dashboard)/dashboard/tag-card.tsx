'use client';

import { useEffect, useState } from 'react';
import { AlertTriangle, XIcon, Tag } from 'lucide-react';
import { motion } from 'framer-motion';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  getTotalByKey,
  numberFormatterNoDecimals,
  thousandFormatter,
} from '@/lib/utils';
import { Asset } from '@/lib/types';
import { useAssetsContext } from '@/context/AssetsContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function TagCard() {
  const [tagInput, setTagInput] = useState<string>('');
  const { assets } = useAssetsContext();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const tagLocalStorage = window?.localStorage?.getItem('tag');
      if (tagLocalStorage) {
        setTagInput(tagLocalStorage);
      }
    }
  }, []);

  const taggedAssets = assets.filter((asset) => asset?.tag === tagInput);

  const sortedArray = (arr: Asset[]) =>
    arr.sort((a: Asset, b: Asset) => b!.total! - a!.total!);

  const sortedTaggedAssets = sortedArray(taggedAssets);
  const totalArray = getTotalByKey(taggedAssets, 'tag');

  // If we need it in the future we can use this function / What's the limit (15)?
  // const limitedTaggedAssets = getLimitedNumberOfAssets(sortedTaggedAssets, 15);

  const handleChange = (value: string) => {
    setTagInput(value);
    window.localStorage.setItem('tag', value);
  };

  const handleClear = () => {
    setTagInput('');
    window.localStorage.removeItem('tag');
  };

  return (
    <>
      <Card className='h-full border-none shadow-sm'>
        <div className='flex flex-col h-full'>
          <div className='flex flex-col'>
            <CardHeader>
              <CardTitle className='capitalize flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <span className='font-semibold tracking-tight text-slate-900'>
                    Tag Explorer
                  </span>
                </div>
                <Tag size={24} className='text-slate-400' />
              </CardTitle>
            </CardHeader>
            <CardContent className='flex flex-col justify-between'>
              {sortedTaggedAssets.length < 1 ? (
                <>
                  <h3 className='text-sm font-bold my-1'>
                    Tag missing, total waiting!
                  </h3>
                  <p>
                    Add a tag to uncover the total amount you’ve invested in
                    assets linked to it!
                  </p>
                  <div className='flex items-center gap-2 mt-2'>
                    <AlertTriangle size={14} />
                    <p> Case sensitive.</p>
                  </div>
                </>
              ) : (
                <>
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 50, scale: 0.3 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{
                      opacity: 0,
                      scale: 0.5,
                      transition: { duration: 0.2 },
                    }}
                  >
                    <div className='grid grid-cols-2 mb-4 text-[10px] font-medium uppercase tracking-widest text-slate-400'>
                      <h3 className='text-left'>Asset</h3>
                      <h3 className='text-right'>Total</h3>
                    </div>

                    {sortedTaggedAssets.map((asset) => {
                      return (
                        <div key={asset?.id} className='my-2 relative'>
                          <div className='flex justify-between'>
                            <p className='ml-1 font-medium'>{asset?.asset}</p>
                            <p className='ml-1 font-medium'>
                              {asset?.total && thousandFormatter(asset?.total)}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </motion.div>
                </>
              )}
              <div className='flex items-center gap-2'>
                <Input
                  className='h-8 pl-1 w-[10ch] text-left text-sm font-bold bg-slate-50 border-slate-100'
                  placeholder='Tag...'
                  value={tagInput}
                  onChange={(e) => handleChange(e.target.value)}
                />
                <Button
                  onClick={() => handleClear()}
                  variant='secondary'
                  size='icon'
                  className='h-8 w-8'
                >
                  <XIcon size={12} />
                </Button>
              </div>
            </CardContent>
          </div>
          <CardFooter className='flex items-center justify-between p-6 pt-0 border-t border-slate-50 mt-auto'>
            <span className='text-[10px] font-semibold uppercase tracking-widest text-slate-400'>
              Total Portfolio
            </span>
            <span className='text-lg font-semibold text-slate-900 tracking-tighter'>
              {numberFormatterNoDecimals.format(
                totalArray.reduce((sum: number, item) => sum + item.total, 0)
              )}
            </span>
          </CardFooter>
        </div>
      </Card>
    </>
  );
}
