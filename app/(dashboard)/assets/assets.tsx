'use client';

import { Loading } from '@/components/common/Loading';
import { columns } from './columns';
import { DataTable } from './data-table';
import { thousandAndDecimalFormatter, thousandFormatter } from '@/lib/utils';
import { useAssetsContext } from '@/context/AssetsContext';

export default function Assets({
  typeFilterAsParam,
  purposeFilterAsParam,
}: {
  typeFilterAsParam: string;
  purposeFilterAsParam: string;
}) {
  const { assets, isLoading } = useAssetsContext();
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
          <div className='flex flex-col sm:flex-row justify-between items-end mb-10 px-4 sm:px-0'>
            <div className='flex items-center gap-4 mt-8'>
              <div className='w-1 h-10 bg-[#22C55E] rounded-lg' />
              <div className='flex flex-col'>
                <p className='text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 leading-none mb-1'>
                  Portfolio Hub
                </p>
                <h1 className='text-xl font-bold text-slate-900 tracking-tight leading-none'>
                  Asset Management
                </h1>
              </div>
            </div>
          </div>
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
