import {
  currencyFormatter,
  numberFormatter,
  numberFormatterNoDecimals,
} from '../../../../lib/utils';
import AthTable from './ath-table';
import { athData } from '../cryptos';
import { Loading } from '../../../../components/Loading';
import { Asset, AssetReducedWithAth } from '../../../../lib/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function AthProjections({
  assets,
  athData,
}: {
  assets: Asset[];
  athData: athData[];
}) {
  let cryptoAssetsWithAth: Asset[] = [];
  let sumQtyOfSameAssets: Asset[] = [];
  let athAssets: AssetReducedWithAth[] = [];
  let sortedAthAssets: AssetReducedWithAth[] = [];

  if (!assets) {
    return <Loading />;
  }

  cryptoAssetsWithAth = assets.map((item: any) => {
    const existingAsset = athData.find(
      (el: athData) => el.symbol === item.asset
    );
    return {
      ...item,
      ath: existingAsset?.ath ? existingAsset.ath : 0,
      image: existingAsset?.image ? existingAsset.image : '',
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
    // --------------------------------------------------
    // TODO: If Asset has 0 total value, make the code more resilient so it doesn't crash
    // --------------------------------------------------
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
      image: item.image,
    };
  });

  sortedAthAssets = athAssets.sort(
    (a: AssetReducedWithAth, b: AssetReducedWithAth) => {
      return Number(b.xPotential) - Number(a.xPotential);
    }
  );

  const athTotal = sortedAthAssets.reduce(
    (sum: number, item: AssetReducedWithAth) => {
      const currentAthTotalNumber = Number(item.athTotalNumber);
      return sum + currentAthTotalNumber;
    },
    0
  );

  return (
    <>
      {sortedAthAssets.length > 0 && (
        <div className='w-full'>
          <Card>
            <div className='flex flex-col justify-between'>
              <div className='flex flex-col'>
                <CardHeader>
                  <CardTitle className='capitalize flex items-center justify-between'>
                    <span>Crypto ATH Estimation</span>
                    <span className='text-3xl'>🏅</span>
                  </CardTitle>
                  <CardDescription className='text-xs'>
                    All-Time High Estimation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {athAssets.length > 0 ? (
                    <div>
                      <AthTable athAssets={athAssets} />
                    </div>
                  ) : (
                    <div className='my-32'>🙅🏻‍♀️ Not loaded yet</div>
                  )}
                </CardContent>
              </div>
              <CardFooter className='flex justify-between text-sm text-slate-500 font-medium bg-slate-50 m-1 p-2'>
                <h3>Total</h3>
                {currencyFormatter(athTotal)}
              </CardFooter>
            </div>
          </Card>
        </div>
      )}
    </>
  );
}
