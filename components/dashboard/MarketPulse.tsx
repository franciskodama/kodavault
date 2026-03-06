'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

interface IndexData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  sparkline: number[];
}

export function MarketPulse() {
  const [indices, setIndices] = useState<IndexData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would fetch from a live API.
    // For TRezo's "Market Hub," we'll simulate the pulse with realistic mock data.
    const generateMockPulse = () => {
      const mockIndices = [
        {
          symbol: 'S&P 500',
          name: 'US Large Cap',
          price: 6754.12,
          change: 54.22,
          changePercent: 0.81,
          sparkline: [6680, 6702, 6720, 6715, 6735, 6745, 6754],
        },
        {
          symbol: 'NASDAQ',
          name: 'Tech Heavy',
          price: 21482.55,
          change: 224.12,
          changePercent: 1.05,
          sparkline: [21150, 21240, 21320, 21280, 21380, 21440, 21482],
        },
        {
          symbol: 'FTSE 100',
          name: 'London',
          price: 8412.33,
          change: -14.45,
          changePercent: -0.17,
          sparkline: [8440, 8435, 8450, 8430, 8425, 8418, 8412],
        },
        {
          symbol: 'IBOVESPA',
          name: 'São Paulo',
          price: 138650,
          change: 1150,
          changePercent: 0.84,
          sparkline: [136800, 137200, 137800, 137600, 138200, 138500, 138650],
        },
        {
          symbol: 'NIKKEI 225',
          name: 'Tokyo',
          price: 43250,
          change: -280,
          changePercent: -0.64,
          sparkline: [43650, 43550, 43450, 43350, 43400, 43300, 43250],
        },
      ];
      setIndices(mockIndices);
      setLoading(false);
    };

    generateMockPulse();
  }, []);

  if (loading) return null;

  return (
    <Card className='bg-white border-slate-200 shadow-sm overflow-hidden'>
      <CardHeader className='pb-3 border-b border-slate-50 bg-slate-50/30'>
        <div className='flex items-center gap-2'>
          <Activity className='w-4 h-4 text-slate-400 font-bold' />
          <div className='flex flex-col'>
            <p className='text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 leading-none mb-1'>
              Immediate State
            </p>
            <CardTitle className='text-sm font-bold tracking-tight text-slate-900'>
              GLOBAL MARKET PULSE
            </CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className='pt-4 flex flex-col gap-5'>
        {indices.map((index) => {
          const isPositive = index.change >= 0;
          return (
            <div
              key={index.symbol}
              className='flex items-center justify-between group cursor-default'
            >
              <div className='flex flex-col'>
                <div className='flex items-center gap-2'>
                  <span className='text-[11px] font-black text-slate-900 tracking-tight'>
                    {index.symbol}
                  </span>
                  <div
                    className={cn(
                      'flex items-center text-[10px] font-bold',
                      isPositive ? 'text-green-600' : 'text-red-600'
                    )}
                  >
                    {isPositive ? (
                      <TrendingUp className='w-2.5 h-2.5 mr-0.5' />
                    ) : (
                      <TrendingDown className='w-2.5 h-2.5 mr-0.5' />
                    )}
                    {isPositive ? '+' : ''}
                    {index.changePercent}%
                  </div>
                </div>
                <p className='text-[9px] text-slate-400 font-bold uppercase tracking-tight'>
                  {index.name}
                </p>
              </div>

              <div className='flex flex-col items-end gap-1'>
                <span className='text-[11px] font-mono font-bold text-slate-700 leading-none'>
                  {new Intl.NumberFormat('en-US').format(index.price)}
                </span>
                <div className='flex flex-col items-end'>
                  <p className='text-[7px] font-bold text-slate-300 uppercase tracking-tighter mb-0.5 leading-none'>
                    Intraday Trend
                  </p>
                  {/* Simplified Sparkline using SVG */}
                  <svg width='64' height='14' className='overflow-visible'>
                    <path
                      d={`M ${index.sparkline
                        .map((val, i) => {
                          const max = Math.max(...index.sparkline);
                          const min = Math.min(...index.sparkline);
                          const norm = (val - min) / (max - min || 1);
                          return `${i * 10} ${14 - (norm * 12 + 1)}`;
                        })
                        .join(' L ')}`}
                      fill='none'
                      stroke={isPositive ? '#22C55E' : '#EF4444'}
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
