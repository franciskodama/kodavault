import { addNetWorthEvolution, getUids } from '@/lib/actions';
import { fetchAssetsWithPrices } from '@/lib/assets';
import { getAssets } from '@/lib/assets.server';
import { getCurrencies } from '@/lib/currency.server';
import { AddNetWorthChartData, UnpricedAsset } from '@/lib/types';

export async function GET() {
  console.log('Cron job triggered');

  const currencyRates = await getCurrencies();
  const uids = await getUids();

  if (!Array.isArray(uids)) {
    return Response.json({ message: 'User IDs call error! 👻' });
  }

  try {
    await Promise.all(
      uids.map(async (uid: unknown) => {
        if (typeof uid !== 'string') {
          throw new Error('Invalid UID type');
        }
        const rawAssets = await getAssets(uid);

        let unpricedAssets: UnpricedAsset[] = [];
        if (Array.isArray(rawAssets)) {
          unpricedAssets = rawAssets.map((rawAsset: any) => ({
            ...rawAsset,
            exchange: rawAsset.exchange ?? '',
          }));
        } else if ('error' in rawAssets) {
          return Response.json({ error: rawAssets.error });
        } else {
          return Response.json({
            error:
              'Unexpected response format from getAssets. Check if it is an array.',
          });
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
            uid: uid,
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

        await addNetWorthEvolution(networthData);
      })
    );
    return Response.json({ message: 'Cron job executed successfully' });
  } catch (error) {
    return Response.json({ error: error });
  }
}
