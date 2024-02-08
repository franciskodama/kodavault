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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ArrowUpDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { tableHeaderClass } from '@/lib/classes';
import { toast } from '@/components/ui/use-toast';
import { FormAllocationGoal } from './form-allocation-goal';
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
  {
    accessorKey: 'goal',
    header: () => (
      <div className={`px-0 font-semibold text-slate-800 text-left`}>Goal</div>
    ),
    id: 'actions',
    cell: ({ row }) => {
      const assetRow = row.original;
      console.log('---  🚀 ---> | assetRow:', assetRow);

      // TODO: The Array with assets is repeating BTC and ETH, for instance (fix where we build the array).

      // TODO: For edit pencil: https://ui.shadcn.com/docs/components/tooltip

      // TODO: example: https://ui.shadcn.com/examples/tasks
      // TODO: Add Priority
      // TODO: Add filter

      return (
        <>
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

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant='outline' size='sm'>
                    {' '}
                    ✏️
                  </Button>
                </DialogTrigger>
                <DialogContent className='sm:max-w-[425px]'>
                  <DialogHeader>
                    <DialogTitle>Edit Asset Allocation</DialogTitle>
                    <DialogDescription>
                      Adjust your target asset allocation to match your
                      investment goals!
                    </DialogDescription>
                  </DialogHeader>
                  {/* ------------------------------------ */}
                  <FormAllocationGoal assetRow={assetRow} />
                  {/* ------------------------------------ */}
                  {/* <DialogFooter>
                    <Button type='submit'>Save Changes</Button>
                  </DialogFooter> */}
                </DialogContent>
              </Dialog>
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
  {
    /* ------------------------------------ */
  }

  /* <div className='grid gap-4 py-4'>
                    <h3 className='bg-slate-800 px-4 py-2 text-white text-sm'>
                      Asset:
                      <span className='font-semibold ml-2 text-base'>
                        {assetRow.coin}
                      </span>
                    </h3>
                    <div className='grid grid-cols-4 items-center gap-4'>
                      <Label htmlFor='name' className='text-left text-xs'>
                        Percentage Allocation Goal (%)
                      </Label>
                      <Input
                        id='name'
                        value='Pedro Duarte'
                        className='col-span-3'
                      />
                    </div>
                    <div className='grid grid-cols-4 items-center gap-4'>
                      <Label htmlFor='username' className='text-left text-xs'>
                        Observations:
                      </Label>
                      <Input
                        id='username'
                        value='@peduarte'
                        className='col-span-3'
                      />
                    </div>
                  </div> */
}
