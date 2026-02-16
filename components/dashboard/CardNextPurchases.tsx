import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  numberFormatterNoDecimals,
  getTotalByKey,
  numberFormatter,
} from '@/lib/utils';

import { ShoppingBag } from 'lucide-react';

export const CardNextPurchases = () => {
  const total = nextPurchases.reduce(
    (sum: number, item) => sum + item.total,
    0
  );

  return (
    <Card className='w-full h-full border-none shadow-sm'>
      <div className='flex flex-col h-full'>
        <div className='flex flex-col'>
          <CardHeader>
            <CardTitle className='capitalize flex items-center justify-between'>
              <span className='font-semibold tracking-tight text-slate-900'>
                Next Purchases
              </span>
              <ShoppingBag size={24} className='text-slate-400' />
            </CardTitle>
            <CardDescription className='text-[10px] font-bold uppercase tracking-widest text-slate-400'>
              Plan your next portfolio moves
            </CardDescription>
          </CardHeader>
          <CardContent className='flex flex-col gap-4'>
            {nextPurchases.map((item) => (
              <div
                key={item.asset}
                className='flex items-center justify-between group'
              >
                <h3 className='text-sm font-bold text-slate-600 group-hover:text-slate-900 transition-colors uppercase'>
                  {item.asset}
                </h3>
                <div className='flex items-center gap-3'>
                  <p className='text-sm font-semibold text-slate-900 tracking-tight'>{`${numberFormatterNoDecimals.format(
                    item.total
                  )}`}</p>
                  <span
                    className={`text-[10px] font-semibold w-[6ch] py-1 text-center rounded-md ${
                      (item.total / total) * 100 > 50
                        ? 'bg-rose-50 text-rose-600'
                        : 'bg-emerald-50 text-emerald-600'
                    }`}
                  >{`${numberFormatter.format(
                    (item.total / total) * 100
                  )}%`}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </div>
        <CardFooter className='flex items-center justify-between p-6 pt-0 border-t border-slate-50 mt-auto'>
          <span className='text-[10px] font-semibold uppercase tracking-widest text-slate-400'>
            Total
          </span>
          <span className='text-lg font-semibold text-slate-900 tracking-tighter'>
            {numberFormatterNoDecimals.format(total)}
          </span>
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
