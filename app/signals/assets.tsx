'use client';

import { signal } from '@preact/signals-react';

import { useUser } from '@clerk/nextjs';
import { fetchAssets, fetchAssetsWithPrices } from '@/lib/assets';
import { Asset, AssetsByType, UnpricedAsset } from '@/lib/types';

// type AssetsContext = {
//   isLoading: boolean;
//   assets: Asset[];
//   setAssets: React.Dispatch<React.SetStateAction<Asset[]>>;
//   assetsByType: AssetsByType;
//   refreshAssets: () => Promise<void>;
// };

// type pricedAssetsObj = {
//   assets: Asset[];
//   assetsByType: AssetsByType;
// };

export function AssetsSignal() {
  const { user } = useUser();
  const uid = user?.emailAddresses?.[0]?.emailAddress;

  const refreshAssets = async () => {
    try {
      if (uid) {
        const unpricedAssets = await fetchAssets(uid);
        const result = await fetchAssetsWithPrices(unpricedAssets);
      }
    } catch (error) {
      console.error('Error loading assets:', error);
    }
  };

  const assets = signal(refreshAssets());
  console.log('---  🚀 ---> | assets:', assets);

  return <></>;
}
