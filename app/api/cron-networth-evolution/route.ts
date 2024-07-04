import { addNetWorthEvolution } from '@/lib/actions';
import { fetchAssetsWithPrices } from '@/lib/assets';
import { getAssets } from '@/lib/assets.server';
import { getCurrency } from '@/lib/currency.server';
import { netWorthChartData, UnpricedAsset } from '@/lib/types';

export async function GET() {
  const uid: string = process.env.NEXT_PUBLIC_MY_UID ?? '';

  if (!uid) {
    return Response.json({ message: 'User User ID not provided' });
  }

  try {
    const currencyRates = await getCurrency();
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

    let networthData: netWorthChartData;
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

    const result = await addNetWorthEvolution(networthData);

    return Response.json({ result });
  } catch (error) {
    console.error('ERROR:', error);
    return Response.json({ error: 'Internal Server Error' });
  }
}
