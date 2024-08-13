import { signal } from '@preact/signals-react';

import Dashboard from './dashboard';

import { getCurrency } from '@/lib/currency.server';
import { fetchAssets, fetchAssetsWithPrices } from '@/lib/assets';
import { netWorthChartData, CurrencyData } from '@/lib/types';
import { getNetWorthEvolution, getUids } from '@/lib/actions';
import { currentUser } from '@clerk/nextjs/server';
import { Loading } from '@/components/Loading';
import {
  fetchQuotesForCryptos,
  getAllTimeHighData,
  getGlobalData,
} from '@/lib/crypto.server';

export const currencyRates = signal<CurrencyData | null>(null);
export const btcPrice = signal<number | null>(null);

export const fetchCurrency = async () => {
  try {
    const result = await getCurrency();
    currencyRates.value = result;
  } catch (error) {
    console.error('Error loading currency:', error);
  }
};
fetchCurrency();

export const fetchBtcPrice = async () => {
  try {
    const result = await fetchQuotesForCryptos('BTC');
    btcPrice.value = result.data.quotes.USD.price;
    console.log('---  🚀 ---> | btcPrice:', btcPrice.value);
  } catch (error) {
    console.error('Error loading currency:', error);
  }
};
fetchBtcPrice();

export default async function DashboardPage() {
  const user = await currentUser();
  const uid = user?.emailAddresses?.[0]?.emailAddress;

  const unpricedAssets = await fetchAssets(uid ? uid : '');
  const { assets, assetsByType } = await fetchAssetsWithPrices(unpricedAssets);

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
      {currencyRates.value && btcPrice.value ? (
        assets &&
        assetsByType &&
        uid && (
          <Dashboard
            currencyRates={currencyRates.value}
            btcPrice={btcPrice.value}
            assets={assets}
            assetsByType={assetsByType}
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

// =============== FOR TESTING ===============
// const quotes = await fetchQuotesForCryptos('BTC');
// console.log('---  🚀 ---> | quotes:', quotes.data['BTC'][0].tags);

// const globalData = await getGlobalData();
// console.log('---  🚀 ---> | globalData:', globalData);

// const athAssets = getAllTimeHighData();
// console.log('---  🚀 ---> | athAssets:', athAssets);

// ==========================================

// const btcPrice = signal(
//   Number(assetsByType.Crypto.find((item: any) => item.asset === 'BTC')?.price)
// );
