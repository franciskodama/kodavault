'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {
  Activity,
  TrendingUp,
  TrendingDown,
  RefreshCcw,
  Clock,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface IndexData {
  id: string;
  symbol: string;
  price: string;
  change: string;
  changePercent: string;
  sparkline: number[];
  isPositive: boolean;
}

export function MarketPulse() {
  const [indices, setIndices] = useState<IndexData[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const fetchLiveMarketData = async () => {
    try {
      const response = await fetch('/api/market-pulse');
      if (!response.ok) throw new Error('API failed');
      const data = await response.json();
      setIndices(data);
      setLastUpdate(new Date());
    } catch (error) {
      console.error('Error fetching indices:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveMarketData();
    const interval = setInterval(fetchLiveMarketData, 1000 * 60); // every 60s
    return () => clearInterval(interval);
  }, []);

  if (loading && indices.length === 0) {
    return (
      <Card className='bg-[#0F172A] border-slate-800 text-white overflow-hidden shadow-2xl relative min-h-[400px] flex flex-col items-center justify-center'>
        <div className='absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500 animate-pulse' />
        <RefreshCcw className='w-8 h-8 text-slate-700 animate-spin mb-4' />
        <p className='text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] animate-pulse italic'>
          Syncing Global Markets...
        </p>
      </Card>
    );
  }

  return (
    <Card className='bg-[#0F172A] border-slate-800 text-white overflow-hidden shadow-2xl relative'>
      <CardHeader className='pb-4 border-b border-white/5 bg-white/[0.02]'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <div className='p-2 bg-slate-800/50 rounded-lg'>
              <Activity className='w-4 h-4 text-indigo-400 font-bold' />
            </div>
            <div className='flex flex-col'>
              <p className='text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500 mb-0.5'>
                Live Stream
              </p>
              <CardTitle className='text-lg font-bold tracking-wide text-white uppercase'>
                Market Pulse
              </CardTitle>
            </div>
          </div>
          {lastUpdate && (
            <div className='flex flex-col items-end'>
              <div className='flex items-center gap-1.5 text-slate-500 bg-slate-800/30'>
                <Clock className='w-3 h-3' />
                <span className='text-[10px] font-bold font-mono'>
                  {lastUpdate.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
              <p className='text-[9px] text-slate-400'>Last Update</p>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className='pt-6 flex flex-col gap-6 selection:bg-indigo-500/30'>
        {indices.map((index) => {
          const isPositive = index.isPositive;
          return (
            <div
              key={index.id}
              className='flex items-center justify-between group cursor-default transition-all duration-300'
            >
              <div className='flex items-center gap-4'>
                <div className='relative flex items-center justify-center'>
                  <div
                    className={cn(
                      'w-3 h-3 rounded-full transition-all duration-500 relative z-10',
                      isPositive ? 'bg-emerald-500' : 'bg-red-500'
                    )}
                  />
                  <div
                    className={cn(
                      'absolute w-5 h-5 rounded-full animate-ping',
                      isPositive ? 'bg-emerald-500/40' : 'bg-red-500/40'
                    )}
                  />
                </div>
                <div className='flex flex-col'>
                  <h3 className='text-sm font-bold tracking-wider text-slate-200 group-hover:text-white transition-colors uppercase'>
                    {index.symbol}
                  </h3>
                  <div className='flex items-center gap-1.5'>
                    <p className='text-[11px] font-bold font-mono text-slate-500 group-hover:text-slate-400 transition-colors uppercase tracking-widest'>
                      {index.price}
                    </p>
                  </div>
                </div>
              </div>

              <div className='flex flex-col items-end'>
                <div className='flex items-center gap-1.5 mb-1'>
                  {isPositive ? (
                    <TrendingUp className='w-3 h-3 text-emerald-400' />
                  ) : (
                    <TrendingDown className='w-3 h-3 text-red-400' />
                  )}
                  <p
                    className={cn(
                      'text-[12px] font-bold font-mono tracking-tight',
                      isPositive ? 'text-emerald-400' : 'text-red-400'
                    )}
                  >
                    {isPositive ? '+' : ''}
                    {index.changePercent}%
                  </p>
                </div>
                {/* SVG Sparkline */}
                <div className='opacity-40 group-hover:opacity-100 transition-all duration-500'>
                  <svg width='64' height='12' className='overflow-visible'>
                    <path
                      d={`M ${index.sparkline
                        .map((val, i) => {
                          const max = Math.max(...index.sparkline);
                          const min = Math.min(...index.sparkline);
                          const range = max - min || 1;
                          const norm = (val - min) / range;
                          return `${i * (64 / (index.sparkline.length - 1))} ${
                            12 - (norm * 10 + 1)
                          }`;
                        })
                        .join(' L ')}`}
                      fill='none'
                      stroke={isPositive ? '#10B981' : '#EF4444'}
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
