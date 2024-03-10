'use client';

import Image from 'next/image';
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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../../../components/ui/sheet';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { AddAssetForm } from '@/components/AddAssetForm';
import { Input } from '@/components/ui/input';

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

  return (
    <div className='rounded-sm border border-slate-200'>
      <div className='flex items-center px-12 py-4'>
        <Input
          placeholder='Filter by Asset'
          value={(table.getColumn('asset')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('asset')?.setFilterValue(event.target.value)
          }
          className='max-w-sm w-[14ch]'
        />
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
                    className='÷text-right text-xs text-slate-600 font-light'
                    // className={`${
                    //   cell.getContext().cell.column.id === 'price'
                    //     ? ' text-slate-600'
                    //     : ' text-red-600'
                    // } text-right text-xs font-light`}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className='h-24 text-center'>
                <div className='flex items-center justify-around'>
                  <div className='w-[450px] mx-auto my-8'>
                    <AspectRatio ratio={16 / 9}>
                      <Image
                        src='/no-assets-poor-boy.webp'
                        alt='John Travolta looking at around inside a wallet'
                        className='object-cover rounded-sm border-primary'
                        objectPosition='center 100%'
                        fill
                      />
                    </AspectRatio>
                  </div>
                  <div className='flex flex-col w-[450px] mx-auto'>
                    <p className='text-2xl font-semibold'>
                      Spice it up by adding some assets!
                    </p>
                    <p className='text-base my-2'>{`Let's make your financial playground pop! 🚀`}</p>
                    <Sheet>
                      <SheetTrigger className='border-2 border-slate-500 h-10 px-4 rounded-[2px] font-semibold my-4 text-sm '>
                        Add Your First Asset
                      </SheetTrigger>
                      <SheetContent>
                        <SheetHeader>
                          <SheetTitle>Add a new Asset</SheetTitle>
                          <SheetDescription>
                            Add a New Asset and expand your investment
                            portfolio.
                          </SheetDescription>
                        </SheetHeader>
                        <AddAssetForm />
                      </SheetContent>
                    </Sheet>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
