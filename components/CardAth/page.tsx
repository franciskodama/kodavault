import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  numberFormatterNoDecimals,
  getTotalByKey,
  numberFormatter,
} from '../../app/lib/utils';
import { Asset, AssetReducedWithAth } from '../../app/lib/types';
import { getAllTimeHighData } from '@/app/lib/crypto.server';
import MainTable from '@/app/assets/page';
import AthTable from './AthTable';
import { Card } from './Card';

export const CardAthPage = async ({
  assets,
}: // emoji = '',
// description = '',
{
  assets: Asset[];
  // emoji?: string;
  // description?: string;
}) => {
  let athAssets: AssetReducedWithAth[] = [];
  let cryptoAssetsWithAth: Asset[] = [];

  try {
    const onlyCryptoAssets = assets.filter(
      (item: any) => item.type === 'Crypto'
    );

    const athCoins = await getAllTimeHighData();

    cryptoAssetsWithAth = onlyCryptoAssets.map((item: any) => {
      const asset = athCoins.find((el: any) => el.symbol === item.asset);
      return {
        ...item,
        ath: asset?.ath ? asset.ath : 0,
      };
    });

    athAssets = cryptoAssetsWithAth.reduce((acc: any, item: any) => {
      const existingAsset = acc.find((el: any) => el.asset === item.asset);
      if (existingAsset) {
        existingAsset.qty += item.qtd;
        existingAsset.currentTotal += item.total;
      } else {
        acc.push({
          asset: item.asset,
          price: item.price,
          qty: item.qtd,
          currentTotal: item.total,
          ath: item.ath,
          athTotalEstimation: 0,
        });
      }
      return acc;
    }, []);
    console.log('---  🚀 ---> | athAssets:', athAssets);
  } catch (error) {
    console.log('Error: ', error);
  }

  return (
    <>
      <Card athAssets={athAssets} />
    </>
  );
};

const arrayHardcoded = [
  {
    asset: 'LINK',
    price: 13.78174372131335,
    qty: 1022,
    currentTotal: 14084.942083182243,
    ath: 52.7,
    athTotalEstimation: 0,
  },
  {
    asset: 'TRX',
    price: 0.1032148004789045,
    qty: 55689,
    currentTotal: 5747.929023869712,
    ath: 0.231673,
    athTotalEstimation: 0,
  },
  {
    asset: 'EGLD',
    price: 43.46121125159341,
    qty: 46.67,
    currentTotal: 2028.3347291118646,
    ath: 545.64,
    athTotalEstimation: 0,
  },
  {
    asset: 'BTC',
    price: 36667.73351909957,
    qty: 5.32,
    currentTotal: 195072.34232160973,
    ath: 69045,
    athTotalEstimation: 0,
  },
  {
    asset: 'ETH',
    price: 1967.9139279498377,
    qty: 16.05,
    currentTotal: 31585.018543594895,
    ath: 4878.26,
    athTotalEstimation: 0,
  },
  {
    asset: 'NEAR',
    price: 1.7760033959568762,
    qty: 2216.7200000000003,
    currentTotal: 3936.9022478855263,
    ath: 20.44,
    athTotalEstimation: 0,
  },
  {
    asset: 'AVAX',
    price: 22.092854227372403,
    qty: 161,
    currentTotal: 3556.9495306069566,
    ath: 144.96,
    athTotalEstimation: 0,
  },
  {
    asset: 'AAVE',
    price: 88.09467911391911,
    qty: 43.599999999999994,
    currentTotal: 3840.928009366873,
    ath: 661.69,
    athTotalEstimation: 0,
  },
  {
    asset: 'ADA',
    price: 0.3782630684638102,
    qty: 51188,
    currentTotal: 19362.529948525516,
    ath: 3.09,
    athTotalEstimation: 0,
  },
  {
    asset: 'AGIX',
    price: 0.2471986387550415,
    qty: 7714.28,
    currentTotal: 1906.9595149752415,
    ath: 0,
    athTotalEstimation: 0,
  },
  {
    asset: 'UNI',
    price: 5.072560192366373,
    qty: 1408.1799999999998,
    currentTotal: 7143.0778116864785,
    ath: 44.92,
    athTotalEstimation: 0,
  },
  {
    asset: 'MATIC',
    price: 0.8338013914171601,
    qty: 47756.31,
    currentTotal: 39819.277726949236,
    ath: 2.92,
    athTotalEstimation: 0,
  },
  {
    asset: 'CRO',
    price: 0.0978048785360688,
    qty: 500,
    currentTotal: 48.9024392680344,
    ath: 0.965407,
    athTotalEstimation: 0,
  },
  {
    asset: 'DOT',
    price: 5.299598222160314,
    qty: 1155.23,
    currentTotal: 6122.254854186259,
    ath: 54.98,
    athTotalEstimation: 0,
  },
  {
    asset: 'MKR',
    price: 1369.5448588822437,
    qty: 0.76,
    currentTotal: 1040.8540927505053,
    ath: 6292.31,
    athTotalEstimation: 0,
  },
  {
    asset: 'CHZ',
    price: 0.0762837074780989,
    qty: 13248.73,
    currentTotal: 1010.6622437763132,
    ath: 0.878633,
    athTotalEstimation: 0,
  },
];
