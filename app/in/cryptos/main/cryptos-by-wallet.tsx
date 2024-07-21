import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Asset } from '@/lib/types';
import {
  getTotalByKey,
  numberFormatter,
  numberFormatterNoDecimals,
} from '@/lib/utils';
import { TotalByWallet } from './main';

export default function CryptoByWallet({
  assets,
  totalByWallet,
}: {
  assets: Asset[];
  totalByWallet: TotalByWallet[];
}) {

  const groupedByWallet = assets.reduce((acc: any, item: any) => {
    const wallet = item.wallet;
    if (!acc[wallet]) {
      acc[wallet] = [];
    }
    acc[wallet].push(item);

    return acc;
  }, {});
  console.log('---  🚀 ---> | groupedByWallet:', groupedByWallet);
  
  const groupedAndSortedByLength = 






  const sortedArray = (arr: Asset[]) =>
    arr.sort((a: Asset, b: Asset) => b!.total! - a!.total!);






  const accKeys: string[] = Object.keys(groupedByWallet);

  return (
    <Card className='flex-1'>
      <div className='flex flex-col justify-between h-full'>
        <div className='flex flex-col'>
          <CardHeader>
            <CardTitle className='capitalize flex items-center justify-between'>
              <span>Cryptos By Wallet</span>
              <span className='text-3xl'>🏦</span>
            </CardTitle>
            <CardDescription className='text-xs'>
              Coins by Exchange
            </CardDescription>
          </CardHeader>

          <CardContent className='flex flex-wrap gap-2 w-full'>
            {accKeys.map((key: string) => (
              <div key={key} className='border rounded-[2px] mb-2 p-2 grow'>
                <h3 className='uppercase font-bold text-md flex justify-between text-primary mt-2 mb-4'>
                  {key}
                </h3>
                {/* {sortedArray(groupedByCustomKey[key]).map((item: any) => (
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
                ))} */}

                <CardFooter className='flex justify-between text-xs text-slate-500 font-medium bg-slate-50 mt-2 p-2'>
                  <h3>Subtotal</h3>
                  {/* {numberFormatterNoDecimals.format(
                    getTotalByKey(groupedByCustomKey[key], key).reduce(
                      (sum: number, item) => sum + item.total,
                      0
                    )
                  )} */}
                </CardFooter>
              </div>
            ))}
          </CardContent>
        </div>
      </div>
    </Card>
  );
}
