'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { XIcon } from 'lucide-react';
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
} from '@/components/ui/table';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Input } from '@/components/ui/input';
import MessageInTable from '@/components/MessageInTable';
import {
  currencyFormatter,
  thousandAndDecimalFormatter,
  thousandFormatter,
} from '@/lib/utils';

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[] | any;
};

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [assetInFilter, setAssetInFilter] = useState('');

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

  const inputFilterValue = table
    .getColumn('symbol')
    ?.getFilterValue() as string;

  useEffect(() => {
    if (inputFilterValue) {
      setAssetInFilter(inputFilterValue);
    }
  }, [inputFilterValue]);

  const handleClickClearFilter = () => {
    setAssetInFilter('');
    setColumnFilters([]);
    table.resetGlobalFilter();
  };

  const numberColumnsNoDecimals = [
    'market_cap',
    'total_volume',
    'circulating_supply',
  ];

  return (
    <div className='rounded-sm border border-slate-200'>
      <div className='flex items-center justify-left px-12 py-4 mt-4'>
        <Input
          placeholder='Filter by Asset'
          value={(table.getColumn('symbol')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('symbol')?.setFilterValue(event.target.value)
          }
          className='max-w-sm w-[14ch]'
        />

        {inputFilterValue && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div
                  className='flex items-center justify-center w-[176px] sm:w-11 h-10 ml-4 sm:ml-2 border-2 border-slate-500 bg-accent'
                  onClick={() => {
                    handleClickClearFilter();
                  }}
                >
                  <XIcon size={18} strokeWidth={2.4} />
                  <span className='inline sm:hidden ml-2 font-semibold'>
                    Clear Field
                  </span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Clear All Filters</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
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
                    {cell.column.id === 'market_cap_rank' ||
                    cell.column.id === 'symbol' ? (
                      <>{cell.getValue()}</>
                    ) : null}
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
                    {cell.column.id === 'current_price' ||
                    cell.column.id === 'price_change_percentage_24h' ? (
                      <>
                        {thousandAndDecimalFormatter(Number(cell.getValue()))}
                        {cell.column.id === 'price_change_percentage_24h' && (
                          <span className='ml-1'>%</span>
                        )}
                      </>
                    ) : null}
                    {numberColumnsNoDecimals.includes(cell.column.id) && (
                      <>
                        {thousandFormatter(Number(cell.getValue()))}

                        {cell.column.id === 'circulating_supply' && (
                          <span className='ml-1'>
                            {(cell.row.original as any).symbol}
                          </span>
                        )}
                      </>
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
