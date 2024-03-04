'use client';

import { ColumnDef } from '@tanstack/react-table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ArrowUpDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { tableHeaderClass } from '@/lib/classes';
import { FormAllocationGoal } from './form-allocation-goal';
import { MergedArrayItem } from '.';

export const columns: ColumnDef<MergedArrayItem>[] = [
  {
    accessorKey: 'coin',
    header: ({ column }) => {
      return (
        <Button
          className={tableHeaderClass}
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Coin
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    accessorKey: 'total',
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
    accessorKey: 'share',
    header: ({ column }) => {
      return (
        <Button
          className={tableHeaderClass}
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Share
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    accessorKey: 'goal',
    header: ({ column }) => {
      return (
        <Button
          className={tableHeaderClass}
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Goal
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    id: 'actionGoal',
    cell: ({ row }) => {
      const assetRow = row.original;

      return (
        <>
          {assetRow && (
            <div className='flex items-center'>
              <p className='text-center w-[6ch]'>{`${assetRow.goal} %`}</p>
              <p
                className={`flex items-center justify-center uppercase font-bold h-6 w-[5ch] px-1 m-1 text-center rounded-[2px] ${
                  assetRow.goal === 0
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
              </p>
            </div>
          )}
        </>
      );
    },
  },
  {
    accessorKey: 'offset',
    header: ({ column }) => {
      return (
        <Button
          className={tableHeaderClass}
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Offset
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },

  {
    accessorKey: 'priority',
    header: ({ column }) => {
      return (
        <Button
          className={tableHeaderClass}
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Priority
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    id: 'actionPriority',
    cell: ({ row }) => {
      const assetRow = row.original;

      return (
        <>
          {assetRow && (
            <div className='flex items-center'>
              <p
                className={`font-bold flex items-center justify-center uppercase text-white h-6 w-[8ch] px-1 m-1 text-center rounded-[2px] 
                ${
                  assetRow.priority === null
                    ? 'border border-slate-300 bg-white'
                    : assetRow.priority === 'High'
                    ? 'bg-red-500'
                    : assetRow.priority === 'Medium'
                    ? 'bg-yellow-500'
                    : assetRow.priority === 'Low'
                    ? 'bg-slate-300'
                    : ''
                }`}
              >
                <p
                  className={`${
                    assetRow.priority === null && 'text-slate-300 font-normal'
                  }`}
                >
                  {assetRow.priority === null ? '-' : assetRow.priority}
                </p>
              </p>
            </div>
          )}
        </>
      );
    },
  },
  {
    accessorKey: 'obs',
    header: () => (
      <div className={`px-0 font-semibold text-slate-800 text-left w-[20em]`}>
        Obs
      </div>
    ),
    id: 'actionObs',
    cell: ({ row }) => {
      const assetRow = row.original;

      return (
        <div className='flex items-center'>
          {assetRow && <p className='w-full text-left'>{assetRow.obs}</p>}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant='outline' size='sm' className='ml-4'>
                ✏️
              </Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[425px]'>
              <DialogHeader>
                <DialogTitle>Edit Asset Allocation</DialogTitle>
                <DialogDescription>
                  Adjust your target asset allocation to match your investment
                  goals!
                </DialogDescription>
              </DialogHeader>
              <FormAllocationGoal assetRow={assetRow} />
            </DialogContent>
          </Dialog>
        </div>
      );
    },
  },
];
