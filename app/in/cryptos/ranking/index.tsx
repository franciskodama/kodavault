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
import { AllCryptosData } from '../cryptos';
import { columns } from './columns';

export type athTotals = {
  athTotal: number;
  athTotalExclusions: number;
};

export default function Ranking({
  allCryptosData,
}: {
  allCryptosData: AllCryptosData[];
}) {
  const sortedRanking: AllCryptosData[] = allCryptosData?.sort(
    (a: AllCryptosData, b: AllCryptosData) => {
      return Number(b.market_cap_rank) - Number(a.market_cap_rank);
    }
  );

  return (
    <div className='flex flex-col w-full gap-2'>
      {sortedRanking?.length > 0 ? (
        <div className='w-full'>
          <Card>
            <div className='flex flex-col justify-between'>
              <div className='flex flex-col'>
                <CardHeader>
                  <CardTitle className='capitalize flex items-center justify-between'>
                    <span>Crypto ATH Estimation</span>
                    <span className='text-3xl mr-4'>⛰️</span>
                  </CardTitle>
                  <CardDescription className='text-xs'>
                    All-Time High Estimation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {sortedRanking.length > 0 ? (
                    <div>
                      <DataTable data={sortedRanking} columns={columns} />
                    </div>
                  ) : (
                    <div className='my-32'>🙅🏻‍♀️ Not loaded yet</div>
                  )}
                </CardContent>
              </div>
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
