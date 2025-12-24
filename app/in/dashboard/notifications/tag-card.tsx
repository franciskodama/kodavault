'use client';

import { useEffect, useState } from 'react';
import { AlertTriangle, XIcon } from 'lucide-react';
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
  getLimitedNumberOfAssets,
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
      <Card className='h-full'>
        <div className='flex flex-col justify-between h-full'>
          <div className='flex flex-col'>
            <CardHeader>
              <CardTitle className='capitalize flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <span>{`Tag`}</span>
                  <Input
                    className='h-8 pl-1 w-[8ch] text-left text-xl font-semibold'
                    placeholder={tagInput}
                    value={tagInput}
                    onChange={(e) => handleChange(e.target.value)}
                  />
                  <Button
                    onClick={() => handleClear()}
                    variant='outline'
                    className='h-8 rounded-[2px] px-1'
                  >
                    <XIcon size={16} className='text-slate-300' />
                  </Button>
                </div>
                <span className='text-2xl'>🏷️</span>
              </CardTitle>
              <CardDescription className='text-xs'>
                Assets categorized under this tag
              </CardDescription>
            </CardHeader>
            <CardContent className='relative'>
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
                    <h3 className='mb-2'>{`Here’s a look at your top performers:`}</h3>
                    {sortedTaggedAssets.map((asset) => {
                      return (
                        <div key={asset?.id} className='my-[4px] relative'>
                          <div className='flex w-full'>
                            <div className='flex w-3/5'>
                              <p className='text-[10px]'>Asset:</p>
                              <p className='ml-1 font-bold'>{asset?.asset}</p>
                            </div>
                            <div className='flex w-2/5'>
                              <p className='text-[10px]'>Total:</p>
                              <p className='ml-1 font-bold'>
                                {asset?.total &&
                                  thousandFormatter(asset?.total)}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </motion.div>
                  {/* {sortedTaggedAssets.length > 3 && (
                    <p className='absolute bottom-1'>...</p>
                  )} */}
                </>
              )}
            </CardContent>
          </div>
          <CardFooter className='flex justify-between text-sm text-slate-500 font-medium bg-slate-50 m-1 p-2'>
            <h3>Total</h3>
            {numberFormatterNoDecimals.format(
              totalArray.reduce((sum: number, item) => sum + item.total, 0)
            )}
          </CardFooter>
        </div>
      </Card>
    </>
  );
}
