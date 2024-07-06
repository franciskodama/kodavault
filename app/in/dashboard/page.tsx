import Dashboard from './dashboard';

import { getCurrency } from '@/lib/currency.server';
import { fetchAssets, fetchAssetsWithPrices } from '@/lib/assets';
import { netWorthChartData } from '@/lib/types';
import { getNetWorthEvolution } from '@/lib/actions';
import { dateFormatter } from '@/lib/utils';
import { currentUser } from '@clerk/nextjs/server';

export default async function DashboardPage() {
  const user = await currentUser();
  const uid = user?.emailAddresses?.[0]?.emailAddress;

  const currencyRates = await getCurrency();
  const unpricedAssets = await fetchAssets(uid ? uid : '');
  const { assets, assetsByType } = await fetchAssetsWithPrices(unpricedAssets);

  const btcPrice = Number(
    assetsByType.Crypto.find((item: any) => item.asset === 'BTC')?.price
  );

  const rawNetWorthChartData = await getNetWorthEvolution(uid ? uid : '');

  let netWorthChartData: netWorthChartData[] = [];
  if (!('error' in rawNetWorthChartData)) {
    netWorthChartData = rawNetWorthChartData.map((item: any) => ({
      id: item.id,
      created_at: item.created_at,
      uid: item.uid,
      usdTotal: item.usd_total,
      cadTotal: item.cad_total,
      brlTotal: item.brl_total,
      btcTotal: item.btc_total,
    }));
  } else {
    console.error(
      'Error fetching Net Worth Evolution data:',
      rawNetWorthChartData.error
    );
  }
  const sortedNetWorthChartData: netWorthChartData[] = netWorthChartData
    .filter(
      (item): item is netWorthChartData & { created_at: Date } =>
        item.created_at !== undefined
    )
    .sort((a, b) => a.created_at.getTime() - b.created_at.getTime());

  return (
    <>
      {currencyRates && assets && assetsByType && (
        <Dashboard
          currencyRates={currencyRates}
          assets={assets}
          assetsByType={assetsByType}
          btcPrice={btcPrice}
          netWorthChartData={sortedNetWorthChartData}
        />
      )}
    </>
  );
}
