/* eslint-disable @next/next/no-img-element */
'use client';

import { useState, useEffect } from 'react';
import { RadarCoin, fetchRadarData } from './actions';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ArrowUpDown, RefreshCw } from 'lucide-react';

type SortConfig = {
  key: keyof RadarCoin;
  direction: 'asc' | 'desc';
} | null;

export default function RadarTable({
  initialData,
}: {
  initialData: RadarCoin[];
}) {
  const [data, setData] = useState<RadarCoin[]>(initialData);
  const [loading, setLoading] = useState(false);
  const [sortConfig, setSortConfig] = useState<SortConfig>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    setLastUpdated(new Date());
  }, []);

  const handleRefresh = async () => {
    setLoading(true);
    try {
      const newData = await fetchRadarData();
      setData(newData);
      setLastUpdated(new Date());
    } catch (err) {
      console.error('Failed to fetch radar data', err);
    } finally {
      setLoading(false);
    }
  };

  const sortData = (key: keyof RadarCoin) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'asc'
    ) {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig) return 0;
    const { key, direction } = sortConfig;

    // Convert to numbers for safe sorting, assuming all relevant fields are numeric or strings
    const aVal = a[key];
    const bVal = b[key];

    if (aVal < bVal) return direction === 'asc' ? -1 : 1;
    if (aVal > bVal) return direction === 'asc' ? 1 : -1;
    return 0;
  });

  const formatPercentage = (num: number) => {
    const isPositive = num >= 0;
    return (
      <span className={isPositive ? 'text-green-500' : 'text-red-500'}>
        {isPositive ? '+' : ''}
        {num.toFixed(2)}%
      </span>
    );
  };

  const formatFundingRate = (num: number) => {
    const isPositive = num >= 0;
    return (
      <span className={isPositive ? 'text-green-500' : 'text-red-500'}>
        {isPositive ? '+' : ''}
        {(num * 100).toFixed(4)}%
      </span>
    );
  };

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex justify-between items-end'>
        <p className='text-muted-foreground text-sm flex-1'>
          Showing Top {data.length} USDT Perpetual Contracts by 24h Volume
        </p>
        <div className='flex items-end gap-8'>
          {lastUpdated && (
            <div className='flex flex-col items-end text-xs text-muted-foreground'>
              <p>Last updated:</p>
              <p>{lastUpdated.toLocaleString()}</p>
            </div>
          )}
          <Button onClick={handleRefresh} disabled={loading} className='gap-2'>
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                className='cursor-pointer'
                onClick={() => sortData('symbol')}
              >
                Symbol <ArrowUpDown className='inline w-3 h-3 ml-1' />
              </TableHead>
              <TableHead
                className='cursor-pointer text-right'
                onClick={() => sortData('price')}
              >
                Price <ArrowUpDown className='inline w-3 h-3 ml-1' />
              </TableHead>
              <TableHead
                className='cursor-pointer text-right'
                onClick={() => sortData('priceChg1h')}
              >
                Price 24h <ArrowUpDown className='inline w-3 h-3 ml-1' />
              </TableHead>
              <TableHead
                className='cursor-pointer text-right'
                onClick={() => sortData('quoteVolume')}
              >
                Volume ($) <ArrowUpDown className='inline w-3 h-3 ml-1' />
              </TableHead>
              <TableHead
                className='cursor-pointer text-right'
                onClick={() => sortData('openInterest')}
              >
                OI ($) <ArrowUpDown className='inline w-3 h-3 ml-1' />
              </TableHead>
              <TableHead
                className='cursor-pointer text-right'
                onClick={() => sortData('openInterestChg1h')}
              >
                OI Chg (1h) <ArrowUpDown className='inline w-3 h-3 ml-1' />
              </TableHead>
              <TableHead
                className='cursor-pointer text-right'
                onClick={() => sortData('longShortRatio')}
              >
                LSR <ArrowUpDown className='inline w-3 h-3 ml-1' />
              </TableHead>
              <TableHead
                className='cursor-pointer text-right'
                onClick={() => sortData('longShortRatioChg1h')}
              >
                LSR Chg (1h) <ArrowUpDown className='inline w-3 h-3 ml-1' />
              </TableHead>
              <TableHead
                className='cursor-pointer text-right'
                onClick={() => sortData('fundingRate')}
              >
                Funding Rate <ArrowUpDown className='inline w-3 h-3 ml-1' />
              </TableHead>
              <TableHead className='w-[80px]'></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.map((coin) => (
              <TableRow key={coin.symbol}>
                <TableCell className='font-bold'>
                  {coin.symbol.replace('USDT', '')}
                </TableCell>
                <TableCell className='text-right'>
                  $
                  {coin.price < 0.1
                    ? coin.price.toFixed(4)
                    : coin.price.toFixed(2)}
                </TableCell>
                <TableCell className='text-right'>
                  {formatPercentage(coin.priceChg1h)}
                </TableCell>
                <TableCell className='text-right'>
                  ${(coin.quoteVolume / 1000000).toFixed(1)}M
                </TableCell>
                <TableCell className='text-right'>
                  ${(coin.openInterest / 1000000).toFixed(1)}M
                </TableCell>
                <TableCell className='text-right'>
                  {formatPercentage(coin.openInterestChg1h)}
                </TableCell>
                <TableCell className='text-right'>
                  {coin.longShortRatio.toFixed(2)}
                </TableCell>
                <TableCell className='text-right'>
                  {formatPercentage(coin.longShortRatioChg1h)}
                </TableCell>
                <TableCell className='text-right'>
                  {formatFundingRate(coin.fundingRate)}
                </TableCell>
                <TableCell>
                  <div className='flex items-center justify-end gap-2'>
                    <a
                      href={`https://www.tradingview.com/chart/?symbol=BYBIT:${coin.symbol}.P`}
                      target='_blank'
                      rel='noreferrer'
                      title={`Open ${coin.symbol} on TradingView (Bybit)`}
                      className='opacity-70 hover:opacity-100 transition-opacity'
                    >
                      <img
                        src='https://www.tradingview.com/favicon.ico'
                        alt='TradingView'
                        className='w-5 h-5 rounded-full'
                      />
                    </a>
                    <a
                      href={`https://coinalyze.net/${
                        coin.coingeckoId
                      }/usdt/binance/${coin.symbol.toLowerCase()}_perp/price-chart-live/`}
                      target='_blank'
                      rel='noreferrer'
                      title={`Open ${coin.symbol} on Coinalyze`}
                      className='opacity-70 hover:opacity-100 transition-opacity'
                    >
                      <img
                        src='https://coinalyze.net/favicon.ico'
                        alt='Coinalyze'
                        className='w-5 h-5 rounded-full'
                      />
                    </a>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {sortedData.length === 0 && (
              <TableRow>
                <TableCell colSpan={10} className='text-center py-6'>
                  No data available. Click Refresh to fetch.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
