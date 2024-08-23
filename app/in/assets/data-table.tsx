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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { Check, ChevronsUpDown } from 'lucide-react';

import MessageInTable from '@/components/MessageInTable';
import { Asset } from '@/lib/types';
import { useAssetsContext } from '@/context/AssetsContext';
import { cn, thousandAndDecimalFormatter } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[] | any;
}

type Framework = {
  value: string;
  label: string;
};

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const [openWalletDropbox, setOpenWalletDropbox] = useState(false);
  const [value, setValue] = useState('');

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

  const { assets, isLoading } = useAssetsContext();

  const getRepeatedAssetTotal = (assetName: string) => {
    const repeatedAssetRows = assets.filter(
      (item: Asset) => item?.asset === assetName.toUpperCase()
    );

    const isRepeatedAsset = repeatedAssetRows.length > 1;

    const total = repeatedAssetRows.reduce(
      (sum: number, item: Asset | undefined) => {
        if (!item) return sum;
        return sum + (item.total ?? 0);
      },
      0
    );

    const totalQty = repeatedAssetRows.reduce(
      (sum: number, item: Asset | undefined) => {
        if (!item) return sum;
        return sum + (item.qty ?? 0);
      },
      0
    );
    return { isRepeatedAsset, assetName, total, totalQty };
  };

  const walletsArray = Array.from(
    new Set(assets.map((asset) => asset?.wallet))
  );
  const wallets = walletsArray
    .filter((wallet): wallet is string => wallet !== undefined)
    .map((wallet) => ({
      value: wallet,
      label: wallet,
    }));

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
        <Popover open={openWalletDropbox} onOpenChange={setOpenWalletDropbox}>
          <PopoverTrigger asChild>
            <Button
              variant='outline'
              role='combobox'
              aria-expanded={openWalletDropbox}
              className='ml-4 w-[16ch] justify-between font-normal text-slate-500'
            >
              {value
                ? wallets.find((wallet) => wallet.value === value)?.label
                : 'Filter by Wallet'}
              <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-[200px] p-0'>
            <Command>
              <CommandList>
                <CommandEmpty>No wallet found.</CommandEmpty>
                <CommandGroup>
                  {wallets.map((wallet) => (
                    <CommandItem
                      key={wallet.value}
                      value={wallet.value}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? '' : currentValue);
                        table.getColumn('wallet')?.setFilterValue(currentValue);
                        setOpenWalletDropbox(false);
                      }}
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          value === wallet.value ? 'opacity-100' : 'opacity-0'
                        )}
                      />
                      {wallet.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
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
        {getRepeatedAssetTotal(
          (table.getColumn('asset')?.getFilterValue() as string) ?? ''
        ).isRepeatedAsset && (
          <div className='flex items-center h-10 font-bold ml-4 px-4 border-2 border-slate-500 bg-accent rounded-[2px] text-left'>
            <div className='flex items-center w-full'>
              <p className='w-[6ch]'>Asset:</p>
              {getRepeatedAssetTotal(
                (table.getColumn('asset')?.getFilterValue() as string) ?? ''
              ).assetName.toUpperCase()}
            </div>
            <p className='mx-6'>|</p>
            <div className='flex items-center w-full'>
              <p className='w-[9ch]'>Total Qty:</p>
              {thousandAndDecimalFormatter(
                getRepeatedAssetTotal(
                  (table.getColumn('asset')?.getFilterValue() as string) ?? ''
                ).totalQty
              )}
            </div>
            <p className='mx-6'>|</p>
            <div className='flex items-center w-full'>
              <p className='w-[6ch]'>Total:</p>
              {thousandAndDecimalFormatter(
                getRepeatedAssetTotal(
                  (table.getColumn('asset')?.getFilterValue() as string) ?? ''
                ).total
              )}
            </div>
          </div>
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
