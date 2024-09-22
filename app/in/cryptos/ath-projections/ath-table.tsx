import { AssetReducedWithAth } from '@/lib/types';
import { columns } from './columns';
import { DataTable } from './data-table';
import { athTotals } from '.';

export default function AthTable({
  athAssets,
  setExclusions,
  totals,
  exclusions,
}: {
  athAssets: AssetReducedWithAth[];
  setExclusions: React.Dispatch<React.SetStateAction<string[]>>;
  exclusions: string[];
  totals: athTotals;
}) {
  return (
    <div className='mx-auto'>
      {athAssets.length > 0 && (
        <DataTable
          columns={columns}
          data={athAssets}
          setExclusions={setExclusions}
          exclusions={exclusions}
          totals={totals}
        />
      )}
    </div>
  );
}
