import { useEffect, useState } from 'react';

import { v4 } from 'uuid';
import { useUser } from '@clerk/nextjs';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DataTable } from './data-table';
import { Asset, CryptoGoals } from '../../../../lib/types';
import {
  getTotalByKey,
  numberFormatter,
  numberFormatterNoDecimals,
  thousandFormatter,
} from '../../../../lib/utils';
import { columns } from './columns';
import { getCryptoGoals } from '@/lib/actions';
import MessageInTable from '@/components/MessageInTable';
import { AthImageData } from '../cryptos';

export type MergedArrayItem = {
  id: string;
  image: string;
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

export default function AllocationGoals({
  assets,
  athImageData,
}: {
  assets: Asset[];
  athImageData: AthImageData[];
}) {
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

    const getImageUrl = (value: string) => {
      const existingAsset = athImageData.find(
        (el: AthImageData) => el.symbol === value
      );
      return existingAsset?.image ? existingAsset.image : '';
    };
    totalByCoin.forEach(({ value, total }) => {
      const goalData = goalsMap.get(value);

      mergedArray.push({
        id: goalData ? goalData.id : v4(),
        image: getImageUrl(value),
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
          id: v4(),
          image: '',
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

  return (
    <div className='flex flex-col w-full gap-2'>
      {assets.length > 0 ? (
        <div className='w-full'>
          <Card>
            <div className='flex flex-col justify-between'>
              <div className='flex flex-col'>
                <CardHeader>
                  <CardTitle className='capitalize flex items-center justify-between'>
                    <span>Allocation Goals by Coin</span>
                    <span className='text-3xl mr-4'>🥅</span>
                  </CardTitle>
                  <CardDescription className='text-xs'>
                    Set the percentage of your portfolio you want to allocate to
                    each coin.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div>
                    <DataTable
                      columns={columns}
                      data={dataTable}
                      sumGoals={sumGoals}
                    />
                  </div>
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
