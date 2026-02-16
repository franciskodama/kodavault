'use client';

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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { netWorthChartData } from '@/lib/types';
import { Loading } from '@/components/common/Loading';
import Image from 'next/image';
import { BarChartHorizontalIcon } from 'lucide-react';
import { useState, useMemo } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export default function NetWorthChart({
  netWorthChartData,
}: {
  netWorthChartData: netWorthChartData[];
}) {
  const [visibleLines, setVisibleLines] = useState({
    USD: true,
    CAD: true,
    BRL: true,
    BTC: true,
  });

  const chartData = useMemo(() => {
    if (!netWorthChartData || netWorthChartData.length === 0) return [];

    // 1. Sort by date ascending
    const sortedData = [...netWorthChartData].sort(
      (a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    );

    // 2. Filter to get the last entry of each week
    const weeklyData: typeof sortedData = [];
    const seenWeeks = new Set<string>();

    // Iterate backwards to get the latest entry for each week
    for (let i = sortedData.length - 1; i >= 0; i--) {
      const item = sortedData[i];
      const date = new Date(item.created_at);
      // Create a unique key for Year-Week (e.g., "2024-W12")
      // Simple custom week calculator or just use ISO string slice if simple
      const year = date.getFullYear();
      const onejan = new Date(year, 0, 1);
      const weekNumber = Math.ceil(
        ((date.getTime() - onejan.getTime()) / 86400000 + onejan.getDay() + 1) /
          7
      );
      const weekKey = `${year}-W${weekNumber}`;

      if (!seenWeeks.has(weekKey)) {
        weeklyData.unshift(item); // Add to the front to maintain order
        seenWeeks.add(weekKey);
      }
    }

    // 3. Map to chart format
    return weeklyData.map((item) => ({
      date: new Date(item.created_at).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
      }),
      USD: item.usd || 0,
      CAD: item.cad || 0,
      BRL: item.brl || 0,
      BTC: item.btc || 0,
    }));
  }, [netWorthChartData]);

  if (!netWorthChartData || netWorthChartData.length <= 1) {
    return (
      <Card className='w-full'>
        <CardHeader>
          <CardTitle className='capitalize flex items-center justify-between'>
            <span>{`Net Worth Evolution`}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className='w-full p-8 border-2 flex'>
          <div className='flex justify-center items-center w-1/2'>
            <div className='flex flex-col w-2/3 gap-4 p-4'>
              <BarChartHorizontalIcon size={24} />
              <h3 className='text-lg font-semibold'>No data to chart… yet!</h3>
              <p>
                You’ve just created your account, and we need some time to
                gather the data for your net worth.
              </p>
              <p className='rounded-xl py-2 px-4 mt-2 bg-primary text-white text-md font-semibold'>
                Hang tight. Soon we’ll craft a masterpiece of your financial
                journey!
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
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className='w-full'>
      <CardHeader>
        <div className='flex flex-col md:flex-row justify-between items-start md:items-center'>
          <div>
            <CardTitle className='capitalize flex items-center gap-2'>
              <span>{`Net Worth Evolution`}</span>
              <span className='text-3xl'>📈</span>
            </CardTitle>
            <CardDescription className='text-xs'>
              {`Track the progression of your net worth over time.`}
            </CardDescription>
          </div>
          <div className='flex items-center gap-4 mt-4 md:mt-0 flex-wrap'>
            <div className='flex items-center space-x-2'>
              <Checkbox
                id='usd'
                checked={visibleLines.USD}
                onCheckedChange={(checked) =>
                  setVisibleLines((prev) => ({ ...prev, USD: !!checked }))
                }
              />
              <Label htmlFor='usd'>USD</Label>
            </div>
            <div className='flex items-center space-x-2'>
              <Checkbox
                id='cad'
                checked={visibleLines.CAD}
                onCheckedChange={(checked) =>
                  setVisibleLines((prev) => ({ ...prev, CAD: !!checked }))
                }
              />
              <Label htmlFor='cad'>CAD</Label>
            </div>
            <div className='flex items-center space-x-2'>
              <Checkbox
                id='brl'
                checked={visibleLines.BRL}
                onCheckedChange={(checked) =>
                  setVisibleLines((prev) => ({ ...prev, BRL: !!checked }))
                }
              />
              <Label htmlFor='brl'>BRL</Label>
            </div>
            <div className='flex items-center space-x-2'>
              <Checkbox
                id='btc'
                checked={visibleLines.BTC}
                onCheckedChange={(checked) =>
                  setVisibleLines((prev) => ({ ...prev, BTC: !!checked }))
                }
              />
              <Label htmlFor='btc'>BTC</Label>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className='pl-0'>
        <div className='h-[400px] w-full'>
          <ResponsiveContainer width='100%' height='100%'>
            <LineChart
              data={chartData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray='3 3' vertical={false} />
              <XAxis dataKey='date' />
              {(visibleLines.USD || visibleLines.CAD || visibleLines.BRL) && (
                <YAxis
                  yAxisId='left'
                  tickFormatter={(value) =>
                    new Intl.NumberFormat('en-US', {
                      notation: 'compact',
                      compactDisplay: 'short',
                      style: 'currency',
                      currency: 'USD',
                      maximumFractionDigits: 1,
                    }).format(value)
                  }
                  label={{
                    value: 'Fiat',
                    angle: -90,
                    position: 'insideLeft',
                  }}
                />
              )}
              {visibleLines.BTC && (
                <YAxis
                  yAxisId='right'
                  orientation='right'
                  label={{ value: 'BTC', angle: 90, position: 'insideRight' }}
                />
              )}
              <Tooltip
                formatter={(value: any, name: any) => {
                  const numValue = Number(value);
                  if (name === 'BTC') return [numValue.toFixed(4), name];
                  return [`$${numValue.toLocaleString()}`, name];
                }}
              />
              <Legend />
              {visibleLines.USD && (
                <Line
                  yAxisId='left'
                  type='monotone'
                  dataKey='USD'
                  stroke='#2563eb' // Blue
                  activeDot={{ r: 8 }}
                />
              )}
              {visibleLines.CAD && (
                <Line
                  yAxisId='left'
                  type='monotone'
                  dataKey='CAD'
                  stroke='#dc2626' // Red
                />
              )}
              {visibleLines.BRL && (
                <Line
                  yAxisId='left'
                  type='monotone'
                  dataKey='BRL'
                  stroke='#16a34a' // Green
                />
              )}
              {visibleLines.BTC && (
                <Line
                  yAxisId='right'
                  type='monotone'
                  dataKey='BTC'
                  stroke='#eab308' // Yellow/Gold
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
