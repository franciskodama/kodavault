import { AssetReducedWithAth } from '@/lib/types';
import { columns } from './columns';
import { DataTable } from './data-table';
import { athTotals } from '.';

export default function AthTable({
  athAssets,
  setExclusions,
  totals,
}: {
  athAssets: AssetReducedWithAth[];
  setExclusions: React.Dispatch<React.SetStateAction<string[]>>;
  totals: athTotals;
}) {
  return (
    <div className='mx-auto'>
      {athAssets.length > 0 && (
        <DataTable
          columns={columns}
          data={athAssets}
          setExclusions={setExclusions}
          totals={totals}
        />
      )}
    </div>
  );
}
