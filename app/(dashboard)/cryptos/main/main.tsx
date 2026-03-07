import { CardAssetsBy } from '@/components/dashboard/CardAssetsBy';
import { CardTotal } from '@/components/dashboard/CardTotal';
import { Asset } from '@/lib/types';
import { getTotalByKey } from '@/lib/utils';
import CryptoByWallet from './cryptos-by-wallet';
import MessageInTable from '@/components/common/MessageInTable';
import { Target, Tag, Layers, Coins } from 'lucide-react';

export default function Main({ assets }: { assets: Asset[] }) {
  const totalByWallet = getTotalByKey(assets, 'wallet');

  return (
    <div className='flex flex-col w-full gap-6'>
      {assets.length > 0 ? (
        <>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 sm:px-0'>
            <div className='lg:col-span-2'>
              <CryptoByWallet assets={assets} totalByWallet={totalByWallet} />
            </div>
            <CardTotal
              Icon={Coins}
              description={'Total value grouped by Coins'}
              assets={assets}
              customKey={'crypto'}
              showQty={true}
            />
            <div className='flex flex-col gap-6'>
              <CardAssetsBy
                assetType={'Cryptos'}
                Icon={Target}
                description={'Assets by Purpose'}
                assets={assets}
                customKey={'purpose'}
              />
              <CardAssetsBy
                assetType={'Cryptos'}
                Icon={Tag}
                description={'Assets by Tag'}
                assets={assets}
                customKey={'tag'}
              />
            </div>
          </div>

          <div className='w-full px-4 sm:px-0'>
            <CardAssetsBy
              assetType={'Cryptos'}
              Icon={Layers}
              description={'Assets by Category'}
              assets={assets}
              customKey={'category'}
            />
          </div>
        </>
      ) : (
        <MessageInTable
          image={'/looking-weird.webp'}
          objectPosition={'50% 5%'}
          alt={'I am broke'}
          title={'Hey, the blockchain’s waiting for you!'}
          subtitle={
            'Start stacking those coins and get ready to explore the crypto universe! To the moon! 🚀'
          }
          buttonCopy={'Add a Crypto Asset'}
          hasNoButton={false}
          formTitle={'Add a new Asset'}
          formSubtitle={'Add a New Asset and expand your investment portfolio.'}
        />
      )}
    </div>
  );
}
