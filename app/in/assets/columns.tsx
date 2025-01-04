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
import { ArrowUpDown } from 'lucide-react';

import { useAssetsContext } from '@/context/AssetsContext';
import { tableHeaderClass } from '@/lib/classes';
import { Asset } from '@/lib/types';
import { deleteAsset, updateReviewedAsset } from '@/lib/actions';
import { UpdateAssetForm } from '@/components/UpdateAssetForm';
import Image from 'next/image';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { toast } from '@/components/ui/use-toast';
import { Checkbox } from '@/components/ui/checkbox';

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
  // {
  //   accessorKey: 'exchange',
  //   header: ({ column }) => {
  //     return (
  //       <div
  //         className={tableHeaderClass}
  //         onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
  //       >
  //         <TooltipProvider>
  //           <Tooltip>
  //             <TooltipTrigger>FX</TooltipTrigger>
  //             <TooltipContent>
  //               <p>Foreign Exchange</p>
  //             </TooltipContent>
  //           </Tooltip>
  //         </TooltipProvider>
  //         <ArrowUpDown className='ml-2 h-4 w-4' />
  //       </div>
  //     );
  //   },
  // },
  // {
  //   accessorKey: 'currency',
  //   header: ({ column }) => {
  //     return (
  //       <div
  //         className={tableHeaderClass}
  //         onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
  //       >
  //         <TooltipProvider>
  //           <Tooltip>
  //             <TooltipTrigger>$</TooltipTrigger>
  //             <TooltipContent>
  //               <p>Currency</p>
  //             </TooltipContent>
  //           </Tooltip>
  //         </TooltipProvider>
  //         <ArrowUpDown className='ml-2 h-4 w-4' />
  //       </div>
  //     );
  //   },
  // },
  // {
  //   id: 'review',
  //   cell: ({ row }) => (
  // <TooltipProvider>
  //   <Tooltip>
  //     <TooltipTrigger>
  //       <AssetReviewed asset={row.original} />
  //     </TooltipTrigger>
  //     <TooltipContent>
  //       {row.original?.reviewed ? 'Reviewed' : 'Unreviewed'}
  //     </TooltipContent>
  //   </Tooltip>
  // </TooltipProvider>
  //   ),
  // },
  {
    id: 'actions',
    cell: ({ row }) => <AssetActionsCell asset={row.original} />,
  },
];

const AssetActionsCell: FC<{ asset: Asset }> = ({ asset }) => {
  const { refreshAssets } = useAssetsContext();

  const handleReviewedAsset = async (id: string, reviewed: boolean) => {
    try {
      await updateReviewedAsset(id as string, reviewed as boolean);
      await refreshAssets();
      toast({
        title: `${asset?.asset}: ${reviewed ? 'Reviewed' : 'Unreviewed'}  ${
          reviewed ? ' ✅' : '🚫'
        }`,
        description: `The Asset ${asset?.asset} has been successfully updated!`,
        variant: reviewed ? 'success' : 'default',
      });
    } catch (error) {
      console.error('Error updating reviewed status of asset:', error);
      toast({
        title: 'Error Updating Asset! 🚨',
        description:
          'Something went wrong while updating the Review Status. Try again!',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteAsset = async (id: string) => {
    try {
      await deleteAsset(id);
      await refreshAssets();
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
            checked={asset.reviewed}
            onCheckedChange={() =>
              handleReviewedAsset(asset.id, !asset.reviewed as boolean)
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
