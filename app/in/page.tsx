import { currentUser } from '@clerk/nextjs/server';

import { fetchAssetsWithoutPrices, fetchAssetsWithPrices } from '@/lib/assets';
import { getGoal, getNetWorthEvolution } from '@/lib/actions';
import { getCurrencies, getCurrenciesFromApi } from '@/lib/currency.server';
import { Loading } from '@/components/Loading';
import Dashboard from './dashboard/dashboard';

import { fetchQuotesForCryptos } from '@/lib/crypto.server';

export default async function DashboardPage() {
  const user = await currentUser();
  const uid = user?.emailAddresses?.[0]?.emailAddress;
  const userName = user?.firstName;

  // =============== FOR TESTING ===============
  // const quotes = await fetchQuotesForCryptos('BTC');
  // console.log('---  🚀 ---> | quotes:', quotes.data['BTC'][0].tags);

  // const globalData = await getGlobalData();
  // console.log('---  🚀 ---> | globalData:', globalData);

  // ==========================================

  // BRL:
  const currencyRatesFromApi = await getCurrenciesFromApi();
  const usdBrl = currencyRatesFromApi?.data.BRL || 0;

  // USD + CAD
  const currencyRates = await getCurrencies();

  const unpricedAssets = await fetchAssetsWithoutPrices(uid ? uid : '');
  const { assets, assetsByType } = await fetchAssetsWithPrices(unpricedAssets);

  const fechedBtcPrice = await fetchQuotesForCryptos('BTC');
  const btcPrice = fechedBtcPrice.data.BTC[0].quote.USD.price;

  const netWorthChartData = await getNetWorthEvolution(uid ? uid : '');
  const goal = await getGoal(uid ? uid : '');

  return (
    <>
      {currencyRates ? (
        assets &&
        assetsByType &&
        uid &&
        userName &&
        netWorthChartData && (
          <Dashboard
            usdBrl={usdBrl}
            currencyRates={currencyRates}
            assets={assets}
            assetsByType={assetsByType}
            btcPrice={btcPrice}
            netWorthChartData={netWorthChartData}
            uid={uid}
            userName={userName}
            goal={goal[0]?.goal ? goal[0].goal : 0}
          />
        )
      ) : (
        <Loading />
      )}
    </>
  );
}
