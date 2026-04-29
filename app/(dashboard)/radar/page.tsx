import RadarTable from './RadarTable';
import { getRadarData } from '@/lib/actions/radar';

export const metadata = {
  title: 'Radar | Trezo',
  description: 'Advanced data visualization and analysis tool',
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function RadarPage() {
  let initialData: any[] = [];
  try {
    initialData = await getRadarData();
  } catch (error) {
    console.error('RadarPage fetch error:', error);
    // We'll pass an empty array and let the table handle the "No data" state
    // but the error is already logged for debugging.
  }

  console.log(`RadarPage rendering. Passing ${initialData?.length || 0} items to RadarTable`);

  return (
    <div className='flex flex-col gap-1 px-8 sm:p-0'>
      <div className='flex flex-col sm:flex-row justify-between items-end mb-4 px-4 sm:px-0'>
        <div className='flex items-center gap-4 mt-8'>
          <div className='w-1 h-10 bg-[#22C55E] rounded-lg' />
          <div className='flex flex-col'>
            <p className='text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 leading-none mb-1'>
              Market Hub
            </p>
            <h1 className='text-xl font-bold text-slate-900 tracking-tight leading-none'>
              Radar
            </h1>
          </div>
        </div>
      </div>
      
      <div className='w-full'>
        <RadarTable initialData={initialData} />
      </div>
    </div>
  );
}
