'use client';

import { Asset, Currencies, totalArrayProps } from '@/lib/types';
import { numberFormatter, numberFormatterNoDecimals } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Activity } from 'lucide-react';

export const CardTotalAllCurrency = ({
  btcPrice,
  usdBrl,
  currencyRates,
  assets,
  description = '',
}: {
  btcPrice: number;
  usdBrl: number;
  currencyRates: Currencies;
  assets: Asset[];
  description?: string;
}) => {
  const total = assets.reduce((sum: number, item: any) => {
    const value = Number(item.total);
    isNaN(value) &&
      console.log(
        '🚨🚨🚨 Warning: Invalid value for asset 🚨🚨🚨 (Card All Currencies)',
        item.asset,
        value
      );
    return sum + (isNaN(value) ? 0 : value);
  }, 0);

  let totalArray: totalArrayProps[] = [];
  if (currencyRates.data && btcPrice) {
    totalArray = [
      {
        currency: 'USD',
        value: total,
        emoji: '🇺🇸',
      },
      {
        currency: 'CAD',
        value: total * currencyRates.data.CAD,
        emoji: '🇨🇦',
      },
      {
        currency: 'BRL',
        value: total * usdBrl,
        emoji: '🇧🇷',
      },
      {
        currency: 'BTC',
        value: total / btcPrice,
        emoji: '🥇',
      },
    ];
  }

  return (
    <Card className='mb-2 overflow-hidden border-none shadow-none bg-transparent'>
      <div className='flex flex-col'>
        <div className='flex flex-col'>
          <CardHeader className='px-0'>
            <CardTitle className='text-3xl font-semibold text-slate-900 tracking-tighter flex items-center justify-between'>
              <span>Consolidated Balance</span>
              <Activity size={32} className='text-slate-400' />
            </CardTitle>
          </CardHeader>
          <CardContent className='px-0'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
              {totalArray &&
                totalArray.map((item: totalArrayProps) => (
                  <div
                    key={item.currency}
                    className='flex items-center justify-between p-6 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 group'
                  >
                    <div className='flex flex-col'>
                      <span className='text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1'>
                        {item.currency}
                      </span>
                      <h3 className='text-2xl font-semibold text-slate-900 tracking-tighter'>
                        {item.currency === 'BTC'
                          ? numberFormatter.format(item.value)
                          : numberFormatterNoDecimals.format(item.value)}
                      </h3>
                    </div>
                    <span className='text-4xl group-hover:scale-110 transition-transform duration-500'>
                      {item.emoji}
                    </span>
                  </div>
                ))}
            </div>
          </CardContent>
        </div>
      </div>
    </Card>
  );
};
