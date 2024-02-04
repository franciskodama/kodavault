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

type CryptoGoals = {
  id: number;
  uid: string;
  created_at?: Date;
  coin: string;
  goal: number;
  obs?: string | null;
};

type TotalByCoin = { value: string; total: number };

export type MergedArrayItem = {
  uid: string;
  value: string;
  total: number | string;
  share: number | string;
  goal?: number;
  obs?: string;
};

export default function Cryptos() {
  const { assetsByType, isLoading } = useAssetsContext();
  const [cryptoGoals, setCryptoGoals] = useState<CryptoGoals[]>([]);
  const [totalByCoin, setTotalByCoin] = useState<TotalByCoin[]>([]);
  const { user } = useUser();
  let uid: string | undefined = '';
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
        { uid: item.uid, goal: item.goal, obs: item.obs },
      ])
    );

    const totalsMap = new Map(
      totalByCoin.map((item) => [item.value, item.total])
    );

    const mergedArray: MergedArrayItem[] = [];

    totalByCoin.forEach(({ value, total }) => {
      const goalData = goalsMap.get(value);
      const goal = goalData ? goalData.goal : 0;
      const obs = goalData ? goalData.obs : null;
      mergedArray.push({
        uid,
        value,
        total: numberFormatterNoDecimals.format(total),
        share: `${numberFormatter.format((total / tableTotal) * 100)} %`,
        goal,
        obs: obs ?? '',
      });
    });

    cryptoGoals.forEach(({ coin, goal, obs }) => {
      if (!totalsMap.has(coin)) {
        mergedArray.push({
          uid,
          value: coin,
          total: 0,
          goal,
          obs: obs ?? '',
          share: 0,
        });
      }
    });
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
          <DataTable columns={columns} data={dataTable} />
          <CardNextPurchases />

          <div className='flex flex-col gap-2'>
            {/* <CardCryptoGoals
              emoji={'🪙'}
              description={'Total by crypto and the amount to reach it'}
              assets={assetsByType.Crypto}
              customKey={'crypto'}
            /> */}
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

// TODO: Show the field (form) with the goal pulled from CoinGoal database
// TODO: If there is asset but there is no goal, create the fiedl with the value 0 and the user press save, it create the item on Coingoal
// TODO: Create button to save the goal for each asset (current line) + Save in the database
// TODO: What to do if there is a goal for a new asset the user desire, but they didn't buy it yet? They have see the goal to remember to buy it.

// TODO: What appears on SELL and BUY because of the goal, need to appear in the next purchases card

//------------------------------------------
// TODO: Next purchases: app see what is missing to complete the goal and show on card next purchases (crypto page and dashboard + alerts "you need to buy these bad boys!")
// TODO: Resistences and Supports?

// DONE:
// TODO: Create Server Action for getting Crypto Goals of this user
// TODO: Symbol + Amount (USD) + Percentage + Goal (%) + Goal (USD)
// TODO: Include Share data
// TODO: Include Observation field (Look at Stochastic Analysis 4h, MACD 3D and W)
// TODO: Add Asset: if there isn't this asset symbol in the CoinGaol table, create it with goal = 0
