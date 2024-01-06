'use client';

import { Loading } from '@/components/Loading';
import { columns } from './columns';
import { DataTable } from './data-table';
import { useAssetsContext } from '@/context/AssetsContext';

export default function Assets() {
  const { assets, isLoading } = useAssetsContext();

  return (
    <div className='mx-auto'>
      {isLoading ? (
        <div className='flex justify-center items-center h-[70em]'>
          <Loading />
        </div>
      ) : (
        <DataTable columns={columns} data={assets} />
      )}
    </div>
  );
}
