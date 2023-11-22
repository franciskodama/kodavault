import { Asset, AssetReducedWithAth } from '../../app/lib/types';
import { getAllTimeHighData } from '@/app/lib/crypto.server';
import { CardTable } from './CardTable';
import { hardcodedAthCoins } from '@/app/lib/data';
import { currencyFormatter, numberFormatter } from '@/app/lib/utils';

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
        price: currencyFormatter(item.price),
        qtd: numberFormatter.format(item.qtd),
        currentTotal: currencyFormatter(item.qtd * item.price),
        ath: currencyFormatter(item.ath),
        athTotalNumber: item.ath * item.qtd,
        athTotalCurrency: currencyFormatter(item.ath * item.qtd),
        xPotential: numberFormatter.format(item.ath / item.price),
        percentagePotential: numberFormatter.format(
          (item.ath / item.price - 1) * 100
        ),
      };
    });

    // TODO: change all qtd to qty
    // TODO: include: % potential growth ---> CHECK IF IT'S CORRECT
    // TODO: alert: recommendation if the amount is too much for a little potential growth
    // TODO: market cap

    // TODO: not here, but create the card for seeing the networth value in BTC
    // TODO: not here, but total By Crypto: show the percentage we want when we reach Bull Market

    sortedAthAssets = athAssets.sort(
      //---------------------------------------------------------------------------
      (a: AssetReducedWithAth, b: AssetReducedWithAth) => {
        return Number(b.xPotential) - Number(a.xPotential);
      }
    );
    //---------------------------------------------------------------------------
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
