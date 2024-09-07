'use client';

import { useRouter } from 'next/navigation';
import { Gem } from 'lucide-react';

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
import { Button } from './ui/button';

export const CardTotal = ({
  assets,
  customKey,
  emoji = '',
  description = '',
  height = '',
}: {
  assets: Asset[];
  customKey: string;
  emoji?: string;
  description?: string;
  height?: string;
}) => {
  const router = useRouter();
  const totalArray = getTotalByKey(assets, customKey);
  const sortedArray = totalArray.sort((a, b) => b.total - a.total);
  const total = totalArray.reduce((sum: number, item) => sum + item.total, 0);

  const handleClick = () => {
    router.push('/in/assets');
  };

  return (
    <Card className={`flex-1 ${height ? height : 'h-full'}`}>
      <div className='flex flex-col justify-between h-full'>
        <div className='flex flex-col'>
          <CardHeader>
            <CardTitle className='capitalize flex items-center justify-between'>
              <span>{`Total By ${customKey}`}</span>
              <span className='text-3xl'>{emoji}</span>
            </CardTitle>
            <CardDescription className='text-xs'>{description}</CardDescription>
          </CardHeader>
          <CardContent>
            {sortedArray.length < 1 ? (
              <>
                <h3 className='text-sm font-bold my-1 capitalize'>
                  {customKey}
                  <span className='lowercase'>{`, where'd you go?`}</span>
                </h3>
                <p className='mb-[1px]'>{`Curious about your ${customKey} total?`}</p>
                <p>{`Let's fill in the blanks!`}</p>
              </>
            ) : (
              <>
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
                    </div>
                  </div>
                ))}
              </>
            )}
          </CardContent>
        </div>
        <CardFooter
          className={`flex justify-between text-sm text-slate-500 font-medium m-1 p-2 ${
            sortedArray.length > 0 && 'bg-slate-50'
          }`}
        >
          {sortedArray.length < 1 ? (
            <>
              <Button size='md' onClick={handleClick}>
                <Gem size={16} className='mr-2' />
                Add an Asset
              </Button>
            </>
          ) : (
            <>
              <h3>Total</h3>
              {numberFormatterNoDecimals.format(
                totalArray.reduce((sum: number, item) => sum + item.total, 0)
              )}
            </>
          )}
        </CardFooter>
      </div>
    </Card>
  );
};
