'use client';

import { Loading } from '@/components/common/Loading';
import { columns } from './columns';
import { DataTable } from './data-table';
import { thousandAndDecimalFormatter, thousandFormatter } from '@/lib/utils';
import { useAssetsContext } from '@/context/AssetsContext';
import { useReviewedAssets } from './reviewed-context';
import { useEffect } from 'react';

export default function Assets({
  typeFilterAsParam,
  purposeFilterAsParam,
}: {
  typeFilterAsParam: string;
  purposeFilterAsParam: string;
}) {
  const { assets, isLoading } = useAssetsContext();
  const { addReviewedAsset, removeReviewedAsset } = useReviewedAssets();

  useEffect(() => {
    if (!isLoading && assets.length > 0) {
      assets.forEach((asset) => {
        if (asset.id) {
          if (asset.reviewed) {
            addReviewedAsset(asset.id);
          } else {
            removeReviewedAsset(asset.id);
          }
        }
      });
    }
  }, [assets, isLoading, addReviewedAsset, removeReviewedAsset]);
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
    <div className='flex flex-col gap-1 px-8 sm:p-0'>
      {isLoading ? (
        <div className='flex justify-center items-center h-[70em]'>
          <Loading />
        </div>
      ) : (
        <>
          <DataTable
            columns={columns}
            data={formatatedNumbersAssets}
            typeFilterAsParam={typeFilterAsParam ? typeFilterAsParam : ''}
            purposeFilterAsParam={
              purposeFilterAsParam ? purposeFilterAsParam : ''
            }
          />
        </>
      )}
    </div>
  );
}
