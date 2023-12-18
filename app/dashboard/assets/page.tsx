import { getAssets } from '@/lib/assets.server';
import { Asset, AssetWithoutPrice } from '../../../lib/types';
import { columns } from './columns';
import { DataTable } from './data-table';
import { auth, currentUser } from '@clerk/nextjs';
import {
  fetchAssets,
  fetchAssetsWithPrices,
  groupAssetsByType,
} from '@/lib/assets';

export default async function AssetsPage() {
  const user = await currentUser();

  let assets: AssetWithoutPrice[] = [];
  if (user) {
    assets = await fetchAssets(user.emailAddresses[0].emailAddress);
  }

  if (assets.length > 0) {
    const assetsWithPricesArray = await fetchAssetsWithPrices(assets);
    const assetsWithPricesByType = groupAssetsByType(assetsWithPricesArray);

    //----------------------------------------------------------------------------------------------
    // TODO: Refactor this 3 function to 1 function
    //----------------------------------------------------------------------------------------------
    const changeKeyAssetToCryptoForTitleOnCard =
      assetsWithPricesByType.Crypto.map((item: any) => ({
        ...item,
        crypto: item.asset,
      }));

    const changeKeyAssetToStockForTitleOnCard =
      assetsWithPricesByType.Stock.map((item: any) => ({
        ...item,
        stock: item.asset,
      }));

    const changeKeyAssetToCashForTitleOnCard = assetsWithPricesByType.Cash.map(
      (item: any) => ({
        ...item,
        cash: item.asset,
      })
    );
  }
  const sortedAssetsByAlphabeticOrder = assets.sort((a: any, b: any) => {
    if (a.wallet < b.wallet) {
      return -1;
    }
    if (a.wallet > b.wallet) {
      return 1;
    }
    return 0;
  });

  return (
    <div className='mx-auto'>
      <DataTable columns={columns} data={sortedAssetsByAlphabeticOrder} />
    </div>
  );
}
