'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { EconomicCalendarEvent, EconomicCalendarResponse } from '@/lib/types';
import { isThisWeek, dateWithDayFormatter } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CardFredEvents() {
  const [events, setEvents] = useState<EconomicCalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEconomicData = async () => {
      try {
        const response = await axios.get<EconomicCalendarResponse>(
          '/api/economic-calendar?filter=high_impact'
        );

        // Ensure response.data is an array before filtering
        if (response.data && Array.isArray(response.data)) {
          const filtered = response.data.filter((event) => {
            if (!event.date) return false;
            const parts = event.date.split('-');
            if (parts.length < 3) return false;
            const isoDate = `${parts[2]}-${parts[0]}-${parts[1]}`;
            return isThisWeek(isoDate);
          });
          setEvents(filtered);
        } else {
          console.error(
            'Economic data received is not an array:',
            response.data
          );
          setEvents([]);
        }
      } catch (error) {
        console.error('Error fetching economic data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEconomicData();
  }, []);

  const displayEvents = events.slice(0, 5);
  const hasMore = events.length > 5;

  return (
    <Card className='h-full flex flex-col uppercase tracking-tighter'>
      <CardHeader>
        <CardTitle className='flex items-center justify-between'>
          <span className='font-black text-xl'>Economic Dates</span>
          <span className='text-2xl'>📅</span>
        </CardTitle>
        <CardDescription className='text-xs font-bold'>
          High impact releases (EST)
        </CardDescription>
      </CardHeader>
      <CardContent className='flex-grow px-4'>
        {loading ? (
          <div className='animate-pulse space-y-2'>
            <div className='h-4 bg-slate-200 rounded w-full'></div>
            <div className='h-4 bg-slate-200 rounded w-3/4'></div>
            <div className='h-4 bg-slate-200 rounded w-5/6'></div>
          </div>
        ) : events.length === 0 ? (
          <p className='text-slate-400 italic text-xs'>
            No major releases this week.
          </p>
        ) : (
          <div className='space-y-4'>
            {displayEvents.map((event, idx) => {
              const parts = event.date.split('-');
              const isoDate = `${parts[2]}-${parts[0]}-${parts[1]}`;

              return (
                <div
                  key={`${event.title}-${idx}`}
                  className='flex flex-col gap-0 border-l-2 border-accent pl-3'
                >
                  <div className='flex justify-between items-center mb-0.5'>
                    <span className='text-[10px] font-black text-slate-400'>
                      {dateWithDayFormatter(isoDate).split(',')[0]}
                    </span>
                    <span className='text-[10px] font-black text-slate-500'>
                      {event.time}
                    </span>
                  </div>
                  <span className='text-[11px] font-black leading-tight line-clamp-2 mb-1'>
                    {event.title}
                  </span>
                  {(event.actual || event.forecast) && (
                    <div className='flex gap-2 text-[9px] font-black text-slate-400'>
                      {event.actual && <span>ACT: {event.actual}</span>}
                      {event.forecast && <span>EST: {event.forecast}</span>}
                    </div>
                  )}
                </div>
              );
            })}
            {hasMore && (
              <p className='text-[10px] text-slate-400 text-center font-black'>
                + {events.length - 5} more events
              </p>
            )}
          </div>
        )}
      </CardContent>

      <CardFooter className='p-2 bg-slate-50 mt-auto'>
        <Link href='/calendar' className='w-full'>
          <Button
            variant='ghost'
            size='sm'
            className='w-full justify-between text-xs font-black'
          >
            SEE MORE
            <ChevronRight size={14} />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
