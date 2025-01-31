'use client';

import { Asset } from '@/lib/types';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '../../../../components/ui/button';
import { ArrowUpDown } from 'lucide-react';
import { tableHeaderClass } from '../../../../lib/classes';

export const columns: ColumnDef<Asset>[] = [
  {
    accessorKey: 'asset',
    header: ({ column }) => {
      return (
        <Button
          className={tableHeaderClass}
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Asset
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    accessorKey: 'image',
    header: () => (
      <div className='flex justify-center'>
        <div className={tableHeaderClass}>Icon</div>
      </div>
    ),
  },
  {
    accessorKey: 'qty',
    header: () => <div className={tableHeaderClass}>Qty</div>,
  },
  {
    accessorKey: 'price',
    header: () => <div className={tableHeaderClass}>Price</div>,
  },
  {
    accessorKey: 'currentTotal',
    header: ({ column }) => {
      return (
        <Button
          className={tableHeaderClass}
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Total
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    accessorKey: 'ath',
    header: () => <div className={tableHeaderClass}>ATH</div>,
  },
  {
    accessorKey: 'athTotalCurrency',
    header: ({ column }) => {
      return (
        <Button
          className={tableHeaderClass}
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          <div className={tableHeaderClass}>
            ATH Total
            <span className='text-xs font-medium'>{` (est.)`}</span>
          </div>
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    accessorKey: 'athPercentagePotential',
    header: ({ column }) => {
      return (
        <Button
          className={tableHeaderClass}
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Boost (%)
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    accessorKey: 'athXPotential',
    header: ({ column }) => {
      return (
        <Button
          className={tableHeaderClass}
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Boost (x)
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    accessorKey: 'exclusion',
    header: () => <div className={tableHeaderClass}></div>,
  },
];
