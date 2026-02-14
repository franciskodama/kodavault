'use client';

import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { FredReleaseDate, FredReleasesResponse } from '@/lib/types';
import { Loading } from '@/components/common/Loading';
import { dateFormatter, isThisWeek, cn } from '@/lib/utils';

export default function CalendarPage() {
  const [data, setData] = useState<FredReleaseDate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<FredReleasesResponse>('/api/fred');
        setData(response.data.release_dates);
      } catch (error) {
        console.error('Error fetching FRED data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Loading />;

  // Group by date
  const groupedData = data.reduce((acc, current) => {
    if (!acc[current.date]) {
      acc[current.date] = [];
    }
    acc[current.date].push(current);
    return acc;
  }, {} as Record<string, FredReleaseDate[]>);

  const sortedDates = Object.keys(groupedData).sort((a, b) =>
    b.localeCompare(a)
  );

  return (
    <div className='p-8 max-w-5xl mx-auto min-h-[75vh]'>
      <div className='flex flex-col gap-2 mb-10'>
        <h1 className='text-3xl font-bold tracking-tight text-slate-800 flex items-center gap-3'>
          <span className='p-2 bg-accent rounded-lg shadow-sm text-2xl'>
            📅
          </span>
          Economic Calendar
        </h1>
        <p className='text-slate-500 font-medium'>
          Tracking major US Federal Reserve data releases and economic
          indicators.
        </p>
      </div>

      {data.length === 0 ? (
        <div className='flex flex-col items-center justify-center py-20 bg-white border-2 border-dashed rounded-xl border-slate-200'>
          <p className='text-slate-400 font-medium italic'>
            No economic data releases found at this time.
          </p>
        </div>
      ) : (
        <div className='space-y-8 pb-10'>
          {sortedDates.map((date) => (
            <div key={date} className='group'>
              <div className='flex items-center gap-4 mb-3'>
                <div className='h-[1px] flex-grow bg-slate-100 group-hover:bg-accent transition-colors' />
                <h2 className='text-sm font-bold text-slate-400 bg-white px-3 py-1 rounded-full border border-slate-100 shadow-sm'>
                  {dateFormatter(date)}
                </h2>
                <div className='h-[1px] flex-grow bg-slate-100 group-hover:bg-accent transition-colors' />
              </div>

              <div className='bg-white border rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow'>
                <table className='w-full text-left font-light'>
                  <thead className='bg-slate-50 border-b'>
                    <tr className='text-[10px] uppercase tracking-wider font-bold text-slate-500'>
                      <th className='px-6 py-3 w-24'>Code</th>
                      <th className='px-6 py-3'>Release Event</th>
                      <th className='px-6 py-3 text-right'>Status</th>
                    </tr>
                  </thead>
                  <tbody className='divide-y divide-slate-50'>
                    {groupedData[date].map((release) => (
                      <tr
                        key={`${release.release_id}-${release.date}`}
                        className='hover:bg-slate-50/80 transition-colors group/row'
                      >
                        <td className='px-6 py-4 text-xs font-mono text-slate-400'>
                          #{release.release_id}
                        </td>
                        <td className='px-6 py-4 font-semibold text-slate-700'>
                          {release.release_name}
                        </td>
                        <td className='px-6 py-4 text-right'>
                          <span
                            className={cn(
                              'text-[10px] font-bold px-2 py-1 rounded-full',
                              isThisWeek(release.date)
                                ? 'bg-green-100 text-green-700'
                                : 'bg-slate-100 text-slate-500'
                            )}
                          >
                            {isThisWeek(release.date)
                              ? 'THIS WEEK'
                              : 'SCHEDULED'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
