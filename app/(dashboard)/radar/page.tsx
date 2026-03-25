import RadarTable from './RadarTable';
import { fetchRadarData } from './actions';

export const metadata = {
  title: 'Radar | Trezo',
  description: 'Advanced data visualization and analysis tool',
};

export default async function RadarPage() {
  const initialData = await fetchRadarData();

  return (
    <div className='flex flex-col gap-8 p-6 lg:p-10'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Radar</h1>
        <p className='text-muted-foreground mt-2'>
          Spot market anomalies and identify top performing perpetual contracts.
        </p>
      </div>
      
      <RadarTable initialData={initialData} />
    </div>
  );
}
