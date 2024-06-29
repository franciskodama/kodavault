import { Asset, CurrencyData, ChartData, totalArrayProps } from '@/lib/types';
import ChartClient from './chart';
import { currentUser } from '@clerk/nextjs';
import { addNetWorthEvolution } from '@/lib/actions';

export default function ChartPage({ chartData }: { chartData: ChartData[] }) {
  return (
    <>
      <div className='mx-auto'>
        <ChartClient chartData={chartData} />
      </div>
    </>
  );
}
