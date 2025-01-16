'use client';

import { useState } from 'react';

import {
  ColumnDef,
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
} from '@/components/ui/table';
import MessageInTable from '@/components/MessageInTable';
import Image from 'next/image';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[] | any;
  sumGoals: number;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  sumGoals,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  return (
    <div className='rounded-sm border border-slate-200  bg-white'>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} className='text-center'>
                    {header.id === 'actionGoal' ? (
                      <div className='flex items-center gap-2'>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                        <div
                          className={`${
                            sumGoals > 100 &&
                            'bg-red-500 text-white py-1 px-1 rounded-[2px]'
                          } text-center text-xs font-base text-primary`}
                        >
                          ({sumGoals} %)
                        </div>
                      </div>
                    ) : (
                      <>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </>
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
                    {cell.column.id !== 'image' && (
                      <>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </>
                    )}
                    {cell.column.id === 'image' && (
                      <div className='flex justify-center'>
                        <Image
                          src={
                            cell.getValue()
                              ? (cell.getValue() as string)
                              : '/red-dot.webp'
                          }
                          width={30}
                          height={30}
                          alt='Logo of the coin'
                          className='ml-2'
                          style={{ width: 'auto', height: 'auto' }}
                        />
                      </div>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className='h-24 text-center'>
                <MessageInTable
                  image={'/no-assets-poor-boy.webp'}
                  objectPosition={'center 100%'}
                  alt={'Poor boy song by Queen'}
                  title={`Let's make your financial playground pop! 🚀`}
                  subtitle={'Spice it up by adding some assets!'}
                  buttonCopy={'Add Your First Asset'}
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
