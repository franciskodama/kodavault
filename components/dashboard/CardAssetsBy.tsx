import { v4 } from 'uuid';
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
import { Asset } from '@/lib/types';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export const CardAssetsBy = ({
  assetType,
  assets,
  customKey,
  Icon,
  description = '',
}: {
  assetType: string;
  assets: Asset[];
  customKey: string;
  Icon?: LucideIcon;
  description?: string;
}) => {
  const totalArray = getTotalByKey(assets, customKey);
  const total = totalArray.reduce((sum: number, item) => sum + item.total, 0);

  const groupedByCustomKey = assets.reduce((acc: any, item: any) => {
    const value = item[customKey];

    if (value === null || value === undefined) {
      return acc;
    }

    if (!acc[value]) {
      acc[value] = [];
    }
    acc[value].push(item);

    return acc;
  }, {});

  const sortedArray = (arr: Asset[]) =>
    arr
      .filter((item): item is Exclude<Asset, undefined> => !!item)
      .sort((a, b) => (b.total || 0) - (a.total || 0));

  const accKeys: string[] = Object.keys(groupedByCustomKey).sort((a, b) => {
    const totalA = groupedByCustomKey[a].reduce(
      (sum: number, item: any) => sum + (item.total || 0),
      0
    );
    const totalB = groupedByCustomKey[b].reduce(
      (sum: number, item: any) => sum + (item.total || 0),
      0
    );
    return totalB - totalA;
  });

  return (
    <Card className='w-full sm:flex-1 border-none shadow-sm h-full'>
      <div className='flex flex-col justify-between h-full'>
        <div className='flex flex-col'>
          <CardHeader className='pb-4'>
            <CardTitle className='capitalize flex items-center justify-between'>
              <span className='font-semibold tracking-tight text-slate-900'>{`${assetType} By ${customKey}`}</span>
              {Icon && <Icon size={24} className='text-slate-400' />}
            </CardTitle>
            {description && (
              <CardDescription className='text-xs text-slate-500'>
                {description}
              </CardDescription>
            )}
          </CardHeader>

          <CardContent className='flex flex-col gap-6 pt-0'>
            {accKeys.map((key: string) => {
              const groupTotal = groupedByCustomKey[key].reduce(
                (sum: number, item: any) => sum + (item.total || 0),
                0
              );

              return (
                <div key={key} className='flex flex-col gap-3'>
                  <div className='flex items-center justify-between bg-slate-200/50 border-l-2 border-[#22C55E] py-1.5 px-3 -mx-3 rounded-r-md mb-1'>
                    <h3 className='text-[10px] font-black uppercase tracking-[0.15em] text-slate-700'>
                      {key}
                    </h3>
                    <div className='flex items-center gap-2'>
                      <span className='text-[9px] font-bold text-slate-400 uppercase tracking-tighter'>
                        Subtotal
                      </span>
                      <span className='text-[11px] font-mono font-bold text-[#22C55E]'>
                        {numberFormatterNoDecimals.format(groupTotal)}
                      </span>
                    </div>
                  </div>

                  <div className='flex flex-col gap-2'>
                    {sortedArray(groupedByCustomKey[key]).map((item: any) => (
                      <div
                        key={v4()}
                        className='flex justify-between items-center group/item transition-all'
                      >
                        <div className='flex flex-col'>
                          <h4 className='text-sm font-medium text-slate-600 group-hover/item:text-slate-900 transition-colors'>
                            {item.asset}
                          </h4>
                          {item.value && (
                            <p className='text-[9px] text-slate-400 font-bold uppercase'>
                              {item.value}
                            </p>
                          )}
                        </div>

                        <div className='flex items-center gap-2'>
                          <p className='text-sm font-medium text-slate-900 tracking-tight'>
                            {numberFormatterNoDecimals.format(item.total)}
                          </p>
                          <p
                            className={cn(
                              'text-[10px] font-semibold w-[50px] py-1 text-center rounded-lg transition-all',
                              (item.total / groupTotal) * 100 > 50
                                ? 'bg-red-50 text-red-600'
                                : 'bg-green-50 text-green-600'
                            )}
                          >
                            {numberFormatter.format(
                              (item.total / groupTotal) * 100
                            )}
                            %
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </CardContent>
        </div>

        <CardFooter className='flex justify-between items-center px-6 py-4 border-t border-slate-50 bg-slate-50/50 mt-auto'>
          <h3 className='text-xs font-semibold uppercase tracking-widest text-slate-400'>
            TOTAL {assetType}
          </h3>
          <span className='text-lg font-semibold text-slate-900 tracking-tighter'>
            {numberFormatterNoDecimals.format(total)}
          </span>
        </CardFooter>
      </div>
    </Card>
  );
};
