'use client';

import { useUser } from '@clerk/nextjs';
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from 'react';
import { fetchAssetsWithoutPrices, fetchAssetsWithPrices } from '@/lib/assets';
import { Asset, AssetsByType } from '@/lib/types';

type AssetsContext = {
  isLoading: boolean;
  assets: Asset[];
  setAssets: React.Dispatch<React.SetStateAction<Asset[]>>;
  assetsByType: AssetsByType;
  refreshAssets: () => Promise<void>;
};

export const AssetsContext = createContext<AssetsContext | null>(null);

export function AssetsProvider({ children }: { children: React.ReactNode }) {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [assetsByType, setAssetsByType] = useState<AssetsByType>({});
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useUser();
  const uid = user?.emailAddresses?.[0]?.emailAddress;

  const refreshAssets = useCallback(async () => {
    try {
      if (uid) {
        const unpricedAssets = await fetchAssetsWithoutPrices(uid);
        const { assets: _assets, assetsByType: _assetsByType } =
          await fetchAssetsWithPrices(unpricedAssets);
        setAssets(_assets);
        setAssetsByType(_assetsByType);
      }
    } catch (error) {
      console.error('Error loading assets:', error);
    } finally {
      setIsLoading(false);
    }
  }, [uid]);

  useEffect(() => {
    if (uid) {
      setIsLoading(true);
      refreshAssets();
    } else {
      setAssets([]);
      setAssetsByType({});
      setIsLoading(false);
    }
  }, [uid, refreshAssets]);

  const contextValue = useMemo(
    () => ({ isLoading, assets, setAssets, assetsByType, refreshAssets }),
    [isLoading, assets, assetsByType, refreshAssets]
  );

  return (
    <AssetsContext.Provider value={contextValue}>
      <div>{children}</div>
    </AssetsContext.Provider>
  );
}

export function useAssetsContext() {
  const context = useContext(AssetsContext);
  if (!context) {
    throw new Error('useAssets must be used within an AssetsProvider');
  }
  return context;
}
