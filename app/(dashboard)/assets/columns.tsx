'use client';

import { FC } from 'react';
import Image from 'next/image';
import { ArrowUpDown, Trash2, Pencil } from 'lucide-react';
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { UpdateAssetForm } from '@/components/forms/UpdateAssetForm';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { toast } from '@/components/ui/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import { useReviewedAssets } from './reviewed-context';
import { Button } from '@/components/ui/button';

import { Asset } from '@/lib/types';
import { tableHeaderClass } from '@/lib/classes';
import { useAssetsContext } from '@/context/AssetsContext';
import { deleteAsset } from '@/lib/actions';

export const columns: ColumnDef<Asset>[] = [
  {
    accessorKey: 'wallet',
    header: ({ column }) => {
      return (
        <div
          className={tableHeaderClass}
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Wallet
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </div>
      );
    },
  },
  {
    accessorKey: 'currency',
    header: ({ column }) => {
      return (
        <div
          className={tableHeaderClass}
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Currency
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </div>
      );
    },
  },
  {
    accessorKey: 'account',
    header: ({ column }) => {
      return (
        <div
          className={tableHeaderClass}
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Account
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </div>
      );
    },
  },
  {
    accessorKey: 'asset',
    header: ({ column }) => {
      return (
        <div
          className={tableHeaderClass}
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Asset
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </div>
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
        <div
          className={tableHeaderClass}
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Total
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </div>
      );
    },
  },
  {
    accessorKey: 'type',
    header: ({ column }) => {
      return (
        <div
          className={tableHeaderClass}
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Type
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </div>
      );
    },
  },
  {
    accessorKey: 'subtype',
    header: ({ column }) => {
      return (
        <div
          className={tableHeaderClass}
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>SubT</TooltipTrigger>
              <TooltipContent>
                <p>Subtype</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </div>
      );
    },
  },
  {
    accessorKey: 'category',
    header: ({ column }) => {
      return (
        <div
          className={tableHeaderClass}
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Category
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </div>
      );
    },
  },
  {
    accessorKey: 'purpose',
    header: ({ column }) => {
      return (
        <div
          className={tableHeaderClass}
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Purpose
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'tag',
    header: ({ column }) => {
      return (
        <div
          className={tableHeaderClass}
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Tag
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </div>
      );
    },
  },

  {
    id: 'actions',
    header: ({ column }) => {
      return (
        <div>
          <ClearReviewedButton />
        </div>
      );
    },
    cell: ({ row }) => <AssetActionsCell asset={row.original} />,
  },
];
export const ClearReviewedButton: React.FC = () => {
  const { reviewedAssets, clearAllReviewed } = useReviewedAssets();

  if (reviewedAssets.length === 0) {
    return null;
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant='destructive'
          size='sm'
          className='flex items-center gap-2 py-4'
        >
          <Trash2 className='h-4 w-4' />
          Reviews ({reviewedAssets.length})
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className='rounded-2xl border border-slate-100 shadow-2xl max-w-[400px] p-8'>
        <AlertDialogHeader>
          <div className='flex flex-col items-center justify-center mb-6'>
            <p className='text-[10px] font-bold uppercase tracking-[0.4em] text-slate-400 leading-none mb-3'>
              Action Required
            </p>
            <AlertDialogTitle className='text-xl font-bold text-slate-900 tracking-tight leading-none'>
              Clear All Reviews?
            </AlertDialogTitle>
            <div className='w-8 h-1 bg-[#22C55E] rounded-full mt-4' />
          </div>

          <AlertDialogDescription className='text-sm text-center text-slate-500 font-medium mb-6 py-4'>
            This will remove all{' '}
            <span className='font-bold text-slate-700'>
              {reviewedAssets.length}
            </span>{' '}
            review marks from your assets.
            <br />
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className='flex gap-3 sm:justify-center mt-6'>
          <AlertDialogCancel className='rounded-lg flex-1 border-slate-200 text-slate-500 font-bold hover:bg-slate-50 transition-all'>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={clearAllReviewed}
            className='rounded-lg flex-1 font-bold bg-red-500 hover:bg-red-600 transition-all shadow-md shadow-red-100'
          >
            Clear All
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const AssetActionsCell: FC<{ asset: Asset }> = ({ asset }) => {
  const { refreshAssets } = useAssetsContext();
  const { addReviewedAsset, removeReviewedAsset, isAssetReviewed } =
    useReviewedAssets();

  const handleReviewToggle = (checked: boolean, assetId: string) => {
    if (checked) {
      addReviewedAsset(assetId);
    } else {
      removeReviewedAsset(assetId);
    }
  };

  const handleDeleteAsset = async (id: string) => {
    try {
      await deleteAsset(id);
      await refreshAssets();
      removeReviewedAsset(id);
      toast({
        title: 'Asset removed',
        description: `The asset ${asset?.asset} has been deleted from ${asset?.wallet}.`,
        variant: 'dark',
      });
    } catch (error) {
      console.error('Error deleting asset:', error);
      toast({
        title: 'Error deleting asset! 🚨',
        description: 'Something went wrong while deleting the asset.',
        variant: 'destructive',
      });
    }
  };

  return (
    <>
      {asset && (
        <div className='flex items-center text-xl'>
          <Checkbox
            className='h-8 w-8 border border-slate-200 transition-all data-[state=checked]:bg-slate-900 data-[state=checked]:border-slate-900'
            checked={isAssetReviewed(asset.id)}
            onCheckedChange={(checked) =>
              handleReviewToggle(checked as boolean, asset.id)
            }
          />
          <Sheet>
            <SheetTrigger className='ml-4 h-8 w-8 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-primary/30 text-slate-400 hover:text-primary transition-all flex items-center justify-center shadow-sm'>
              <Pencil size={14} />
            </SheetTrigger>
            <SheetContent className='max-h-screen overflow-y-scroll'>
              <SheetHeader>
                <SheetTitle>Update Asset</SheetTitle>
                <SheetDescription>
                  Modify the details of your existing asset.
                </SheetDescription>
              </SheetHeader>
              <UpdateAssetForm asset={asset} />
            </SheetContent>
          </Sheet>
          <AlertDialog>
            <AlertDialogTrigger className='ml-4 h-8 w-8 border border-slate-200 bg-white rounded-xl hover:bg-slate-50 hover:border-red-200 text-slate-400 hover:text-red-500 transition-all flex items-center justify-center shadow-sm'>
              <Trash2 size={14} />
            </AlertDialogTrigger>
            <AlertDialogContent className='rounded-2xl border border-slate-100 shadow-2xl max-w-[400px] p-8'>
              <AlertDialogHeader>
                <div className='flex flex-col items-center justify-center mb-6'>
                  <p className='text-[10px] font-bold uppercase tracking-[0.4em] text-slate-400 leading-none mb-3'>
                    Action Required
                  </p>
                  <AlertDialogTitle className='text-xl font-bold text-slate-900 tracking-tight leading-none'>
                    Delete Asset?
                  </AlertDialogTitle>
                  <div className='w-8 h-1 bg-[#22C55E] rounded-full mt-4' />
                </div>

                <div className='w-48 h-48 mx-auto mb-6'>
                  <AspectRatio ratio={1 / 1}>
                    <Image
                      src='/are-you-sure.gif'
                      alt='Asset doubt'
                      fill
                      className='object-cover rounded-full border-2 border-slate-100 shadow-sm'
                    />
                  </AspectRatio>
                </div>

                <AlertDialogDescription className='text-sm text-center text-slate-500 font-medium mb-6 py-6'>
                  You are about to permanently remove
                  <br />
                  this asset from your portfolio.
                </AlertDialogDescription>

                <div className='flex flex-col gap-3 p-4 bg-slate-50/50 border border-slate-100 rounded-xl'>
                  <div className='flex flex-col'>
                    <h3 className='text-[9px] uppercase font-bold text-slate-400 tracking-widest leading-none mb-2'>
                      Asset
                    </h3>
                    <span className='font-bold text-slate-700 text-sm'>
                      {asset.asset}
                    </span>
                  </div>
                  <div className='flex justify-between'>
                    <div className='flex flex-col'>
                      <h3 className='text-[9px] uppercase font-bold text-slate-400 tracking-widest leading-none mb-2'>
                        Wallet
                      </h3>
                      <span className='font-semibold text-slate-500 text-xs'>
                        {asset.wallet}
                      </span>
                    </div>
                    <div className='flex flex-col text-right'>
                      <h3 className='text-[9px] uppercase font-bold text-slate-400 tracking-widest leading-none mb-2'>
                        Quantity
                      </h3>
                      <span className='font-semibold text-slate-500 text-xs'>
                        {asset.qty}
                      </span>
                    </div>
                  </div>
                </div>
              </AlertDialogHeader>
              <AlertDialogFooter className='flex gap-3 sm:justify-center mt-6'>
                <AlertDialogCancel
                  className='rounded-lg flex-1 border-slate-200 text-slate-500 font-bold hover:bg-slate-50 transition-all'
                  onClick={() => {
                    toast({
                      title: 'Operation Cancelled!',
                      description: `Phew! Crisis averted.`,
                    });
                  }}
                >
                  Keep it
                </AlertDialogCancel>
                <AlertDialogAction
                  className='rounded-lg flex-1 font-bold bg-red-500 hover:bg-red-600 transition-all shadow-md shadow-red-100'
                  onClick={() => {
                    if (asset) {
                      handleDeleteAsset(asset.id);
                    }
                  }}
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}
    </>
  );
};
