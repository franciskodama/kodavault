'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BellRing, Check, ChevronsUpDown, XIcon } from 'lucide-react';
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
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import MessageInTable from '@/components/MessageInTable';
import { useAssetsContext } from '@/context/AssetsContext';
import { cn, thousandAndDecimalFormatter } from '@/lib/utils';
import { Asset } from '@/lib/types';
import { Loading } from '@/components/Loading';
import StocksNoSymbol from './stocks-no-symbol';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[] | any;
  typeFilter?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  typeFilter,
}: DataTableProps<TData, TValue>) {
  const { assets, assetsByType, isLoading } = useAssetsContext();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const [openWalletDropbox, setOpenWalletDropbox] = useState(false);
  const [valueWalletDropbox, setValueWalletDropbox] = useState('');

  const [openCurrencyDropbox, setOpenCurrencyDropbox] = useState(false);
  const [valueCurrencyDropbox, setValueCurrencyDropbox] = useState('');

  const [openTypeDropbox, setOpenTypeDropbox] = useState(false);
  const [valueTypeDropbox, setValueTypeDropbox] = useState('');

  const [clearFilterButton, setClearFilterButton] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);

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

  useEffect(() => {
    if (typeFilter) {
      setValueTypeDropbox(typeFilter);
      table.getColumn('type')?.setFilterValue(typeFilter);
    }
  }, [typeFilter, table]);

  useEffect(() => {
    if (valueWalletDropbox || valueCurrencyDropbox || valueTypeDropbox) {
      setClearFilterButton(true);
    }
  }, [valueWalletDropbox, valueCurrencyDropbox, valueTypeDropbox]);

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

  // -------------------------------

  // function createFilterOptions<T, K extends keyof T>(
  //   assets: T[],
  //   key: K
  // ): Array<{ value: string; label: string }> {
  //   const uniqueValues = Array.from(new Set(assets.map((asset) => asset[key])));

  //   const options = uniqueValues
  //     .filter((value): value is NonNullable<T[K]> => value != null)
  //     .map((value) => ({
  //       value: String(value),
  //       label: String(value),
  //     }));

  //   options.push({
  //     value: 'No Filter',
  //     label: 'No Filter',
  //   });

  //   return options;
  // }

  // // Usage:
  // const wallets = createFilterOptions(assets, 'wallet');
  // const currencies = createFilterOptions(assets, 'currency');
  // const types = createFilterOptions(assets, 'type');
  // -------------------------------
  const walletsArray = Array.from(
    new Set(assets.map((asset) => asset?.wallet))
  );

  const wallets = walletsArray
    .filter((wallet): wallet is string => wallet !== undefined)
    .map((wallet) => ({
      value: wallet,
      label: wallet,
    }));

  wallets.push({
    value: 'No Filter',
    label: 'No Filter',
  });

  const currencyArray = Array.from(
    new Set(assets.map((asset) => asset?.currency))
  );

  const currencies = currencyArray
    .filter((currency): currency is string => currency !== undefined)
    .map((currency) => ({
      value: currency,
      label: currency,
    }));

  currencies.push({
    value: 'No Filter',
    label: 'No Filter',
  });

  const typeArray = Array.from(new Set(assets.map((asset) => asset?.type)));

  const types = typeArray
    .filter((type): type is string => type !== undefined)
    .map((type) => ({
      value: type,
      label: type,
    }));

  types.push({
    value: 'No Filter',
    label: 'No Filter',
  });

  const handleClickClearAll = () => {
    setValueWalletDropbox('');
    setValueCurrencyDropbox('');
    setValueTypeDropbox('');
    setColumnFilters([]);
    table.resetGlobalFilter();
    setClearFilterButton(false);
  };

  const stocksNoTotal = assetsByType?.Stock?.filter(
    (asset) => asset?.total === 0
  );

  return (
    <div className='rounded-sm border border-slate-200'>
      <div className='flex justify-between items-center px-8 py-4'>
        <div className='flex items-center'>
          <Input
            placeholder='Filter by Asset'
            value={(table.getColumn('asset')?.getFilterValue() as string) ?? ''}
            onChange={(event) => {
              table.getColumn('asset')?.setFilterValue(event.target.value);
              setClearFilterButton(true);
            }}
            className='max-w-sm w-[20ch]'
          />
          <Popover open={openWalletDropbox} onOpenChange={setOpenWalletDropbox}>
            <PopoverTrigger asChild>
              <Button
                variant='outline'
                role='combobox'
                aria-expanded={openWalletDropbox}
                className='ml-4 w-[20ch] justify-between font-normal text-slate-500'
              >
                {valueWalletDropbox
                  ? wallets.find(
                      (wallet) => wallet.value === valueWalletDropbox
                    )?.label
                  : 'Filter by Wallet'}
                <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-[23ch] p-0'>
              <Command>
                <CommandList>
                  <CommandEmpty>No wallet found.</CommandEmpty>
                  <CommandGroup>
                    {wallets.map((wallet) => (
                      <CommandItem
                        className='text-xs'
                        key={wallet.value}
                        value={wallet.value}
                        onSelect={(currentValue) => {
                          setValueWalletDropbox(
                            currentValue === valueWalletDropbox
                              ? ''
                              : currentValue
                          );
                          table
                            .getColumn('wallet')
                            ?.setFilterValue(
                              currentValue === 'No Filter' ? '' : currentValue
                            );
                          setOpenWalletDropbox(false);
                        }}
                      >
                        <Check
                          className={cn(
                            'mr-2 h-4 w-4',
                            valueWalletDropbox === wallet.value
                              ? 'opacity-100'
                              : 'opacity-0'
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
          <Popover
            open={openCurrencyDropbox}
            onOpenChange={setOpenCurrencyDropbox}
          >
            <PopoverTrigger asChild>
              <Button
                variant='outline'
                role='combobox'
                aria-expanded={openCurrencyDropbox}
                className='ml-4 w-[20ch] justify-between font-normal text-slate-500'
              >
                {valueCurrencyDropbox
                  ? currencies.find(
                      (currency) => currency.value === valueCurrencyDropbox
                    )?.label
                  : 'Filter by Currency'}
                <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-[23ch] p-0'>
              <Command>
                <CommandList>
                  <CommandEmpty>No currency found.</CommandEmpty>
                  <CommandGroup>
                    {currencies.map((currency) => (
                      <CommandItem
                        className='text-xs'
                        key={currency.value}
                        value={currency.value}
                        onSelect={(currentValue) => {
                          setValueCurrencyDropbox(
                            currentValue === valueCurrencyDropbox
                              ? ''
                              : currentValue
                          );
                          table
                            .getColumn('currency')
                            ?.setFilterValue(
                              currentValue === 'No Filter' ? '' : currentValue
                            );
                          setOpenCurrencyDropbox(false);
                        }}
                      >
                        <Check
                          className={cn(
                            'mr-2 h-4 w-4',
                            valueCurrencyDropbox === currency.value
                              ? 'opacity-100'
                              : 'opacity-0'
                          )}
                        />
                        {currency.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <Popover open={openTypeDropbox} onOpenChange={setOpenTypeDropbox}>
            <PopoverTrigger asChild>
              <Button
                variant='outline'
                role='combobox'
                aria-expanded={openTypeDropbox}
                className='ml-4 w-[20ch] justify-between font-normal text-slate-500'
              >
                {valueTypeDropbox
                  ? types.find((type) => type.value === valueTypeDropbox)?.label
                  : 'Filter by Type'}
                <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-[23ch] p-0'>
              <Command>
                <CommandList>
                  <CommandEmpty>No type found.</CommandEmpty>
                  <CommandGroup>
                    {types.map((type) => (
                      <CommandItem
                        className='text-xs'
                        key={type.value}
                        value={type.value}
                        onSelect={(currentValue) => {
                          setValueTypeDropbox(
                            currentValue === valueTypeDropbox
                              ? ''
                              : currentValue
                          );
                          table
                            .getColumn('type')
                            ?.setFilterValue(
                              currentValue === 'No Filter' ? '' : currentValue
                            );
                          setOpenTypeDropbox(false);
                        }}
                      >
                        <Check
                          className={cn(
                            'mr-2 h-4 w-4',
                            valueTypeDropbox === type.value
                              ? 'opacity-100'
                              : 'opacity-0'
                          )}
                        />
                        {type.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

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

          {clearFilterButton && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    size='md'
                    variant={'outline'}
                    className='h-10 ml-4 border-2 border-slate-500'
                    onClick={() => {
                      handleClickClearAll();
                    }}
                  >
                    <XIcon size={18} strokeWidth={2.4} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Clear All Filters</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>

        {stocksNoTotal?.length > 0 && !openNotification ? (
          <>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Button
                      size='md'
                      variant={'outline'}
                      className='h-10 ml-4 border-2 border-slate-500 rounded-full'
                      onClick={() => {
                        setOpenNotification(true);
                      }}
                    >
                      <BellRing className='h-4 w-4' />
                    </Button>
                  </motion.button>
                </TooltipTrigger>
                <TooltipContent>
                  <div className='flex items-center'>
                    <p className='text-primary ml-2'>You have 1 notification</p>
                    <p className='text-xs ml-2 text-slate-300'>See details</p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </>
        ) : (
          <div />
        )}
      </div>

      <AnimatePresence>
        {openNotification ? (
          <motion.div
            layout
            initial={{ opacity: 0, y: 50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
          >
            <div className='mx-8 mb-4'>
              <StocksNoSymbol
                stocksNoTotal={stocksNoTotal}
                setOpenNotification={setOpenNotification}
              />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

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

        {isLoading ? (
          <Loading />
        ) : (
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
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  <MessageInTable
                    image={'/superman-where.webp'}
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
        )}
      </Table>
    </div>
  );
}
