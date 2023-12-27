'use client';

import { useContext } from 'react';

import { columns } from './columns';
import { DataTable } from './data-table';
import { AssetsContext } from '@/context/AssetsContext';

export default function Assets() {
  const { assets } = useContext(AssetsContext);

  return (
    <div className='mx-auto'>
      <DataTable columns={columns} data={assets} />
    </div>
  );
}
