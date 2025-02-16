// import { signal } from '@preact/signals-react';

// import { getCurrencies } from '@/lib/currency.server';
// import { fetchQuotesForCryptos } from '@/lib/crypto.server';
// import { AssetsAndAssetsByType, Currencies } from '@/lib/types';
// import { fetchAssetsWithoutPrices, fetchAssetsWithPrices } from '@/lib/assets';

// // -------------------------------------------------------------------

// export const btcPrice = signal<number | null>(null);

// export const fetchBtcPrice = async () => {
//   try {
//     const result = await fetchQuotesForCryptos('BTC');
//     btcPrice.value = result.data.BTC[0].quote.USD.price;
//   } catch (error) {
//     console.error('Error loading currency:', error);
//   }
// };

// // -------------------------------------------------------------------

// export const currencyRates = signal<Currencies | null>(null);

// export const fetchCurrencies = async () => {
//   try {
//     const result = await getCurrencies();
//     currencyRates.value = result;
//   } catch (error) {
//     console.error('Error loading currency:', error);
//   }
// };

// // -------------------------------------------------------------------

// export const assetsSignal = signal<AssetsAndAssetsByType | undefined>(
//   undefined
// );

// export const fetchAssets = async (uid: string) => {
//   try {
//     if (uid) {
//       const unpricedAssets = await fetchAssetsWithoutPrices(uid);
//       const result = await fetchAssetsWithPrices(unpricedAssets);
//       assetsSignal.value = result;
//       console.log(
//         '----------- ⚡️⚡️⚡️ Triggered AssetsSignal ⚡️⚡️⚡️ -----------'
//       );
//       // return result;
//     }
//   } catch (error) {
//     console.error('Error loading assets:', error);
//   }
// };
