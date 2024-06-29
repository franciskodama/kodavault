import { Asset, CurrencyData, totalArrayProps } from '@/lib/types';
import ChartClient from './chart';

export default function Chart({
  assets,
  currencyRates,
}: {
  assets: Asset[];
  currencyRates: CurrencyData;
}) {
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

  const formattedDate = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
  }).format(created_at);

  const data = [
    {
      created_at: formattedDate,
      usdTotal: usdTotal,
      cadTotal: cadTotal,
      brlTotal: brlTotal,
      btcTotal: btcTotal,
    },
  ];

  return (
    <>
      <div className='mx-auto'>
        <ChartClient data={data} />
      </div>
    </>
  );
}
