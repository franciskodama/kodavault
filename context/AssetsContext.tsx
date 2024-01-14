'use client';

import { fetchAssets, fetchAssetsWithPrices } from '@/lib/assets';
import { Asset, UnpricedAsset } from '@/lib/types';
import { useUser } from '@clerk/nextjs';
import { createContext, useContext, useEffect, useState } from 'react';

type AssetsContext = {
  isLoading: boolean;
  assets: Asset[];
  setAssets: React.Dispatch<React.SetStateAction<Asset[]>>;
};

export const AssetsContext = createContext<AssetsContext | null>(null);

export function AssetsProvider({ children }: { children: React.ReactNode }) {
  const [assets, setAssets] = useState<Asset[]>([]);
  console.log('---  🚀 ---> | assets Context:', assets);
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useUser();
  const uid = user?.emailAddresses?.[0]?.emailAddress;
  console.log('---  🚀 ---> | uid:', uid);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      let unpricedAssets: UnpricedAsset[] = [];
      let pricedAssets: Asset[] = [];

      try {
        if (uid) {
          unpricedAssets = await fetchAssets(uid);

          if (unpricedAssets.length > 0) {
            pricedAssets = await fetchAssetsWithPrices(unpricedAssets);
          }
        }
        setAssets(pricedAssets);
      } catch (error) {
        console.error('Error loading assets:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (uid) {
      fetchData();
    } else {
      setAssets([]);
      setIsLoading(false);
    }
  }, [uid]);

  return (
    <AssetsContext.Provider value={{ isLoading, assets, setAssets }}>
      <div>{children}</div>
    </AssetsContext.Provider>
  );
}

export function useAssetsContext() {
  const context = useContext(AssetsContext);

  if (!context) {
    throw new Error('useAssets must be used within a AssetsProvider');
  }
  return context;
}
