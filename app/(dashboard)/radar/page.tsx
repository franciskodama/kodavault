import RadarTable from './RadarTable';
import { fetchRadarData } from './actions';

export const metadata = {
  title: 'Radar | Trezo',
  description: 'Advanced data visualization and analysis tool',
};

export default async function RadarPage() {
  const initialData = await fetchRadarData();

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
