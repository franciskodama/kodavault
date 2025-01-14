import { athTotals } from '.';
import { columns } from './columns';
import { DataTable } from './data-table';
import { CryptoWithAthAndProjections } from '@/lib/types';

export default function AthTable({
  athAssets,
  setExclusions,
  totals,
  exclusions,
}: {
  athAssets: CryptoWithAthAndProjections[];
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
