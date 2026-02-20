'use client';

import { useMemo } from 'react';
import { ResponsivePie } from '@nivo/pie';
import { PieChart } from 'lucide-react';
import { Asset } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const COLORS = {
  USD: '#2563eb', // Blue
  CAD: '#dc2626', // Red
  BRL: '#16a34a', // Green
  BTC: '#eab308', // Gold
  Other: '#94a3b8', // Slate
};

export const CardAllocationByCurrency = ({ assets }: { assets: Asset[] }) => {
  const data = useMemo(() => {
    if (!assets || assets.length === 0) return [];

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
    <Card className='w-full h-full border-none shadow-sm'>
      <CardHeader>
        <CardTitle className='flex items-center justify-between'>
          <span className='font-semibold tracking-tight text-slate-900'>
            Allocation by Currency
          </span>
          <PieChart size={24} className='text-slate-400' />
        </CardTitle>
      </CardHeader>
      <CardContent className='h-[270px] w-full flex flex-col'>
        {data.length > 0 ? (
          <>
            <div className='flex-1 min-h-0'>
              <ResponsivePie
                data={data}
                margin={{ top: 20, right: 40, bottom: 20, left: 40 }}
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
                valueFormat=','
                arcLabelsSkipAngle={10}
                arcLabelsTextColor='#ffffff'
                tooltip={({ datum }) => (
                  <div className='bg-white p-2 border border-slate-200 rounded shadow-sm text-xs'>
                    <strong>{datum.id}</strong>: ${datum.value.toLocaleString()}{' '}
                    ({datum.data.percentage}%)
                  </div>
                )}
              />
            </div>
            <div className='flex flex-wrap justify-center gap-x-6 gap-y-2 pb-4'>
              {data.map((item) => (
                <div key={item.id} className='flex items-center gap-2'>
                  <div
                    className='w-2 h-2 rounded-full'
                    style={{ backgroundColor: item.color }}
                  />
                  <span className='text-[10px] font-medium text-slate-400 uppercase tracking-widest'>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className='flex items-center justify-center h-full text-slate-400'>
            No asset data available
          </div>
        )}
      </CardContent>
    </Card>
  );
};
