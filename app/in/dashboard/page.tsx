import Dashboard from './dashboard';

import { currentUser } from '@clerk/nextjs';

import { getCurrency } from '@/lib/currency.server';
import { fetchAssets, fetchAssetsWithPrices } from '@/lib/assets';
import { ChartData } from '@/lib/types';
import { addNetWorthEvolution, getNetWorthEvolution } from '@/lib/actions';

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

  let chartData: ChartData | null = null;
  if (uid && currencyRates.data && btcPrice) {
    chartData = {
      uid,
      usdTotal: total,
      cadTotal: total * currencyRates.data.CAD,
      brlTotal: total * currencyRates.data.BRL,
      btcTotal: total / btcPrice,
    };
    await addNetWorthEvolution(chartData);
  }

  const netWorthEvolutionArray = await getNetWorthEvolution(uid ? uid : '');
  console.log('---  🚀 ---> | netWorthEvolutionArray:', netWorthEvolutionArray);

  return (
    <>
      {currencyRates && assets && assetsByType && (
        <Dashboard
          currencyRates={currencyRates}
          assets={assets}
          assetsByType={assetsByType}
          btcPrice={btcPrice}
          // chartData={netWorthEvolutionArray}
        />
      )}
    </>
  );
}
