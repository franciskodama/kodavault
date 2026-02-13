'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Asset } from '@/lib/types';
import { useMemo } from 'react';
import { Progress } from '@/components/ui/progress';

import Image from 'next/image';

// We need the market data type here
type AllCryptosData = {
  symbol: string;
  ath: number;
  current_price: number;
  image?: string;
};

export const CardAthDrawdown = ({
  userAssets,
  allCryptosData,
}: {
  userAssets: Asset[];
  allCryptosData: AllCryptosData[] | undefined;
}) => {
  const opportunities = useMemo(() => {
    if (!allCryptosData || userAssets.length === 0) return [];

    // 1. Map user assets to their market data
    const enriched = userAssets
      .filter((asset) => asset && asset.type === 'Crypto')
      .map((asset) => {
        // Find matching market data (case insensitive)
        const marketData = allCryptosData.find(
          (c) => c.symbol.toLowerCase() === asset?.asset?.toLowerCase()
        );

        if (!marketData || !marketData.ath || !marketData.current_price)
          return null;

        const drawdown =
          ((marketData.ath - marketData.current_price) / marketData.ath) * 100;

        // Only interested if it's below ATH (positive drawdown)
        if (drawdown < 0) return null;

        return {
          symbol: asset?.asset || '',
          price: marketData.current_price,
          ath: marketData.ath,
          drawdown: drawdown, // Percentage down from ATH
          image: marketData.image,
        };
      })
      .filter((item) => item !== null) as {
      symbol: string;
      price: number;
      ath: number;
      drawdown: number;
      image?: string;
    }[];

    // 2. Sort by biggest discount (highest drawdown)
    return enriched.sort((a, b) => b.drawdown - a.drawdown).slice(0, 4); // Top 4
  }, [userAssets, allCryptosData]);

  if (!opportunities.length) {
    return (
      <Card className='h-full'>
        <CardHeader>
          <CardTitle className='flex items-center justify-between'>
            <span>Discount Radar</span>
            <span className='text-3xl'>🏷️</span>
          </CardTitle>
          <CardDescription>
            Top assets trading below All-Time High
          </CardDescription>
        </CardHeader>
        <CardContent className='flex items-center justify-center h-[200px] text-slate-400 text-sm italic'>
          No drawdown data available.
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className='h-full'>
      <CardHeader>
        <CardTitle className='flex items-center justify-between'>
          <span>Discount Radar</span>
          <span className='text-3xl'>🏷️</span>
        </CardTitle>
        <CardDescription>
          Biggest potential upside to reclaim ATH.
        </CardDescription>
      </CardHeader>
      <CardContent className='flex flex-col gap-4'>
        {opportunities.map((item) => (
          <div key={item.symbol} className='space-y-1'>
            <div className='flex justify-between items-center text-sm'>
              <div className='flex items-center gap-2 font-medium'>
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.symbol}
                    width={20}
                    height={20}
                    className='rounded-full'
                  />
                )}
                <span>{item.symbol.toUpperCase()}</span>
              </div>
              <div className='flex items-center gap-2'>
                <span className='text-xs text-slate-500'>
                  ${item.price.toLocaleString()} / ${item.ath.toLocaleString()}
                </span>
                <span className='font-bold text-green-600'>
                  -{item.drawdown.toFixed(1)}%
                </span>
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <Progress
                value={100 - item.drawdown}
                className='h-2 bg-slate-100 [&>div]:bg-slate-300'
              />
            </div>
            {/* Visualizing the gap */}
            <div className='flex justify-between text-[10px] text-slate-400'>
              <span>Low</span>
              <span>ATH</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
