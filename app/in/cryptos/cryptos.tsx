'use client';

import { AnimatePresence, motion } from 'framer-motion';

import Main from './main/main';
import { Loading } from '@/components/Loading';
import MessageInTable from '@/components/MessageInTable';
import { useAssetsContext } from '@/context/AssetsContext';
import { CardNextPurchases } from '@/components/CardNextPurchases';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PriceProjections from './price-projections';
import AllocationGoals from './allocation-goals';
import AthProjections from './ath-projections';

export default function Cryptos() {
  const { assetsByType, isLoading } = useAssetsContext();

  return (
    <>
      {isLoading ? (
        <div className='flex justify-center items-center h-[70em]'>
          <Loading />
        </div>
      ) : (
        <div>
          {assetsByType.Crypto.length > 0 ? (
            <>
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
                    <Main assets={assetsByType.Crypto} />
                  </TabsContent>

                  <TabsContent
                    value='allocation-goals'
                    className='flex gap-2 mt-4'
                  >
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
            </>
          ) : (
            <>
              <MessageInTable
                image={'/looking-weird.webp'}
                objectPosition={'50% 5%'}
                alt={'I am broke'}
                title={'Hey, the blockchain’s waiting for you!'}
                subtitle={
                  'Start stacking those coins and get ready to explore the crypto universe! To the moon! 🚀'
                }
                buttonCopy={'Add a Crypto Asset'}
                hasNoButton={false}
                formTitle={'Add a new Asset'}
                formSubtitle={
                  'Add a New Asset and expand your investment portfolio.'
                }
              />
            </>
          )}
        </div>
      )}
    </>
  );
}
