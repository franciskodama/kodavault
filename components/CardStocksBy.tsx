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

export const CardStocksBy = ({
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
  const groupedByCustomKey = assets.reduce((acc: any, item: any) => {
    const value = item[customKey];
    if (!acc[value]) {
      acc[value] = [];
    }
    acc[value].push(item);
    return acc;
  }, {});

  const accKeys: string[] = Object.keys(groupedByCustomKey);

  // accKeys.map((key: string) => {
  // console.log('---  🚀 ---> | key:', key);
  // console.log('---  🚀 ---> |  SPECIAL ---:', groupedByCustomKey[key]);

  //   groupedByCustomKey.key.map((item: any) => {
  //     console.log('---  🚀 ---> | item:', item);
  //   });
  // });

  console.log('---  🚀 ---> | accKeys:', accKeys);
  console.log('---  🚀 ---> | groupedByCustomKey:', groupedByCustomKey);

  const totalArray = getTotalByKey(assets, customKey);
  const sortedArray = totalArray.sort((a, b) => b.total - a.total);
  const total = totalArray.reduce((sum: number, item) => sum + item.total, 0);

  return (
    <Card className='flex-1'>
      <div className='flex flex-col justify-between h-full'>
        <div className='flex flex-col'>
          <CardHeader>
            <CardTitle className='capitalize flex items-center justify-between'>
              <span>{`Stocks By ${customKey}`}</span>
              <span className='text-3xl'>{emoji}</span>
            </CardTitle>
            <CardDescription className='text-xs'>{description}</CardDescription>
          </CardHeader>
          <CardContent>
            {/* --------------------------------------------------- */}
            {accKeys.map((key: string) => (
              <div key={key} className='border rounded-[2px] mb-2 p-2'>
                <h3 className='uppercase font-bold text-md flex justify-between text-primary mt-2 mb-4'>
                  {key}
                </h3>
                {groupedByCustomKey[key].map((item: any) => (
                  <div key={item.value} className='flex justify-between'>
                    <h3>{item.asset}</h3>
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

                <CardFooter className='flex justify-between text-xs text-slate-500 font-medium bg-slate-50 mt-2 p-2'>
                  <h3>Total</h3>
                  {numberFormatterNoDecimals.format(
                    totalArray.reduce(
                      (sum: number, item) => sum + item.total,
                      0
                    )
                  )}
                </CardFooter>
              </div>
            ))}

            {/* --------------------------------------------------- */}
            {/* {groupedByCustomKey.accKeys[0].map((item: any) => (
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
            ))} */}

            {/* 
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
            ))} */}
          </CardContent>
        </div>
        {/* <CardFooter className='flex justify-between text-sm text-slate-500 font-medium bg-slate-50 m-1 p-2'>
          <h3>Total</h3>
          {numberFormatterNoDecimals.format(
            totalArray.reduce((sum: number, item) => sum + item.total, 0)
          )}
        </CardFooter> */}
      </div>
    </Card>
  );
};
