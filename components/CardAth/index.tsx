import { Asset, AssetReducedWithAth } from '../../app/lib/types';
import { getAllTimeHighData } from '@/app/lib/crypto.server';
import { CardTable } from './CardTable';
import { hardcodedAthCoins } from '@/app/lib/data';
import { format } from 'path';
import { numberFormatter } from '@/app/lib/utils';

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
        existingAsset.qtd += item.qtd;
        existingAsset.currentTotal += item.total;
      } else {
        acc.push(item);
      }
      return acc;
    }, []);

    athAssets = sumQtyOfSameAssets.map((item: any) => {
      return {
        asset: item.asset,
        price: numberFormatter.format(item.price),
        qtd: numberFormatter.format(item.qtd),
        currentTotal: numberFormatter.format(item.qtd * item.price),
        ath: item.ath,
        athTotalEstimation: numberFormatter.format(item.ath * item.qtd),
        xPotential: item.ath / item.price,
        percentagePotential: numberFormatter.format(
          (item.ath / item.price - 1) * 100
        ),
        // include: % potential growth ---> CHECK IF IT'S CORRECT
        // sort by potential growth ---> Type error
        // alert: recommendation if the amount is too much for a little potential growth
        // market cap
        // not here, but create the card for seeing the networth value in BTC
      };
    });
    console.log('---  🚀 ---> | athAssets:', athAssets);

    sortedAthAssets = athAssets.sort(
      (a: AssetReducedWithAth, b: AssetReducedWithAth) => {
        return numberFormatter.format(b.xPotential - a.xPotential);
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
