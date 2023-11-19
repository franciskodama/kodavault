import { DataTable } from '@/app/assets/data-table';
import { AssetReducedWithAth } from '@/app/lib/types';
import { columnsAth } from './AthColumns';

export default async function AthTable({
  assets,
}: {
  assets: AssetReducedWithAth[];
}) {
  return (
    <div className='mx-auto'>
      {assets && <DataTable columns={columnsAth} data={assets} />}
    </div>
  );
}
