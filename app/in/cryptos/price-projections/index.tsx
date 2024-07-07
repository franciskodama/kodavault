import { Asset, AssetReducedWithAth } from '../../../../lib/types';
import { DataTable } from './data-table';
import { hardcodedAthCoins } from '../../../../lib/data';
import {
  currencyFormatter,
  numberFormatter,
  numberFormatterNoDecimals,
} from '../../../../lib/utils';
import { Loading } from '../../../../components/Loading';

export default function PriceProjections({ assets }: { assets: Asset[] }) {
  let cryptoAssetsWithAth: Asset[] = [];
  let sumQtyOfSameAssets: Asset[] = [];
  let athAssets: AssetReducedWithAth[] = [];
  let sortedAthAssets: AssetReducedWithAth[] = [];

  if (!assets) {
    return <Loading />;
  }

  // const onlyCryptoAssets = assets.filter((item: any) => item.type === 'Crypto');

  // cryptoAssetsWithAth = assets.map((item: any) => {
  //   const existingAsset = hardcodedAthCoins.find(
  //     (el: any) => el.symbol === item.asset
  //   );
  //   return {
  //     ...item,
  //     ath: existingAsset?.ath ? existingAsset.ath : 0,
  //   };
  // });

  // sumQtyOfSameAssets = cryptoAssetsWithAth.reduce((acc: any, item: any) => {
  //   const existingAsset = acc.find((el: any) => el.asset === item.asset);
  //   if (existingAsset) {
  //     existingAsset.qty += item.qty;
  //     existingAsset.currentTotal += item.total;
  //   } else {
  //     acc.push(item);
  //   }
  //   return acc;
  // }, []);

  // athAssets = sumQtyOfSameAssets.map((item: any) => {
  //   return {
  //     asset: item.asset,
  //     price: currencyFormatter(item.price),
  //     qty: numberFormatter.format(item.qty),
  //     currentTotal: currencyFormatter(item.qty * item.price),
  //     ath: currencyFormatter(item.ath),
  //     athTotalNumber: item.ath * item.qty,
  //     athTotalCurrency: currencyFormatter(item.ath * item.qty),
  //     xPotential: numberFormatter.format(item.ath / item.price),
  //     percentagePotential: numberFormatterNoDecimals.format(
  //       ((item.ath - item.price) / item.price) * 100
  //     ),
  //   };
  // });

  // sortedAthAssets = athAssets.sort(
  //   (a: AssetReducedWithAth, b: AssetReducedWithAth) => {
  //     return Number(b.xPotential) - Number(a.xPotential);
  //   }
  // );

  return (
    <>
      {sortedAthAssets.length > 0 && (
        <div className='w-full'>
          {/* <DataTable athAssets={sortedAthAssets} /> */}
        </div>
      )}
    </>
  );
}
