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
      <CardHeader className='pb-3 border-b border-white/5 bg-white/[0.02]'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <div className='p-2 bg-slate-800/50 rounded-lg'>
              <Activity className='w-4 h-4 text-indigo-400 font-bold' />
            </div>
            <div className='flex flex-col'>
              <p className='text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500 leading-none mb-1'>
                Live Stream
              </p>
              <CardTitle className='text-lg font-bold tracking-tight text-white uppercase'>
                Market Pulse
              </CardTitle>
            </div>
          </div>
          {lastUpdate && (
            <div className='flex items-center gap-1.5 text-slate-500 bg-slate-800/30 px-2 py-1 rounded-md border border-white/5'>
              <Clock className='w-3 h-3' />
              <span className='text-[10px] font-bold font-mono'>
                {lastUpdate.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className='pt-6 flex flex-col gap-5 selection:bg-indigo-500/30'>
        {indices.map((index) => {
          const isPositive = index.isPositive;
          return (
            <div
              key={index.id}
              className='flex items-center justify-between group cursor-default transition-all duration-300 hover:bg-white/[0.02] p-2 -mx-2 rounded-xl'
            >
              <div className='flex flex-col'>
                <div className='flex items-center gap-2 mb-1'>
                  <span className='text-sm font-black text-slate-200 tracking-tight group-hover:text-white transition-colors'>
                    {index.symbol}
                  </span>
                  <div
                    className={cn(
                      'flex items-center text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-tighter',
                      isPositive
                        ? 'bg-emerald-500/10 text-emerald-400'
                        : 'bg-red-500/10 text-red-400'
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
                <div className='flex items-center gap-1.5'>
                  <div
                    className={cn(
                      'w-1.5 h-1.5 rounded-full',
                      isPositive
                        ? 'bg-emerald-500 shadow-[0_0_8px_#10B981]'
                        : 'bg-red-500 shadow-[0_0_8px_#EF4444]'
                    )}
                  />
                  <p className='text-xs font-mono font-bold text-slate-400 group-hover:text-slate-300 transition-colors'>
                    {index.price}
                  </p>
                </div>
              </div>

              <div className='flex flex-col items-end gap-2'>
                {/* SVG Sparkline */}
                <div className='opacity-80 group-hover:opacity-100 transition-opacity'>
                  <svg width='70' height='16' className='overflow-visible'>
                    <path
                      d={`M ${index.sparkline
                        .map((val, i) => {
                          const max = Math.max(...index.sparkline);
                          const min = Math.min(...index.sparkline);
                          const range = max - min || 1;
                          const norm = (val - min) / range;
                          return `${i * (70 / (index.sparkline.length - 1))} ${
                            16 - (norm * 14 + 1)
                          }`;
                        })
                        .join(' L ')}`}
                      fill='none'
                      stroke={isPositive ? '#10B981' : '#EF4444'}
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      style={{
                        filter: `drop-shadow(0 0 3px ${
                          isPositive ? '#10B98144' : '#EF444444'
                        })`,
                      }}
                    />
                  </svg>
                </div>
                <p className='text-[9px] font-bold text-slate-600 uppercase tracking-[0.2em] group-hover:text-slate-500 transition-colors'>
                  {isPositive ? 'Accumulating' : 'Distributing'}
                </p>
              </div>
            </div>
          );
        })}

        <div className='pt-4 border-t border-white/5 mt-1 flex items-center justify-between'>
          <p className='text-[9px] text-slate-600 font-bold uppercase tracking-wider italic'>
            15m Delayed Data
          </p>
          <div className='flex items-center gap-1 text-[9px] text-slate-600 font-black uppercase tracking-widest'>
            <RefreshCcw className='w-2 h-2' />
            Live Sync
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
