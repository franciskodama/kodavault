'use client';

import { getAssets } from '@/lib/assets.server';
import { Asset, UnpricedAsset } from '@/lib/types';
import { useUser } from '@clerk/nextjs';
import { createContext, useState } from 'react';

type AssetsContextProps = {
  assets: Asset[];
  setAssets: React.Dispatch<React.SetStateAction<Asset[]>>;
};

const initialState: AssetsContextProps = {
  assets: [],
  setAssets: () => {},
};

export const AssetsContext = createContext(initialState);

export function AssetsProvider({ children }: { children: React.ReactNode }) {
  const [assets, setAssets] = useState(initialState.assets);
  // const [assets, setAssets] = useState(assetsHardcoded);
  const { user } = useUser();

  console.log('---  🚀 ---> | user:', user);
  // let assetsNoPrice: UnpricedAsset[] = [];

  if (user) {
    console.log('---  🚀 ---> | user:', user.emailAddresses[0].emailAddress);
    // const result = getAssets(user.emailAddresses[0].emailAddress);
    // console.log('---  🚀 ---> | result:', result);
    //   assetsNoPrice = fetchAssets(user.emailAddresses[0].emailAddress);
  }

  //   if (assetsNoPrice.length > 0) {
  //     assetsWithPricesArray = await fetchAssetsWithPrices(assets);
  //   }

  return (
    <AssetsContext.Provider value={{ assets, setAssets }}>
      <div>{children}</div>
    </AssetsContext.Provider>
  );
}

const assetsHardcoded: Asset[] = [
  {
    id: '761959',
    asset: 'GLXY',
    qty: 400,
    wallet: 'Wealthsimple',
    created_at: '2023-08-27',
    type: 'Stock',
    uid: 'fk@fkodama.com',
    subtype: 'Stock-CAD',
    currency: 'CAD',
    account: 'cc-TFSA',
    exchange: 'TO',
    price: 5.46,
    total: 2185.29,
  },
  {
    id: '777777',
    asset: 'DOL',
    qty: 40,
    wallet: 'Wealthsimple',
    created_at: '2023-12-13',
    type: 'Stock',
    uid: 'fk@fkodama.com',
    subtype: 'Stock-CAD',
    currency: 'CAD',
    account: 'cc-TFSA',
    exchange: 'TO',
    price: 0.0,
    total: 0,
  },
  {
    id: '234534',
    asset: 'ATZ',
    qty: 50,
    wallet: 'Wealthsimple',
    created_at: '2023-12-13',
    type: 'Stock',
    uid: 'fk@fkodama.com',
    subtype: 'Stock-CAD',
    currency: 'CAD',
    account: 'cc-TFSA',
    exchange: 'TO',
    price: 1,
    total: 0,
  },
];
