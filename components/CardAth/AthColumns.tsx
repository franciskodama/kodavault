'use client';

import { Asset } from '@/app/lib/types';
import { ColumnDef } from '@tanstack/react-table';

const headerClass = 'font-semibold text-slate-800 text-right';

export const columnsAth: ColumnDef<Asset>[] = [
  {
    accessorKey: 'asset',
    header: () => <div className={headerClass}>Asset</div>,
  },
  {
    accessorKey: 'qtd',
    header: () => <div className={headerClass}>Qty</div>,
  },
  {
    accessorKey: 'price',
    header: () => <div className={headerClass}>Price</div>,
  },
  {
    accessorKey: 'currentTotal',
    header: () => <div className={headerClass}>Total</div>,
  },
  {
    accessorKey: 'ath',
    header: () => <div className={headerClass}>ATH</div>,
  },
  {
    accessorKey: 'athTotalCurrency',
    header: () => (
      <div className={headerClass}>
        Total
        <span className='text-xs font-medium'>{` (est.)`}</span>
      </div>
    ),
  },
  {
    accessorKey: 'percentagePotential',
    header: () => <div className={headerClass}>%</div>,
  },
  {
    accessorKey: 'xPotential',
    header: () => <div className={headerClass}>X</div>,
  },
];
