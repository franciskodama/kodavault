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
import { getFirstThreeAssets, thousandFormatter } from '@/lib/utils';
import { useAssetsContext } from '@/context/AssetsContext';

export default function TagAlert() {
  const { assets, assetsByType } = useAssetsContext();
  console.log('---  🚀 ---> | assets:', assets);
  const router = useRouter();

  const whatTag = 'gate';

  const taggedAssets = assets.filter((asset) => asset?.tag === 'gate');
  console.log('---  🚀 ---> | taggedAssets:', taggedAssets);

  const sortedArray = (arr: Asset[]) =>
    arr.sort((a: Asset, b: Asset) => b!.total! - a!.total!);

  const sortedTaggedAssets = sortedArray(taggedAssets);
  console.log('---  🚀 ---> | sortedTaggedAssets:', sortedTaggedAssets);

  const handleClick = () => {
    router.push('/in/assets?tag=gate');
  };

  const firstThreeAssets = getFirstThreeAssets(sortedTaggedAssets);

  return (
    <>
      <Card className='h-[240px]'>
        <div className='flex flex-col justify-between h-full'>
          <div className='flex flex-col'>
            <CardHeader>
              <CardTitle className='capitalize flex items-center justify-between'>
                <span>{`Tagged 'gate'`}</span>
                <span className='text-3xl'>🏷️</span>
              </CardTitle>
              <CardDescription className='text-xs'>
                Assets categorized under this tag
              </CardDescription>
            </CardHeader>
            <CardContent className='relative'>
              {/* Here’s a quick glance at your top performers: */}
              Here’s a look at your top picks:
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
          <CardFooter className='flex justify-between text-sm text-slate-500 font-medium mx-1 px-2 pb-3'>
            {/* <Button size='md' onClick={handleClick}>
              <SirenIcon size={16} className='mr-2' />
              TEst
            </Button> */}
          </CardFooter>
        </div>
      </Card>
    </>
  );
}
