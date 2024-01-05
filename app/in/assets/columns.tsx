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
import Image from 'next/image';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { toast } from '@/components/ui/use-toast';

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

      const handleDeleteAsset = (id: string) => {
        // Back with async await?

        deleteAsset(id);

        // ------------------------------------------------------------------------------
        // TODO: RELOAD IS GOOD BUT THE PAGE IS REFRESHING WITH BUG ON THE CONTEXT
        // ------------------------------------------------------------------------------
        // window.location.reload();
      };

      return (
        <>
          {asset && (
            <div className='flex items-center text-xl'>
              <AlertDialog>
                <AlertDialogTrigger className='ml-4 hover:text-base w-12'>
                  💀
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className='text-2xl'>
                      Are you absolutely sure?
                      <span className='ml-2'>😳</span>
                    </AlertDialogTitle>
                    <AlertDialogDescription className='flex flex-col'>
                      <span className='font-bold text-slate-600 text-lg'>
                        This action cannot be undone.
                      </span>
                      <div className='w-[450px] my-4'>
                        <AspectRatio ratio={16 / 12} className='bg-muted'>
                          <Image
                            src='/are-you-sure.gif'
                            alt='Britney in doubt'
                            fill
                            className='rounded-[2px] object-cover'
                          />
                        </AspectRatio>
                      </div>
                      <span className='mb-4'>
                        This will permanently delete this Asset from our
                        servers.
                      </span>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel
                      onClick={() => {
                        toast({
                          title: 'Operation Cancelled! ❌',
                          description: `Phew! 😮‍💨 Crisis averted. You successfully cancelled the operation.`,
                          // variant: 'destructive',
                        });
                      }}
                    >
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => {
                        if (asset) {
                          handleDeleteAsset(asset.id);
                          toast({
                            title: 'Asset gone! 💀',
                            description: `The Asset ${asset.asset} has been successfully deleted from ${asset.wallet}.`,
                          });
                        }
                      }}
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <Sheet>
                <SheetTrigger className='ml-4 hover:text-base w-12'>
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
          )}
        </>
      );
    },
  },
];

// <Trash2Icon
// size={18}
// strokeWidth={1.4}
// // className='hover:border hover:border-dashed hover:border-slate-500 hover:rounded-full hover:text-slate-500'
// className='flex justify-center mx-auto ml-4 hover:w-8 w-12'
// />
// 🗑️

// <PencilIcon
// size={18}
// strokeWidth={1.4}
// className='hover:border hover:border-dashed hover:border-slate-500 hover:rounded-full hover:text-slate-500'
// />
