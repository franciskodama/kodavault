'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { EconomicCalendarEvent, EconomicCalendarResponse } from '@/lib/types';
import { Loading } from '@/components/common/Loading';
import { Sparkles } from 'lucide-react';
import { GlobalClock } from '@/components/calendar/GlobalClock';
import { MarketPulse } from '@/components/calendar/MarketPulse';
import { dateWithDayFormatter, isThisWeek, isToday, cn } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function CalendarPage() {
  const [data, setData] = useState<EconomicCalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'high_impact'>('high_impact');
  const [period, setPeriod] = useState<'this_week' | 'next_week'>('this_week');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const url = `/api/economic-calendar?filter=${filter}&period=${period}`;
        const response = await axios.get<EconomicCalendarResponse>(url);
        if (response.data && Array.isArray(response.data)) {
          setData(response.data);
        } else {
          console.error(
            'Economic data received is not an array:',
            response.data
          );
          setData([]);
        }
      } catch (error) {
        console.error('Error fetching economic data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filter, period]);

  if (loading) return <Loading />;

  // Group by date
  const groupedData = data.reduce((acc, current) => {
    if (!current.date) return acc;

    // Ensure we handle MM-DD-YYYY correctly for the dateKey
    let dateKey = current.date;
    if (current.date.includes('-')) {
      const parts = current.date.split('-');
      if (parts.length === 3) {
        // MM-DD-YYYY -> YYYY-MM-DD
        dateKey = `${parts[2]}-${parts[0]}-${parts[1]}`;
      }
    }

    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(current);
    return acc;
  }, {} as Record<string, EconomicCalendarEvent[]>);

  const sortedDates = Object.keys(groupedData).sort((a, b) =>
    a.localeCompare(b)
  );

  return (
    <div className='flex flex-col gap-1 px-8 sm:p-0 min-h-[75vh]'>
      <div className='flex flex-col sm:flex-row justify-between items-end mb-10 px-4 sm:px-0'>
        <div className='flex flex-col items-center justify-center w-full mt-12'>
          <div className='flex flex-col'>
            <p className='text-[10px] font-bold uppercase tracking-[0.4em] text-slate-400 leading-none mb-3'>
              Market Hub
            </p>
            <h1 className='text-3xl font-bold text-slate-900 tracking-tight leading-none'>
              Economic Calendar
            </h1>
            <div className='w-12 h-1.5 bg-[#22C55E] rounded-full mt-6 shadow-sm shadow-green-100' />
          </div>
        </div>

        <div className='flex flex-col sm:flex-row items-center justify-center gap-6 mt-12 mb-8'>
          {/* Period Filter */}
          <div className='flex p-1 bg-slate-100/50 backdrop-blur-sm rounded-xl border border-slate-200/60 shadow-sm'>
            <Button
              variant={period === 'this_week' ? 'default' : 'ghost'}
              size='sm'
              className={cn(
                'text-[10px] h-8 px-4 font-bold tracking-wider transition-all duration-300 rounded-lg',
                period === 'this_week'
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'text-slate-500 hover:text-slate-900'
              )}
              onClick={() => setPeriod('this_week')}
            >
              THIS WEEK
            </Button>
            <Button
              variant={period === 'next_week' ? 'default' : 'ghost'}
              size='sm'
              className={cn(
                'text-[10px] h-8 px-4 font-bold tracking-wider transition-all duration-300 rounded-lg',
                period === 'next_week'
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'text-slate-500 hover:text-slate-900'
              )}
              onClick={() => setPeriod('next_week')}
            >
              NEXT WEEK
            </Button>
          </div>

          <div className='w-px h-6 bg-slate-200 hidden sm:block' />

          {/* Impact Filter */}
          <div className='flex p-1 bg-slate-100/50 backdrop-blur-sm rounded-xl border border-slate-200/60 shadow-sm'>
            <Button
              variant={filter === 'high_impact' ? 'default' : 'ghost'}
              size='sm'
              className={cn(
                'text-[10px] h-8 px-4 font-bold tracking-wider transition-all duration-300 rounded-lg',
                filter === 'high_impact'
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'text-slate-500 hover:text-slate-900'
              )}
              onClick={() => setFilter('high_impact')}
            >
              HIGH IMPACT
            </Button>
            <Button
              variant={filter === 'all' ? 'default' : 'ghost'}
              size='sm'
              className={cn(
                'text-[10px] h-8 px-4 font-bold tracking-wider transition-all duration-300 rounded-lg',
                filter === 'all'
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'text-slate-500 hover:text-slate-900'
              )}
              onClick={() => setFilter('all')}
            >
              ALL RELEASES
            </Button>
          </div>
          <p className='text-[10px] text-slate-400 uppercase font-bold tracking-[0.2em]'>
            (EST)
          </p>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8 px-4 sm:px-0'>
        <div className='flex flex-col gap-6 order-2 lg:order-1'>
          <GlobalClock />
          <MarketPulse />
        </div>

        <div className='flex flex-col gap-4 pb-10 order-1 lg:order-2'>
          {data.length === 0 ? (
            <Card className='flex flex-col items-center justify-center py-20'>
              <p className='text-slate-400 font-medium italic'>
                No releases found for the selected period.
              </p>
              {filter === 'high_impact' && (
                <Button
                  variant='link'
                  onClick={() => setFilter('all')}
                  className='mt-2'
                >
                  View all releases
                </Button>
              )}
            </Card>
          ) : (
            sortedDates.map((date) => {
              const today = isToday(date);
              return (
                <Card
                  key={date}
                  className={cn(
                    'overflow-hidden transition-all duration-500 relative bg-white',
                    today &&
                      'ring-2 ring-[#22C55E]/20 shadow-xl shadow-green-100/50 border-green-200'
                  )}
                >
                  <CardHeader
                    className={cn(
                      'bg-slate-50 py-2 px-4 border-b flex flex-row items-center justify-between space-y-0',
                      today && 'bg-green-50 border-green-100'
                    )}
                  >
                    <CardTitle
                      className={cn(
                        'text-[10px] uppercase font-bold flex items-center gap-2 tracking-wider text-slate-500',
                        today && 'text-green-700'
                      )}
                    >
                      {dateWithDayFormatter(date)}
                    </CardTitle>
                    <div className='flex gap-2 items-center'>
                      {today && (
                        <span className='text-[10px] bg-[#22C55E] text-white px-2.5 py-1 rounded-lg font-bold tracking-wider shadow-sm flex items-center gap-1.5 animate-in fade-in zoom-in duration-500'>
                          <Sparkles className='w-2.5 h-2.5 fill-white/20' />
                          TODAY
                        </span>
                      )}
                      {isThisWeek(date) && !today && (
                        <span className='text-[10px] bg-slate-200 text-slate-500 px-2 py-0.5 rounded-lg font-bold uppercase tracking-tight'>
                          THIS WEEK
                        </span>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className='p-0 overflow-x-auto'>
                    <div className='min-w-[600px]'>
                      <div className='grid grid-cols-[100px_1fr_90px_90px_90px] bg-slate-50/80 border-b text-[10px] uppercase font-bold text-slate-400 tracking-wider'>
                        <div className='px-6 py-3'>Time</div>
                        <div className='px-6 py-3'>Event</div>
                        <div className='px-6 py-3 text-right'>Actual</div>
                        <div className='px-6 py-3 text-right'>Forecast</div>
                        <div className='px-6 py-3 text-right'>Previous</div>
                      </div>
                      <div className='divide-y divide-slate-100 flex flex-col'>
                        {groupedData[date].map((release, idx) => {
                          return (
                            <div
                              key={`${release.title}-${idx}`}
                              className='grid grid-cols-[100px_1fr_90px_90px_90px] hover:bg-slate-50/50 transition-colors items-center'
                            >
                              <div className='px-6 py-4 text-[11px] font-bold text-slate-400 tracking-tight'>
                                {release.time || 'All Day'}
                              </div>
                              <div className='px-6 py-4 font-bold text-sm text-slate-800'>
                                {release.title}
                              </div>
                              <div
                                className={cn(
                                  'px-6 py-4 text-right font-bold text-sm',
                                  release.actual && release.forecast
                                    ? parseFloat(release.actual) >=
                                      parseFloat(release.forecast)
                                      ? 'text-green-600'
                                      : 'text-red-600'
                                    : 'text-slate-600'
                                )}
                              >
                                {release.actual || '-'}
                              </div>
                              <div className='px-6 py-4 text-right text-sm text-slate-500 font-bold'>
                                {release.forecast || '-'}
                              </div>
                              <div className='px-6 py-4 text-right text-sm text-slate-400/80 font-semibold'>
                                {release.previous || '-'}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
