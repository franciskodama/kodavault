'use client';

import { FC } from 'react';

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
import { ArrowUpDown, Trash2 } from 'lucide-react';

import { useAssetsContext } from '@/context/AssetsContext';
import { tableHeaderClass } from '@/lib/classes';
import { Asset } from '@/lib/types';
import { deleteAsset, updateReviewedAsset } from '@/lib/actions';
import { UpdateAssetForm } from '@/components/UpdateAssetForm';
import Image from 'next/image';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { toast } from '@/components/ui/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import { useReviewedAssets } from './reviewed-context';
import { Button } from '@/components/ui/button';

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
            className='w-[30px] h-[30px] border border-slate-300 rounded-[2px]'
            checked={isAssetReviewed(asset.id)}
            onCheckedChange={(checked) =>
              handleReviewToggle(checked as boolean, asset.id)
            }
          />
          <Sheet>
            <SheetTrigger className='ml-4 hover:text-base w-8 bg-white border border-slate-300 rounded-[2px]'>
              ✏️
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
            <AlertDialogTrigger className='ml-4 hover:text-base w-8 border border-slate-300 bg-white rounded-[2px]'>
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
                        className='object-cover rounded-full border-[8px] border-primary'
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

                  <div className='flex py-4 px-16 justify-between border-[6px] border-primary text-base text-primary'>
                    <div className='flex flex-col'>
                      <div className='text-sm'>Asset:</div>
                      <span className='font-bold'>{asset.asset}</span>
                    </div>
                    <div className='flex flex-col'>
                      <div className='text-sm'> Wallet:</div>
                      <span className='font-bold'>{asset.wallet}</span>
                    </div>
                    <div className='flex flex-col'>
                      <div className='text-sm'> Qty:</div>
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
// ------------------ If we want to save reviewed status in the database ------------------

// const handleReviewedAsset = async (id: string, reviewed: boolean) => {
//   try {
//     await updateReviewedAsset(id as string, reviewed as boolean);
//     await refreshAssets();
//     toast({
//       title: `${asset?.asset}: ${reviewed ? 'Reviewed' : 'Unreviewed'}  ${
//         reviewed ? ' ✅' : '🚫'
//       }`,
//       description: `The Asset ${asset?.asset} has been successfully updated!`,
//       variant: reviewed ? 'success' : 'default',
//     });
//   } catch (error) {
//     console.error('Error updating reviewed status of asset:', error);
//     toast({
//       title: 'Error Updating Asset! 🚨',
//       description:
//         'Something went wrong while updating the Review Status. Try again!',
//       variant: 'destructive',
//     });
//   }
// };
// onCheckedChange={() => handleReviewedAsset(asset.id, !asset.reviewed as boolean)}

// --------------------------------------------------------------------------------------
