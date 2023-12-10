import { Asset, AssetReducedWithAth } from '../../app/lib/types';
import { getAllTimeHighData } from '@/app/lib/crypto.server';
import { CardTable } from './CardTable';
import { hardcodedAthCoins } from '../../app/lib/data';
import {
  currencyFormatter,
  numberFormatter,
  numberFormatterNoDecimals,
} from '../../app/lib/utils';

export const CardAth = async ({
  assets,
  emoji,
  description,
}: {
  assets: Asset[];
  emoji?: string;
  description?: string;
}) => {
  let cryptoAssetsWithAth: Asset[] = [];
  let sumQtyOfSameAssets: Asset[] = [];
  let athAssets: AssetReducedWithAth[] = [];
  let sortedAthAssets: AssetReducedWithAth[] = [];

  try {
    const onlyCryptoAssets = assets.filter(
      (item: any) => item.type === 'Crypto'
    );

    // ------------------------------------------------------------------------
    // const athCoins = await getAllTimeHighData();
    // console.log('---  🚀 ---> | athCoins  :', athCoins);
    // ------------------------------------------------------------------------

    cryptoAssetsWithAth = onlyCryptoAssets.map((item: any) => {
      const existingAsset = hardcodedAthCoins.find(
        (el: any) => el.symbol === item.asset
      );
      return {
        ...item,
        ath: existingAsset?.ath ? existingAsset.ath : 0,
      };
    });

    sumQtyOfSameAssets = cryptoAssetsWithAth.reduce((acc: any, item: any) => {
      const existingAsset = acc.find((el: any) => el.asset === item.asset);

      if (existingAsset) {
        existingAsset.qty += item.qty;
        existingAsset.currentTotal += item.total;
      } else {
        acc.push(item);
      }
      return acc;
    }, []);

    athAssets = sumQtyOfSameAssets.map((item: any) => {
      // TODO: If Asset has 0 total value, make the code more resilient so it doesn't crash
      // if (item.qty === 0) {
      //   return {
      //     asset: item.asset,
      //     price: currencyFormatter(item.price),
      //     qty: numberFormatter.format(item.qty),
      //     currentTotal: currencyFormatter(0),
      //     ath: currencyFormatter(item.ath),
      //     athTotalNumber: 0,
      //     athTotalCurrency: currencyFormatter(0),
      //     xPotential: numberFormatter.format(0),
      //     percentagePotential: numberFormatterNoDecimals.format(0),
      //   };
      // }

      // return {
      //   asset: item.asset,
      //   price: currencyFormatter(item.price),
      //   qty: numberFormatter.format(item.qty),
      //   currentTotal: currencyFormatter(item.qty * item.price),
      //   ath: currencyFormatter(item.ath),
      //   athTotalNumber: item.ath * item.qty,
      //   athTotalCurrency: currencyFormatter(item.ath * item.qty),
      //   xPotential: numberFormatter.format(item.ath / item.price),
      //   percentagePotential: numberFormatterNoDecimals.format(
      //     ((item.ath - item.price) / item.price) * 100
      //   ),
      // };

      return {
        asset: item.asset,
        price: currencyFormatter(item.price),
        qty: numberFormatter.format(item.qty),
        currentTotal: currencyFormatter(item.qty * item.price),
        ath: currencyFormatter(item.ath),
        athTotalNumber: item.ath * item.qty,
        athTotalCurrency: currencyFormatter(item.ath * item.qty),
        xPotential: numberFormatter.format(item.ath / item.price),
        percentagePotential: numberFormatterNoDecimals.format(
          ((item.ath - item.price) / item.price) * 100
        ),
      };
    });

    sortedAthAssets = athAssets.sort(
      (a: AssetReducedWithAth, b: AssetReducedWithAth) => {
        return Number(b.xPotential) - Number(a.xPotential);
      }
    );
  } catch (error) {
    console.log('Error: ', error);
  }

  return (
    <>
      {sortedAthAssets.length > 0 && (
        <div className='w-[55em]'>
          <CardTable
            athAssets={sortedAthAssets}
            emoji={emoji}
            description={description}
          />
        </div>
      )}
    </>
  );
};
