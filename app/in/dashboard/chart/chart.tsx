'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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

export default function Chart() {
  return (
    <>
      <Card className='w-full'>
        <div className='flex flex-col justify-between h-full w-full'>
          <div className='flex flex-col w-full'>
            <CardHeader>
              <CardTitle className='capitalize flex items-center justify-between'>
                <span>{`Year Recap`}</span>
                <span className='text-3xl'>📈</span>
              </CardTitle>
              <CardDescription className='text-xs'>
                {`Follow up your networth during the year`}
              </CardDescription>
            </CardHeader>
            <CardContent className='w-full'>
              <div className='w-full p-8'>
                <LineChart
                  width={1000}
                  height={300}
                  data={data}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  {/* <CartesianGrid strokeDasharray='3 3' /> */}
                  <XAxis dataKey='name' />
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

const data = [
  {
    name: 'Page A',
    visit: 4000,
    click: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    visit: 3000,
    click: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    visit: 2000,
    click: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    visit: 2780,
    click: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    visit: 1890,
    click: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    visit: 2390,
    click: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    visit: 3490,
    click: 4300,
    amt: 2100,
  },
];
