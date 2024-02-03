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

  const dataTable = completeDataTable({ cryptoGoals, sortedArray });
  console.log('---  🚀 ---> | dataTable:', dataTable);

  return (
    <>
      {dataTable && dataTable.length > 0 && (
        <Card className='flex-1'>
          <div className='flex flex-col justify-between h-full'>
            <div className='flex flex-col'>
              <CardHeader>
                <CardTitle className='capitalize flex items-center justify-between'>
                  <span>{`Coins + Goals`}</span>
                  <span className='text-3xl'>{emoji}</span>
                </CardTitle>
                <CardDescription className='text-xs'>
                  {description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {dataTable.map((item) => (
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

                      <p
                        className={`text-white w-[8ch] px-1 m-1 text-center rounded-[2px] ${
                          item.goal === 0
                            ? 'bg-blue-500'
                            : (item.total / total) * 100 > item.goal
                            ? 'bg-red-500'
                            : 'bg-green-500'
                        }`}
                      >
                        {`${item.goal} %`}
                      </p>
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
      )}
    </>
  );
};
