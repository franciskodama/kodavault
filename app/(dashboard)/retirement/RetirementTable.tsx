'use client';

import React, { useState, useMemo, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  retirementData,
  inflationMultiplier,
  annualInflationData,
} from '@/lib/data';
import { RetirementData } from '@/lib/types';
import { currencyFormatter, cn } from '@/lib/utils';
import {
  ArrowUpDown,
  Search,
  Filter,
  ShieldCheck,
  TrendingUp,
  Star,
  Info,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface RetirementTableProps {
  netWorthTotal: number;
}

const CONTINENT_COLORS: Record<string, string> = {
  Asia: 'bg-yellow-400',
  Europe: 'bg-blue-500',
  'South America': 'bg-green-500',
  'North America': 'bg-red-500',
  Africa: 'bg-orange-500',
  Oceania: 'bg-purple-500',
  'Europe/Asia': 'bg-cyan-500',
};

interface TableItem extends RetirementData {
  updatedCost: number;
}

export function RetirementTable({ netWorthTotal }: RetirementTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [continentFilter, setContinentFilter] = useState<string>('all');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof TableItem | 'protection';
    direction: 'asc' | 'desc';
  }>({ key: 'updatedCost', direction: 'asc' });

  // Load favorites from local storage
  useEffect(() => {
    const stored = localStorage.getItem('retirement-favorites');
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse favorites');
      }
    }
  }, []);

  const toggleFavorite = (country: string) => {
    const newFavorites = favorites.includes(country)
      ? favorites.filter((f) => f !== country)
      : [...favorites, country];

    setFavorites(newFavorites);
    localStorage.setItem('retirement-favorites', JSON.stringify(newFavorites));
  };

  const continents = useMemo(() => {
    const set = new Set(retirementData.map((d) => d.continent));
    return Array.from(set).sort();
  }, []);

  const handleSort = (key: keyof TableItem | 'protection') => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const filteredAndSortedData = useMemo(() => {
    const items: TableItem[] = retirementData.map((item) => ({
      ...item,
      updatedCost: item.cost * inflationMultiplier,
    }));

    return items
      .filter((item) => {
        const matchesSearch = item.country
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const matchesContinent =
          continentFilter === 'all' || item.continent === continentFilter;
        const matchesFavorite =
          !showFavoritesOnly || favorites.includes(item.country);

        return matchesSearch && matchesContinent && matchesFavorite;
      })
      .sort((a, b) => {
        if (sortConfig.key === 'protection') {
          const aProt = (netWorthTotal / a.updatedCost) * 100;
          const bProt = (netWorthTotal / b.updatedCost) * 100;
          return sortConfig.direction === 'asc' ? aProt - bProt : bProt - aProt;
        }

        if (sortConfig.key === 'updatedCost') {
          return sortConfig.direction === 'asc'
            ? a.updatedCost - b.updatedCost
            : b.updatedCost - a.updatedCost;
        }

        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortConfig.direction === 'asc'
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }

        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return sortConfig.direction === 'asc'
            ? aValue - bValue
            : bValue - aValue;
        }

        return 0;
      });
  }, [
    searchTerm,
    continentFilter,
    showFavoritesOnly,
    favorites,
    sortConfig,
    netWorthTotal,
  ]);

  return (
    <div className='w-full max-w-6xl mx-auto space-y-6'>
      <div className='flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-slate-100'>
        <div className='flex items-center gap-4 flex-1 w-full'>
          <div className='relative flex-1 md:max-w-96'>
            <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400' />
            <Input
              placeholder='Search country...'
              className='pl-10 h-10 bg-slate-50 border-none'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <button
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
            className={cn(
              'h-10 px-4 rounded-lg flex items-center gap-2 font-black uppercase tracking-tighter transition-all text-xs border-2',
              showFavoritesOnly
                ? 'bg-yellow-50 border-yellow-200 text-yellow-600 shadow-inner'
                : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200'
            )}
          >
            <Star
              className={cn(
                'w-4 h-4',
                showFavoritesOnly ? 'fill-yellow-400 text-yellow-500' : ''
              )}
            />
            Favorites ({favorites.length})
          </button>
        </div>

        <div className='flex items-center gap-4 w-full md:w-auto text-xs'>
          <div className='bg-slate-50 px-4 py-2 rounded-lg border border-slate-100 flex items-center gap-3'>
            <span className='font-bold text-slate-400 uppercase tracking-tighter'>
              Current Vault:
            </span>
            <span className='font-black text-slate-900'>
              {currencyFormatter(netWorthTotal)}
            </span>
          </div>

          <div className='flex items-center gap-2 text-sm font-bold text-slate-500 uppercase tracking-tighter ml-4'>
            <Filter className='w-4 h-4' />
            Continent:
          </div>
          <Select value={continentFilter} onValueChange={setContinentFilter}>
            <SelectTrigger className='w-[200px] h-10 bg-slate-50 border-none font-bold uppercase tracking-tighter'>
              <SelectValue placeholder='All Continents' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All Continents</SelectItem>
              {continents.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className='bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden'>
        <div className='overflow-x-auto'>
          <Table>
            <TableHeader className='bg-slate-50'>
              <TableRow className='hover:bg-transparent border-b-2'>
                <TableHead className='w-[60px] font-black uppercase tracking-tighter pl-6'>
                  #
                </TableHead>
                <TableHead className='w-[50px] p-0'></TableHead>
                <TableHead
                  className='cursor-pointer font-black uppercase tracking-tighter text-slate-900 group whitespace-nowrap'
                  onClick={() => handleSort('country')}
                >
                  <div className='flex items-center gap-2'>
                    Country
                    <ArrowUpDown className='w-4 h-4 transition-colors group-hover:text-accent' />
                  </div>
                </TableHead>
                <TableHead
                  className='cursor-pointer font-black uppercase tracking-tighter text-slate-900 group'
                  onClick={() => handleSort('continent')}
                >
                  <div className='flex items-center gap-2'>
                    Continent
                    <ArrowUpDown className='w-4 h-4 transition-colors group-hover:text-accent' />
                  </div>
                </TableHead>
                <TableHead
                  className='text-right cursor-pointer font-black uppercase tracking-tighter text-slate-900 group'
                  onClick={() => handleSort('updatedCost')}
                >
                  <div className='flex items-center justify-end gap-2'>
                    Retirement Cost
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className='w-3 h-3 text-slate-400 cursor-help' />
                        </TooltipTrigger>
                        <TooltipContent className='w-64 p-3 bg-white border shadow-xl'>
                          <p className='text-[10px] font-bold uppercase leading-relaxed text-slate-600'>
                            Original 2022 data adjusted for US inflation:
                            <br />
                            <span className='text-red-500'>
                              +{((inflationMultiplier - 1) * 100).toFixed(1)}%
                              total increase
                            </span>
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <ArrowUpDown className='w-4 h-4 transition-colors group-hover:text-accent' />
                  </div>
                </TableHead>
                <TableHead
                  className='text-right cursor-pointer font-black uppercase tracking-tighter text-slate-900 group pr-6'
                  onClick={() => handleSort('protection')}
                >
                  <div className='flex items-center justify-end gap-2'>
                    Protection Level
                    <ArrowUpDown className='w-4 h-4 transition-colors group-hover:text-accent' />
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedData.map((item, index) => {
                const protection = (netWorthTotal / item.updatedCost) * 100;
                const isFunded = protection >= 100;
                const isFavorite = favorites.includes(item.country);

                return (
                  <TableRow
                    key={item.country}
                    className={cn(
                      'group hover:bg-slate-50/50 transition-colors',
                      isFavorite && 'bg-yellow-50/20'
                    )}
                  >
                    <TableCell className='font-bold text-slate-400 text-xs pl-6'>
                      {index + 1}
                    </TableCell>
                    <TableCell className='p-0'>
                      <button
                        onClick={() => toggleFavorite(item.country)}
                        className='p-2 transition-transform active:scale-90 group-hover:opacity-100 opacity-40'
                      >
                        <Star
                          className={cn(
                            'w-4 h-4',
                            isFavorite
                              ? 'fill-yellow-400 text-yellow-500 opacity-100'
                              : 'text-slate-300'
                          )}
                        />
                      </button>
                    </TableCell>
                    <TableCell className='font-black text-sm uppercase whitespace-nowrap text-slate-800 border-r border-slate-50'>
                      <div className='flex items-center gap-3'>
                        <span className='text-3xl filter drop-shadow-sm select-none grayscale-[0.2] transition-all group-hover:grayscale-0'>
                          {item.flag}
                        </span>
                        <span className='tracking-tighter'>{item.country}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className='flex items-center gap-2'>
                        <div
                          className={cn(
                            'w-2.5 h-2.5 rounded-full shadow-sm',
                            CONTINENT_COLORS[item.continent] || 'bg-slate-300'
                          )}
                        />
                        <span className='text-[10px] font-black text-slate-500 uppercase tracking-tighter'>
                          {item.continent}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className='text-right'>
                      <div className='flex flex-col items-end'>
                        <span
                          className={cn(
                            'text-sm font-black tracking-tighter',
                            item.updatedCost > 500000
                              ? 'text-red-500'
                              : item.updatedCost < 250000
                              ? 'text-green-600'
                              : 'text-slate-900'
                          )}
                        >
                          {currencyFormatter(item.updatedCost)}
                        </span>
                        <span className='text-[9px] font-bold text-slate-400 uppercase tracking-tighter'>
                          (Was {currencyFormatter(item.cost)})
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className='text-right pr-6'>
                      <div className='flex flex-col items-end gap-1'>
                        <span
                          className={cn(
                            'text-[11px] font-black tracking-tighter flex items-center gap-1.5',
                            isFunded
                              ? 'text-green-500'
                              : protection > 50
                              ? 'text-blue-500'
                              : 'text-slate-400'
                          )}
                        >
                          {isFunded ? (
                            <ShieldCheck className='w-3.5 h-3.5' />
                          ) : (
                            <TrendingUp className='w-3.5 h-3.5' />
                          )}
                          {protection.toFixed(1)}%
                        </span>
                        <div className='w-24 h-1 bg-slate-100 rounded-full overflow-hidden'>
                          <div
                            className={cn(
                              'h-full transition-all duration-500',
                              isFunded
                                ? 'bg-green-500'
                                : protection > 50
                                ? 'bg-blue-500'
                                : 'bg-slate-400'
                            )}
                            style={{ width: `${Math.min(protection, 100)}%` }}
                          />
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        {filteredAndSortedData.length === 0 && (
          <div className='p-20 text-center space-y-2'>
            <div className='text-4xl'>🌍</div>
            <p className='text-slate-400 font-bold uppercase tracking-tighter'>
              No countries found matching your criteria
            </p>
          </div>
        )}
      </div>

      <div className='bg-slate-50 border border-slate-100 rounded-xl p-6 mt-8'>
        <h3 className='text-xs font-black uppercase tracking-widest text-[#bd554c] mb-3 flex items-center gap-2'>
          <div className='w-4 h-[2px] bg-[#bd554c]' />
          Methodology & Inflation Update
        </h3>
        <p className='text-[10px] leading-relaxed text-slate-500 font-bold uppercase tracking-tight text-justify'>
          We calculated the cost for an American to comfortably retire in every
          country between the average age of retirement (61 years) and life
          expectancy (76.15 years) using Numbeo&apos;s cost of living data.
          <span className='block mt-2 text-slate-600 italic'>
            Note: The original study was released in 2022. To provide accurate
            modern estimates, we have applied a cumulative US Inflation
            multiplier of
            <span className='text-[#bd554c] font-black'>
              {' '}
              {((inflationMultiplier - 1) * 100).toFixed(1)}%{' '}
            </span>
            based on actual US CPI data (2022: {annualInflationData[2022] * 100}
            %, 2023: {annualInflationData[2023] * 100}%, 2024:{' '}
            {annualInflationData[2024] * 100}%, 2025:{' '}
            {annualInflationData[2025] * 100}%).
          </span>
        </p>
      </div>

      <p className='text-[10px] text-slate-400 font-bold uppercase text-right tracking-widest mt-4'>
        Estimated total savings required for a comfortable retirement (EST.)
      </p>
    </div>
  );
}
