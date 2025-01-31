'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { CryptoWithAthAndProjections } from '@/lib/types';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { FormProjections } from './form-projections';
import { tableHeaderClass } from '@/lib/classes';
import { Button } from '@/components/ui/button';
import { currencyFormatter } from '@/lib/utils';
import { useState } from 'react';

export const columns: ColumnDef<CryptoWithAthAndProjections>[] = [
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
    accessorKey: 'projection',
    header: ({ column }) => {
      return (
        <Button
          className={tableHeaderClass}
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Projection
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    id: 'actionProjection',
    cell: ({ row }) => {
      const assetRow = row.original;

      return (
        <>
          {assetRow && (
            <div className='flex items-center'>
              <p className='text-right w-[6ch]'>
                {currencyFormatter(Number(assetRow.projection))}
              </p>
            </div>
          )}
        </>
      );
    },
  },
  {
    accessorKey: 'projectionTotal',
    header: ({ column }) => {
      return (
        <Button
          className={tableHeaderClass}
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          <div className={tableHeaderClass}>Total Projected</div>
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    // id: 'actionTotalProjection',
    // cell: ({ row }) => {
    //   const assetRow = row.original;

    //   return (
    //     <>
    //       {assetRow && (
    //         <div className='flex items-center'>
    //           <p className='text-center w-[6ch]'>{assetRow.projectionTotal}</p>
    //         </div>
    //       )}
    //     </>
    //   );
    // },
  },
  {
    accessorKey: 'projectionPercentagePotential',
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
    // id: 'actionProjectionPercentagePotential',
    // cell: ({ row }) => {
    //   const assetRow = row.original;

    //   return (
    //     <>
    //       {assetRow && (
    //         <div className='flex items-center'>
    //           <p className='text-center w-[6ch]'>
    //             {assetRow.projectionPercentagePotential}
    //           </p>
    //         </div>
    //       )}
    //     </>
    //   );
    // },
  },
  {
    accessorKey: 'projectionXPotential',
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
    // id: 'actionProjectionXPotential',
    // cell: ({ row }) => {
    //   const assetRow = row.original;

    //   return (
    //     <>
    //       {assetRow && (
    //         <div className='flex items-center'>
    //           <p className='text-center w-[6ch]'>
    //             {assetRow.projectionXPotential
    //               ? assetRow.projectionXPotential
    //               : 0}
    //           </p>
    //         </div>
    //       )}
    //     </>
    //   );
    // },
  },
  {
    accessorKey: 'source',
    header: () => (
      <div className={`px-0 font-semibold text-slate-800 text-left w-[20em]`}>
        Source
      </div>
    ),
    id: 'actionSource',
    cell: ({ row }) => {
      const assetRow = row.original;

      return (
        <div className='flex items-center'>
          <p className='w-full text-left'>{assetRow.source}</p>
          <EditProjection assetRow={assetRow} />
        </div>
      );
    },
  },
];

function EditProjection({
  assetRow,
}: {
  assetRow: CryptoWithAthAndProjections;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant='outline'
          size='sm'
          className='ml-4 text-xl hover:text-base w-8 h-8 bg-white border border-slate-300 rounded-[2px]'
        >
          ✏️
        </Button>
      </DialogTrigger>
      <DialogContent className='w-[22em]'>
        <DialogHeader>
          <DialogTitle>Edit Asset Projection</DialogTitle>
          <DialogDescription>Adjust your Projection!</DialogDescription>
        </DialogHeader>
        <FormProjections assetRow={assetRow} onClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
