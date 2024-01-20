'use client';

import CardAth from '@/components/CardAth';
import { CardNextPurchases } from '@/components/CardNextPurchases';
import { CardTotal } from '@/components/CardTotal';
import { Loading } from '@/components/Loading';
import { useAssetsContext } from '@/context/AssetsContext';
import { changeKeyForTitle } from '@/lib/utils';
import { useEffect, useState } from 'react';

export default function CryptosPage() {
  const { assets, isLoading } = useAssetsContext();
  console.log('---  🚀 ---> | assets:', assets);
  const [cryptoAssets, setCryptoAssets] = useState([]);
  console.log('---  🚀 ---> | cryptoAssets:', cryptoAssets);

  useEffect(() => {
    const cryptoAssetsBefore = assets.filter(
      (asset) => asset?.type === 'Crypto'
    );
    console.log('---  🚀 ---> | cryptoAssetsBefore:', cryptoAssetsBefore);

    setCryptoAssets(changeKeyForTitle(cryptoAssetsBefore, 'crypto'));
  }, [assets]);

  return (
    <>
      {!isLoading && cryptoAssets.length > 1 ? (
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
