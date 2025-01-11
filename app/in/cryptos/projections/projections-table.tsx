import { columns } from './columns';
import { DataTable } from './data-table';
import { AssetWithAth, AssetWithProjection } from '@/lib/types';

export default function ProjectionsTable({
  assets,
}: // setExclusions,
// exclusions,
{
  assets: AssetWithProjection[];
  // setExclusions: React.Dispatch<React.SetStateAction<string[]>>;
  // exclusions: string[];
}) {
  return (
    <div className='mx-auto'>
      {assets.length > 0 && (
        <DataTable
          columns={columns}
          data={assets}
          // setExclusions={setExclusions}
          // exclusions={exclusions}
        />
      )}
    </div>
  );
}
