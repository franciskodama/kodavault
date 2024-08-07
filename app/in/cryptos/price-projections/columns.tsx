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
    accessorKey: 'price-projection',
    header: () => <div className={tableHeaderClass}>PP</div>,
  },
  {
    accessorKey: 'total-by-price-projection',
    header: ({ column }) => {
      return (
        <Button
          className={tableHeaderClass}
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          <div className={tableHeaderClass}>
            Total PP
            <span className='text-xs font-medium'>{` (est.)`}</span>
          </div>
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    accessorKey: 'percentagePotential',
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
    accessorKey: 'xPotential',
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
];
