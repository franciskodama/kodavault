import { DataTable } from '@/app/assets/data-table';
import { AssetReducedWithAth } from '@/app/lib/types';
import { columnsAthTable } from './AthColumns';

export default async function AthTable({
  assets,
}: {
  assets: AssetReducedWithAth[];
}) {
  console.log('---  🚀 ---> | assets:', assets);
  return (
    <div className='mx-auto'>
      {assets && <DataTable columns={columnsAthTable} data={assets} />}
    </div>
  );
}
