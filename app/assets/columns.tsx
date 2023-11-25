'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';

import { Asset } from '../lib/types';
import { Button } from '@/components/ui/button';

const headerClass = 'font-semibold text-slate-800 text-right';

export const columns: ColumnDef<Asset>[] = [
  {
    accessorKey: 'wallet',
    // header: () => <div className={headerClass}>Wallet</div>,
    header: ({ column }) => {
      return (
        <Button
          className='px-0 text-slate-900 font-semibold'
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Wallet
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    accessorKey: 'account',
    header: () => <div className={headerClass}>Account</div>,
  },
  {
    accessorKey: 'asset',
    header: () => <div className={headerClass}>Asset</div>,
  },
  {
    accessorKey: 'qtd',
    header: () => <div className={headerClass}>Qtd</div>,
  },
  {
    accessorKey: 'price',
    header: () => <div className={headerClass}>Price</div>,
    // cell: ({ row }) => {
    //   const price = parseFloat(row.getValue('price'));
    //   const formatted = new Intl.NumberFormat('en-US', {
    //     style: 'currency',
    //     currency: 'USD',
    //   }).format(price);
    // },
  },
  {
    accessorKey: 'total',
    header: () => <div className={headerClass}>Total</div>,
    // cell: ({ row }) => {
    //   const total = parseFloat(row.getValue('total'));
    //   const formatted = new Intl.NumberFormat('en-US', {
    //     style: 'currency',
    //     currency: 'USD',
    //   }).format(total);
    // },
  },
  {
    accessorKey: 'type',
    header: () => <div className={headerClass}>Type</div>,
  },
  {
    accessorKey: 'subtype',
    header: () => <div className={headerClass}>Subtype</div>,
  },
  {
    accessorKey: 'currency',
    header: () => <div className={headerClass}>Currency</div>,
  },
];
