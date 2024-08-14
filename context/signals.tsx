import { signal } from '@preact/signals-react';

import { fetchQuotesForCryptos } from '@/lib/crypto.server';
import { getCurrency } from '@/lib/currency.server';
import { Asset, AssetsByType, CurrencyData } from '@/lib/types';
import { fetchAssets, fetchAssetsWithPrices } from '@/lib/assets';

// -------------------------------------------------------------------

export const btcPrice = signal<number | null>(null);

export const fetchBtcPrice = async () => {
  try {
    const result = await fetchQuotesForCryptos('BTC');
    btcPrice.value = result.data.BTC[0].quote.USD.price;
  } catch (error) {
    console.error('Error loading currency:', error);
  }
};

// -------------------------------------------------------------------

export const currencyRates = signal<CurrencyData | null>(null);

export const fetchCurrency = async () => {
  try {
    const result = await getCurrency();
    currencyRates.value = result;
  } catch (error) {
    console.error('Error loading currency:', error);
  }
};
// -------------------------------------------------------------------

type AssetsProps = {
  assets: Asset[];
  assetsByType: AssetsByType;
};

export const assetsSignal = signal<AssetsProps | undefined>(undefined);
// export const loadingSignal = signal<boolean>(true);
// export const errorSignal = signal<Error | undefined>(undefined);

export const fetchRawAssets = async (uid: string) => {
  try {
    if (uid) {
      const unpricedAssets = await fetchAssets(uid);
      const result = await fetchAssetsWithPrices(unpricedAssets);
      assetsSignal.value = result;
      return result;
    }
  } catch (error) {
    console.error('Error loading assets:', error);
    //   errorSignal.value = error as Error;
    // } finally {
    //   loadingSignal.value = false;
  }
};
