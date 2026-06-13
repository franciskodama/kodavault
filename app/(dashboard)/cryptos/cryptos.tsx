'use client';

import Main from './main/main';
import { Loading } from '@/components/common/Loading';
import { useAssetsContext } from '@/context/AssetsContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AllocationGoals from './allocation-goals';
import Ath from './ath';
import Ranking from './ranking';
import Projections from './projections';
import Heatmap from './heatmap';
import { Asset, CryptoWithAthAndProjections } from '@/lib/types';
import {
  currencyFormatter,
  numberFormatter,
  numberFormatterNoDecimals,
} from '@/lib/utils';
import { useMemo } from 'react';

export type AllCryptosData = {
  symbol: string;
  ath: number;
  image?: string;
  market_cap_rank: number;
  current_price: number;
  market_cap: number;
  price_change_percentage_24h: number;
  total_volume: number;
  circulating_supply: number;
  max_supply: number;
};

export type ProjectionsData = {
  id: string;
  created_at: Date;
  uid: string;
  asset: string;
  source: string | null;
  note: string | null;
  projection?: number;
  projectionTotal?: number;
  projectionXPotential?: number;
  projectionPercentagePotential?: number;
};

export default function Cryptos({
  allCryptosData,
  projections,
}: {
  allCryptosData: AllCryptosData[];
  projections: ProjectionsData[];
}) {
  const { assetsByType, isLoading } = useAssetsContext();

  const cryptosWithATHsAndProjections: CryptoWithAthAndProjections[] =
    useMemo(() => {
      const addedAth: Asset[] =
        assetsByType.Crypto?.map((item: any) => {
          const existingAsset = allCryptosData.find(
            (el: AllCryptosData) => el.symbol === item.asset
          );
          return {
            ...item,
            ath: existingAsset?.ath ? existingAsset.ath : 0,
            image: existingAsset?.image ? existingAsset.image : '',
          };
        }) || [];

      const addedAthAndProjections: Asset[] = addedAth?.map((item: any) => {
        const existingAsset = projections.find(
          (el: ProjectionsData) => el.asset === item.asset
        );
        return {
          ...item,
          projection: existingAsset?.projection ? existingAsset.projection : 0,
          source: existingAsset?.source ? existingAsset.source : '',
          note: existingAsset?.note ? existingAsset.note : '',
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

      return sumQtyOfSameAssets?.map((item: any) => {
        return {
          asset: item.asset,
          image: item.image,
          price: currencyFormatter(item.price),
          priceNumber: item.price,
          qty: numberFormatter.format(item.qty),
          qtyNumber: item.qty,
          currentTotal: currencyFormatter(item.qty * item.price),
          ath: currencyFormatter(item.ath),
          athTotalNumber: item.ath * item.qty,
          athTotalCurrency: currencyFormatter(item.ath * item.qty),
          athXPotential: numberFormatter.format(item.ath / item.price),
          athPercentagePotential: numberFormatterNoDecimals.format(
            ((item.ath - item.price) / item.price) * 100
          ),
          projection: item.projection,
          projectionTotal: item.projection
            ? currencyFormatter(item.projection * item.qty)
            : currencyFormatter(item.price * item.qty),
          projectionTotalNumber: item.projection
            ? item.projection * item.qty
            : item.price * item.qty,
          projectionXPotential: numberFormatter.format(
            (item.projection * item.qty) / (item.price * item.qty)
          ),
          projectionPercentagePotential: item.projection
            ? numberFormatterNoDecimals.format(
                ((item.projection - item.price) / item.price) * 100
              )
            : 0,
          source: item.source,
          note: item.note,
        };
      });
    }, [assetsByType.Crypto, allCryptosData, projections]);

  return (
    <>
      {isLoading ? (
        <div className='flex justify-center items-center h-[70em]'>
          <Loading />
        </div>
      ) : (
        <div className='flex flex-col gap-1 px-8 sm:p-0'>
          <div className='flex flex-col sm:flex-row justify-between items-end mb-10 px-4 sm:px-0'>
            <div className='flex items-center gap-4 mt-8'>
              <div className='w-1 h-10 bg-[#22C55E] rounded-lg' />
              <div className='flex flex-col'>
                <p className='text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 leading-none mb-1'>
                  Market Hub
                </p>
                <h1 className='text-xl font-bold text-slate-900 tracking-tight leading-none'>
                  Cryptocurrency Portfolio
                </h1>
              </div>
            </div>
          </div>
          {assetsByType.Crypto && (
            <>
              <div className='flex w-full gap-2'>
                <Tabs defaultValue='main' className='w-full'>
                  <TabsList className='px-4 ml-4 sm:px-0'>
                    <TabsTrigger value='main'>Main</TabsTrigger>
                    <TabsTrigger value='heatmap'>Heatmap</TabsTrigger>
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
                      allCryptosData={allCryptosData}
                    />
                  </TabsContent>

                  <TabsContent value='heatmap' className='mt-4'>
                    <Heatmap />
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
                    <Ranking allCryptosData={allCryptosData} />
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
