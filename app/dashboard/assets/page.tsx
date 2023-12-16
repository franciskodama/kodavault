import { Asset } from '../../../lib/types';
import { columns } from './columns';
import { DataTable } from './data-table';

export default async function AssetsPage() {
// { assets }: { assets: Asset[] }
  // const sortedAssetsByAlphabeticOrder = assets.sort((a: any, b: any) => {
  //   if (a.wallet < b.wallet) {
  //     return -1;
  //   }
  //   if (a.wallet > b.wallet) {
  //     return 1;
  //   }
  //   return 0;
  // });

  return (
    <div className='mx-auto'>
      TEST
      {/* <DataTable columns={columns} data={sortedAssetsByAlphabeticOrder} /> */}
    </div>
  );
}
