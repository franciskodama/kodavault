import { currentUser } from '@clerk/nextjs/server';

import { fetchAssetsWithoutPrices, fetchAssetsWithPrices } from '@/lib/assets';
import { getNetWorthEvolution, getUids } from '@/lib/actions';
import { getCurrencies } from '@/lib/currency.server';
import { Loading } from '@/components/Loading';
import Dashboard from './dashboard/dashboard';

import {
  fetchQuotesForCryptos,
  getAllTimeHighData,
  getGlobalData,
} from '@/lib/crypto.server';

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

  const netWorthChartData = await getNetWorthEvolution(uid ? uid : '');

  return (
    <>
      {currencyRates ? (
        assets &&
        assetsByType &&
        uid &&
        netWorthChartData && (
          <Dashboard
            currencyRates={currencyRates}
            assets={assets}
            assetsByType={assetsByType}
            btcPrice={btcPrice}
            netWorthChartData={netWorthChartData}
            uid={uid}
          />
        )
      ) : (
        <Loading />
      )}
    </>
  );
}
