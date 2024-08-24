import { CardAssetsBy } from '@/components/CardAssetsBy';
import { CardTotal } from '@/components/CardTotal';
import { Asset, TotalByWallet } from '@/lib/types';
import { getTotalByKey } from '@/lib/utils';
import CryptoByWallet from './cryptos-by-wallet';

export default function Main({ assets }: { assets: Asset[] }) {
  const totalByWallet = getTotalByKey(assets, 'wallet');

  const transformKeys = (
    arr: TotalByWallet[]
  ): { name: string; value: number }[] =>
    arr.map((item) => ({
      name: item.value,
      value: Math.floor(item.total),
    }));
  const chartData = transformKeys(totalByWallet);

  return (
    <div className='flex flex-col w-full gap-2'>
      <div className='flex gap-2'>
        <div className='w-1/2 gap-2'>
          <CryptoByWallet
            chartData={chartData}
            assets={assets}
            totalByWallet={totalByWallet}
          />
        </div>
        <div className='w-1/5'>
          <CardTotal
            emoji={'🪙'}
            description={'Total value grouped by Coins'}
            assets={assets}
            customKey={'crypto'}
          />
        </div>
        <div className='w-1/5'>
          <CardAssetsBy
            assetType={'Cryptos'}
            emoji={'🎯'}
            description={'Assets by Purpose'}
            assets={assets}
            customKey={'purpose'}
          />
        </div>
        <div className='w-1/5'>
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
    </div>
  );
}
