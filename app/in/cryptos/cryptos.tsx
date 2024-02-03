'use client';

import CardAth from '@/components/CardAth';
import { CardCryptoGoals } from '@/components/CardCryptoGoals';
import { CardNextPurchases } from '@/components/CardNextPurchases';
import { Loading } from '@/components/Loading';
import { useAssetsContext } from '@/context/AssetsContext';
import { Asset } from '@/lib/types';
import { useEffect, useState } from 'react';
import { DataTable } from './data-table';
import { columns } from './columns';

// TODO: Symbol + Amount (USD) + Percentage + Goal (%) + Goal (USD) + Observation (Look at Stochastic Analysis 4h, MACD 3D and W)

// TODO: Add Asset: if there isn't this asset symbol in the CoinGaol table, create it with goal = 0
// TODO: Show the field (form) with the goal pulled from CoinGoal database
// TODO: If there is asset but there is no goal, create the fiedl with the value 0 and the user press save, it create the item on Coingoal
// TODO: Create button to save the goal for each asset (current line) + Save in the database
// TODO: What to do if there is a goal for a new asset the user desire, but they didn't buy it yet? They have see the goal to remember to buy it.

//------------------------------------------
// TODO: Next purchases: app see what is missing to complete the goal and show on card next purchases (crypto page and dashboard + alerts "you need to buy these bad boys!")
// TODO: Resistences and Supports?

// DONE:
// TODO: Create Server Action for getting Crypto Goals of this user

export default function Cryptos() {
  const { assetsByType, isLoading } = useAssetsContext();
  const [cryptoAssets, setCryptoAssets] = useState<Asset[]>([]);

  useEffect(() => {
    if (assetsByType) {
      setCryptoAssets(assetsByType.Crypto);
    }
  }, [assetsByType]);

  return (
    <>
      {isLoading ? (
        <div className='flex justify-center items-center h-[70em]'>
          <Loading />
        </div>
      ) : (
        <>
          DATA TABLE HERE
          {/* <DataTable columns={columns} data={cryptoAssets} /> */}
        </>
      )}
      {!isLoading && cryptoAssets ? (
        <div>
          <div className='flex flex-col gap-2'>
            <CardCryptoGoals
              emoji={'🪙'}
              description={'Total by crypto and the amount to reach it'}
              assets={assetsByType.Crypto}
              customKey={'crypto'}
            />
            <CardAth
              emoji={'🔮'}
              description={'All-Time High Estimation'}
              assets={cryptoAssets}
            />
          </div>
        </div>
      ) : (
        <div className='flex items-center justify-center h-[30em]'>
          <Loading />
        </div>
      )}

      <div>
        <CardNextPurchases />
      </div>
    </>
  );
}
