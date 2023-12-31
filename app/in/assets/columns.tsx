'use client';

import { useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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

import {
  ArrowUpDown,
  MoreHorizontalIcon,
  PencilIcon,
  Trash2Icon,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { tableHeaderClass } from '@/lib/classes';
import { Asset } from '@/lib/types';
import { deleteAsset, updateAsset } from '@/lib/actions';
import { UpdateAssetForm } from '@/components/UpdateAssetForm';

// const openDrawer = () => {
//   const [ open, setOpen ] = useState(false)

//   return

// }

export const columns: ColumnDef<Asset>[] = [
  {
    accessorKey: 'wallet',
    header: ({ column }) => {
      return (
        <Button
          className={tableHeaderClass}
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Wallet
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    accessorKey: 'account',
    header: ({ column }) => {
      return (
        <Button
          className={tableHeaderClass}
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Account
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
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
    accessorKey: 'qty',
    header: () => <div className={tableHeaderClass}>Qty</div>,
  },
  {
    accessorKey: 'price',
    header: () => <div className={tableHeaderClass}>Price</div>,
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
    accessorKey: 'type',
    header: ({ column }) => {
      return (
        <Button
          className={tableHeaderClass}
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Type
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    accessorKey: 'subtype',
    header: ({ column }) => {
      return (
        <Button
          className={tableHeaderClass}
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Subtype
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    accessorKey: 'currency',
    header: ({ column }) => {
      return (
        <Button
          className={tableHeaderClass}
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Currency
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const asset = row.original;

      const handleDeleteAsset = async (id: string) => {
        await deleteAsset(id);

        // ---------------------------------------
        // TODO: CONFIRMAR SE ESTÁ FAZENDO RELOAD
        // ---------------------------------------
        window.location.reload();
      };

      return (
        <>
          {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='h-8 w-8 p-0'>
                <span className='sr-only'>Open menu</span>
                <MoreHorizontalIcon className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem
                className='flex items-center justify-center'
                onClick={() => asset && handleUpdateAsset(asset.id)}
              >
                Update
                <span className='ml-2 text-xl'></span>
              </DropdownMenuItem>

              <DropdownMenuSeparator />
              <DropdownMenuItem
                className='flex items-center justify-center'
                onClick={() => asset && handleDeleteAsset(asset.id)}
              >
                Delete
                <span className='ml-2 text-xl'>💀</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> */}
          {/* {showAlertDialog && (
            <AlertDialog>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    <span className='ml-2 text-xl'>💩🫣</span>
                    This action cannot be undone. This will permanently delete
                    this Asset from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel onClick={handleCancelClick}>
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction onClick={handleContinueClick}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )} */}

          {asset && (
            <div className='flex items-center text-xl'>
              <Sheet>
                <SheetTrigger className='ml-4 hover:text-base w-12'>
                  {/* <Trash2Icon size={18} strokeWidth={1.4} className='hover:border hover:border-dashed hover:border-slate-500 hover:rounded-full hover:text-slate-500'/> */}
                  💀
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Delete a new Asset</SheetTitle>
                    <SheetDescription>Delete an Asset</SheetDescription>
                  </SheetHeader>
                  {/* <UpdateAssetForm id={asset.id} /> */}
                </SheetContent>
              </Sheet>

              <Sheet>
                <SheetTrigger className='ml-4 hover:text-base w-12'>
                  ✏️
                  {/* <PencilIcon
                    size={18}
                    strokeWidth={1.4}
                    className='hover:border hover:border-dashed hover:border-slate-500 hover:rounded-full hover:text-slate-500'
                  /> */}
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Update a new Asset</SheetTitle>
                    <SheetDescription>
                      Update an Existing Asset
                    </SheetDescription>
                  </SheetHeader>
                  <UpdateAssetForm id={asset.id} />
                </SheetContent>
              </Sheet>
            </div>
          )}
        </>
      );
    },
  },
];
