'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Clock, Globe } from 'lucide-react';

interface Market {
  name: string;
  fullName: string;
  timezone: string;
  open: string; // HH:mm
  close: string; // HH:mm
}

const MARKETS: Market[] = [
  {
    name: 'LONDON',
    fullName: 'LSE / FTSE',
    timezone: 'Europe/London',
    open: '08:00',
    close: '16:30',
  },
  {
    name: 'NEW YORK',
    fullName: 'NYSE / NASDAQ',
    timezone: 'America/New_York',
    open: '09:30',
    close: '16:00',
  },
  {
    name: 'TORONTO',
    fullName: 'TSX / TSXV',
    timezone: 'America/Toronto',
    open: '09:30',
    close: '16:00',
  },
  {
    name: 'SÃO PAULO',
    fullName: 'B3 (IBOVESPA)',
    timezone: 'America/Sao_Paulo',
    open: '10:00',
    close: '17:55',
  },
  {
    name: 'TOKYO',
    fullName: 'TSE / NIKKEI',
    timezone: 'Asia/Tokyo',
    open: '09:00',
    close: '15:00',
  },
  {
    name: 'SHANGHAI',
    fullName: 'SSE / CSI 300',
    timezone: 'Asia/Shanghai',
    open: '09:30',
    close: '15:00',
  },
];

export function GlobalClock() {
  const [marketStatuses, setMarketStatuses] = useState<any[]>([]);

  useEffect(() => {
    const updateStats = () => {
      const now = new Date();

      const stats = MARKETS.map((market) => {
        // Get current time in market timezone
        const marketTimeStr = now.toLocaleString('en-US', {
          timeZone: market.timezone,
          hour12: false,
        });
        const marketDate = new Date(marketTimeStr);
        const day = marketDate.getDay(); // 0 (Sun) to 6 (Sat)
        const hour = marketDate.getHours();
        const minute = marketDate.getMinutes();

        const [openH, openM] = market.open.split(':').map(Number);
        const [closeH, closeM] = market.close.split(':').map(Number);

        const isWeekend = day === 0 || day === 6;
        const currentTotalMinutes = hour * 60 + minute;
        const openTotalMinutes = openH * 60 + openM;
        const closeTotalMinutes = closeH * 60 + closeM;

        let isOpen = false;
        let countdownText = '';

        if (
          !isWeekend &&
          currentTotalMinutes >= openTotalMinutes &&
          currentTotalMinutes < closeTotalMinutes
        ) {
          isOpen = true;
          const diff = closeTotalMinutes - currentTotalMinutes;
          const h = Math.floor(diff / 60);
          const m = diff % 60;
          countdownText = `Closes in ${h}h ${m}m`;
        } else {
          isOpen = false;
          // Calculate minutes until next open
          let minutesUntilOpen = 0;
          if (isWeekend) {
            const daysToMonday = day === 0 ? 1 : 2;
            minutesUntilOpen =
              daysToMonday * 24 * 60 + (openTotalMinutes - currentTotalMinutes);
          } else if (currentTotalMinutes < openTotalMinutes) {
            minutesUntilOpen = openTotalMinutes - currentTotalMinutes;
          } else {
            // After close, count to tomorrow
            const tomorrowIsWeekend =
              (day + 1) % 7 === 6 || (day + 1) % 7 === 0;
            const daysToAdd = tomorrowIsWeekend
              ? (day + 1) % 7 === 6
                ? 3
                : 2
              : 1;
            minutesUntilOpen =
              daysToAdd * 24 * 60 + (openTotalMinutes - currentTotalMinutes);
          }

          const h = Math.floor(minutesUntilOpen / 60);
          const m = minutesUntilOpen % 60;
          countdownText = `Opens in ${h}h ${m}m`;
        }

        return {
          ...market,
          isOpen,
          countdownText,
        };
      });

      setMarketStatuses(stats);
    };

    updateStats();
    const interval = setInterval(updateStats, 1000 * 30); // update every 30s
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className='bg-[#0F172A] border-slate-800 text-white overflow-hidden shadow-2xl relative'>
      <div className='absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#22C55E] via-emerald-500 to-[#22C55E]' />
      <CardHeader className='pb-4 border-b border-white/5 bg-white/[0.02]'>
        <div className='flex items-center gap-3'>
          <div className='p-2 bg-slate-800/50 rounded-lg'>
            <Globe className='w-4 h-4 text-[#22C55E]' />
          </div>
          <div className='flex flex-col'>
            <p className='text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500 mb-0.5'>
              Live Status
            </p>
            <CardTitle className='text-lg font-bold tracking-tight text-white'>
              GLOBAL CLOCK
            </CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className='pt-6 flex flex-col gap-6 selection:bg-emerald-500/30'>
        {marketStatuses.map((market) => (
          <div
            key={market.name}
            className='flex items-center justify-between group transition-all duration-300'
          >
            <div className='flex items-center gap-4'>
              <div className='relative flex items-center justify-center'>
                <div
                  className={cn(
                    'w-3 h-3 rounded-full transition-all duration-500 relative z-10',
                    market.isOpen ? 'bg-[#22C55E]' : 'bg-slate-700'
                  )}
                />
                {market.isOpen && (
                  <div className='absolute w-5 h-5 bg-[#22C55E]/40 rounded-full animate-ping' />
                )}
              </div>
              <div className='flex flex-col'>
                <h3 className='text-sm font-bold tracking-wider text-slate-200 group-hover:text-white transition-colors'>
                  {market.name}
                </h3>
                <div className='flex items-center gap-1.5'>
                  <p
                    className={cn(
                      'text-[10px] font-bold uppercase tracking-widest',
                      market.isOpen ? 'text-[#22C55E]' : 'text-slate-500'
                    )}
                  >
                    {market.isOpen ? 'OPEN' : 'CLOSED'}
                  </p>
                </div>
              </div>
            </div>
            <div className='flex flex-col items-end'>
              <div className='flex items-center gap-1.5 text-slate-400 group-hover:text-slate-200 transition-colors'>
                <Clock className='w-3 h-3' />
                <p className='text-[11px] font-bold font-mono tracking-tight'>
                  {market.countdownText}
                </p>
              </div>
              <p className='text-[9px] text-slate-600 font-bold uppercase tracking-wider mt-0.5 group-hover:text-slate-500'>
                {market.fullName}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
