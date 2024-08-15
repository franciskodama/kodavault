import { currentUser } from '@clerk/nextjs/server';
import Dashboard from './dashboard';
import { Loading } from '@/components/Loading';
import { netWorthChartData } from '@/lib/types';
import { getNetWorthEvolution } from '@/lib/actions';

import {
  assetsSignal,
  btcPrice,
  currencyRates,
  fetchBtcPrice,
  fetchAssets,
  fetchCurrencies,
} from '@/context/signals';

fetchBtcPrice();
fetchCurrencies();

export default async function DashboardPage() {
  try {
    const user = await currentUser();
    const uid = user?.emailAddresses?.[0]?.emailAddress;

    if (uid) {
      await fetchAssets(uid);
    }

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

    // Wait for signals to be ready
    if (assetsSignal.value && btcPrice.value && currencyRates.value && uid) {
      return (
        <Dashboard
          currencyRates={currencyRates.value}
          btcPrice={btcPrice.value}
          assets={assetsSignal.value?.assets}
          assetsByType={assetsSignal.value?.assetsByType}
          netWorthChartData={sortedNetWorthChartData}
          uid={uid}
        />
      );
    } else {
      return <Loading />;
    }
  } catch (error) {
    console.error('Error loading DashboardPage:', error);
    return <Loading />;
  }
}

// import { currentUser } from '@clerk/nextjs/server';

// import Dashboard from './dashboard';
// import { Loading } from '@/components/Loading';
// import { netWorthChartData } from '@/lib/types';
// import { getNetWorthEvolution } from '@/lib/actions';

// import {
//   assetsSignal,
//   btcPrice,
//   currencyRates,
//   fetchBtcPrice,
//   fetchAssets,
//   fetchCurrencies,
// } from '@/context/signals';

// fetchBtcPrice();
// fetchCurrencies();

// export default async function DashboardPage() {
//   const user = await currentUser();
//   const uid = user?.emailAddresses?.[0]?.emailAddress;

//   if (uid) {
//     await fetchAssets(uid);
//   }

//   const rawNetWorthChartData = await getNetWorthEvolution(uid ? uid : '');

//   let netWorthChartData: netWorthChartData[] = [];
//   if (!('error' in rawNetWorthChartData)) {
//     netWorthChartData = rawNetWorthChartData.map((item: any) => ({
//       id: item.id,
//       created_at: item.created_at,
//       uid: item.uid,
//       usdTotal: item.usd_total,
//       cadTotal: item.cad_total,
//       brlTotal: item.brl_total,
//       btcTotal: item.btc_total,
//     }));
//   } else {
//     console.error(
//       'Error fetching Net Worth Evolution data:',
//       rawNetWorthChartData.error
//     );
//   }
//   const sortedNetWorthChartData: netWorthChartData[] = netWorthChartData
//     .filter(
//       (item): item is netWorthChartData & { created_at: Date } =>
//         item.created_at !== undefined
//     )
//     .sort((a, b) => a.created_at.getTime() - b.created_at.getTime());

//   return (
//     <>
//       {assetsSignal.value && btcPrice.value && currencyRates.value && uid ? (
//         <Dashboard
//           currencyRates={currencyRates.value}
//           btcPrice={btcPrice.value}
//           assets={assetsSignal.value?.assets}
//           assetsByType={assetsSignal.value?.assetsByType}
//           netWorthChartData={sortedNetWorthChartData}
//           uid={uid}
//         />
//       ) : (
//         <Loading />
//       )}
//     </>
//   );
// }

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
