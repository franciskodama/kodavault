'use client';

import { fetchAssets, fetchAssetsWithPrices } from '@/lib/assets';
import { Asset, UnpricedAsset } from '@/lib/types';
import { useAuth, useUser } from '@clerk/nextjs';
import { createContext, useContext, useEffect, useState } from 'react';

type AssetsContext = {
  isLoading: boolean;
  assets: Asset[];
  setAssets: React.Dispatch<React.SetStateAction<Asset[]>>;
};

export const AssetsContext = createContext<AssetsContext | null>(null);

export function AssetsProvider({ children }: { children: React.ReactNode }) {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useUser();
  const uid = user?.emailAddresses?.[0]?.emailAddress;

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

    fetchData();
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
// const {isLoaded, userId} = useAuth()

// const initialState: AssetsContext = {
//   assets: [],
//   setAssets: () => {},
// };

// const assetsHardcoded: Asset[] = [
//   {
//     id: '761959',
//     asset: 'GLXY',
//     qty: 400,
//     wallet: 'Wealthsimple',
//     created_at: new Date(),
//     type: 'Stock',
//     uid: 'fk@fkodama.com',
//     subtype: 'Stock-CAD',
//     currency: 'CAD',
//     account: 'cc-TFSA',
//     exchange: 'TO',
//     price: 5.46,
//     total: 2185.29,
//   },
//   {
//     id: '777777',
//     asset: 'DOL',
//     qty: 40,
//     wallet: 'Wealthsimple',
//     created_at: new Date(),
//     type: 'Stock',
//     uid: 'fk@fkodama.com',
//     subtype: 'Stock-CAD',
//     currency: 'CAD',
//     account: 'cc-TFSA',
//     exchange: 'TO',
//     price: 0.0,
//     total: 0,
//   },
//   {
//     id: '234534',
//     asset: 'ATZ',
//     qty: 50,
//     wallet: 'Wealthsimple',
//     created_at: new Date(),
//     type: 'Stock',
//     uid: 'fk@fkodama.com',
//     subtype: 'Stock-CAD',
//     currency: 'CAD',
//     account: 'cc-TFSA',
//     exchange: 'TO',
//     price: 1,
//     total: 0,
//   },
// ];
