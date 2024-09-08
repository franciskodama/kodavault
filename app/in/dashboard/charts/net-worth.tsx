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
import { Loading } from '@/components/Loading';
import Image from 'next/image';
import { BarChartHorizontalIcon, Hourglass } from 'lucide-react';

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
      transformDateToYearMonthDay(item.created_at),
      +item.usd.toFixed(0),
      +item.cad.toFixed(0),
      +item.brl.toFixed(0),
      +item.btc.toFixed(0) * 10000,
    ]) as RowChartData[]),
  ];
  console.log('---  🚀 ---> | formattedData:', formattedData);

  const options = {
    // Works
    chart: {
      // title: 'Average Temperatures and Daylight in Iceland Throughout the Year',
      // subtitle: 'in millions of dollars (USD)',
    },
    colors: ['#0011ff', '#ff0000', '#0ed922', '#d5db2d'],
    height: 400,
    // width: 900,
    legend: { position: 'left' },
    // chartArea: { left: 50, top: 50, right: 50, bottom: 50 },

    // Doesn't Works
    // animation: {
    //   startup: true,
    //   easing: 'linear',
    //   duration: 1500,
    // },
    // curveType: 'function',
    // is3D: true,
    // backgroundColor: '#10d541',
    legendToggle: true,
    series: [
      // { color: '#D9544C' },
      {
        // Gives each series an axis name that matches the Y-axis below.
        // 0: { axis: 'Temps' },
        // 1: { axis: 'Daylight' },
      },
    ],
    // hAxis?: { [otherOptionKey: string]: any; minValue?: any; maxValue?: any; ticks?: GoogleChartTicks; title?: string; viewWindow?: { ...; }; }; vAxis?: { ...; };
    hAxis: {
      viewWindow: {
        max: 10000,
        min: -10000,
      },
      title: 'Weeks',
      maxValue: 5000000,
    },
    vAxis: {
      viewWindow: {
        max: 10000,
        min: -10000,
      },
      title: '$',
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
              {formattedData.length > 1 ? (
                <div className='w-full p-8'>
                  <Chart
                    chartType='Line'
                    width='100%'
                    height='100%'
                    data={formattedData}
                    options={options}
                    loader={<Loading />}
                    chartPackages={['corechart', 'controls']}
                    // chartWrapperParams={{ view: { columns: [0, 3] } }}
                    // controls={[
                    //   {
                    //     controlEvents: [
                    //       {
                    //         eventName: 'statechange',
                    //         callback: ({ chartWrapper, controlWrapper }) => {
                    //           console.log(
                    //             'State changed to',
                    //             controlWrapper?.getState()
                    //           );
                    //         },
                    //       },
                    //     ],
                    //     controlType: 'CategoryFilter',
                    //     options: {
                    //       filterColumnIndex: 1,
                    //       ui: {
                    //         labelStacking: 'vertical',
                    //         label: 'Currency Selection:',
                    //         allowTyping: false,
                    //         allowMultiple: false,
                    //       },
                    //     },
                    //   },
                    // ]}
                  />
                </div>
              ) : (
                <div className='w-full p-8 border-2 flex'>
                  <div className='flex justify-center items-center w-1/2'>
                    <div className='flex flex-col w-2/3 gap-4 p-4'>
                      {/* <Hourglass size={24} /> */}
                      <BarChartHorizontalIcon size={24} />
                      <h3 className='text-lg font-semibold'>
                        No data to chart… yet!
                      </h3>
                      <p>
                        You’ve just created your account, and we need some time
                        to gather the data for your net worth.
                      </p>
                      <p className='rounded-[2px] py-2 px-4 mt-2 bg-primary text-white text-md font-semibold'>
                        Hang tight. Soon we’ll craft a masterpiece of your
                        financial journey!
                      </p>
                    </div>
                  </div>
                  <div className='w-1/2'>
                    <Image
                      src='/patience.webp'
                      width={500}
                      height={100}
                      alt='Lecter Hannibal telling to wait'
                      className='rounded-md'
                      objectFit='contain'
                      // objectPosition='10% 50%'
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </div>
        </div>
      </Card>
    </>
  );
}

const transformDateToYearMonthDay = (date: Date | string): Date => {
  if (typeof date === 'string') {
    return new Date(date);
  }
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};
