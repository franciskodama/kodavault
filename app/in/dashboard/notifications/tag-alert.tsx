'use client';

import { useRouter } from 'next/navigation';
import { SirenIcon } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Asset } from '@/lib/types';
import { Button } from '@/components/ui/button';
import {
  getFirstThreeAssets,
  getTotalByKey,
  numberFormatterNoDecimals,
  thousandFormatter,
} from '@/lib/utils';
import { useAssetsContext } from '@/context/AssetsContext';

export default function TagAlert() {
  const { assets, assetsByType } = useAssetsContext();
  const router = useRouter();

  const whatTag = 'gate';
  const taggedAssets = assets.filter((asset) => asset?.tag === 'gate');

  const sortedArray = (arr: Asset[]) =>
    arr.sort((a: Asset, b: Asset) => b!.total! - a!.total!);

  const sortedTaggedAssets = sortedArray(taggedAssets);

  const firstThreeAssets = getFirstThreeAssets(sortedTaggedAssets);
  const totalArray = getTotalByKey(taggedAssets, 'tag');

  return (
    <>
      <Card className='h-[250px]'>
        <div className='flex flex-col justify-between h-full'>
          <div className='flex flex-col'>
            <CardHeader>
              <CardTitle className='capitalize flex items-center justify-between'>
                <span>{`Tagged 'gate'`}</span>
                <span className='text-2xl'>🏷️</span>
              </CardTitle>
              <CardDescription className='text-xs'>
                Assets categorized under this tag
              </CardDescription>
            </CardHeader>
            <CardContent className='relative'>
              <h3 className='mb-2'>{`Here’s a look at your top performers:`}</h3>
              {firstThreeAssets.map((asset) => {
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
                          {asset?.total && thousandFormatter(asset?.total)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
              {sortedTaggedAssets.length > 3 && (
                <p className='absolute bottom-1'>...</p>
              )}
              {/* Stay on track and keep an eye on how these investments evolve! */}
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
