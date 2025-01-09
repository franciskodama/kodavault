import { columns } from './columns';
import { DataTable } from './data-table';
import { AssetReducedWithAth } from '@/lib/types';

export default function ProjectionsTable({
  athAssets,
}: // setExclusions,
// exclusions,
{
  athAssets: AssetReducedWithAth[];
  setExclusions: React.Dispatch<React.SetStateAction<string[]>>;
  // exclusions: string[];
}) {
  return (
    <div className='mx-auto'>
      {athAssets.length > 0 && (
        <DataTable
          columns={columns}
          data={athAssets}
          // setExclusions={setExclusions}
          // exclusions={exclusions}
        />
      )}
    </div>
  );
}
