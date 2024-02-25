import { AssetReducedWithAth } from '@/lib/types';
import { columns } from './columns';
import { DataTable } from './data-table';

export default function AthTable({
  athAssets,
}: {
  athAssets: AssetReducedWithAth[];
}) {
  return (
    <div className='mx-auto'>
      {athAssets.length > 0 && <DataTable columns={columns} data={athAssets} />}
    </div>
  );
}
