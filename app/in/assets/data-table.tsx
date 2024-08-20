'use client';

import { useState } from 'react';

import {
  ColumnDef,
  ColumnFiltersState,
  getFilteredRowModel,
  SortingState,
  getSortedRowModel,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../components/ui/table';
import { Input } from '@/components/ui/input';
import MessageInTable from '@/components/MessageInTable';
import { Asset } from '@/lib/types';
import { useAssetsContext } from '@/context/AssetsContext';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[] | any;
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  // ------------------------------------
  const { assets, isLoading } = useAssetsContext();
  console.log('---  🚀 ---> | assets:', assets);

  const getTotalRepeatedAssetInSameWallet = (assetName: string) => {
    // const repeatedAssets = assets.filter(
    //   (item: Asset) => item?.asset === assetName
    // );
    // console.log('---  🚀 ---> | repeatedAssets:', repeatedAssets);
    // return repeatedAssets.length;
    return assetName;
  };
  // ------------------------------------

  return (
    <div className='rounded-sm border border-slate-200'>
      <div className='flex items-center px-12 py-4'>
        <Input
          placeholder='Filter by Asset'
          value={(table.getColumn('asset')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('asset')?.setFilterValue(event.target.value)
          }
          className='max-w-sm w-[16ch]'
        />
        <Input
          placeholder='Filter by Wallet'
          value={(table.getColumn('wallet')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('wallet')?.setFilterValue(event.target.value)
          }
          className='ml-4 max-w-sm w-[16ch]'
        />
        <Input
          placeholder='Filter by Currency'
          value={
            (table.getColumn('currency')?.getFilterValue() as string) ?? ''
          }
          onChange={(event) =>
            table.getColumn('currency')?.setFilterValue(event.target.value)
          }
          className='ml-4 max-w-sm w-[16ch]'
        />

        {/* ------------------------------------------ */}
        {assets && (
          <div className='flex items-center w-full ml-4'>
            <p className='text-sm font-bold'>
              {`Total Qty of ${
                (table.getColumn('asset')?.getFilterValue() as string) ?? ''
              }:
              `}
            </p>
            {getTotalRepeatedAssetInSameWallet(
              (table.getColumn('asset')?.getFilterValue() as string) ?? ''
            )}
            <p className='text-sm font-bold mx-4'>Total:</p>
            {getTotalRepeatedAssetInSameWallet(
              (table.getColumn('asset')?.getFilterValue() as string) ?? ''
            )}
          </div>
        )}
        {/* ------------------------------------------ */}
      </div>

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className='text-right text-xs text-slate-600 font-light'
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className='h-24 text-center'>
                <MessageInTable
                  image={'/biden.webp'}
                  objectPosition={'50% 10%'}
                  alt={'Looking for something'}
                  title={'Oops! Asset Not Found 👻'}
                  subtitle={'Looks like this asset is hiding from us.'}
                  buttonCopy={'Add it Now!'}
                  formTitle={'Add a new Asset'}
                  formSubtitle={
                    'Add a New Asset and expand your investment portfolio.'
                  }
                />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
