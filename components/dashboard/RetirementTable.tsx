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
import { retirementData } from '@/lib/data';
import { RetirementData } from '@/lib/types';
import { currencyFormatter, cn } from '@/lib/utils';
import {
  ArrowUpDown,
  Search,
  Filter,
  ShieldCheck,
  TrendingUp,
  Star,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

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

export function RetirementTable({ netWorthTotal }: RetirementTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [continentFilter, setContinentFilter] = useState<string>('all');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof RetirementData | 'protection';
    direction: 'asc' | 'desc';
  }>({ key: 'cost', direction: 'asc' });

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

  // Save favorites to local storage
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

  const handleSort = (key: keyof RetirementData | 'protection') => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const filteredAndSortedData = useMemo(() => {
    return retirementData
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
          const aProt = (netWorthTotal / a.cost) * 100;
          const bProt = (netWorthTotal / b.cost) * 100;
          return sortConfig.direction === 'asc' ? aProt - bProt : bProt - aProt;
        }

        const aValue = a[sortConfig.key as keyof RetirementData];
        const bValue = b[sortConfig.key as keyof RetirementData];

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
                  onClick={() => handleSort('cost')}
                >
                  <div className='flex items-center justify-end gap-2'>
                    Retirement Cost
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
                const protection = (netWorthTotal / item.cost) * 100;
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
                    <TableCell className='font-black text-sm uppercase whitespace-nowrap text-slate-800'>
                      {item.country}
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
                      <span
                        className={cn(
                          'text-sm font-black tracking-tighter',
                          item.cost > 500000
                            ? 'text-red-500'
                            : item.cost < 250000
                            ? 'text-green-600'
                            : 'text-slate-900'
                        )}
                      >
                        {currencyFormatter(item.cost)}
                      </span>
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
          Methodology
        </h3>
        <p className='text-[10px] leading-relaxed text-slate-500 font-bold uppercase tracking-tight text-justify'>
          We calculated the cost for an American to comfortably retire in every
          country between the average age of retirement (61 years) and life
          expectancy (76.15 years) using Numbeo&apos;s cost of living data. For
          each country, we calculated the average value from all of its cities.
          We excluded countries where the only city with entries was the
          capital, inflating cost-of-living prices compared to countries with a
          wide spread of data, excluding countries where a capital city has
          overinflated prices.
        </p>
      </div>

      <p className='text-[10px] text-slate-400 font-bold uppercase text-right tracking-widest mt-4'>
        Estimated total savings required for a comfortable retirement (EST.)
      </p>
    </div>
  );
}
