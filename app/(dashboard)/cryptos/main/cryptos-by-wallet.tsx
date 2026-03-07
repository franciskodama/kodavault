import { v4 } from 'uuid';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Asset, TotalByWallet } from '@/lib/types';
import { numberFormatter, numberFormatterNoDecimals } from '@/lib/utils';
import { PieChart, Landmark } from 'lucide-react';
import Chart from 'react-google-charts';
import { cn } from '@/lib/utils';

export default function CryptoByWallet({
  assets,
  totalByWallet,
}: {
  assets: Asset[];
  totalByWallet: TotalByWallet[];
}) {
  const groupedByWallet = assets.reduce((acc: any, item: any) => {
    if (!item) return acc;
    const wallet = item.wallet;
    if (!acc[wallet]) {
      acc[wallet] = [];
    }
    acc[wallet].push(item);

    return acc;
  }, {});

  const sortedWallets = Object.keys(groupedByWallet).sort((a, b) => {
    const totalA = totalByWallet.find((w) => w.value === a)?.total || 0;
    const totalB = totalByWallet.find((w) => w.value === b)?.total || 0;
    return totalB - totalA;
  });

  let chartData = [];
  chartData.push(['Wallet', 'Share']);
  totalByWallet.map((item: TotalByWallet) =>
    chartData.push([item.value, Math.floor(item.total)])
  );

  const options = {
    is3D: true,
    sliceVisibilityThreshold: 0.02,
    legend: {
      position: 'bottom',
      alignment: 'center',
      textStyle: { color: '#64748b', fontSize: 10 },
    },
    chartArea: { width: '90%', height: '80%' },
    colors: [
      '#6366f1',
      '#8b5cf6',
      '#a855f7',
      '#d946ef',
      '#ec4899',
      '#f43f5e',
      '#ef4444',
      '#f97316',
      '#f59e0b',
      '#eab308',
    ],
    backgroundColor: 'transparent',
    pieSliceTextStyle: { fontSize: 10 },
  };

  return (
    <div className='flex flex-col gap-6'>
      <Card className='border-none shadow-sm'>
        <CardHeader className='pb-2'>
          <CardTitle className='capitalize flex items-center justify-between'>
            <span className='font-semibold tracking-tight text-slate-900'>
              Portfolio Share
            </span>
            <PieChart size={24} className='text-slate-400' />
          </CardTitle>
          <CardDescription className='text-xs'>
            Distribution by Wallet
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='w-full'>
            <Chart
              chartType='PieChart'
              data={chartData}
              options={options}
              width={'100%'}
              height={'300px'}
            />
          </div>
        </CardContent>
      </Card>

      <Card className='border-none shadow-sm'>
        <CardHeader className='pb-4'>
          <CardTitle className='capitalize flex items-center justify-between'>
            <span className='font-semibold tracking-tight text-slate-900'>
              Assets By Wallet
            </span>
            <Landmark size={24} className='text-slate-400' />
          </CardTitle>
          <CardDescription className='text-xs text-slate-500'>
            Detailed allocation per Exchange
          </CardDescription>
        </CardHeader>

        <CardContent className='flex flex-col gap-8'>
          {sortedWallets.map((walletKey: string) => {
            const walletAssets = (groupedByWallet[walletKey] as Asset[])
              .filter((item): item is Exclude<Asset, undefined> => !!item)
              .sort((a, b) => (b.total || 0) - (a.total || 0));
            const walletTotal =
              totalByWallet.find((w) => w.value === walletKey)?.total || 0;

            return (
              <div key={walletKey} className='flex flex-col gap-3'>
                <div className='flex items-center justify-between border-b border-slate-50 pb-2'>
                  <h3 className='text-[10px] font-bold uppercase tracking-widest text-indigo-500'>
                    {walletKey.includes('Crypto') ? 'Crypto' : walletKey}
                  </h3>
                  <div className='flex items-center gap-2'>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className='text-[10px] font-bold text-slate-400 cursor-help'>
                            ({walletAssets.length})
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{walletAssets.length} assets in this wallet</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <span className='text-[10px] font-bold text-slate-400'>
                      {numberFormatterNoDecimals.format(walletTotal)}
                    </span>
                  </div>
                </div>

                <div className='flex flex-col gap-2'>
                  {walletAssets.map((item: any) => (
                    <div
                      key={v4()}
                      className='flex justify-between items-center group/item transition-all'
                    >
                      <div className='flex flex-col'>
                        <h4 className='text-sm font-medium text-slate-600 group-hover/item:text-slate-900 transition-colors'>
                          {item.asset}
                        </h4>
                        {item.tag && (
                          <p className='text-[9px] text-slate-400 font-bold uppercase'>
                            {item.tag}
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
                            (item.total / walletTotal) * 100 > 50
                              ? 'bg-red-50 text-red-600'
                              : 'bg-green-50 text-green-600'
                          )}
                        >
                          {numberFormatter.format(
                            (item.total / walletTotal) * 100
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
      </Card>
    </div>
  );
}
