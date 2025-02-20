'use-client';

import { Loading } from '@/components/Loading';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import MessageInTable from '@/components/MessageInTable';
import { CryptoWithAthAndProjections } from '@/lib/types';
import { DataTable } from './data-table';
import { useEffect, useMemo, useState } from 'react';
import { getColumns } from './columns';

export default function Ranking({
  cryptosWithATHsAndProjections,
}: {
  cryptosWithATHsAndProjections: CryptoWithAthAndProjections[];
}) {
  const [tableData, setTableData] = useState(cryptosWithATHsAndProjections);

  const sortedAssetsWithProjections: CryptoWithAthAndProjections[] =
    cryptosWithATHsAndProjections.sort(
      (a: CryptoWithAthAndProjections, b: CryptoWithAthAndProjections) => {
        return Number(b.projectionXPotential) - Number(a.projectionXPotential);
      }
    );

  useEffect(() => {
    setTableData(sortedAssetsWithProjections);
  }, [sortedAssetsWithProjections]);

  const columns = useMemo(() => getColumns(setTableData), [setTableData]);

  if (!cryptosWithATHsAndProjections) {
    return <Loading />;
  }

  return (
    <div className='flex flex-col w-full gap-2'>
      {tableData.length > 0 ? (
        <div className='w-full'>
          <Card>
            <div className='flex flex-col justify-between'>
              <div className='flex flex-col'>
                <CardHeader>
                  <CardTitle className='capitalize flex items-center justify-between'>
                    <span>Crypto Ranking</span>
                    <span className='text-3xl mr-4'>🏆</span>
                  </CardTitle>
                  <CardDescription className='text-xs'>
                    Ranking of all crypto assets
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div>
                    <DataTable columns={columns} data={tableData} />
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
