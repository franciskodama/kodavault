'use client';

import { ResponsivePie } from '@nivo/pie';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Asset } from '@/lib/types';
import { useMemo } from 'react';

// Using a custom color palette that matches your "premium" aesthetic
const COLORS = {
  USD: '#2563eb', // Blue
  CAD: '#dc2626', // Red
  BRL: '#16a34a', // Green
  BTC: '#eab308', // Gold
  Other: '#94a3b8', // Slate
};

import { PieChart } from 'lucide-react';

export const CardAllocation = ({ assets }: { assets: Asset[] }) => {
  const data = useMemo(() => {
    if (!assets || assets.length === 0) return [];

    // Aggregate by Currency
    const currencyTotals: Record<string, number> = {};
    let totalPortfolioValue = 0;

    assets.forEach((asset) => {
      const currency = asset?.currency || 'Other';
      const value = asset?.total || 0;

      if (!currencyTotals[currency]) {
        currencyTotals[currency] = 0;
      }
      currencyTotals[currency] += value;
      totalPortfolioValue += value;
    });

    // Transform for Nivo Pie
    return Object.entries(currencyTotals)
      .map(([id, value]) => ({
        id,
        label: id,
        value: Math.round(value), // Round for cleaner UI
        color: COLORS[id as keyof typeof COLORS] || COLORS.Other,
        percentage: ((value / totalPortfolioValue) * 100).toFixed(1),
      }))
      .sort((a, b) => b.value - a.value); // Sort by biggest slice first
  }, [assets]);

  return (
    <Card className='w-full h-[400px] border-none shadow-sm'>
      <CardHeader>
        <CardTitle className='flex items-center justify-between'>
          <span className='font-semibold tracking-tight text-slate-900'>
            Allocation by Currency
          </span>
          <PieChart size={24} className='text-slate-400' />
        </CardTitle>
        <CardDescription className='text-[10px] font-bold uppercase tracking-widest text-slate-400'>
          Your total risk exposure split by currency.
        </CardDescription>
      </CardHeader>
      <CardContent className='h-[300px] w-full'>
        {data.length > 0 ? (
          <ResponsivePie
            data={data}
            margin={{ top: 20, right: 80, bottom: 80, left: 80 }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            colors={{ datum: 'data.color' }}
            borderWidth={1}
            borderColor={{
              from: 'color',
              modifiers: [['darker', 0.2]],
            }}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor='#333333'
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: 'color' }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{
              from: 'color',
              modifiers: [['darker', 2]],
            }}
            tooltip={({ datum }) => (
              <div className='bg-white p-2 border border-slate-200 rounded shadow-sm text-xs'>
                <strong>{datum.id}</strong>: ${datum.value.toLocaleString()} (
                {datum.data.percentage}%)
              </div>
            )}
            legends={[
              {
                anchor: 'bottom',
                direction: 'row',
                justify: false,
                translateX: 0,
                translateY: 56,
                itemsSpacing: 0,
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: '#999',
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: 'circle',
                effects: [
                  {
                    on: 'hover',
                    style: {
                      itemTextColor: '#000',
                    },
                  },
                ],
              },
            ]}
          />
        ) : (
          <div className='flex items-center justify-center h-full text-slate-400'>
            No asset data available
          </div>
        )}
      </CardContent>
    </Card>
  );
};
