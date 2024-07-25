import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Asset, TotalByWallet } from '@/lib/types';
import {
  getTotalByKey,
  numberFormatter,
  numberFormatterNoDecimals,
  thousandFormatter,
} from '@/lib/utils';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

type chartData = {
  name: string;
  value: number;
};

export default function CryptoByWallet({
  assets,
  totalByWallet,
  chartData,
}: {
  assets: Asset[];
  totalByWallet: TotalByWallet[];
  chartData: chartData[];
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

  const sortGroupsByLength = (groupedAssets: Asset[][]): Asset[][] => {
    return groupedAssets.sort((a, b) => a.length - b.length);
  };

  const groupsSortedByLength = sortGroupsByLength(sortedAssets);
  console.log('---  🚀 ---> | groupsSortedByLength:', groupsSortedByLength);

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
                    <h3 className='uppercase font-bold text-md flex justify-between text-primary mt-2 mb-4'>
                      {item.value.includes('Crypto') ? 'Crypto' : item.value}
                    </h3>
                    <CardFooter className='flex justify-between text-xs text-slate-500 font-medium bg-slate-50 mt-2 p-2'>
                      {numberFormatterNoDecimals.format(item.total)}
                    </CardFooter>
                  </div>
                ))}

              <div className='w-full p-2'>
                <ResponsiveContainer width='100%' height={300}>
                  <PieChart width={800} height={800}>
                    <Pie
                      data={chartData}
                      dataKey='value'
                      nameKey='name'
                      cx='50%'
                      cy='50%'
                      outerRadius={150}
                      labelLine={false}
                      legendType='circle'
                    >
                      {chartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={getColor(entry.name)}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      itemStyle={{
                        backgroundColor: '#FFF',
                        fontStyle: 'bold',
                        // height: '35px',
                      }}
                      wrapperStyle={{
                        borderRadius: '2px',
                        // border: '1px solid #FFF',
                      }}
                      contentStyle={{
                        height: '37px',
                        fontSize: '12px',
                        borderRadius: '2px',
                        fontWeight: 'bold',
                        // backgroundColor: '#DDF906',
                        backgroundColor: '#FFF',
                      }}
                      labelStyle={{
                        // top: '-10px',
                        // height: '-10px',
                        color: 'blue',
                        fontSize: '20px',
                        fontWeight: 'bold',
                      }}
                      formatter={thousandFormatter}
                      active={true}
                      viewBox={{ x: 0, y: 0, width: 400, height: 400 }}
                    />
                    {/* https://recharts.org/en-US/api/Tooltip#formatter */}
                  </PieChart>
                </ResponsiveContainer>
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
              {/* {groupedByWallet.map((item: any) => (
                <div
                  key={item[0]}
                  className='border rounded-[2px] mb-2 p-2 grow'
                >
                  <h3 className='uppercase font-bold text-md flex justify-between text-primary mt-2 mb-4'>
                    {item[0]}
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
              ))} */}

              {/* ==================================== */}

              {/* {accKeys.map((key: string) => (
                <div key={key} className='border rounded-[2px] mb-2 p-2 grow'>
                  <h3 className='uppercase font-bold text-md flex justify-between text-primary mt-2 mb-4'>
                    {key}
                  </h3>
                  {sortedArray(groupedByWallet[key]).map((item: any) => (
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
              ))} */}
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
    case 'MetaMask':
      color = '#F6851B';
      break;
    default:
      color = '#fe00dc';
      break;
  }

  return color;
};
