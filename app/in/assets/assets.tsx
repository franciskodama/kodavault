'use client';

import { Loading } from '@/components/Loading';
import { columns } from './columns';
import { DataTable } from './data-table';
import { thousandAndDecimalFormatter, thousandFormatter } from '@/lib/utils';
import { Asset } from '@/lib/types';

export default function Assets({ assets }: { assets: Asset[] }) {
  const compareByWallet = (a: any, b: any) => {
    if (a.wallet < b.wallet) return -1;
    if (a.wallet > b.wallet) return 1;
    return 0;
  };

  const sortedAssets = [...assets].sort(compareByWallet);
  const formatatedNumbersAssets = sortedAssets.map((asset: any) => {
    return {
      ...asset,
      qty: thousandAndDecimalFormatter(asset.qty),
      price: thousandAndDecimalFormatter(asset.price),
      total: thousandFormatter(asset.total),
    };
  });

  return (
    <div className='mx-auto'>
      {assets ? (
        <DataTable columns={columns} data={formatatedNumbersAssets} />
      ) : (
        <div className='flex justify-center items-center h-[70em]'>
          <Loading />
        </div>
      )}
    </div>
  );
}
