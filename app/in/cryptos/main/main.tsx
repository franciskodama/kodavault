import { CardStocksBy } from '@/components/CardStocksBy';
import { CardTotal } from '@/components/CardTotal';
import { Asset } from '@/lib/types';

export default function Main({ assets }: { assets: Asset[] }) {
  console.log('---  🚀 ---> | assets:', assets);
  return (
    <div className='flex flex-wrap gap-2'>
      <CardTotal
        emoji={'🪙'}
        description={'Total value grouped by Coins'}
        assets={assets}
        customKey={'crypto'}
      />
      <CardStocksBy
        emoji={'🎯'}
        description={'Assets by Purpose'}
        assets={assets}
        customKey={'purpose'}
      />
      <CardStocksBy
        emoji={'🏦'}
        description={'Coins by Exchange'}
        assets={assets}
        customKey={'wallet'}
      />
    </div>
  );
}
