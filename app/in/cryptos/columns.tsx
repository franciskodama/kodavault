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
    accessorKey: 'obs',
    header: () => (
      <div className={`px-0 font-semibold text-slate-800 text-left`}>Obs</div>
    ),
  },
  {
    accessorKey: 'goal',
    header: () => (
      <div className={`px-0 font-semibold text-slate-800 text-left`}>Goal</div>
    ),
    id: 'actions',
    cell: ({ row }) => {
      const assetRow = row.original;

      return (
        <>
          <FormGoalInput assetRow={assetRow} />
          {/* {asset && (
            <div className='flex items-center'>
              <Sheet>
                <SheetTrigger className='ml-4 hover:text-base w-12 bg-white border border-slate-300 rounded-[2px] '>
                  ✏️
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Update a new Asset</SheetTitle>
                    <SheetDescription>
                      Update an Existing Asset
                    </SheetDescription>
                  </SheetHeader>
                  <UpdateAssetForm asset={asset} />
                </SheetContent>
              </Sheet>
            </div>
          )} */}
        </>
      );
    },
  },
];
