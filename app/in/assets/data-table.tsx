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
import {
  cn,
  thousandAndDecimalFormatter,
  thousandFormatter,
} from '@/lib/utils';
import { Loading } from '@/components/Loading';
import StocksNoSymbol from './stocks-no-symbol';
import { Asset, AssetsByType, UnpricedAsset } from '@/lib/types';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[] | any;
  typeFilterAsParam?: string;
}

type OptionType = {
  value: string;
  label: string;
};

export function DataTable<TData, TValue>({
  columns,
  data,
  typeFilterAsParam,
}: DataTableProps<TData, TValue>) {
  const { assets, assetsByType, isLoading } = useAssetsContext();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const [openWalletDropbox, setOpenWalletDropbox] = useState(false);
  const [valueWalletDropbox, setValueWalletDropbox] = useState('');

  const [openAccountDropbox, setOpenAccountDropbox] = useState(false);
  const [valueAccountDropbox, setValueAccountDropbox] = useState('');

  const [openCurrencyDropbox, setOpenCurrencyDropbox] = useState(false);
  const [valueCurrencyDropbox, setValueCurrencyDropbox] = useState('');

  const [openTypeDropbox, setOpenTypeDropbox] = useState(false);
  const [valueTypeDropbox, setValueTypeDropbox] = useState('');

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
    if (typeFilterAsParam) {
      setValueTypeDropbox(typeFilterAsParam);
      table.getColumn('type')?.setFilterValue(typeFilterAsParam);
    }
  }, [typeFilterAsParam, table]);

  useEffect(() => {
    if (valueWalletDropbox || valueCurrencyDropbox || valueTypeDropbox) {
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

  const walletsArray = Array.from(
    new Set(assets.map((asset) => asset?.wallet))
  );
  const accountsArray = Array.from(
    new Set(assets.map((asset) => asset?.account))
  );
  const currencyArray = Array.from(
    new Set(assets.map((asset) => asset?.currency))
  );
  const typeArray = Array.from(new Set(assets.map((asset) => asset?.type)));

  const convertArrayToOptions = <T extends string | undefined>(
    array: T[]
  ): OptionType[] => {
    const options: OptionType[] = array
      .filter((item): item is NonNullable<T> => item !== undefined)
      .map((item) => ({
        value: item,
        label: item,
      }));

    return options;
  };

  const wallets = convertArrayToOptions(walletsArray);
  const accounts = convertArrayToOptions(accountsArray);
  const currencies = convertArrayToOptions(currencyArray);
  const types = convertArrayToOptions(typeArray);

  const handleClickClearAll = () => {
    setValueWalletDropbox('');
    setValueCurrencyDropbox('');
    setValueTypeDropbox('');
    setColumnFilters([]);
    table.resetGlobalFilter();
  };

  const stocksNoTotal = assetsByType?.Stock?.filter(
    (asset) => asset?.total === 0
  );

  const filteredAssets = table
    .getFilteredRowModel()
    .rows.map((row) => row.original);

  const totalFilteredAssets = filteredAssets
    .map((item: any) => {
      return parseFloat(item.total.replace(/,/g, ''));
    })
    .reduce((sum, current) => sum + current, 0);

  const areThereRepeatedAssets = getRepeatedAssetTotal(
    (table.getColumn('asset')?.getFilterValue() as string) ?? ''
  ).isRepeatedAsset;

  const filterIsActive = data.length !== filteredAssets.length;
  const inputFilterValue = table.getColumn('asset')?.getFilterValue() as string;

  if (data.length < 1)
    return (
      <div className='mt-8'>
        <MessageInTable
          image={'/superman-where.webp'}
          objectPosition={'50% 10%'}
          alt={'Looking for something'}
          title={'Oops! Asset Not Found 👻'}
          subtitle={'Looks like this asset is hiding from us.'}
          buttonCopy={'Add it Now!'}
          formTitle={'Add a new Asset'}
          formSubtitle={'Add a New Asset and expand your investment portfolio.'}
        />
      </div>
    );

  return (
    <>
      <div className='rounded-sm border border-slate-200 mx-4 sm:mx-0'>
        <div className='flex justify-between items-center px-8 py-4'>
          <div className='flex flex-col sm:flex-row items-center gap-2'>
            <Input
              placeholder='Filter by Asset'
              value={
                (table.getColumn('asset')?.getFilterValue() as string) ?? ''
              }
              onChange={(e) => {
                table.getColumn('asset')?.setFilterValue(e.target.value);
              }}
              className='max-w-sm w-[20ch]'
            />

            <Popover
              open={openWalletDropbox}
              onOpenChange={setOpenWalletDropbox}
            >
              <PopoverTrigger asChild>
                <Button
                  variant='outline'
                  role='combobox'
                  aria-expanded={openWalletDropbox}
                  className='sm:ml-4 w-[20ch] justify-between font-normal text-slate-500'
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
                              ?.setFilterValue(currentValue);
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
              open={openAccountDropbox}
              onOpenChange={setOpenAccountDropbox}
            >
              <PopoverTrigger asChild>
                <Button
                  variant='outline'
                  role='combobox'
                  aria-expanded={openAccountDropbox}
                  className='sm:ml-4 w-[20ch] justify-between font-normal text-slate-500'
                >
                  {valueAccountDropbox
                    ? accounts.find(
                        (wallet) => wallet.value === valueAccountDropbox
                      )?.label
                    : 'Filter by Account'}
                  <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-[23ch] p-0'>
                <Command>
                  <CommandList>
                    <CommandEmpty>No account found.</CommandEmpty>
                    <CommandGroup>
                      {accounts.map((account) => (
                        <CommandItem
                          className='text-xs'
                          key={account.value}
                          value={account.value}
                          onSelect={(currentValue) => {
                            setValueAccountDropbox(
                              currentValue === valueAccountDropbox
                                ? ''
                                : currentValue
                            );
                            table
                              .getColumn('account')
                              ?.setFilterValue(currentValue);
                            setOpenAccountDropbox(false);
                          }}
                        >
                          <Check
                            className={cn(
                              'mr-2 h-4 w-4',
                              valueAccountDropbox === account.value
                                ? 'opacity-100'
                                : 'opacity-0'
                            )}
                          />
                          {account.label}
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
                  className='sm:ml-4 w-[20ch] justify-between font-normal text-slate-500'
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
                              ?.setFilterValue(currentValue);
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
                  className='sm:ml-4 w-[20ch] justify-between font-normal text-slate-500'
                >
                  {valueTypeDropbox
                    ? types.find((type) => type.value === valueTypeDropbox)
                        ?.label
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
                              ?.setFilterValue(currentValue);
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

            <Input
              placeholder='Filter by Tag'
              value={(table.getColumn('tag')?.getFilterValue() as string) ?? ''}
              onChange={(e) => {
                table.getColumn('tag')?.setFilterValue(e.target.value);
              }}
              className='max-w-sm w-[20ch] sm:ml-4'
            />
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
                      <p className='text-primary ml-2'>
                        You have 1 notification
                      </p>
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

        <div className='flex items-center px-4 mt-0 mb-8'>
          {!areThereRepeatedAssets && filterIsActive ? (
            <div className='hidden sm:flex items-center h-10 font-normal ml-4 px-4 bg-accent rounded-[2px] text-left'>
              <>
                <div className='flex items-center gap-2 font-semibold'>
                  <p>Total Filtered:</p>
                  {`$ `}
                  {thousandFormatter(totalFilteredAssets)}
                </div>
              </>
            </div>
          ) : null}

          {areThereRepeatedAssets && (
            <div className='flex items-center h-10 font-bold ml-4 px-4 bg-accent rounded-[2px] text-left'>
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

          {inputFilterValue && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <div
                    className='flex items-center justify-center w-[176px] sm:w-11 h-10 ml-4 sm:ml-2 border-2 border-slate-500 bg-accent'
                    onClick={() => {
                      handleClickClearAll();
                    }}
                  >
                    <XIcon size={18} strokeWidth={2.4} />
                    <span className='inline sm:hidden ml-2 font-semibold'>
                      Clear All Filters
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

        {table.getRowModel().rows?.length ? (
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
                {table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                  >
                    {row.getVisibleCells().map((cell) => {
                      const assetValue = (row.original as { asset: string })
                        .asset;
                      return (
                        <TableCell
                          key={cell.id}
                          className={`text-right text-xs text-slate-600 font-light ${
                            inputFilterValue &&
                            inputFilterValue.toLowerCase() ===
                              assetValue.toLowerCase()
                              ? 'bg-accent'
                              : null
                          }`}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        ) : (
          <div className='flex flex-col gap-2 w-full items-center py-24 text-base'>
            <p className='text-5xl'>👻</p>
            <p className='text-2xl font-semibold mb-6'>Oops! Asset Not Found</p>
            <p>We couldn’t find any asset matching that name or symbol.</p>
            <p>
              Double-check your spelling or try searching for something else.
            </p>
          </div>
        )}
      </div>

      <div className='flex justify-center items-center gap-12 text-xs font-light text-white bg-slate-600 p-3 border'>
        <p>
          Cryptos
          <span className='font-semibold text-sm'>
            {` ${assetsByType.Crypto.length} `}
          </span>
          <span className='font-light text-xs'> units</span>
        </p>
        <p>
          Stocks
          <span className='font-semibold text-sm'>
            {` ${assetsByType.Stock.length} `}
          </span>
          <span className='font-light text-xs'> units</span>
        </p>
        <p>
          Cash
          <span className='font-semibold text-sm'>
            {` ${assetsByType.Cash.length} `}
          </span>
          <span className='font-light text-xs'> units</span>
        </p>
      </div>
    </>
  );
}
