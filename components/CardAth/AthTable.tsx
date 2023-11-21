import { DataTable } from '@/app/assets/data-table';
import { AssetReducedWithAth } from '@/app/lib/types';
import { columnsAth } from './AthColumns';

export default async function AthTable({
  athAssets,
}: {
  athAssets: AssetReducedWithAth[];
}) {
  return (
    <div className='mx-auto'>
      {athAssets.length > 0 && (
        <DataTable columns={columnsAth} data={athAssets} />
      )}
    </div>
  );
}
