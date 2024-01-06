'use client';

import { Asset } from '@/lib/types';
import { createContext, useContext, useState } from 'react';

type AssetsContext = {
  assets: Asset[];
  setAssets: React.Dispatch<React.SetStateAction<Asset[]>>;
};

export const AssetsContext = createContext<AssetsContext | null>(null);

export function AssetsProvider({ children }: { children: React.ReactNode }) {
  const [assets, setAssets] = useState<Asset[]>([]);

  return (
    <AssetsContext.Provider value={{ assets, setAssets }}>
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
