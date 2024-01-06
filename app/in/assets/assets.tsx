'use client';

import { columns } from './columns';
import { DataTable } from './data-table';
import { useAssetsContext } from '@/context/AssetsContext';

export default function Assets() {
  const { assets } = useAssetsContext();
  console.log('---  🚀 ---> | assets:', assets);

  // const { user } = useUser();
  // const uid = user?.emailAddresses?.[0]?.emailAddress;
  // console.log('---  🚀 ---> | user:', user?.emailAddresses[0].emailAddress);

  return (
    <div className='mx-auto'>
      <DataTable columns={columns} data={assets} />
    </div>
  );
}
