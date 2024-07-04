'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { netWorthChartData } from '@/lib/types';
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

// https://recharts.org/en-US/guide/getting-started

export default function NetWorthEvolutionChart({
  netWorthChartData,
}: {
  netWorthChartData: netWorthChartData[];
}) {
  console.log('---  🚀 ---> | netWorthChartData from end:', netWorthChartData);

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
                  height={300}
                  data={netWorthChartData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='created_at' />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type='monotone'
                    dataKey='usdTotal'
                    stroke='#0c00f8'
                    // strokeDasharray='5 5'
                  />
                  <Line
                    type='monotone'
                    dataKey='cadTotal'
                    stroke='#ff0000'
                    // strokeDasharray='3 4 5 2'
                  />
                  {/* <Line
                    type='monotone'
                    dataKey='brlTotal'
                    stroke='#00ff2f'
                    strokeDasharray='3 4 5 2'
                  /> */}
                </LineChart>
              </div>
            </CardContent>
          </div>
        </div>
      </Card>
    </>
  );
}
