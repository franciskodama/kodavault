import { fetchAssetsWithPrices } from '@/lib/assets';
import { getAssets } from '@/lib/assets.server';
import { getCurrency } from '@/lib/currency.server';
import { UnpricedAsset } from '@/lib/types';
import { NextApiRequest, NextApiResponse } from 'next';

export async function GET() {
  // req: NextApiRequest,
  // res: NextApiResponse
  // if (req.method !== 'GET') {
  //   return res.status(405).json({ message: 'Method not allowed' });
  // }
  // const uid: string | undefined = process.env.NEXT_PUBLIC_MY_UID;

  // if (!uid) {
  //   return res.status(400).json({ message: 'User ID not provided' });
  // }

  // try {
  //   const currency = await getCurrency();
  //   let unpricedAssets: UnpricedAsset[] = [];

  //   const assets = await getAssets(uid);
  //   if (Array.isArray(assets)) {
  //     unpricedAssets = assets.map((asset: any) => ({
  //       ...asset,
  //       exchange: asset.exchange ?? '',
  //     }));
  //   } else if ('error' in assets) {
  //     return res.status(500).json({ error: assets.error });
  //   } else {
  //     return res
  //       .status(500)
  //       .json({ error: 'Unexpected response format from getAssets' });
  //   }

  //   const result = await fetchAssetsWithPrices(unpricedAssets);
  const test = 'Hello World!';

  return Response.json({ test });
  // } catch (error) {
  //   console.error('ERROR:', error);
  //   return res.json({ error: 'Internal Server Error' });
  // }
}
