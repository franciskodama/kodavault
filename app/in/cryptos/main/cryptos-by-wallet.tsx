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

import Chart from 'react-google-charts';

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

  const sortAssetsByTotal = (objWithAssetsArrays: any) => {
    let mainArrayWithSortedAssetsArray: any[] = [];
    const keys: string[] = Object.keys(objWithAssetsArrays);

    keys.forEach((key: string) => {
      const sortedAssetsArray = objWithAssetsArrays[key].sort(
        (a: Asset, b: Asset) => b!.total! - a!.total!
      );
      mainArrayWithSortedAssetsArray.push(sortedAssetsArray);
    });
    return mainArrayWithSortedAssetsArray;
  };

  const sortedAssets = sortAssetsByTotal(groupedByWallet);

  const sortWalletsByLength = (groupedAssets: Asset[][]): Asset[][] => {
    return groupedAssets.sort((a, b) => a.length - b.length);
  };

  const walletsSortedByLength = sortWalletsByLength(sortedAssets);

  let chartData = [];
  chartData.push(['Wallet', 'Share']);
  totalByWallet.map((item: TotalByWallet) =>
    chartData.push([item.value, Math.floor(item.total)])
  );

  const options = {
    is3D: true,
    sliceVisibilityThreshold: 0.02,
    legend: {
      position: 'center',
      alignment: 'center',
    },
    slices: {
      2: { offset: 0.25 },
      3: { offset: 0.25 },
      4: { offset: 0.25 },
    },
    pieStartAngle: -110,
    animation: {
      duration: 1000,
      easing: 'out',
    },
  };

  return (
    <>
      <Card className='flex-1 mb-2'>
        <div className='flex flex-col justify-between h-full'>
          <div className='flex flex-col'>
            <CardHeader>
              <CardTitle className='capitalize flex items-center justify-between'>
                <span>Cryptos By Wallet</span>
                <span className='text-3xl'>🍕</span>
              </CardTitle>
              <CardDescription className='text-xs'>
                Total by Wallet
              </CardDescription>
            </CardHeader>
            <CardContent className='flex flex-wrap gap-2 w-full'>
              {totalByWallet
                .sort(
                  (a: TotalByWallet, b: TotalByWallet) => b!.total! - a!.total!
                )
                .map((item: TotalByWallet) => (
                  <div
                    key={item.value}
                    className='border rounded-[2px] mb-2 p-2 grow'
                  >
                    <h3 className='uppercase font-bold text-md flex justify-between text-primary mt-2 mb-2'>
                      {item.value.includes('Crypto') ? 'Crypto' : item.value}
                    </h3>
                    <CardFooter className='flex justify-between text-xs text-slate-500 font-medium bg-slate-50 p-2'>
                      {numberFormatterNoDecimals.format(item.total)}
                    </CardFooter>
                  </div>
                ))}
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
          </div>
        </div>
      </Card>

      <Card className='flex-1'>
        <div className='flex flex-col justify-between h-full'>
          <div className='flex flex-col'>
            <CardHeader>
              <CardTitle className='capitalize flex items-center justify-between'>
                <span>Cryptos By Wallet</span>
                <span className='text-3xl'>🏦</span>
              </CardTitle>
              <CardDescription className='text-xs'>
                Coins by Exchanged
              </CardDescription>
            </CardHeader>

            <CardContent className='flex flex-wrap gap-2 w-full'>
              {walletsSortedByLength.map((wallet: any) => {
                return (
                  <div
                    key={wallet?.[0]?.wallet}
                    className='border rounded-[2px] mb-2 p-2 grow'
                  >
                    <h3 className='uppercase font-bold text-md flex justify-between text-primary mt-2 mb-4'>
                      {wallet?.[0]?.wallet}
                    </h3>
                    {wallet.map((item: any) => (
                      <div key={item.total} className='flex justify-between'>
                        <h3>{item.asset}</h3>
                        <h3>{item.value}</h3>
                        <div className='flex'>
                          <p className='w-[8ch] text-right mr-4'>{`${numberFormatterNoDecimals.format(
                            item.total
                          )}`}</p>
                          <p
                            className={`text-white w-[8ch] px-1 m-1 text-center rounded-[2px] ${
                              (item.total /
                                totalByWallet[
                                  totalByWallet.findIndex(
                                    (item) => item.value === wallet?.[0]?.wallet
                                  )
                                ].total) *
                                100 >
                              50
                                ? 'bg-red-500'
                                : 'bg-green-500'
                            }`}
                          >
                            {`${numberFormatter.format(
                              (item.total /
                                totalByWallet[
                                  totalByWallet.findIndex(
                                    (item) => item.value === wallet?.[0]?.wallet
                                  )
                                ].total) *
                                100
                            )}%`}
                          </p>
                        </div>
                      </div>
                    ))}
                    <CardFooter className='flex justify-between text-xs text-slate-500 font-medium bg-slate-50 mt-2 p-2'>
                      <h3>
                        Subtotal
                        {
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <span className='ml-1 text-xs font-thin'>
                                  {`(${wallet.length})`}
                                </span>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Total of Items</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        }
                      </h3>
                      {numberFormatterNoDecimals.format(
                        totalByWallet[
                          totalByWallet.findIndex(
                            (item) => item.value === wallet?.[0]?.wallet
                          )
                        ].total
                      )}
                    </CardFooter>
                  </div>
                );
              })}
            </CardContent>
          </div>
        </div>
      </Card>
    </>
  );
}

const getColor = (name: string) => {
  let color = '#FFFFFF';

  switch (name) {
    case 'Binance':
      color = '#F3BA2F';
      break;
    case 'Bybit':
      color = '#DDF906';
      break;
    case 'Gate.io':
      color = 'rgb(239 68 68)';
      break;
    case 'Crypto':
      color = '#0033A0';
      break;
    case 'Ledger':
      color = 'hsl(222.2 47.4% 11.2%)';
      break;
    case 'Trezor':
      color = 'rgb(34 197 94)';
      break;
    case 'BingX':
      color = '#2D70B7';
      break;
    case 'Metamask':
      color = '#F6851B';
      break;
    default:
      color = '#fe00dc';
      break;
  }

  return color;
};
