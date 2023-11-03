import { Asset } from '../protected/page';
import { columns } from './columns';
import { DataTable } from './data-table';

export default async function MainTable({ assets }: { assets: Asset[] }) {
  return (
    <div className='container mx-auto mt-[3em]'>
      <DataTable columns={columns} data={assets} />
    </div>
  );
}
