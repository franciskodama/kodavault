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
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';

import MessageInTable from '@/components/MessageInTable';
import Image from 'next/image';
import { currencyFormatter, thousandFormatter } from '@/lib/utils';
import { athTotals } from '.';
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[] | any;
  setExclusions: React.Dispatch<React.SetStateAction<string[]>>;
  totals: athTotals;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  setExclusions,
  totals,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const { athTotal, athTotalExclusions } = totals;

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

  const handleCheckbox = (asset: string) => {
    setExclusions((prev) => {
      if (prev.includes(asset)) {
        return prev.filter((item) => item !== asset);
      } else {
        return [...prev, asset];
      }
    });
  };

  return (
    <div className='rounded-sm border border-slate-200'>
      <div className='flex items-center justify-between px-12 py-4 mt-4'>
        <Input
          placeholder='Filter by Asset'
          value={(table.getColumn('asset')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('asset')?.setFilterValue(event.target.value)
          }
          className='max-w-sm w-[14ch]'
        />
        {athTotalExclusions ? (
          <div className='flex items-center h-10 font-normal ml-4 px-4 border-2 border-slate-500 bg-accent rounded-[2px] text-left'>
            <>
              <div className='flex items-center gap-2'>
                <p>Gross Estimation:</p>
                {`$ `}
                {thousandFormatter(athTotal)}
              </div>
              <p className='mx-6'>|</p>
              <div className='flex items-center gap-2'>
                <p>Excluded Assets:</p>
                {`$ `}
                {thousandFormatter(athTotalExclusions)}
              </div>
              <p className='mx-6'>|</p>
              <div className='flex items-center gap-2 text-sm font-bold'>
                <p>Net Estimation:</p>
                {`$ `}
                {thousandFormatter(athTotal - athTotalExclusions)}
              </div>
            </>
          </div>
        ) : null}
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
                    className={`text-right text-xs text-slate-600 font-light ${
                      cell.column.id === 'percentagePotential' &&
                      'bg-slate-100 border'
                    }`}
                  >
                    {cell.column.id !== 'image' && (
                      <>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                        {cell.column.id === 'percentagePotential' &&
                          cell.getValue() !== '∞' && (
                            <span className='ml-1'>%</span>
                          )}
                      </>
                    )}
                    {cell.column.id === 'image' && (
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
                      />
                    )}
                    {cell.column.id === 'exclusion' && (
                      <Checkbox
                        className='mr-8'
                        onCheckedChange={() =>
                          handleCheckbox(row.getValue('asset') as string)
                        }
                      />
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
