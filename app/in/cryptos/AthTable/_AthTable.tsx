import { AssetReducedWithAth } from '@/lib/types';
import { columnsAth } from './columns-ath';
import { DataTable } from '@/app/in/assets/data-table';

export default function AthTable({
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
