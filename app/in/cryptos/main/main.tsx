import { CardAssetsBy } from '@/components/CardAssetsBy';
import { CardTotal } from '@/components/CardTotal';
import { Asset } from '@/lib/types';

export default function Main({ assets }: { assets: Asset[] }) {
  return (
    <div className='flex flex-wrap gap-2'>
      <CardTotal
        emoji={'🪙'}
        description={'Total value grouped by Coins'}
        assets={assets}
        customKey={'crypto'}
      />
      <CardAssetsBy
        assetType={'Cryptos'}
        emoji={'🎯'}
        description={'Assets by Purpose'}
        assets={assets}
        customKey={'purpose'}
      />
      <CardAssetsBy
        assetType={'Cryptos'}
        emoji={'🏦'}
        description={'Coins by Exchange'}
        assets={assets}
        customKey={'wallet'}
      />
    </div>
  );
}
