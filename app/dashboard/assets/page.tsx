import { Asset, AssetWithoutPrice } from '../../../lib/types';
import { columns } from './columns';
import { DataTable } from './data-table';
import { currentUser } from '@clerk/nextjs';
import {
  fetchAssets,
  fetchAssetsWithPrices,
  groupAssetsByType,
} from '@/lib/assets';
import { changeKeyForTitle } from '@/lib/utils';

export default async function AssetsPage() {
  const user = await currentUser();

  let assets: AssetWithoutPrice[] = [];
  let assetsWithPricesArray: Asset[] = [];

  if (user) {
    assets = await fetchAssets(user.emailAddresses[0].emailAddress);
  }

  if (assets.length > 0) {
    assetsWithPricesArray = await fetchAssetsWithPrices(assets);
  }

  return (
    <div className='mx-auto'>
      <DataTable columns={columns} data={assetsWithPricesArray} />
    </div>
  );
}
