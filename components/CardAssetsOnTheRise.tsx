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

export const CardAssetsOnTheRise = () => {
  const total = nextPurchases.reduce(
    (sum: number, item) => sum + item.total,
    0
  );

  return (
    <Card className='w-[22.5em]'>
      <div className='flex flex-col justify-between h-full'>
        <div className='flex flex-col'>
          <CardHeader>
            <CardTitle className='capitalize flex items-center justify-between'>
              <span>Assets on the Rise</span>
              <span className='text-3xl'>🔥</span>
            </CardTitle>
            <CardDescription className='text-xs'>
              {`Let's bet on these bad boys!`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {nextPurchases.map((item) => (
              <div key={item.asset} className='flex justify-between'>
                <h3>{item.asset}</h3>
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
    </Card>
  );
};

const nextPurchases = [
  {
    asset: 'ETH',
    total: 20000,
  },
  {
    asset: 'ADA',
    total: 10000,
  },
  {
    asset: 'DOT',
    total: 7000,
  },
  {
    asset: 'SOL',
    total: 10000,
  },
  {
    asset: 'AVAX',
    total: 7000,
  },
];
