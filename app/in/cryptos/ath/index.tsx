'use client';

import { useEffect, useState } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import MessageInTable from '@/components/MessageInTable';
import { currencyFormatter } from '@/lib/utils';
import { CryptoWithAthAndProjections } from '@/lib/types';
import { DataTable } from './data-table';
import { columns } from './columns';

export type athTotals = {
  athTotal: number;
  athTotalExclusions: number;
};

export default function Ath({
  cryptosWithATHsAndProjections,
}: {
  cryptosWithATHsAndProjections: CryptoWithAthAndProjections[];
}) {
  const [exclusions, setExclusions] = useState(() => {
    if (typeof window !== 'undefined') {
      const localData = localStorage.getItem('cryptos-ath-exclusions');
      return localData ? JSON.parse(localData) : [];
    }
    return [];
  });

  useEffect(() => {
    try {
      const localData = JSON.parse(
        localStorage.getItem('cryptos-ath-exclusions') || '[]'
      );
      localData && setExclusions(localData);
    } catch (error) {
      console.error('Error loading from localStorage:', error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(
        'cryptos-ath-exclusions',
        JSON.stringify(exclusions)
      );
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }, [exclusions]);

  const sortedAthAssets: CryptoWithAthAndProjections[] =
    cryptosWithATHsAndProjections?.sort(
      (a: CryptoWithAthAndProjections, b: CryptoWithAthAndProjections) => {
        return Number(b.athXPotential) - Number(a.athXPotential);
      }
    );

  const getTotal = (assets: CryptoWithAthAndProjections[]) => {
    return assets?.reduce((sum: number, item: CryptoWithAthAndProjections) => {
      const currentAthTotalNumber = Number(item.athTotalNumber);
      return sum + currentAthTotalNumber;
    }, 0);
  };

  const exclusionsAssets = sortedAthAssets?.filter((item: any) => {
    return exclusions.includes(item.asset);
  });

  const athTotal = getTotal(sortedAthAssets);
  const athTotalExclusions = getTotal(exclusionsAssets);

  const totals: athTotals = {
    athTotal,
    athTotalExclusions,
  };

  return (
    <div className='flex flex-col w-full gap-2'>
      {sortedAthAssets?.length > 0 ? (
        <div className='w-full'>
          <Card>
            <div className='flex flex-col justify-between'>
              <div className='flex flex-col'>
                <CardHeader>
                  <CardTitle className='capitalize flex items-center justify-between'>
                    <span>Crypto ATH Estimation</span>
                    <span className='text-3xl'>🏅</span>
                  </CardTitle>
                  <CardDescription className='text-xs'>
                    All-Time High Estimation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {sortedAthAssets.length > 0 ? (
                    <div>
                      <DataTable
                        columns={columns}
                        data={sortedAthAssets}
                        setExclusions={setExclusions}
                        exclusions={exclusions}
                        totals={totals}
                      />
                    </div>
                  ) : (
                    <div className='my-32'>🙅🏻‍♀️ Not loaded yet</div>
                  )}
                </CardContent>
              </div>
              <CardFooter className='flex m-1 py-2 px-10 justify-between text-sm text-slate-500 font-medium bg-slate-50'>
                <h3>Total</h3>
                {currencyFormatter(athTotal)}
              </CardFooter>
            </div>
          </Card>
        </div>
      ) : (
        <MessageInTable
          image={'/looking-weird.webp'}
          objectPosition={'50% 5%'}
          alt={'I am broke'}
          title={'Hey, the blockchain’s waiting for you!'}
          subtitle={
            'Start stacking those coins and get ready to explore the crypto universe! To the moon! 🚀'
          }
          buttonCopy={'Add a Crypto Asset'}
          hasNoButton={false}
          formTitle={'Add a new Asset'}
          formSubtitle={'Add a New Asset and expand your investment portfolio.'}
        />
      )}
    </div>
  );
}
