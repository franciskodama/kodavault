import { addNetWorthEvolution, getUids } from '@/lib/actions';
import { fetchAssetsWithPrices } from '@/lib/assets';
import { getAssets } from '@/lib/assets.server';
import { getCurrency } from '@/lib/currency.server';
import { netWorthChartData, UnpricedAsset } from '@/lib/types';

export async function GET() {
  try {
    const currencyRates = await getCurrency();
    const uids = await getUids();

    if (!Array.isArray(uids)) {
      return new Response(
        JSON.stringify({ message: 'User IDs call error! 👻' }),
        { status: 500 }
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
            status: 500,
          });
        } else {
          return new Response(
            JSON.stringify({
              error:
                'Unexpected response format from getAssets. Check if it is an array.',
            }),
            { status: 500 }
          );
        }

        const { assets } = await fetchAssetsWithPrices(unpricedAssets);

        const total = assets.reduce(
          (sum: number, item: any) => sum + item.total,
          0
        );
        const btc = assets.find((item: any) => item.asset === 'BTC');

        let networthData: netWorthChartData;
        if (currencyRates.data && btc.price) {
          networthData = {
            uid,
            usdTotal: total,
            cadTotal: total * currencyRates.data.CAD,
            brlTotal: total * currencyRates.data.BRL,
            btcTotal: total / btc.price,
          };
        } else {
          networthData = {
            uid: uid,
            usdTotal: 0,
            cadTotal: 0,
            brlTotal: 0,
            btcTotal: 0,
          };
        }

        console.log('---  🚀 ---> | networthData:', networthData);
        await addNetWorthEvolution(networthData);
      } catch (error) {
        console.error('Error processing UID:', uid, error);
        return new Response(JSON.stringify({ error: error }), {
          status: 500,
        });
      }
    }

    return new Response(
      JSON.stringify({ message: 'Cron job executed successfully' }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in GET handler:', error);
    return new Response(JSON.stringify({ error: error }), {
      status: 500,
    });
  }
}
