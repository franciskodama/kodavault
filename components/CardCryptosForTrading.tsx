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
  numberFormatter,
  groupAssetsBySomething,
} from '../lib/utils';
import { Asset } from '@/lib/types';

export const CardCryptosForTrading = ({ assets }: { assets: Asset[] }) => {
  const assetsForTrading = groupAssetsBySomething(assets, 'purpose');
  const tradingAssets = assetsForTrading.Trade;

  // console.log('---  🚀 ---> | assets:', assets);
  // console.log('---  🚀 ---> | tradingAssets:', tradingAssets[0].wallet);

  const total = tradingAssets.reduce(
    (sum: number, item: any) => sum + item.total,
    0
  );

  return (
    <Card className='w-full'>
      {tradingAssets && (
        <div className='flex flex-col justify-between h-full'>
          <div className='flex flex-col'>
            <CardHeader>
              <CardTitle className='capitalize flex items-center justify-between'>
                <span>Cryptos for Trading</span>
                <span className='text-3xl'>🛒</span>
              </CardTitle>
              <CardDescription className='text-xs'>
                {`Longs and Shorts on these bad boys!`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {tradingAssets.map((item: any) => (
                <div key={item?.asset} className='flex justify-between'>
                  <h3 className='w-[8ch]'>{item?.asset}</h3>
                  <p>{item?.wallet}</p>
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
            </CardContent>
          </div>
          <CardFooter className='flex justify-between text-sm text-slate-500 font-medium bg-slate-50 m-1 p-2'>
            <h3>Total</h3>
            {numberFormatterNoDecimals.format(total)}
          </CardFooter>
        </div>
      )}
    </Card>
  );
};