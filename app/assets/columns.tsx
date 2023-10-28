'use client';

import { ColumnDef } from '@tanstack/react-table';

export type Asset = {
  id: string;
  asset: string;
  qtd: string;
  wallet: string;
  created_at: string;
  type: string;
  uid: string;
};

export const columns: ColumnDef<Asset>[] = [
  {
    accessorKey: 'wallet',
    header: 'Wallet',
  },
  {
    accessorKey: 'asset',
    header: 'Asset',
  },
  {
    accessorKey: 'qtd',
    header: 'Qtd',
  },
  {
    accessorKey: 'price',
    header: 'Price',
  },
  {
    accessorKey: 'total',
    header: 'Total',
  },
  {
    accessorKey: 'type',
    header: 'Type',
  },
];
