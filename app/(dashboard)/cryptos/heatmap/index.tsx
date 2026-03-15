'use client';

import { useEffect, useState, useMemo } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Loading } from '@/components/common/Loading';
import { getMonthlyReturns } from '@/lib/actions/heatmap';
import { cn } from '@/lib/utils';
import { CalendarDays } from 'lucide-react';

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export default function Heatmap() {
  const [data, setData] = useState<Record<string, any> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const result = await getMonthlyReturns('BTC-USD');
      if (!('error' in result)) {
        setData(result);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  const years = useMemo(() => {
    if (!data) return [];
    return Object.keys(data).sort((a, b) => Number(b) - Number(a));
  }, [data]);

  const monthAverages = useMemo(() => {
    if (!data) return [];
    const avg = [];
    for (let i = 0; i < 12; i++) {
      let sum = 0;
      let count = 0;
      for (const year of years) {
        const val = data[year]?.[i.toString()];
        if (val !== null && val !== undefined) {
          sum += val;
          count++;
        }
      }
      avg.push(count > 0 ? sum / count : null);
    }
    return avg;
  }, [data, years]);

  const totalAverage = useMemo(() => {
    if (!data) return null;
    let sum = 0;
    let count = 0;
    for (const year of years) {
      const val = data[year]?.total;
      if (val !== null && val !== undefined) {
        sum += val;
        count++;
      }
    }
    return count > 0 ? sum / count : null;
  }, [data, years]);

  const getCellColor = (val: number | null) => {
    if (val === null || val === undefined) return 'bg-slate-800 text-slate-400';
    if (val > 20) return 'bg-[#16a34a] text-white'; // strong green
    if (val > 10) return 'bg-[#22c55e] text-white'; // normal green
    if (val > 0) return 'bg-[#4ade80] text-slate-900'; // light green
    if (val === 0) return 'bg-slate-600 text-white';
    if (val < -20) return 'bg-[#b91c1c] text-white'; // strong red
    if (val < -10) return 'bg-[#dc2626] text-white'; // normal red
    return 'bg-[#f87171] text-slate-900'; // light red
  };

  const formatPercent = (val: number | null) => {
    if (val === null || val === undefined) return 'N/A';
    return `${val.toFixed(2)}%`;
  };

  if (loading) {
    return (
      <div className='flex justify-center items-center h-64'>
        <Loading />
      </div>
    );
  }

  if (!data) {
    return (
      <div className='text-center text-slate-500 py-10'>
        No heatmap data available.
      </div>
    );
  }

  return (
    <div className='flex flex-col w-full gap-2'>
      <Card className='border-none shadow-sm'>
        <CardHeader className='pb-6'>
          <CardTitle className='capitalize flex items-center justify-between'>
            <span className='font-semibold tracking-tight text-slate-900'>
              BTC Monthly Returns Heatmap
            </span>
            <CalendarDays size={24} className='text-slate-400' />
          </CardTitle>
          <CardDescription className='text-xs text-slate-500'>
            Historical percentage returns by month
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className='w-full overflow-x-auto rounded-lg border border-slate-200'>
            <table className='w-full text-center text-xs font-medium border-collapse'>
              <thead>
                <tr className='bg-slate-900 text-slate-100'>
                  <th className='py-3 px-2 font-bold text-left sticky left-0 z-10 bg-slate-900 min-w-[60px]'>
                    Year
                  </th>
                  {MONTHS.map((m) => (
                    <th key={m} className='py-3 px-2 min-w-[60px]'>
                      {m}
                    </th>
                  ))}
                  <th className='py-3 px-2 font-bold text-slate-100 min-w-[70px] border-l-2 border-slate-700/50'>
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {years.map((yearStr) => {
                  const yearData = data[yearStr];
                  return (
                    <tr
                      key={yearStr}
                      className='border-b border-slate-200/50 hover:opacity-90 transition-opacity'
                    >
                      <td className='py-2.5 px-2 bg-slate-800 text-slate-100 font-bold sticky left-0 z-10 border-b border-slate-700 text-left'>
                        {yearStr}
                      </td>
                      {MONTHS.map((_, i) => {
                        const val = yearData[i.toString()];
                        return (
                          <td
                            key={i}
                            className={cn(
                              'py-2.5 px-1 border border-slate-900/10 transition-colors',
                              getCellColor(val)
                            )}
                          >
                            {formatPercent(val)}
                          </td>
                        );
                      })}
                      <td
                        className={cn(
                          'py-2.5 px-1 font-bold border-0 border-slate-800 border-l-[6px] border-l-slate-800 transition-colors',
                          getCellColor(yearData.total)
                        )}
                      >
                        {formatPercent(yearData.total)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className='bg-slate-900 text-slate-100'>
                  <td className='py-3 px-2 font-bold text-left sticky left-0 z-10 bg-slate-900'>
                    Ø Avg
                  </td>
                  {monthAverages.map((avg, i) => (
                    <td
                      key={i}
                      className={cn(
                        'py-3 px-1 font-semibold border-t-[5px] border-slate-800 transition-colors text-slate-900',
                        getCellColor(avg)
                      )}
                    >
                      {formatPercent(avg)}
                    </td>
                  ))}
                  <td
                    className={cn(
                      'py-3 px-1 font-bold border-t-[5px] border-l-[6px] border-l-slate-800 border-slate-800 transition-colors text-slate-900',
                      getCellColor(totalAverage)
                    )}
                  >
                    {formatPercent(totalAverage)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
