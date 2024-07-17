'use client';

import { useAssetsContext } from '@/context/AssetsContext';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { Loading } from '@/components/Loading';
import { CardNextPurchases } from '@/components/CardNextPurchases';

import PriceProjections from './price-projections';
import AllocationGoals from './allocation-goals';
import AthProjections from './ath-projections';
import Main from './main/main';

export default function Cryptos() {
  const { assetsByType, isLoading } = useAssetsContext();

  return (
    <>
      {isLoading ? (
        <div className='flex justify-center items-center h-[70em]'>
          <Loading />
        </div>
      ) : (
        <div className='flex w-full gap-2'>
          <Tabs defaultValue='allocation-goals' className='w-full'>
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
              <Main assets={assetsByType.Crypto} />
            </TabsContent>

            <TabsContent value='allocation-goals' className='flex gap-2 mt-4'>
              <AllocationGoals assets={assetsByType.Crypto} />
              <CardNextPurchases />
            </TabsContent>

            <TabsContent value='ath' className='mt-4'>
              <AthProjections assets={assetsByType.Crypto} />
            </TabsContent>

            <TabsContent value='price-projections' className='mt-4'>
              <PriceProjections assets={assetsByType.Crypto} />
            </TabsContent>
          </Tabs>
        </div>
      )}
    </>
  );
}
