import { currencyRates } from '@/app/lib/prices';
import { Asset } from '@/app/lib/types';
import { numberFormatterNoDecimals } from '@/app/lib/utils';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export const CardTotalAllCurrency = ({
  assets,
  description = '',
}: {
  assets: Asset[];
  description?: string;
}) => {
  const total = assets.reduce((sum: number, item: any) => sum + item.total, 0);

  const currencyRates = {
    quotes: {
      USDCAD: 1.38,
      USDBRL: 4.91,
    },
  };

  const totalArray = [
    {
      currency: 'USD',
      value: total,
      emoji: '🇺🇸',
    },
    {
      currency: 'CAD',
      value: total * currencyRates.quotes.USDCAD,
      emoji: '🇨🇦',
    },
    {
      currency: 'BRL',
      value: total * currencyRates.quotes.USDBRL,
      emoji: '🇧🇷',
    },
  ];

  return (
    <Card className='w-[22.5em]  bg-slate-600'>
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
              {totalArray.map((item) => (
                <div
                  key={item.value}
                  className='flex items-center justify-between px-4 bg-slate-500 rounded-[2px] text-white'
                >
                  <h3 className=' text-lg font-extralight'>{item.currency}</h3>
                  <div className='flex items-center'>
                    <p className='w-[8ch] text-right mr-4'>{`${numberFormatterNoDecimals.format(
                      item.value
                    )}`}</p>
                    <span className='text-5xl'>{item.emoji}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </div>
        {/* <CardFooter className='flex justify-between text-sm text-slate-500 font-medium bg-slate-50 m-1 p-2'></CardFooter> */}
      </div>
    </Card>
  );
};
