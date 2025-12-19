import { currentUser } from '@clerk/nextjs/server';

import { fetchAssetsWithoutPrices, fetchAssetsWithPrices } from '@/lib/assets';
import { getGoal, getKeyAssets, getNetWorthEvolution } from '@/lib/actions';
import { getCurrencies, getCurrenciesFromApi } from '@/lib/currency.server';
import { Loading } from '@/components/Loading';
import Dashboard from './dashboard/dashboard';

import { fetchQuotesForCryptos } from '@/lib/crypto.server';
import { KeyAsset } from '@prisma/client';
import { KeyAssetsPriced } from '@/lib/types';

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

  // ============ IN CASE WE NEED IN THE FUTURE ============
  // BRL:
  // const currencyRatesFromApi = await getCurrenciesFromApi();
  // const usdBrl = currencyRatesFromApi?.data.BRL || 0;
  // ==========================================

  // USD + CAD + BRL
  const currencyRates = await getCurrencies();
  const usdBrl = currencyRates.data?.BRL || 0;

  const unpricedAssets = await fetchAssetsWithoutPrices(uid ? uid : '');
  const { assets, assetsByType } = await fetchAssetsWithPrices(unpricedAssets);

  const fechedBtcPrice = await fetchQuotesForCryptos('BTC');
  const btcPrice = fechedBtcPrice.data.BTC[0].quote.USD.price;

  const netWorthChartData = await getNetWorthEvolution(uid ? uid : '');
  const goal = await getGoal(uid ? uid : '');
  const keyAsset: KeyAsset[] = await getKeyAssets(uid ? uid : '');

  const keyAssetsPriced: KeyAssetsPriced[] = keyAsset.map((keyAsset) => {
    const assetFound = assets.find((item) => item?.asset === keyAsset.asset);

    return {
      ...keyAsset,
      price: assetFound?.price ?? 0,
      total: assetFound?.total ?? 0,
    };
  });

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
            keyAssetsPriced={keyAssetsPriced}
          />
        )
      ) : (
        <Loading />
      )}
    </>
  );
}
