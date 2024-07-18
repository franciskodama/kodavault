import { CardAssetsBy } from '@/components/CardAssetsBy';
import { CardTotal } from '@/components/CardTotal';
import { Asset } from '@/lib/types';
import CryptoChartPie from './crypto-chart-pie';
import { getTotalByKey, thousandFormatter } from '@/lib/utils';

export type TotalByWallet = {
  value: string;
  total: number;
};

export default function Main({ assets }: { assets: Asset[] }) {
  const totalByWallet = getTotalByKey(assets, 'wallet');

  const transformKeys = (
    arr: TotalByWallet[]
  ): { name: string; value: number }[] =>
    arr.map((item) => ({ name: item.value, value: item.total }));
  // thousandFormatter()
  const chartData = transformKeys(totalByWallet);

  return (
    <>
      <div className='flex flex-wrap gap-2 w-2/3'>
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

      <div className='w-1/3'>
        {chartData.length > 0 && <CryptoChartPie chartData={chartData} />}
      </div>
    </>
  );
}
