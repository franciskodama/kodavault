'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ChartData } from '@/lib/types';
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
  chartData,
}: {
  chartData: ChartData[];
}) {
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
                  // data={chartData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  {/* <CartesianGrid strokeDasharray='3 3' /> */}
                  <XAxis dataKey='created_at' />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  {/* <Line
                    type='monotone'
                    dataKey='visit'
                    stroke='#8884d8'
                    strokeDasharray='5 5'
                  /> */}
                  <Line
                    type='monotone'
                    dataKey='click'
                    stroke='#82ca9d'
                    strokeDasharray='3 4 5 2'
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
