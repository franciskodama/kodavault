'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Asset } from '../protected/page';

const headerClass = 'font-bold text-red-500';

export const columns: ColumnDef<Asset>[] = [
  {
    accessorKey: 'wallet',
    header: () => <div className={headerClass}>Wallet</div>,
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
