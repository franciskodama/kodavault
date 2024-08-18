import { getCurrencies } from '@/lib/currency.server';
import { fetchAssetsWithoutPrices, fetchAssetsWithPrices } from '@/lib/assets';
import { netWorthChartData } from '@/lib/types';
import { getNetWorthEvolution, getUids } from '@/lib/actions';
import { currentUser } from '@clerk/nextjs/server';
import { Loading } from '@/components/Loading';
import {
  fetchQuotesForCryptos,
  getAllTimeHighData,
  getGlobalData,
} from '@/lib/crypto.server';
import Dashboard from './dashboard/dashboard';

export default async function DashboardPage() {
  const user = await currentUser();
  const uid = user?.emailAddresses?.[0]?.emailAddress;

  // =============== FOR TESTING ===============
  // const quotes = await fetchQuotesForCryptos('BTC');
  // console.log('---  🚀 ---> | quotes:', quotes.data['BTC'][0].tags);

  // const globalData = await getGlobalData();
  // console.log('---  🚀 ---> | globalData:', globalData);

  // const athAssets = getAllTimeHighData();
  // console.log('---  🚀 ---> | athAssets:', athAssets);

  // ==========================================

  const currencyRates = await getCurrencies();
  const unpricedAssets = await fetchAssetsWithoutPrices(uid ? uid : '');
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
      {currencyRates ? (
        assets &&
        assetsByType &&
        uid && (
          <Dashboard
            currencyRates={currencyRates}
            assets={assets}
            assetsByType={assetsByType}
            btcPrice={btcPrice}
            netWorthChartData={sortedNetWorthChartData}
            uid={uid}
          />
        )
      ) : (
        <Loading />
      )}
    </>
  );
}
