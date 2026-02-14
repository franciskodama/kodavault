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
import { FredReleaseDate, FredReleasesResponse } from '@/lib/types';
import { isThisWeek, dateFormatter } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CardFredEvents() {
  const [events, setEvents] = useState<FredReleaseDate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFredData = async () => {
      try {
        const response = await axios.get<FredReleasesResponse>('/api/fred');
        // Filter for this week
        const filtered = response.data.release_dates.filter((event) =>
          isThisWeek(event.date)
        );
        // Sort by date ascending
        filtered.sort((a, b) => a.date.localeCompare(b.date));
        setEvents(filtered);
      } catch (error) {
        console.error('Error fetching FRED data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFredData();
  }, []);

  const displayEvents = events.slice(0, 5);
  const hasMore = events.length > 5;

  return (
    <Card className='h-full flex flex-col'>
      <CardHeader>
        <CardTitle className='flex items-center justify-between'>
          <span>Economic Dates</span>
          <span className='text-2xl'>📅</span>
        </CardTitle>
        <CardDescription>FRED releases for this week</CardDescription>
      </CardHeader>
      <CardContent className='flex-grow'>
        {loading ? (
          <div className='animate-pulse space-y-2'>
            <div className='h-4 bg-slate-200 rounded w-full'></div>
            <div className='h-4 bg-slate-200 rounded w-3/4'></div>
            <div className='h-4 bg-slate-200 rounded w-5/6'></div>
          </div>
        ) : events.length === 0 ? (
          <p className='text-slate-400 italic'>No major releases this week.</p>
        ) : (
          <div className='space-y-3'>
            {displayEvents.map((event, idx) => (
              <div
                key={`${event.release_id}-${idx}`}
                className='flex flex-col gap-0.5 border-l-2 border-accent pl-2'
              >
                <span className='text-[10px] font-bold text-slate-400'>
                  {dateFormatter(event.date)}
                </span>
                <span className='text-[11px] font-medium leading-tight line-clamp-2'>
                  {event.release_name}
                </span>
              </div>
            ))}
            {hasMore && (
              <p className='text-[10px] text-slate-400 text-center font-medium'>
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
            className='w-full justify-between text-xs font-semibold'
          >
            SEE MORE
            <ChevronRight size={14} />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
