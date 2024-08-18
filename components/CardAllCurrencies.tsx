'use client';

import { Asset, Currencies, totalArrayProps } from '@/lib/types';
import { numberFormatter, numberFormatterNoDecimals } from '../lib/utils';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../components/ui/card';

export const CardTotalAllCurrency = ({
  currencyRates,
  assets,
  description = '',
}: {
  currencyRates: Currencies;
  assets: Asset[];
  description?: string;
}) => {
  const total = assets.reduce((sum: number, item: any) => sum + item.total, 0);
  const btc = assets.find((item: any) => item.asset === 'BTC');

  let totalArray: totalArrayProps[] = [];
  if (currencyRates.data && btc?.price) {
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
        value: total * currencyRates.data.BRL,
        emoji: '🇧🇷',
      },
      {
        currency: 'BTC',
        value: total / btc.price,
        emoji: '🥇',
      },
    ];
  }

  return (
    <Card className='bg-slate-600 mb-2'>
      <div className='flex flex-col justify-between'>
        <div className='flex flex-col'>
          <CardHeader>
            <CardTitle className='capitalize flex justify-between text-white mb-3'>
              <span>{`Total Vault`}</span>
            </CardTitle>
            <CardDescription className='text-white text-xs'>
              {description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='flex flex-col gap-2 '>
              {totalArray.map((item: totalArrayProps) => (
                <div
                  key={item.value}
                  className='flex items-center justify-between px-4 bg-slate-500 rounded-[2px] text-white'
                >
                  <h3 className=' text-lg font-extralight'>{item.currency}</h3>
                  <div className='flex items-center'>
                    <p className='w-[8ch] text-right mr-4'>{`${
                      item.currency === 'BTC'
                        ? numberFormatter.format(item.value)
                        : numberFormatterNoDecimals.format(item.value)
                    }`}</p>
                    <span className='text-5xl'>{item.emoji}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </div>
      </div>
    </Card>
  );
};
