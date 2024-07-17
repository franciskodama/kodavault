import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';

import {
  numberFormatterNoDecimals,
  getTotalByKey,
  numberFormatter,
} from '../lib/utils';
import { Asset } from '../lib/types';

export const CardAssetsBy = ({
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
  // Main Card "Total By Stock"
  const totalArray = getTotalByKey(assets, customKey);
  const total = totalArray.reduce((sum: number, item) => sum + item.total, 0);

  // Other Cards
  const groupedByCustomKey = assets.reduce((acc: any, item: any) => {
    const value = item[customKey];
    if (!acc[value]) {
      acc[value] = [];
    }
    acc[value].push(item);

    return acc;
  }, {});

  const sortedArray = (arr: Asset[]) =>
    arr.sort((a: Asset, b: Asset) => b!.total! - a!.total!);

  const accKeys: string[] = Object.keys(groupedByCustomKey);

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
            {accKeys.map((key: string) => (
              <div key={key} className='border rounded-[2px] mb-2 p-2'>
                <h3 className='uppercase font-bold text-md flex justify-between text-primary mt-2 mb-4'>
                  {key}
                </h3>
                {sortedArray(groupedByCustomKey[key]).map((item: any) => (
                  <div key={item.total} className='flex justify-between'>
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
                        (item.total /
                          getTotalByKey(groupedByCustomKey[key], key).reduce(
                            (sum: number, item) => sum + item.total,
                            0
                          )) *
                          100
                      )}%`}</p>
                    </div>
                  </div>
                ))}

                <CardFooter className='flex justify-between text-xs text-slate-500 font-medium bg-slate-50 mt-2 p-2'>
                  <h3>Subtotal</h3>
                  {numberFormatterNoDecimals.format(
                    getTotalByKey(groupedByCustomKey[key], key).reduce(
                      (sum: number, item) => sum + item.total,
                      0
                    )
                  )}
                </CardFooter>
              </div>
            ))}
          </CardContent>
        </div>
      </div>
    </Card>
  );
};
