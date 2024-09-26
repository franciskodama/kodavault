'use client';

import { useEffect, useState } from 'react';

import {
  currencyFormatter,
  numberFormatter,
  numberFormatterNoDecimals,
} from '../../../../lib/utils';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import AthTable from './ath-table';
import { athImageData } from '../cryptos';
import { Loading } from '../../../../components/Loading';
import { Asset, AssetReducedWithAth } from '../../../../lib/types';

export type athTotals = {
  athTotal: number;
  athTotalExclusions: number;
};

export default function AthProjections({
  assets,
  athImageData,
}: {
  assets: Asset[];
  athImageData: athImageData[];
}) {
  const [exclusions, setExclusions] = useState(() => {
    if (typeof window !== 'undefined') {
      const localData = localStorage.getItem('cryptos-ath-exclusions');
      return localData ? JSON.parse(localData) : [];
    }
    return [];
  });

  useEffect(() => {
    try {
      const localData = JSON.parse(
        localStorage.getItem('cryptos-ath-exclusions') || '[]'
      );
      localData && setExclusions(localData);
    } catch (error) {
      console.error('Error loading from localStorage:', error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(
        'cryptos-ath-exclusions',
        JSON.stringify(exclusions)
      );
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }, [exclusions]);

  let cryptoAssetsWithAth: Asset[] = [];
  let sumQtyOfSameAssets: Asset[] = [];
  let athAssets: AssetReducedWithAth[] = [];
  let sortedAthAssets: AssetReducedWithAth[] = [];

  if (!assets) {
    return <Loading />;
  }

  cryptoAssetsWithAth = assets.map((item: any) => {
    const existingAsset = athImageData.find(
      (el: athImageData) => el.symbol === item.asset
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
    return {
      asset: item.asset,
      image: item.image,
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

  const getTotal = (assets: AssetReducedWithAth[]) => {
    return assets.reduce((sum: number, item: AssetReducedWithAth) => {
      const currentAthTotalNumber = Number(item.athTotalNumber);
      return sum + currentAthTotalNumber;
    }, 0);
  };

  const exclusionsAssets = sortedAthAssets.filter((item: any) => {
    return exclusions.includes(item.asset);
  });

  const athTotal = getTotal(sortedAthAssets);
  const athTotalExclusions = getTotal(exclusionsAssets);

  const totals: athTotals = {
    athTotal,
    athTotalExclusions,
  };

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
                  {sortedAthAssets.length > 0 ? (
                    <div>
                      <AthTable
                        athAssets={sortedAthAssets}
                        setExclusions={setExclusions}
                        exclusions={exclusions}
                        totals={totals}
                      />
                    </div>
                  ) : (
                    <div className='my-32'>🙅🏻‍♀️ Not loaded yet</div>
                  )}
                </CardContent>
              </div>
              <CardFooter className='flex m-1 py-2 px-10 justify-between text-sm text-slate-500 font-medium bg-slate-50'>
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
