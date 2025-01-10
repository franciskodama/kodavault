import {
  Asset,
  AssetReducedWithAth,
  AssetWithProjection,
} from '../../../../lib/types';
import { DataTable } from './data-table';
import { hardcodedAthCoins } from '../../../../lib/data';
import {
  currencyFormatter,
  numberFormatter,
  numberFormatterNoDecimals,
} from '../../../../lib/utils';
import { Loading } from '../../../../components/Loading';

export default function Projections({ assets }: { assets: Asset[] }) {
  let sumQtyOfSameAssets: Asset[] = [];
  // let assetsWithProjections: AssetWithProjection[] = [];
  // let sortedAssetsWithProjections: AssetWithProjection[] = [];

  if (!assets) {
    return <Loading />;
  }

  const onlyCryptoAssets = assets.filter((item: any) => item.type === 'Crypto');

  sumQtyOfSameAssets = onlyCryptoAssets.reduce((acc: any, item: any) => {
    const existingAsset = acc.find((el: any) => el.asset === item.asset);
    if (existingAsset) {
      existingAsset.qty += item.qty;
      existingAsset.currentTotal += item.total;
    } else {
      acc.push(item);
    }
    return acc;
  }, []);

  const assetsWithProjections = sumQtyOfSameAssets.map((item: any) => {
    return {
      asset: item.asset,
      // logo: item.logo,
      price: currencyFormatter(item.price),
      qty: numberFormatter.format(item.qty),
      currentTotal: currencyFormatter(item.qty * item.price),
      projection: currencyFormatter(item.ath),
      projectionTotal: currencyFormatter(item.ath * item.qty),
      xPotential: numberFormatter.format(item.ath / item.price),
      percentagePotential: numberFormatterNoDecimals.format(
        ((item.ath - item.price) / item.price) * 100
      ),
    };
  });

  const sortedAssetsWithProjections = assetsWithProjections.sort(
    (a: any, b: any) => {
      return Number(b.xPotential) - Number(a.xPotential);
    }
  );
  console.log(
    '---  🚀 ---> | sortedAssetsWithProjections:',
    sortedAssetsWithProjections
  );

  return (
    <>
      {sortedAssetsWithProjections.length > 0 && (
        <div className='w-full'>
          {/* <DataTable assets={sortedAssetsWithProjections} /> */}
        </div>
      )}
    </>
  );
}
