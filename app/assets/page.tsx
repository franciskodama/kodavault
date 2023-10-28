import { Asset, columns } from './columns';
import { DataTable } from './data-table';

export default async function MainTable({ assets }: { assets: Asset[] }) {
  return (
    <div className='container mx-auto py-10'>
      <DataTable columns={columns} data={assets} />
    </div>
  );
}
