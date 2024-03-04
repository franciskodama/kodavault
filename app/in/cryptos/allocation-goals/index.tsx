import { useEffect, useState } from 'react';

import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs';

import { Asset, CryptoGoals } from '../../../../lib/types';
import { DataTable } from './data-table';
import {
  getTotalByKey,
  numberFormatter,
  numberFormatterNoDecimals,
  thousandFormatter,
} from '../../../../lib/utils';
import { columns } from './columns';
import { getCryptoGoals } from '@/lib/actions';
import { Loading } from '../../../../components/Loading';

export type MergedArrayItem = {
  id: string;
  uid: string;
  coin: string;
  total: number | string;
  share: number | string;
  goal?: number;
  offset: number | string;
  priority?: 'High' | 'Medium' | 'Low' | null;
  obs?: string | null;
};

type TotalByCoin = { value: string; total: number };

export default function AllocationGoals({ assets }: { assets: Asset[] }) {
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
    if (assets) {
      const unsortedTotalByCoin = getTotalByKey(assets, 'crypto');
      const sortedTotalByCoin = unsortedTotalByCoin.sort(
        (a, b) => b.total - a.total
      );
      setTotalByCoin(sortedTotalByCoin);
    }
  }, [assets]);

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

      if (goalData?.coin === 'USDT') {
        return;
      }

      mergedArray.push({
        id: goalData ? goalData.id : uuidv4(),
        uid,
        coin: value,
        total: numberFormatterNoDecimals.format(total),
        share: `${numberFormatter.format((total / tableTotal) * 100)} %`,
        goal: goalData ? goalData.goal : 0,
        offset: thousandFormatter(
          Number(goalData && tableTotal * (goalData.goal / 100) - total)
        ),
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
          offset: 0,
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

  if (!sumGoals) {
    return (
      <div className='flex justify-center items-center w-full h-32'>
        <Loading />;
      </div>
    );
  }

  return (
    <>
      {sumGoals && (
        <div className='w-full'>
          <DataTable columns={columns} data={dataTable} sumGoals={sumGoals} />
        </div>
      )}
    </>
  );
}
