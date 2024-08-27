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

type HeaderRowChartData = [string, string, string, string, string];
type RowChartData = [Date, number, number, number, number];
type HeaderAndRowsChartData = [HeaderRowChartData, ...RowChartData[]];

export default function NetWorthChart({
  netWorthChartData,
}: {
  netWorthChartData: netWorthChartData[];
}) {
  const sortedNetWorthChartData = netWorthChartData.sort((a, b) => {
    return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
  });

  const formattedData: HeaderAndRowsChartData = [
    ['', 'USD', 'CAD', 'BRL', 'BTC'],
    ...(sortedNetWorthChartData.map((item) => [
      transformDateToYearMonth(item.created_at),
      +item.usd_total.toFixed(0),
      +item.cad_total.toFixed(0),
      +item.brl_total.toFixed(0),
      +item.btc_total.toFixed(0) * 10000,
    ]) as RowChartData[]),
  ];

  const options = {
    // width: 900,
    height: 300,
    chart: {
      // title: 'Average Temperatures and Daylight in Iceland Throughout the Year',
      // subtitle: 'in millions of dollars (USD)',
    },
    legend: { position: 'bottom' },
    series: {
      // Gives each series an axis name that matches the Y-axis below.
      // 0: { axis: 'Temps' },
      // 1: { axis: 'Daylight' },
    },
    hAxis: {
      title: 'Weeks',
      //   viewWindow: { min: 0, max: 24 },
    },
    vAxis: {
      title: '$',
      //   viewWindow: { min: 0, max: 3000000 },
    },
    axes: {
      // Adds labels to each axis; they don't have to match the axis names.
      y: {
        Temps: { label: '$' },
        Daylight: { label: 'Days' },
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
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};
