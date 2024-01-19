'use client';

import CardAth from '@/components/CardAth';
import { CardNextPurchases } from '@/components/CardNextPurchases';
import { CardTotal } from '@/components/CardTotal';
import { useAssetsContext } from '@/context/AssetsContext';

export default function CryptosPage() {
  const { assets, isLoading } = useAssetsContext();
  const cryptoAssets = assets.filter((asset) => asset?.type === 'Crypto');
  // .sort((a, b) => {
  //   if (a.name < b.name) {
  //     return -1;
  //   }
  //   if (a.name > b.name) {
  //     return 1;
  //   }
  //   return 0;
  // });

  return (
    <>
      {/* <div className='bg-white flex flex-col items-center mt-12 text-4xl w-full h-screen text-center mx-auto'>
        <h1 className='mt-32 uppercase font-extrabold border-2 border-slate-500 w-[10em] p-4'>
          Cryptos
        </h1>
        <WorkInProgress />
      </div> */}

      <div>
        <div className='flex flex-wrap gap-2'>
          <CardTotal
            emoji={'🪙'}
            description={'Total value grouped by crypto'}
            assets={cryptoAssets}
            customKey={'crypto'}
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
      <div>
        <CardNextPurchases />
      </div>
    </>
  );
}
