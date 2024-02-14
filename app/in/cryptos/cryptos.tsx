'use client';

import CardAth from '@/components/CardAth';
import { CardNextPurchases } from '@/components/CardNextPurchases';
import { Loading } from '@/components/Loading';
import { useAssetsContext } from '@/context/AssetsContext';
import { useEffect, useState } from 'react';
import { DataTable } from './data-table';
import { columns } from './columns';
import { useUser } from '@clerk/nextjs';
import {
  getTotalByKey,
  numberFormatter,
  numberFormatterNoDecimals,
} from '@/lib/utils';
import { getCryptoGoals } from '@/lib/actions';
import { v4 as uuidv4 } from 'uuid';
import { CryptoGoals } from '@/lib/types';

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
        <div className='flex flex-wrap gap-2'>
          <DataTable columns={columns} data={dataTable} sumGoals={sumGoals} />
          <CardNextPurchases />
          <div className='flex flex-col gap-2'>
            <CardAth
              emoji={'🔮'}
              description={'All-Time High Estimation'}
              assets={assetsByType.Crypto}
            />
          </div>
        </div>
      )}
    </>
  );
}

// TODO: For edit pencil: https://ui.shadcn.com/docs/components/tooltip
// TODO: example: https://ui.shadcn.com/examples/tasks
// TODO: Add Priority

// TODO: Fix ILV and CRO that is saying to buy them
// TODO: Create button Clear and Minimum Amount (0.01)
// TODO: https://ui.shadcn.com/docs/components/tabs
// TODO: Criar TAGS para Crypto Assets? Safe, Gema, Risky, Bet

// TODO: Show the field (form) with the goal pulled from CoinGoal database
// TODO: If there is asset but there is no goal, create the fiedl with the value 0 and the user press save, it create the item on Coingoal
// TODO: Create button to save the goal for each asset (current line) + Save in the database
// TODO: What to do if there is a goal for a new asset the user desire, but they didn't buy it yet? They have see the goal to remember to buy it.

// TODO: What appears on SELL and BUY because of the goal, need to appear in the next purchases card

//------------------------------------------
// TODO: Next purchases: app see what is missing to complete the goal and show on card next purchases (crypto page and dashboard + alerts "you need to buy these bad boys!")
// TODO: Resistences and Supports?

// DONE:

{
  /* <CardCryptoGoals
              emoji={'🪙'}
              description={'Total by crypto and the amount to reach it'}
              assets={assetsByType.Crypto}
              customKey={'crypto'}
            /> */
}
