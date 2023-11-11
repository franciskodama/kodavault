import { Asset } from '../lib/types';
import { columns } from './columns';
import { DataTable } from './data-table';

export default async function MainTable({ assets }: { assets: Asset[] }) {
  return (
    <div className='container mx-auto my-[3em]'>
      <DataTable columns={columns} data={assets} />
    </div>
  );
}
