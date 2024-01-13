'use client';

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

import { ArrowUpDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { tableHeaderClass } from '@/lib/classes';
import { Asset } from '@/lib/types';
import { deleteAsset } from '@/lib/actions';
import { UpdateAssetForm } from '@/components/UpdateAssetForm';
import Image from 'next/image';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { toast } from '@/components/ui/use-toast';
import { revalidatePath } from 'next/cache';

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
        window.location.reload();
      };

      return (
        <>
          {asset && (
            <div className='flex items-center text-xl'>
              <AlertDialog>
                <AlertDialogTrigger className='ml-4 hover:text-base w-12 border border-slate-500 bg-primary rounded-[2px]'>
                  💀
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className='text-center text-2xl my-4'>
                      Are you fucking sure?
                      <br />
                      <div className='w-[450px] mt-8 mx-auto'>
                        <AspectRatio ratio={16 / 16} className='bg-white'>
                          <Image
                            src='/are-you-sure.gif'
                            alt='Britney in doubt'
                            fill
                            className='object-cover rounded-full border-[8px] border-primary '
                            objectPosition='center 25%'
                          />
                        </AspectRatio>
                      </div>
                    </AlertDialogTitle>
                    <AlertDialogDescription className='flex flex-col'>
                      <span className='text-base text-center text-slate-600 mb-4'>
                        Prepare for turbulence! 🌪️
                        <br />
                        You are about to delete the Asset below:
                      </span>

                      <div className='flex py-4 px-16 justify-between bg-primary text-base text-white'>
                        <div className='flex flex-col'>
                          <h3 className='text-sm'>Asset:</h3>
                          <span className='font-bold'>{asset.asset}</span>
                        </div>
                        <div className='flex flex-col'>
                          <h3 className='text-sm'> Wallet:</h3>
                          <span className='font-bold'>{asset.wallet}</span>
                        </div>
                        <div className='flex flex-col'>
                          <h3 className='text-sm'> Qty:</h3>
                          <span className='font-bold'>{asset.qty}</span>
                        </div>
                      </div>

                      <span className='text-primary text-center my-4 font-bold text-base'>
                        <span className='font-bold'>
                          This is the point of no return. <br />
                        </span>
                        {`Once done, there's no going back! 💣`}
                      </span>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel
                      onClick={() => {
                        toast({
                          title: 'Operation Cancelled! ❌',
                          description: `Phew! 😮‍💨 Crisis averted. You successfully cancelled the operation.`,
                          variant: 'destructive',
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
                <SheetTrigger className='ml-4 hover:text-base w-12 bg-white border border-slate-500 rounded-[2px]'>
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
