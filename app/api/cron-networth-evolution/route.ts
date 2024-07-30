import { addNetWorthEvolution, getUids } from '@/lib/actions';
import { fetchAssetsWithPrices } from '@/lib/assets';
import { getAssets } from '@/lib/assets.server';
import { getCurrency } from '@/lib/currency.server';
import { netWorthChartData, UnpricedAsset } from '@/lib/types';

export async function GET() {
  const currencyRates = await getCurrency();
  const uids = await getUids();

  if (!Array.isArray(uids)) {
    return Response.json({ message: 'User IDs call error! 👻' });
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
      return Response.json({ error: error });
    }
  }
  return (
    Response.json({ message: 'Cron job executed successfully' }),
    {
      headers: {
        'Cache-Control':
          'no-store, no-cache, must-revalidate, proxy-revalidate',
        Pragma: 'no-cache',
        Expires: '0',
        'Surrogate-Control': 'no-store',
      },
    }
  );
}

// import { addNetWorthEvolution, getUids } from '@/lib/actions';
// import { fetchAssetsWithPrices } from '@/lib/assets';
// import { getAssets } from '@/lib/assets.server';
// import { getCurrency } from '@/lib/currency.server';
// import { netWorthChartData, UnpricedAsset } from '@/lib/types';

// export async function GET() {
//   const currencyRates = await getCurrency();
//   const uids = await getUids();

//   if (!Array.isArray(uids)) {
//     return Response.json({ message: 'User IDs call error! 👻' });
//   }

//   const results = [];

//   for (const uid of uids) {
//     if (typeof uid !== 'string') {
//       console.error('Invalid UID type:', uid);
//       results.push({ uid, error: 'Invalid UID type' });
//       continue;
//     }

//     try {
//       const rawAssets = await getAssets(uid);

//       let unpricedAssets: UnpricedAsset[] = [];
//       if (Array.isArray(rawAssets)) {
//         unpricedAssets = rawAssets.map((rawAsset: any) => ({
//           ...rawAsset,
//           exchange: rawAsset.exchange ?? '',
//         }));
//       } else if ('error' in rawAssets) {
//         results.push({ uid, error: rawAssets.error });
//       } else {
//         results.push({
//           uid,
//           error:
//             'Unexpected response format from getAssets. Check if it is an array.',
//         });
//         continue;
//       }

//       const { assets } = await fetchAssetsWithPrices(unpricedAssets);

//       const total = assets.reduce(
//         (sum: number, item: any) => sum + item.total,
//         0
//       );
//       const btc = assets.find((item: any) => item.asset === 'BTC');

//       let networthData: netWorthChartData;
//       if (currencyRates.data && btc.price) {
//         networthData = {
//           uid,
//           usdTotal: total,
//           cadTotal: total * currencyRates.data.CAD,
//           brlTotal: total * currencyRates.data.BRL,
//           btcTotal: total / btc.price,
//         };
//       } else {
//         networthData = {
//           uid: uid,
//           usdTotal: 0,
//           cadTotal: 0,
//           brlTotal: 0,
//           btcTotal: 0,
//         };
//       }

//       console.log('---  🚀 ---> | networthData:', networthData);

//       await addNetWorthEvolution(networthData);
//       results.push({ uid, message: 'Processed successfully' });
//     } catch (error) {
//       return Response.json({ error: error });
//     }
//   }
//   return Response.json({ message: 'Cron job executed successfully' });
// }
