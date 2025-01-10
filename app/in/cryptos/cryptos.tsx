'use client';

import Main from './main/main';
import { Loading } from '@/components/Loading';
import { useAssetsContext } from '@/context/AssetsContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AllocationGoals from './allocation-goals';
import AthProjections from './ath-projections';
import Ranking from './ranking';
import Projections from './projections';

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
  const cryptoAssets = assetsByType.Crypto;

  // Put the logic of the Ath Data and Image in the crypto assets so we can use it in the other components

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
                    <TabsTrigger value='projections'>Projections</TabsTrigger>
                    <TabsTrigger value='ranking'>Ranking</TabsTrigger>
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
                  <TabsContent value='projections' className='mt-4'>
                    <Projections assets={assetsByType.Crypto} />
                  </TabsContent>
                  <TabsContent value='ranking' className='mt-4'>
                    <Ranking assets={assetsByType.Crypto} />
                  </TabsContent>
                </Tabs>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
