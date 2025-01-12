'use client';

import Main from './main/main';
import { Loading } from '@/components/Loading';
import { useAssetsContext } from '@/context/AssetsContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AllocationGoals from './allocation-goals';
import AthProjections from './ath-projections';
import Ranking from './ranking';
import Projections from './projections';
import { Asset, AssetAllCryptoData } from '@/lib/types';
import {
  currencyFormatter,
  numberFormatter,
  numberFormatterNoDecimals,
} from '@/lib/utils';

export type athImageData = {
  symbol: string;
  ath: number;
  image?: string;
};

export type projectionsData = {
  symbol: string;
  projection: number;
  projectionTotal: number;
  projectionXPotential: number;
  projectionPercentagePotential: number;
};

export default function Cryptos({
  athImageData,
}: {
  athImageData: athImageData[];
}) {
  const { assetsByType, isLoading } = useAssetsContext();
  const cryptoAssets = assetsByType.Crypto;

  // ----------------------------------------

  const cryptoAssetsWithAth: Asset[] = cryptoAssets?.map((item: any) => {
    const existingAsset = athImageData.find(
      (el: athImageData) => el.symbol === item.asset
    );
    return {
      ...item,
      ath: existingAsset?.ath ? existingAsset.ath : 0,
      image: existingAsset?.image ? existingAsset.image : '',
    };
  });

  // --------------- Ready to use when projections are available ---------------
  // const cryptoAssetsWithAthAndProjections: Asset[] = cryptoAssetsWithAth?.map(
  //   (item: any) => {
  //     const existingAsset = projectionsData.find(
  //       (el: projectionsData) => el.symbol === item.asset
  //     );
  //     return {
  //       ...item,
  //       projection: existingAsset?.projection ? existingAsset.projection : 0,
  //       projectionTotal: existingAsset?.projectionTotal
  //         ? existingAsset.projectionTotal
  //         : 0,
  //       projectionXPotential: existingAsset?.projectionXPotential
  //         ? existingAsset.projectionXPotential
  //         : 0,
  //       projectionPercentagePotential:
  //         existingAsset?.projectionPercentagePotential
  //           ? existingAsset.projectionPercentagePotential
  //           : 0,
  //     };
  //   }
  // );

  const sumQtyOfSameAssets: Asset[] = cryptoAssetsWithAth?.reduce(
    (acc: any, item: any) => {
      const existingAsset = acc.find((el: any) => el.asset === item.asset);
      if (existingAsset) {
        existingAsset.qty += item.qty;
        existingAsset.currentTotal += item.total;
      } else {
        acc.push(item);
      }
      return acc;
    },
    []
  );

  const allCryptoData: AssetAllCryptoData[] = sumQtyOfSameAssets?.map(
    (item: any) => {
      return {
        asset: item.asset,
        image: item.image,
        price: currencyFormatter(item.price),
        qty: numberFormatter.format(item.qty),
        currentTotal: currencyFormatter(item.qty * item.price),
        ath: currencyFormatter(item.ath),
        athTotalNumber: item.ath * item.qty,
        athTotalCurrency: currencyFormatter(item.ath * item.qty),
        athXPotential: numberFormatter.format(item.ath / item.price),
        athPercentagePotential: numberFormatterNoDecimals.format(
          ((item.ath - item.price) / item.price) * 100
        ),
        // projection: currencyFormatter(item.ath),
        // projectionTotal: currencyFormatter(item.ath * item.qty),
        // projectionXPotential: numberFormatter.format(item.ath / item.price),
        // projectionPercentagePotential: numberFormatterNoDecimals.format(
        //   ((item.ath - item.price) / item.price) * 100
        // ),
      };
    }
  );

  // const sortedAthAssets: AssetWithAth[] = athAssets?.sort(
  //   (a: AssetWithAth, b: AssetWithAth) => {
  //     return Number(b.athXPotential) - Number(a.athXPotential);
  //   }
  // );

  // ----------------------------------------
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
                    <AthProjections allCryptoData={allCryptoData} />
                  </TabsContent>
                  <TabsContent value='projections' className='mt-4'>
                    <Projections assets={assetsByType.Crypto} />
                  </TabsContent>
                  <TabsContent value='ranking' className='mt-4'>
                    {/* <Ranking assets={assetsByType.Crypto} /> */}
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
