'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Asset } from '../protected/page';

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
