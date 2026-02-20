import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { numberFormatterNoDecimals, numberFormatter } from '@/lib/utils';
import { Asset } from '@/lib/types';
import { v4 } from 'uuid';

import { Activity, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

export const CardCryptosForTrading = ({ assets }: { assets: Asset[] }) => {
  const router = useRouter();

  const assetsForTrading = assets.reduce<Record<string, Asset[]>>(
    (groupedAssets, asset) => {
      if (!asset) return groupedAssets;

      const purposeKey = asset.purpose as unknown as string;

      if (!groupedAssets[purposeKey]) groupedAssets[purposeKey] = [];
      groupedAssets[purposeKey].push(asset);

      return groupedAssets;
    },
    {}
  );
  const tradingAssets = assetsForTrading.Trade;

  const total =
    tradingAssets &&
    tradingAssets.reduce((sum: number, item: any) => sum + item.total, 0);

  const handleClick = () => {
    router.push('/assets?purpose=Trade');
  };

  return (
    <Card className='w-full border-none shadow-sm'>
      {tradingAssets && (
        <div className='flex flex-col h-full'>
          <div className='flex flex-col'>
            <CardHeader>
              <CardTitle className='capitalize flex items-center justify-between'>
                <span className='font-semibold tracking-tight text-slate-900'>
                  Cryptos for Trading
                </span>
                <Activity size={24} className='text-slate-400' />
              </CardTitle>
            </CardHeader>
            <CardContent className='flex flex-col gap-4'>
              {tradingAssets.map((item: any) => (
                <div
                  key={v4()}
                  className='flex items-center justify-between group'
                >
                  <div className='flex flex-col'>
                    <h3 className='text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors uppercase'>
                      {item?.asset}
                    </h3>
                    <span className='text-[10px] text-slate-400 font-medium'>
                      {item?.wallet}
                    </span>
                  </div>
                  <div className='flex items-center gap-3'>
                    <p className='text-sm font-medium text-slate-900 tracking-tight'>{`${numberFormatterNoDecimals.format(
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
            <div className='self-end'>
              <Button
                onClick={() => handleClick()}
                variant='secondary'
                size='sm'
                className='self-end px-4 rounded-xl text-[10px] uppercase tracking-widest group/btn transition-all'
              >
                <span> Tradable Assets</span>
                <ArrowRight
                  size={14}
                  className='ml-2 group-hover/btn:translate-x-1 transition-transform'
                />
              </Button>
            </div>
            <div className='flex flex-col items-end'>
              <span className='text-[10px] font-semibold uppercase tracking-widest text-slate-400'>
                Total
              </span>
              <span className='text-lg font-semibold text-slate-900 tracking-tighter'>
                {numberFormatterNoDecimals.format(total)}
              </span>
            </div>
          </CardFooter>
        </div>
      )}
    </Card>
  );
};
