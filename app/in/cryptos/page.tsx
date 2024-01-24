'use client';

import CardAth from '@/components/CardAth';
import { CardNextPurchases } from '@/components/CardNextPurchases';
import { CardTotal } from '@/components/CardTotal';
import { Loading } from '@/components/Loading';
import { useAssetsContext } from '@/context/AssetsContext';
import { Asset } from '@/lib/types';
import { changeKeyForTitle } from '@/lib/utils';
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
          <div className='flex flex-wrap gap-2'>
            <CardTotal
              emoji={'🪙'}
              description={'Total value grouped by crypto'}
              assets={cryptoAssets}
              customKey={'Crypto'}
            />
            {/* <CardTotalByCrypto
              emoji={'🪙'}
              description={'Only Cryptos'}
              assets={changeKeyAssetToCryptoForTitleOnCard}
              customKey={'crypto'}
            /> */}
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
