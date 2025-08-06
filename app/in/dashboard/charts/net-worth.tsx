'use client';

import { Chart } from 'react-google-charts';
import React, { useEffect, useRef } from 'react';
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
import { LineSeries, createChart, ColorType } from 'lightweight-charts';

// https://www.react-google-charts.com/examples/line-chart

type HeaderRowChartData = [string, string, string, string, string];
type RowChartData = [Date, number, number, number, number];
type HeaderAndRowsChartData = [HeaderRowChartData, ...RowChartData[]];

export default function NetWorthChart({
  netWorthChartData,
}: {
  netWorthChartData: netWorthChartData[];
}) {
  // console.log('Chart data before mapping:', netWorthChartData);


export const ChartComponent = props => {
    const {
        data,
        colors: {
            backgroundColor = 'white',
            lineColor = '#2962FF',
            textColor = 'black',
            areaTopColor = '#2962FF',
            areaBottomColor = 'rgba(41, 98, 255, 0.28)',
        } = {},
    } = props;

    const chartContainerRef = useRef(null);

    useEffect(
        () => {
            const handleResize = () => {
                chart.applyOptions({ width: chartContainerRef.current.clientWidth });
            };

            const chart = createChart(chartContainerRef.current, {
                layout: {
                    background: { type: ColorType.Solid, color: backgroundColor },
                    textColor,
                },
                width: chartContainerRef.current.clientWidth,
                height: 300,
            });
            chart.timeScale().fitContent();

            const newSeries = chart.addSeries(AreaSeries, { lineColor, topColor: areaTopColor, bottomColor: areaBottomColor });
            newSeries.setData(data);

            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);

                chart.remove();
            };
        },
        [data, backgroundColor, lineColor, textColor, areaTopColor, areaBottomColor]
    );


  const sortedNetWorthChartData = netWorthChartData
    ? netWorthChartData.sort((a, b) => {
        return (
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
      })
    : [];

  const formattedData: HeaderAndRowsChartData = [
    ['', 'USD', 'CAD', 'BRL', 'BTC'],
    ...sortedNetWorthChartData.map((item) => {
      const date = transformDateToYearMonthDay(item.created_at);

      const usd =
        typeof item.usd === 'number' && !isNaN(item.usd)
          ? +item.usd.toFixed(0)
          : 0;
      const cad =
        typeof item.cad === 'number' && !isNaN(item.cad)
          ? +item.cad.toFixed(0)
          : 0;
      const brl =
        typeof item.brl === 'number' && !isNaN(item.brl)
          ? +item.brl.toFixed(0)
          : 0;
      const btc =
        typeof item.btc === 'number' && !isNaN(item.btc)
          ? +item.btc.toFixed(0) * 10000
          : 0;

      return [date, usd, cad, brl, btc] as RowChartData;
    }),
  ];

  formattedData.forEach((row, i) => {
    row.forEach((val, j) => {
      if (typeof val === 'number' && isNaN(val)) {
        console.warn(`NaN found at row ${i}, column ${j}`);
      }
      if (val === undefined || val === null) {
        console.warn(`Undefined/null at row ${i}, column ${j}`);
      }
      console.log('analysed and everything is fine!');
    });
  });

  // console.log('Formatted chart data:', formattedData);

  const options = {
    chart: {},
    colors: ['#0011ff', '#ff0000', '#0ed922', '#d5db2d'],
    height: 400,
    legend: { position: 'left' },
    legendToggle: true,
    series: [
      {
        // Gives each series an axis name that matches the Y-axis below.
        // 0: { axis: 'Temps' },
        // 1: { axis: 'Daylight' },
      },
    ],
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
               <div
            ref={chartContainerRef}
        />
                  {/* <Chart
                    chartType='Line'
                    width='100%'
                    height='100%'
                    data={formattedData}
                    options={options}
                    loader={<Loading />}
                    chartPackages={['corechart', 'controls']}
                  /> */}
                </div>
              ) : (
                <div className='w-full p-8 border-2 flex'>
                  <div className='flex justify-center items-center w-1/2'>
                    <div className='flex flex-col w-2/3 gap-4 p-4'>
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
                  <Image
                    src='/patience.webp'
                    width={500}
                    height={100}
                    alt='Lecter Hannibal telling to wait'
                    className='rounded-md'
                    objectFit='cover'
                  />
                </div>
              )}
            </CardContent>
          </div>
        </div>
      </Card>
    </>
  );
}


const initialData = [
    { time: '2018-12-22', value: 32.51 },
    { time: '2018-12-23', value: 31.11 },
    { time: '2018-12-24', value: 27.02 },
    { time: '2018-12-25', value: 27.32 },
    { time: '2018-12-26', value: 25.17 },
    { time: '2018-12-27', value: 28.89 },
    { time: '2018-12-28', value: 25.46 },
    { time: '2018-12-29', value: 23.92 },
    { time: '2018-12-30', value: 22.68 },
    { time: '2018-12-31', value: 22.67 },
];

const transformDateToYearMonthDay = (date: Date | string): Date => {
  if (typeof date === 'string') {
    return new Date(date);
  }
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};
