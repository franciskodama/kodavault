import Dashboard from './dashboard';

import { currentUser } from '@clerk/nextjs';

import { getCurrency } from '@/lib/currency.server';
import { fetchAssets, fetchAssetsWithPrices } from '@/lib/assets';
import { Asset, AssetsByType, ChartData } from '@/lib/types';
import { addNetWorthEvolution } from '@/lib/actions';

export default async function DashboardPage() {
  const user = await currentUser();
  const uid = user?.emailAddresses?.[0]?.emailAddress;

  const currencyRates = await getCurrency();
  const unpricedAssets = await fetchAssets(uid ? uid : '');
  const { assets, assetsByType } = await fetchAssetsWithPrices(unpricedAssets);

  const total = assets.reduce((sum: number, item: any) => sum + item.total, 0);
  const btcPrice = Number(
    assetsByType.Crypto.find((item: any) => item.asset === 'BTC')?.price
  );

  let chartData: ChartData[] = [];
  if (currencyRates.data && btcPrice) {
    chartData = [
      {
        uid,
        usdTotal: total,
        cadTotal: total * currencyRates.data.CAD,
        brlTotal: total * currencyRates.data.BRL,
        btcTotal: total / btcPrice,
      },
    ];
  }

  const result = await addNetWorthEvolution({ chartData });
  console.log('---  🚀 ---> | result:', result);

  return (
    <>
      {currencyRates && assets && assetsByType && (
        <Dashboard
          currencyRates={currencyRates}
          assets={assets}
          assetsByType={assetsByType}
          btcPrice={btcPrice}
        />
      )}
    </>
  );
}
