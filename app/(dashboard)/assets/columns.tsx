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
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will remove all {reviewedAssets.length} review marks from your
            assets. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={clearAllReviewed}
            className='bg-red-600 hover:bg-red-700'
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
        title: 'Asset gone! 💀',
        description: `The Asset ${asset?.asset} has been successfully deleted from ${asset?.wallet}.`,
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
            className='w-[30px] h-[30px] border border-slate-300 rounded-md transition-all data-[state=checked]:bg-slate-900 data-[state=checked]:border-slate-900'
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
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle asChild className='text-center text-2xl my-4'>
                  <div>
                    Are you sure?
                    <br />
                    <div className='w-[450px] mt-8 mx-auto'>
                      <AspectRatio ratio={16 / 16} className='bg-white'>
                        <Image
                          src='/are-you-sure.gif'
                          alt='Britney in doubt'
                          fill
                          className='object-cover rounded-full border-[4px] border-primary'
                          objectPosition='center 25%'
                        />
                      </AspectRatio>
                    </div>
                  </div>
                </AlertDialogTitle>
                <AlertDialogDescription asChild>
                  <div className='flex flex-col text-base text-center text-slate-600 mb-4 gap-4'>
                    You are about to delete the Asset below:
                    <div className='flex py-4 px-16 justify-between border-[4px] rounded-lg border-primary text-base text-primary'>
                      <div className='flex flex-col'>
                        <div className='text-sm'>Asset:</div>
                        <div className='font-bold'>{asset.asset}</div>
                      </div>
                      <div className='flex flex-col'>
                        <div className='text-sm'> Wallet:</div>
                        <div className='font-bold'>{asset.wallet}</div>
                      </div>
                      <div className='flex flex-col'>
                        <div className='text-sm'> Qty:</div>
                        <div className='font-bold'>{asset.qty}</div>
                      </div>
                    </div>
                    <span className='text-primary text-center my-4 font-bold text-base'>
                      This is the point of no return. <br />
                      Once done, there is no going back! 💣
                    </span>
                  </div>
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
                    }
                  }}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}
    </>
  );
};
