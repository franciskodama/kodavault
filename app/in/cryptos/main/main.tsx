import { CardAssetsBy } from '@/components/CardAssetsBy';
import { CardTotal } from '@/components/CardTotal';
import { Asset } from '@/lib/types';
import CryptoChartPie from './crypto-chart-pie';
import {
  getTotalByKey,
  numberFormatterNoDecimals,
  thousandFormatter,
} from '@/lib/utils';

export type TotalByWallet = {
  value: string;
  total: number;
};

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
    <>
      <div className='flex flex-wrap gap-2 w-1/2'>
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
      </div>

      <div className='w-1/2 gap-2'>
        <CryptoChartPie chartData={chartData} />
        <CardAssetsBy
          assetType={'Cryptos'}
          emoji={'🏦'}
          description={'Coins by Exchange'}
          assets={assets}
          customKey={'wallet'}
        />
      </div>
    </>
  );
}
