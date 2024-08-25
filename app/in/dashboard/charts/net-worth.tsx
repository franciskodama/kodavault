'use client';

import { Chart } from 'react-google-charts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { rawNetWorthChartData } from '@/lib/types';
import { dateFormatter } from '@/lib/utils';

// https://www.react-google-charts.com/examples/line-chart

export default function NetWorthChart({
  rawNetWorthChartData,
}: {
  rawNetWorthChartData: rawNetWorthChartData[];
}) {
  let netWorthChartData = [];
  netWorthChartData.push([{ type: 'date', label: 'Day' }, 'USD', 'CAD', 'BTC']);
  if (!('error' in rawNetWorthChartData)) {
    netWorthChartData = rawNetWorthChartData.map((item: any) => [
      item.created_at,
      item.usd_total,
      item.cad_total,
      item.brl_total,
      item.btc_total,
    ]);
  } else {
    console.error(
      'Error fetching Net Worth Evolution data:',
      rawNetWorthChartData.error
    );
  }
  console.log('---  🚀 ---> | netWorthChartData:', netWorthChartData);

  //   const formattedData = netWorthChartData.map((item: netWorthChartData) => ({
  //     ...item,
  //     created_at: dateFormatter(item.created_at),
  //     USD: item.usdTotal,
  //     CAD: item.cadTotal,
  //     BRL: item.brlTotal,
  //     BTC: item.btcTotal * 100000,
  //   }));

  const data = [
    ['USD', 'CAD', 'BRL', 'BTC'],
    [0, 0, 0, 5],
    [1, 10, 5, 15],
    [2, 23, 15, 35],
    [3, 17, 9, 25],
    [4, 18, 10, 45],
    [5, 9, 5, 55],
    [6, 11, 3, 35],
    [7, 27, 19, 35],
  ];

  const options2 = {
    // title: 'Age vs. Weight comparison',

    hAxis: {
      title: 'Weeks',
      //   viewWindow: { min: 0, max: 24 },
    },
    vAxis: {
      title: '$',
      //   viewWindow: { min: 0, max: 3000000 },
    },
  };

  const options1 = {
    chart: {
      title: 'Box Office Earnings in First Two Weeks of Opening',
      subtitle: 'in millions of dollars (USD)',
    },
    legend: { position: 'bottom' },
  };

  const options = {
    chart: {
      title: 'Average Temperatures and Daylight in Iceland Throughout the Year',
    },
    width: 900,
    height: 500,
    series: {
      // Gives each series an axis name that matches the Y-axis below.
      0: { axis: 'Temps' },
      1: { axis: 'Daylight' },
    },
    axes: {
      // Adds labels to each axis; they don't have to match the axis names.
      y: {
        Temps: { label: 'Temps (Celsius)' },
        Daylight: { label: 'Daylight' },
      },
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
                  chartType='Line'
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
