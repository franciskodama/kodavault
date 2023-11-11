import { Asset } from '../lib/types';
import { columns } from './columns';
import { DataTable } from './data-table';

export default async function MainTable({ assets }: { assets: Asset[] }) {
  return (
    <div className='mx-auto'>
      <DataTable columns={columns} data={assets} />
    </div>
  );
}
