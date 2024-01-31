'use client';

import CardAth from '@/components/CardAth';
import { CardCryptoGoals } from '@/components/CardCryptoGoals';
import { CardNextPurchases } from '@/components/CardNextPurchases';
import { Loading } from '@/components/Loading';
import { useAssetsContext } from '@/context/AssetsContext';
import { Asset } from '@/lib/types';
import { useEffect, useState } from 'react';

export default function CryptosPage() {
  const { assetsByType, isLoading } = useAssetsContext();
  const [cryptoAssets, setCryptoAssets] = useState<Asset[]>([]);

  useEffect(() => {
    if (assetsByType) {
      setCryptoAssets(assetsByType.Crypto);
    }
  }, [assetsByType]);

  return (
    <>
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
