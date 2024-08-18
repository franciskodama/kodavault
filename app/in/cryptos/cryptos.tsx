'use client';

import Main from './main/main';
import { Asset } from '@/lib/types';
import { Loading } from '@/components/Loading';
import { CardNextPurchases } from '@/components/CardNextPurchases';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import PriceProjections from './price-projections';
import AllocationGoals from './allocation-goals';
import AthProjections from './ath-projections';
import { useAssetsContext } from '@/context/AssetsContext';

export default function Cryptos() {
  const { assets, isLoading } = useAssetsContext();
  const cryptoAssets = assets.filter((asset) => asset?.type === 'Crypto');

  return (
    <>
      {cryptoAssets.length > 0 ? (
        <div className='flex w-full gap-2'>
          <Tabs defaultValue='main' className='w-full'>
            <TabsList>
              <TabsTrigger value='main'>Main</TabsTrigger>
              <TabsTrigger value='allocation-goals'>
                Allocation Goals
              </TabsTrigger>
              <TabsTrigger value='ath'>ATH Estimation</TabsTrigger>
              <TabsTrigger value='price-projections'>
                Price Projections
              </TabsTrigger>
            </TabsList>

            <TabsContent value='main' className='flex gap-2 mt-4'>
              <Main assets={cryptoAssets} />
            </TabsContent>

            <TabsContent value='allocation-goals' className='flex gap-2 mt-4'>
              <AllocationGoals assets={cryptoAssets} />
              <CardNextPurchases />
            </TabsContent>

            <TabsContent value='ath' className='mt-4'>
              <AthProjections assets={cryptoAssets} />
            </TabsContent>

            <TabsContent value='price-projections' className='mt-4'>
              <PriceProjections assets={cryptoAssets} />
            </TabsContent>
          </Tabs>
        </div>
      ) : (
        <div className='flex justify-center items-center h-[70em]'>
          <Loading />
        </div>
      )}
    </>
  );
}
