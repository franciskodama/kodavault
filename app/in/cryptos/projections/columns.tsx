'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Asset } from '@/lib/types';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '../../../../components/ui/button';
import { tableHeaderClass } from '../../../../lib/classes';
import { ArrowUpDown } from 'lucide-react';
import { FormProjections } from './form-projections';

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
    header: () => <div className={tableHeaderClass}></div>,
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
  // {
  //   accessorKey: 'projection',
  //   header: () => <div className={tableHeaderClass}>Projection</div>,
  // },
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
              <p className='text-center w-[6ch]'>
                {assetRow.projection ? assetRow.projection : 0}
              </p>
              {/* <p
                className={`flex items-center justify-center uppercase font-bold h-6 w-[5ch] px-1 m-1 text-center rounded-[2px] ${
                  assetRow.projection === 0
                    ? 'border border-slate-300 bg-slate-300 text-white'
                    : Number(assetRow.share.toString().split('.')[0]) <
                      (assetRow.goal || 0)
                    ? 'bg-white border-2 border-green-500 text-green-500'
                    : 'bg-red-500 text-white'
                }`}
              >
                {assetRow.goal === 0
                  ? 'N/A'
                  : Number(assetRow.share.toString().split('.')[0]) <
                    (assetRow.goal || 0)
                  ? 'buy'
                  : 'sell'}
              </p> */}
            </div>
          )}
        </>
      );
    },
  },
  {
    accessorKey: 'totalProjection',
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
    id: 'actionTotalProjection',
    cell: ({ row }) => {
      const assetRow = row.original;

      return (
        <>
          {assetRow && (
            <div className='flex items-center'>
              <p className='text-center w-[6ch]'>
                {assetRow.projectionTotal ? assetRow.projectionTotal : 0}
              </p>
            </div>
          )}
        </>
      );
    },
  },
  {
    accessorKey: 'ProjectionPercentagePotential',
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
    id: 'actionProjectionPercentagePotential',
    cell: ({ row }) => {
      const assetRow = row.original;

      return (
        <>
          {assetRow && (
            <div className='flex items-center'>
              <p className='text-center w-[6ch]'>
                {assetRow.projectionPercentagePotential
                  ? assetRow.projectionPercentagePotential
                  : 0}
              </p>
            </div>
          )}
        </>
      );
    },
  },
  {
    accessorKey: 'ProjectionXPotential',
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
    id: 'actionProjectionXPotential',
    cell: ({ row }) => {
      const assetRow = row.original;

      return (
        <>
          {assetRow && (
            <div className='flex items-center'>
              <p className='text-center w-[6ch]'>
                {assetRow.projectionXPotential
                  ? assetRow.projectionXPotential
                  : 0}
              </p>
            </div>
          )}
        </>
      );
    },
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
          {assetRow && (
            <p className='w-full text-left'>
              Test Source
              {/* {assetRow.source} */}
            </p>
          )}
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
            <DialogContent className='sm:max-w-[425px]'>
              <DialogHeader>
                <DialogTitle>Edit Asset Projection</DialogTitle>
                <DialogDescription>Adjust your Projection!</DialogDescription>
              </DialogHeader>
              <FormProjections assetRow={assetRow} />
            </DialogContent>
          </Dialog>
        </div>
      );
    },
  },
];
