'use client';

import { useContext } from 'react';

import { columns } from './columns';
import { DataTable } from './data-table';
import { AssetsContext } from '@/context/AssetsContext';

export default function Assets() {
  const { assets } = useContext(AssetsContext);

  // const { user } = useUser();
  // const uid = user?.emailAddresses?.[0]?.emailAddress;
  // console.log('---  🚀 ---> | user:', user?.emailAddresses[0].emailAddress);

  return (
    <div className='mx-auto'>
      <DataTable columns={columns} data={assets} />
    </div>
  );
}
