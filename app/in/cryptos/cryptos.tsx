'use client';

import Main from './main/main';
import { Loading } from '@/components/Loading';
import MessageInTable from '@/components/MessageInTable';
import { useAssetsContext } from '@/context/AssetsContext';
import { CardNextPurchases } from '@/components/CardNextPurchases';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PriceProjections from './price-projections';
import AllocationGoals from './allocation-goals';
import AthProjections from './ath-projections';

export type athImageData = {
  symbol: string;
  ath: number;
  image?: string;
};

export default function Cryptos({
  athImageData,
}: {
  athImageData: athImageData[];
}) {
  const { assetsByType, isLoading } = useAssetsContext();

  return (
    <>
      {isLoading ? (
        <div className='flex justify-center items-center h-[70em]'>
          <Loading />
        </div>
      ) : (
        <div>
          {assetsByType.Crypto && (
            <>
              <div className='flex w-full gap-2'>
                <Tabs defaultValue='main' className='w-full'>
                  <TabsList className='px-4 ml-4 sm:px-0'>
                    <TabsTrigger value='main'>Main</TabsTrigger>
                    <TabsTrigger value='allocation-goals'>
                      Allocation Goals
                    </TabsTrigger>
                    <TabsTrigger value='ath'>ATH Estimation</TabsTrigger>
                    {/* <TabsTrigger value='price-projections'>
                      Price Projections
                    </TabsTrigger> */}
                  </TabsList>

                  <TabsContent value='main' className='flex gap-2 mt-4'>
                    <Main assets={assetsByType.Crypto} />
                  </TabsContent>

                  <TabsContent
                    value='allocation-goals'
                    className='flex gap-2 mt-4'
                  >
                    <AllocationGoals
                      assets={assetsByType.Crypto}
                      athImageData={athImageData}
                    />
                  </TabsContent>

                  <TabsContent value='ath' className='mt-4'>
                    <AthProjections
                      assets={assetsByType.Crypto}
                      athImageData={athImageData}
                    />
                  </TabsContent>
                  {/* <TabsContent value='price-projections' className='mt-4'>
                    <PriceProjections assets={assetsByType.Crypto} />
                  </TabsContent> */}
                </Tabs>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
