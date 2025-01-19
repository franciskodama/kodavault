'use client';

import Main from './main/main';
import { Loading } from '@/components/Loading';
import { useAssetsContext } from '@/context/AssetsContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AllocationGoals from './allocation-goals';
import Ath from './ath';
import Ranking from './ranking';
import Projections from './projections';
import { Asset, CryptoWithAthAndProjections } from '@/lib/types';
import {
  currencyFormatter,
  numberFormatter,
  numberFormatterNoDecimals,
} from '@/lib/utils';

export type AthImageData = {
  symbol: string;
  ath: number;
  image?: string;
};

export type ProjectionsData = {
  id: string;
  created_at: Date;
  uid: string;
  asset: string;
  source: string | null;
  // symbol: string;
  projection?: number;
  projectionTotal?: number;
  projectionXPotential?: number;
  projectionPercentagePotential?: number;
};

export default function Cryptos({
  athImageData,
  projections,
}: {
  athImageData: AthImageData[];
  projections: ProjectionsData[];
}) {
  const { assetsByType, isLoading } = useAssetsContext();

  const addedAth: Asset[] = assetsByType.Crypto?.map((item: any) => {
    const existingAsset = athImageData.find(
      (el: AthImageData) => el.symbol === item.asset
    );
    return {
      ...item,
      ath: existingAsset?.ath ? existingAsset.ath : 0,
      image: existingAsset?.image ? existingAsset.image : '',
    };
  });

  const addedAthAndProjections: Asset[] = addedAth?.map((item: any) => {
    const existingAsset = projections.find(
      (el: ProjectionsData) => el.asset === item.asset
    );
    // Check the formulas
    return {
      ...item,
      projection: existingAsset?.projection ? existingAsset.projection : 0,
      source: existingAsset?.source ? existingAsset.source : '',
      // projectionTotal: existingAsset?.projection
      //   ? existingAsset.projection * item.qty
      //   : 0,
      // projectionXPotential: existingAsset?.projection
      //   ? existingAsset.projection / item.price
      //   : 0,
      // projectionPercentagePotential: existingAsset?.projection
      //   ? existingAsset.projection - item.price / item.price
      //   : 0,
    };
  });

  const sumQtyOfSameAssets: Asset[] = addedAthAndProjections?.reduce(
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

  const cryptosWithATHsAndProjections: CryptoWithAthAndProjections[] =
    sumQtyOfSameAssets?.map((item: any) => {
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
        projection: currencyFormatter(item.projection),
        projectionTotal: currencyFormatter(item.projection * item.qty),
        projectionXPotential: numberFormatter.format(
          item.projection / item.price
        ),
        projectionPercentagePotential: numberFormatterNoDecimals.format(
          ((item.projection - item.price) / item.price) * 100
        ),
        source: item.source,
      };
    });

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
                    <Ath
                      cryptosWithATHsAndProjections={
                        cryptosWithATHsAndProjections
                      }
                    />
                  </TabsContent>
                  <TabsContent value='projections' className='mt-4'>
                    <Projections
                      cryptosWithATHsAndProjections={
                        cryptosWithATHsAndProjections
                      }
                    />
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
