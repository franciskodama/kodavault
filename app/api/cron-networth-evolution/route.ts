import type { NextRequest } from 'next/server';
import { addNetWorthEvolution, getUids } from '@/lib/actions';
import { fetchAssetsWithPrices } from '@/lib/assets';
import { getAssets } from '@/lib/assets.server';
import { getCurrencies, getCurrenciesFromApi } from '@/lib/currency.server';
import { AddNetWorthChartData, UnpricedAsset } from '@/lib/types';

export async function GET() {
  // https://vercel.com/docs/cron-jobs/manage-cron-jobs
  // const authHeader = request.headers.get('authorization');
  // if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
  //   return new Response('Unauthorized', {
  //     status: 401,
  //   });
  // }

  const currencyRates = await getCurrencies();
  const currencyRatesFromApi = await getCurrenciesFromApi();
  const usdBrl = currencyRatesFromApi?.data.BRL || 0;
  const uids = await getUids();

  if (!Array.isArray(uids)) {
    return new Response(
      JSON.stringify({ message: 'User IDs call error! 👻' }),
      {
        headers: {
          'Cache-Control': 'no-store',
        },
      }
    );
  }

  for (const uid of uids) {
    if (typeof uid !== 'string') {
      console.error('Invalid UID type:', uid);
      continue;
    }

    try {
      const rawAssets = await getAssets(uid);

      let unpricedAssets: UnpricedAsset[] = [];
      if (Array.isArray(rawAssets)) {
        unpricedAssets = rawAssets.map((rawAsset: any) => ({
          ...rawAsset,
          exchange: rawAsset.exchange ?? '',
        }));
      } else if ('error' in rawAssets) {
        return new Response(JSON.stringify({ error: rawAssets.error }), {
          headers: {
            'Cache-Control': 'no-store',
          },
        });
      } else {
        return new Response(
          JSON.stringify({
            error:
              'Unexpected response format from getAssets. Check if it is an array.',
          }),
          {
            headers: {
              'Cache-Control': 'no-store',
            },
          }
        );
      }

      const { assets } = await fetchAssetsWithPrices(unpricedAssets);

      const total = assets.reduce(
        (sum: number, item: any) => sum + item.total,
        0
      );
      const btc = assets.find((item: any) => item.asset === 'BTC');

      let networthData: AddNetWorthChartData;
      if (currencyRates.data && btc.price) {
        networthData = {
          uid,
          usd: total,
          cad: total * currencyRates.data.CAD,
          brl: total * usdBrl,
          btc: total / btc.price,
        };
      } else {
        networthData = {
          uid: uid,
          usd: 0,
          cad: 0,
          brl: 0,
          btc: 0,
        };
      }

      await addNetWorthEvolution(networthData);
    } catch (error) {
      return new Response(JSON.stringify({ error: error }), {
        headers: {
          'Cache-Control': 'no-store',
        },
      });
    }
  }

  return new Response(
    JSON.stringify({ message: 'Cron job executed successfully' }),
    {
      headers: {
        'Cache-Control': 'no-store',
      },
    }
  );
}
