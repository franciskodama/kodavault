'use client';

import { Asset } from '@/app/lib/types';
import { ColumnDef } from '@tanstack/react-table';

const headerClass = 'font-semibold text-slate-800 text-right';

export const columnsAthTable: ColumnDef<Asset>[] = [
  {
    accessorKey: 'asset',
    header: () => <div className={headerClass}>Wallet</div>,
  },
  {
    accessorKey: 'qty',
    header: () => <div className={headerClass}>Account</div>,
  },
  {
    accessorKey: 'price',
    header: () => <div className={headerClass}>Asset</div>,
  },
  {
    accessorKey: 'currentTotal',
    header: () => <div className={headerClass}>Qtd</div>,
  },
  {
    accessorKey: 'ath',
    header: () => <div className={headerClass}>Price</div>,
  },
  {
    accessorKey: 'athTotalEstimation',
    header: () => <div className={headerClass}>Total</div>,
  },
];
