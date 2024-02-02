import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/ui/card';

import {
  numberFormatterNoDecimals,
  getTotalByKey,
  numberFormatter,
} from '../lib/utils';
import { Asset } from '../lib/types';
import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { getCryptoGoals } from '@/lib/actions';

type CryptoGoals = {
  id: number;
  uid: string;
  created_at?: Date;
  coin: string;
  goal: number;
};

type SortedArray = { value: string; total: number };

type MergedArrayItem = {
  value: string;
  total: number;
  goal: number;
};

export const CardCryptoGoals = ({
  assets,
  customKey,
  emoji = '',
  description = '',
}: {
  assets: Asset[];
  customKey: string;
  emoji?: string;
  description?: string;
}) => {
  const [cryptoGoals, setCryptoGoals] = useState<CryptoGoals[]>([]);
  const { user } = useUser();

  const totalArray = getTotalByKey(assets, customKey);
  const sortedArray = totalArray.sort((a, b) => b.total - a.total);
  const total = totalArray.reduce((sum: number, item) => sum + item.total, 0);

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

  // console.log('---  🚀 ---> | sortedArray:', sortedArray);
  // console.log('---  🚀 ---> | cryptoGoals:', cryptoGoals);

  const completeDataTable = ({
    cryptoGoals,
    sortedArray,
  }: {
    cryptoGoals: CryptoGoals[];
    sortedArray: SortedArray[];
  }) => {
    // Create a map for quick lookup of goals by coin
    const goalsMap = new Map(cryptoGoals.map((item) => [item.coin, item.goal]));

    // Create a map for quick lookup of totals by value
    const totalsMap = new Map(
      sortedArray.map((item) => [item.value, item.total])
    );

    // Merge the arrays
    const mergedArray: MergedArrayItem[] = [];

    // Iterate over sortedArray to add items to mergedArray, including goals (or 0 if not found)
    sortedArray.forEach(({ value, total }) => {
      const goal = goalsMap.has(value) ? goalsMap.get(value) : 0; // Get goal if exists, else 0
      mergedArray.push({ value, total, goal });
    });

    // Check if there are any coins in cryptoGoals not in sortedArray, and add them with total 0
    cryptoGoals.forEach(({ coin, goal }) => {
      if (!totalsMap.has(coin)) {
        // If coin not in totalsMap, add it to mergedArray with total 0
        mergedArray.push({ value: coin, total: 0, goal });
      }
    });

    return mergedArray;
  };

  const result = completeDataTable({ cryptoGoals, sortedArray });
  console.log('---  🚀 ---> | result:', result);

  return (
    <Card className='flex-1'>
      <div className='flex flex-col justify-between h-full'>
        <div className='flex flex-col'>
          <CardHeader>
            <CardTitle className='capitalize flex items-center justify-between'>
              <span>{`Coins + Goals`}</span>
              <span className='text-3xl'>{emoji}</span>
            </CardTitle>
            <CardDescription className='text-xs'>{description}</CardDescription>
          </CardHeader>
          <CardContent>
            {sortedArray.map((item) => (
              <div key={item.value} className='flex justify-between'>
                <h3>{item.value}</h3>
                <div className='flex'>
                  <p className='w-[8ch] text-right mr-4'>{`${numberFormatterNoDecimals.format(
                    item.total
                  )}`}</p>
                  <p
                    className={`text-white w-[8ch] px-1 m-1 text-center rounded-[2px] ${
                      (item.total / total) * 100 > 50
                        ? 'bg-red-500'
                        : 'bg-green-500'
                    }`}
                  >{`${numberFormatter.format(
                    (item.total / total) * 100
                  )}%`}</p>
                  {/* <p
                    className={`text-white w-[8ch] px-1 m-1 text-center rounded-[2px] ${
                      (item.total / total) * 100 > item.goal
                        ? 'bg-red-500'
                        : 'bg-green-500'
                    }`}
                  >{`${numberFormatter.format(
                    (item.total / total) * 100
                  )}%`}</p> */}
                </div>
              </div>
            ))}
          </CardContent>
        </div>
        <CardFooter className='flex justify-between text-sm text-slate-500 font-medium bg-slate-50 m-1 p-2'>
          <h3>Total</h3>
          {numberFormatterNoDecimals.format(
            totalArray.reduce((sum: number, item) => sum + item.total, 0)
          )}
        </CardFooter>
      </div>
    </Card>
  );
};

// TODO: Add Asset: if there isn't this asset symbol in the CoinGaol table, create it with goal = 0
// TODO: Card Crypto Goals: get all content of CoinGoal table for the current user
// TODO: Show the field (form) with the goal pulled from CoinGoal database
// TODO: If there is asset but there is no goal, create the fiedl with the value 0 and the user press save, it create the item on Coingoal
// TODO: Create button to save the goal for each asset (current line) + Save in the database
// TODO: What to do if there is a goal for a new asset the user desire, but they didn't buy it yet? They have see the goal to remember to buy it.

//------------------------------------------
// TODO: Next purchases: app see what is missing to complete the goal and show on card next purchases (crypto page and dashboard + alerts "you need to buy these bad boys!")
// TODO: Symbol + Amount (USD) + Percentage + Goal (%) + Goal (USD) + Observation (Look at Stochastic Analysis 4h, MACD 3D and W)
// TODO: Resistences and Supports?

// DONE:
// TODO: Create Server Action for getting Crypto Goals of this user
