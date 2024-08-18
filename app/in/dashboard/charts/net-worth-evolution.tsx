'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { netWorthChartData } from '@/lib/types';
import { dateFormatter } from '@/lib/utils';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// https://recharts.org/en-US/api/LineChart

export default function NetWorthEvolutionChart({
  netWorthChartData,
}: {
  netWorthChartData: netWorthChartData[];
}) {
  const formattedData = netWorthChartData.map((item: netWorthChartData) => ({
    ...item,
    created_at: dateFormatter(item.created_at),
    USD: item.usdTotal,
    CAD: item.cadTotal,
    BRL: item.brlTotal,
    BTC: item.btcTotal * 100000,
  }));

  return (
    <>
      <Card className='w-full'>
        <div className='flex flex-col justify-between h-full w-full'>
          <div className='flex flex-col w-full'>
            <CardHeader>
              <CardTitle className='capitalize flex items-center justify-between'>
                <span>{`Net Worth Evolution`}</span>
                <span className='text-3xl'>📈</span>
              </CardTitle>
              <CardDescription className='text-xs'>
                {`Track the progression of your net worth over time.`}
              </CardDescription>
            </CardHeader>
            <CardContent className='w-full'>
              <div className='w-full p-8'>
                <LineChart
                  width={1000}
                  height={365}
                  data={formattedData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis xAxisId={0} tickSize={6} dataKey='created_at' />
                  <YAxis yAxisId={0} domain={[0, 'auto']} tickCount={10} />
                  <Tooltip />
                  <Legend
                    // width={1000}
                    wrapperStyle={{
                      bottom: -20,
                      right: 0,
                    }}
                  />
                  <Line
                    xAxisId={0}
                    yAxisId={0}
                    type='monotone'
                    dataKey='USD'
                    stroke='#0c00f8'
                    // strokeDasharray='5 5'
                  />
                  <Line
                    xAxisId={0}
                    yAxisId={0}
                    type='monotone'
                    dataKey='CAD'
                    stroke='#ff0000'
                    // strokeDasharray='3 4 5 2'
                  />
                  <Line
                    xAxisId={0}
                    yAxisId={0}
                    type='monotone'
                    dataKey='BRL'
                    stroke='#00ff2f'
                    // strokeDasharray='3 4 5 2'
                  />
                  <Line
                    xAxisId={0}
                    yAxisId={0}
                    type='monotone'
                    dataKey='BTC'
                    stroke='#ff5e00'
                    // strokeDasharray='3 4 5 2'
                  />
                  <Tooltip
                    wrapperStyle={{ width: 100, backgroundColor: '#ccc' }}
                  />
                </LineChart>
              </div>
            </CardContent>
          </div>
        </div>
      </Card>
    </>
  );
}

// const renderCustomAxisTick = ({ x, y, payload }) => {
//   let emoji = '';

//   switch (payload.value) {
//     case 'USD':
//       emoji = '🇺🇸';
//       break;
//     case 'CAD':
//       emoji = '🇨🇦';
//       break;
//     case 'BRL':
//       emoji = '🇧🇷';
//       break;
//     case 'BTC':
//       emoji = '🥇';
//       break;

//     default:
//       emoji = '';
//   }

//   return <div>{emoji}</div>;
// };
