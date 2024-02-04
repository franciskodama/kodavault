'use client';

import CardAth from '@/components/CardAth';
import { CardCryptoGoals } from '@/components/CardCryptoGoals';
import { CardNextPurchases } from '@/components/CardNextPurchases';
import { Loading } from '@/components/Loading';
import { useAssetsContext } from '@/context/AssetsContext';
import { Asset } from '@/lib/types';
import { useEffect, useState } from 'react';
import { DataTable } from './data-table';
import { columns } from './columns';
import { useUser } from '@clerk/nextjs';
import { getTotalByKey } from '@/lib/utils';
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

type MergedArrayItem = {
  coin: string;
  total: number;
  goal?: number;
  obs?: string;
};

export default function Cryptos() {
  const { assetsByType, isLoading } = useAssetsContext();
  const [cryptoGoals, setCryptoGoals] = useState<CryptoGoals[]>([]);
  const [totalByCoin, setTotalByCoin] = useState<TotalByCoin[]>([]);
  const { user } = useUser();

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

  let total: number = 0;
  if (totalByCoin) {
    total = totalByCoin.reduce((sum: number, item) => sum + item.total, 0);
  }

  const completeDataTable = ({
    cryptoGoals,
    totalByCoin,
    total,
  }: {
    cryptoGoals: CryptoGoals[];
    totalByCoin: TotalByCoin[];
    total: number;
  }) => {
    // Create a map for quick lookup of goals by coin
    const goalsMap = new Map(cryptoGoals.map((item) => [item.coin, item.goal]));

    // Create a map for quick lookup of totals by value
    const totalsMap = new Map(
      totalByCoin.map((item) => [item.value, item.total])
    );

    // Merge the arrays
    const mergedArray: MergedArrayItem[] = [];

    // Iterate over sortedArray to add items to mergedArray, including goals (or 0 if not found)
    totalByCoin.forEach(({ value, total }) => {
      const goal = goalsMap.has(value) ? goalsMap.get(value) : 0; // Get goal if exists, else 0
      mergedArray.push({ coin: value, total, goal });
    });

    // Check if there are any coins in cryptoGoals not in sortedArray, and add them with total 0
    cryptoGoals.forEach(({ coin, goal }) => {
      if (!totalsMap.has(coin)) {
        // If coin not in totalsMap, add it to mergedArray with total 0
        mergedArray.push({ coin, total: 0, goal, obs });
      }
    });
    return mergedArray;
  };

  const dataTable = completeDataTable({ cryptoGoals, totalByCoin, total });
  console.log('---  🚀 ---> | dataTable:', dataTable);

  return (
    <>
      {isLoading ? (
        <div className='flex justify-center items-center h-[70em]'>
          <Loading />
        </div>
      ) : (
        <>
          <DataTable columns={columns} data={dataTable} />
        </>
      )}
      {/* {!isLoading && cryptoAssets ? (
        <div>
          <div className='flex flex-col gap-2'>
            <CardCryptoGoals
              emoji={'🪙'}
              description={'Total by crypto and the amount to reach it'}
              assets={assetsByType.Crypto}
              customKey={'crypto'}
            />
            <CardAth
              emoji={'🔮'}
              description={'All-Time High Estimation'}
              assets={cryptoAssets}
            />
          </div>
        </div>
      ) : (
        <div className='flex items-center justify-center h-[30em]'>
          <Loading />
        </div>
      )} */}

      <div>
        <CardNextPurchases />
      </div>
    </>
  );
}

// TODO: Include Share data
// TODO: Include Observation field (Look at Stochastic Analysis 4h, MACD 3D and W)

// TODO: Add Asset: if there isn't this asset symbol in the CoinGaol table, create it with goal = 0
// TODO: Show the field (form) with the goal pulled from CoinGoal database
// TODO: If there is asset but there is no goal, create the fiedl with the value 0 and the user press save, it create the item on Coingoal
// TODO: Create button to save the goal for each asset (current line) + Save in the database
// TODO: What to do if there is a goal for a new asset the user desire, but they didn't buy it yet? They have see the goal to remember to buy it.

//------------------------------------------
// TODO: Next purchases: app see what is missing to complete the goal and show on card next purchases (crypto page and dashboard + alerts "you need to buy these bad boys!")
// TODO: Resistences and Supports?

// DONE:
// TODO: Create Server Action for getting Crypto Goals of this user
// TODO: Symbol + Amount (USD) + Percentage + Goal (%) + Goal (USD)
