'use client';

import { useEffect, useState } from 'react';
import { useAssetsContext } from '@/context/AssetsContext';

import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { CryptoGoals } from '@/lib/types';
import { getCryptoGoals } from '@/lib/actions';
import CardAth from '@/components/CardAth';
import { Loading } from '@/components/Loading';
import { CardNextPurchases } from '@/components/CardNextPurchases';
import { DataTable } from './data-table';
import { columns } from './columns';
import {
  getTotalByKey,
  numberFormatter,
  numberFormatterNoDecimals,
} from '@/lib/utils';

type TotalByCoin = { value: string; total: number };

export type MergedArrayItem = {
  id: string;
  uid: string;
  coin: string;
  total: number | string;
  share: number | string;
  goal?: number;
  priority?: 'High' | 'Medium' | 'Low' | null;
  obs?: string | null;
};

export default function Cryptos() {
  const { assetsByType, isLoading } = useAssetsContext();
  const [cryptoGoals, setCryptoGoals] = useState<CryptoGoals[]>([]);
  const [totalByCoin, setTotalByCoin] = useState<TotalByCoin[]>([]);
  const { user } = useUser();
  let uid: string | undefined = '';
  let sumGoals: number = 0;

  if (user) {
    uid = user.emailAddresses[0].emailAddress;
  }

  useEffect(() => {
    const fetchCryptoGoals = async () => {
      if (user) {
        try {
          const fetchedGoals = await getCryptoGoals(
            user.emailAddresses[0].emailAddress
          );
          if ('error' in fetchedGoals) {
            console.error('Error fetching crypto goals:', fetchedGoals.error);
            setCryptoGoals([]);
          } else {
            setCryptoGoals(fetchedGoals);
          }
        } catch (error) {
          console.error('Error fetching crypto goals:', error);
        }
      }
    };
    fetchCryptoGoals();
  }, [user]);

  useEffect(() => {
    if (assetsByType.Crypto) {
      const unsortedTotalByCoin = getTotalByKey(assetsByType.Crypto, 'crypto');
      const sortedTotalByCoin = unsortedTotalByCoin.sort(
        (a, b) => b.total - a.total
      );
      setTotalByCoin(sortedTotalByCoin);
    }
  }, [assetsByType]);

  let tableTotal: number = 0;
  if (totalByCoin) {
    tableTotal = totalByCoin.reduce((sum: number, item) => sum + item.total, 0);
  }

  const completeDataTable = ({
    cryptoGoals,
    totalByCoin,
    tableTotal,
    uid,
  }: {
    cryptoGoals: CryptoGoals[];
    totalByCoin: TotalByCoin[];
    tableTotal: number;
    uid: string;
  }) => {
    const goalsMap = new Map(
      cryptoGoals.map((item) => [
        item.coin,
        {
          id: item.id,
          uid: item.uid,
          coin: item.coin,
          goal: item.goal,
          priority: item.priority,
          obs: item.obs,
        },
      ])
    );

    const totalsMap = new Map(
      totalByCoin.map((item) => [item.value, item.total])
    );

    const mergedArray: MergedArrayItem[] = [];

    totalByCoin.forEach(({ value, total }) => {
      const goalData = goalsMap.get(value);
      mergedArray.push({
        id: goalData ? goalData.id : uuidv4(),
        uid,
        coin: value,
        total: numberFormatterNoDecimals.format(total),
        share: `${numberFormatter.format((total / tableTotal) * 100)} %`,
        goal: goalData ? goalData.goal : 0,
        priority: goalData ? goalData.priority : null,
        obs: goalData ? goalData.obs : null,
      });
    });

    cryptoGoals.forEach(({ coin, goal, obs }) => {
      if (!totalsMap.has(coin)) {
        mergedArray.push({
          id: uuidv4(),
          uid,
          coin,
          total: 0,
          goal,
          obs: obs ?? '',
          share: 0,
        });
      }
    });

    sumGoals = mergedArray.reduce(
      (sum: number, item) => sum + Number(item.goal),
      0
    );

    return mergedArray;
  };

  const dataTable = completeDataTable({
    cryptoGoals,
    totalByCoin,
    tableTotal,
    uid,
  });

  return (
    <>
      {isLoading ? (
        <div className='flex justify-center items-center h-[70em]'>
          <Loading />
        </div>
      ) : (
        <div className='flex w-full gap-2'>
          <Tabs defaultValue='goals' className='w-full'>
            <TabsList>
              <TabsTrigger value='goals'>Allocation Goals</TabsTrigger>
              <TabsTrigger value='ath'>ATH Estimation</TabsTrigger>
            </TabsList>

            <TabsContent value='goals' className='flex gap-2 mt-4'>
              <DataTable
                columns={columns}
                data={dataTable}
                sumGoals={sumGoals}
              />
              <CardNextPurchases />
            </TabsContent>

            <TabsContent value='ath' className='mt-4'>
              <CardAth
                emoji={'🔮'}
                description={'All-Time High Estimation'}
                assets={assetsByType.Crypto}
              />
            </TabsContent>
          </Tabs>
        </div>
      )}
    </>
  );
}
