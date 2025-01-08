import { CardAssetsBy } from '@/components/CardAssetsBy';
import { CardTotal } from '@/components/CardTotal';
import { Asset } from '@/lib/types';
import { getTotalByKey } from '@/lib/utils';
import CryptoByWallet from './cryptos-by-wallet';
import MessageInTable from '@/components/MessageInTable';

export default function Main({ assets }: { assets: Asset[] }) {
  const totalByWallet = getTotalByKey(assets, 'wallet');

  return (
    <div className='flex flex-col w-full gap-2'>
      {assets.length > 0 ? (
        <>
          <div className='flex flex-col sm:flex-row gap-2 px-8 sm:px-0'>
            <div className='sm:w-1/2 gap-2'>
              <CryptoByWallet assets={assets} totalByWallet={totalByWallet} />
            </div>
            <div className='sm:w-1/5'>
              <CardTotal
                emoji={'🪙'}
                description={'Total value grouped by Coins'}
                assets={assets}
                customKey={'crypto'}
                showQty={true}
              />
            </div>
            <div className='sm:w-1/5'>
              <CardAssetsBy
                assetType={'Cryptos'}
                emoji={'🎯'}
                description={'Assets by Purpose'}
                assets={assets}
                customKey={'purpose'}
              />
            </div>
            <div className='sm:w-1/5'>
              <CardAssetsBy
                assetType={'Cryptos'}
                emoji={'🏷️'}
                description={'Assets by Tag'}
                assets={assets}
                customKey={'tag'}
              />
            </div>
          </div>

          <div className='w-full'>
            <CardAssetsBy
              assetType={'Cryptos'}
              emoji={'🗂️'}
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
