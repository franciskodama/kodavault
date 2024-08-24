'use client';

import { Chart } from 'react-google-charts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { netWorthChartData } from '@/lib/types';
import { dateFormatter } from '@/lib/utils';

// https://www.react-google-charts.com/examples/line-chart

export default function NetWorthChart({
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

  const data = [
    ['x', 'dogs', 'cats'],
    [0, 0, 0],
    [1, 10, 5],
    [2, 23, 15],
    [3, 17, 9],
    [4, 18, 10],
    [5, 9, 5],
    [6, 11, 3],
    [7, 27, 19],
  ];

  const options = {
    // title: 'Age vs. Weight comparison',
    hAxis: {
      title: 'Weeks',
      //   viewWindow: { min: 0, max: 24 },
    },
    vAxis: {
      title: '$',
      //   viewWindow: { min: 0, max: 3000000 },
    },
    legend: { position: 'bottom' },
    series: {
      1: { curveType: 'function' },
    },
  };

  //Options
  //  https://www.react-google-charts.com/components/chart

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
                <Chart
                  chartType='LineChart'
                  width='100%'
                  height='400px'
                  data={data}
                  options={options}
                />
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
