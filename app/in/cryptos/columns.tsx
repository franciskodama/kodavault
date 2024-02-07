'use client';

import { ColumnDef } from '@tanstack/react-table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

import { ArrowUpDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { tableHeaderClass } from '@/lib/classes';
import { toast } from '@/components/ui/use-toast';
import { FormGoalInput } from './form-goal-input';
import { MergedArrayItem } from './cryptos';

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
  // {
  //   accessorKey: 'goal',
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         className={tableHeaderClass}
  //         variant='ghost'
  //         onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
  //       >
  //         Share Goal
  //         <ArrowUpDown className='ml-2 h-4 w-4' />
  //       </Button>
  //     );
  //   },
  // },
  {
    accessorKey: 'goal',
    header: () => (
      <div className={`px-0 font-semibold text-slate-800 text-left`}>Goal</div>
    ),

    id: 'actions',
    cell: ({ row }) => {
      const assetRow = row.original;

      // TODO: The problem is here: the data for the form is not going for the right coin by this component below
      // TODO: Solution is to forget the edition inline, and use the action with dropdown to edit the goal (opens a form with a server action)
      // TODO: example: https://ui.shadcn.com/examples/tasks
      // TODO: Add Priority
      // TODO: Add filter

      return (
        <>
          {/* <FormGoalInput assetRow={assetRow} /> */}
          {assetRow && (
            <div className='flex items-center'>
              <p className='text-center w-[6ch]'>{`${assetRow.goal} %`}</p>
              <p
                className={`flex items-center justify-center uppercase text-white h-6 w-[5ch] px-1 m-1 text-center rounded-[2px] ${
                  assetRow.goal === 0
                    ? 'border border-slate-300 bg-slate-800'
                    : Number(assetRow.share.toString().split('.')[0]) >
                      (assetRow.goal || 0)
                    ? 'bg-green-500'
                    : 'bg-red-500'
                }`}
              >
                {assetRow.goal === 0
                  ? '?'
                  : Number(assetRow.share.toString().split('.')[0]) >
                    (assetRow.goal || 0)
                  ? 'buy'
                  : 'sell'}
              </p>
              <Sheet>
                <SheetTrigger className='ml-4 hover:text-base h-6 w-[5ch] bg-white border border-slate-300 rounded-[2px] '>
                  ✏️
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Update a new Asset</SheetTitle>
                    <SheetDescription>
                      Update an Existing Asset
                    </SheetDescription>
                  </SheetHeader>
                  {/* <UpdateAssetForm asset={asset} /> */}
                </SheetContent>
              </Sheet>
            </div>
          )}
        </>
      );
    },
  },
  {
    accessorKey: 'obs',
    header: () => (
      <div className={`px-0 font-semibold text-slate-800 text-left`}>Obs</div>
    ),
  },
];
