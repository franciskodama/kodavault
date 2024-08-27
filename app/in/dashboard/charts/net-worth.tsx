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
import {
  dateFormatter,
  numberFormatter,
  numberFormatterNoDecimals,
} from '@/lib/utils';
import { Loading } from '@/components/Loading';

// https://www.react-google-charts.com/examples/line-chart

type HeaderRowChartData = [
  { type: 'date'; label: 'Day' },
  string,
  string,
  string,
  string
];
type RowChartData = [Date, number, number, number, number];
type HeaderAndRowsChartData = [HeaderRowChartData, ...RowChartData[]];

export default function NetWorthChart({
  netWorthChartData,
}: {
  netWorthChartData: netWorthChartData[];
}) {
  const formattedData: HeaderAndRowsChartData = [
    [{ type: 'date', label: 'Day' }, 'USD', 'CAD', 'BRL', 'BTC'],
    ...(netWorthChartData.map((item) => [
      transformDateToYearMonth(item.created_at),
      +item.usd_total.toFixed(0),
      +item.cad_total.toFixed(0),
      +item.brl_total.toFixed(0),
      +item.btc_total.toFixed(0) * 10000,
    ]) as RowChartData[]),
  ];
  console.log('---  🚀 ---> | formattedData new:', formattedData);

  const data = [
    ['USD', 'CAD', 'BRL', 'BTC'],
    [new Date(2014, 1), 0, 0, 5],
    [new Date(2014, 2), 10, 5, 15],
    [new Date(2014, 3), 23, 15, 35],
    [new Date(2014, 4), 17, 9, 25],
    [new Date(2014, 5), 18, 10, 45],
    [new Date(2014, 6), 9, 5, 55],
    [new Date(2014, 7), 11, 3, 35],
    [new Date(2014, 8), 27, 19, 35],
  ];
  console.log('---  🚀 ---> | data:', data);

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

  //Options
  //  https://www.react-google-charts.com/components/chart

  const options1 = {
    chart: {
      title: 'Box Office Earnings in First Two Weeks of Opening',
      subtitle: 'in millions of dollars (USD)',
    },
    legend: { position: 'bottom' },
  };

  const options = {
    chart: {
      // title: 'Average Temperatures and Daylight in Iceland Throughout the Year',
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
        Temps: { label: '$' },
        Daylight: { label: 'Days' },
      },
    },
  };

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
              {formattedData ? (
                <div className='w-full p-8'>
                  <Chart
                    chartType='Line'
                    width='100%'
                    height='300px'
                    data={formattedData}
                    options={options}
                  />
                </div>
              ) : (
                // <Loading />
                <p>Not Working</p>
              )}
            </CardContent>
          </div>
        </div>
      </Card>
    </>
  );
}

const transformDateToYearMonth = (date: Date | string): Date => {
  if (typeof date === 'string') {
    return new Date(date);
  }
  return new Date(date.getFullYear(), date.getMonth());
};
