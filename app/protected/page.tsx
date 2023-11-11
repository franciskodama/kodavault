import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import MainTable from '../assets/page';
import { getAssets } from '../lib/assets.server';
import { getCryptos } from '../lib/crypto.server';
import { getStock, getStockUsd } from '../lib/stock.server';
import { getCurrency } from '../lib/currency.server';
import { numberFormatter } from '../lib/utils';
import { CardTotal } from './card-total';
import { Asset, AssetWithoutPrice } from '../lib/types';

export default async function ProtectedRoute() {
  const session = await getServerSession();

  if (!session || !session.user) {
    redirect('/api/auth/signin');
  }

  try {
    let assets: AssetWithoutPrice[] = [];
    if (session?.user?.email) {
      assets = await fetchAssets(session.user.email);
    }

    if (assets.length > 0) {
      const assetsWithPricesArray = await fetchAssetsWithPrices(assets);

      return (
        <>
          <div className='flex flex-wrap gap-2 justify-between'>
            <CardTotal
              emoji={'🧺'}
              description={'This is a description'}
              assets={assetsWithPricesArray}
              customKey={'wallet'}
            />
            {/* 🤑 👛 🅱️*/}
            <CardTotal
              emoji={'💰'}
              description={'This is a description'}
              assets={assetsWithPricesArray}
              customKey={'type'}
            />
            <CardTotal
              emoji={'🗂️'}
              description={'This is a description'}
              assets={assetsWithPricesArray}
              customKey={'subtype'}
            />
            <CardTotal
              emoji={'💵'}
              description={'Currency, babe!'}
              assets={assetsWithPricesArray}
              customKey={'currency'}
            />
            <CardTotal
              emoji={'🪙'}
              description={'Only Cryptos'}
              assets={assetsWithPricesArray}
              customKey={'crypto'}
            />
          </div>
          {assetsWithPricesArray.length > 0 ? (
            <div className='my-8'>
              <MainTable assets={assetsWithPricesArray} />
            </div>
          ) : (
            <div className='my-32'>🙅🏻‍♀️ Not loaded yet</div>
          )}
        </>
      );
    } else {
      return <div className='my-32'>🙅🏻‍♀️ No assets found</div>;
    }
  } catch (error) {
    console.error(error);
    return <div className='my-32'>🚨 Error loading assets</div>;
  }
}

async function fetchAssets(userEmail: string) {
  const assetData = await getAssets(userEmail);
  if (Array.isArray(assetData)) {
    return assetData as AssetWithoutPrice[];
  } else {
    console.error(assetData);
    return [];
  }
}

async function fetchAssetsWithPrices(assets: AssetWithoutPrice[]) {
  const assetsGroupedByType = groupAssetsByType(assets);

  const [cryptoAssetsWithPrice, cashAssetsWithPrice, stockAssetsWithPrice] =
    await Promise.all([
      includePriceToCryptoAssets(assetsGroupedByType.Crypto),
      includePriceToCashAssets(assetsGroupedByType.Cash),
      includePriceToStockAssets(assetsGroupedByType.Stock),
    ]);

  const assetsWithPricesArray = [
    ...(cryptoAssetsWithPrice || []),
    ...(cashAssetsWithPrice || []),
    ...(stockAssetsWithPrice || []),
  ];

  return assetsWithPricesArray;
}

function groupAssetsByType(assets: AssetWithoutPrice[]) {
  return assets.reduce((groupedAssets: any, asset: AssetWithoutPrice) => {
    const type = asset.type;
    if (!groupedAssets[type]) groupedAssets[type] = [];
    groupedAssets[type].push(asset);
    return groupedAssets;
  }, {});
}

const includePriceToCashAssets = async (
  cashAssetsArray: AssetWithoutPrice[]
) => {
  const currencyRates = await getCurrency();
  const transformedAssets = cashAssetsArray.map((item: AssetWithoutPrice) => {
    let price = 1;
    let total = +item.qtd;

    if (item.currency === 'CAD') {
      price = 1 / currencyRates.quotes?.USDCAD;
      total = +item.qtd / +currencyRates.quotes?.USDCAD;
    } else if (item.currency === 'BRL') {
      price = 1 / currencyRates.quotes?.USDBRL;
      total = +item.qtd / +currencyRates.quotes?.USDBRL;
    }

    return {
      ...item,
      qtd: numberFormatter.format(+item.qtd),
      price: price,
      total: total,
    };
  });

  return transformedAssets;
};

async function includePriceToCryptoAssets(
  cryptoAssetsArray: AssetWithoutPrice[]
): Promise<Asset[]> {
  const transformedAssets = await Promise.all(
    cryptoAssetsArray.map(async (item: AssetWithoutPrice) => {
      const thisCryptoPrice = await getCryptos(item.asset);
      const price = thisCryptoPrice.data[0].priceUsd;
      const total = price * +item.qtd;

      return {
        ...item,
        qtd: numberFormatter.format(+item.qtd),
        price: +price,
        total: total,
      };
    })
  );

  return transformedAssets;
}

const includePriceToStockAssets = async (
  stockAssetsArray: AssetWithoutPrice[]
): Promise<Asset[]> => {
  let symbolsPlusExchanges: string[] = [];
  stockAssetsArray.map(async (item: AssetWithoutPrice) => {
    symbolsPlusExchanges.push(`${item.asset}.${item.exchange}`);
  });

  const symbolsToMakeACall = symbolsPlusExchanges.toString();
  const callResult = await getStock(symbolsToMakeACall);

  const onlySymbolAndPriceArray = callResult.body.map((item: any) => {
    return {
      asset: item.symbol.split('.')[0],
      price: item.regularMarketPrice,
    };
  });

  const stockAssetsWithPrices: Asset[] = stockAssetsArray.map((item: any) => {
    const thisStock = onlySymbolAndPriceArray.find(
      (el: any) => el.asset === item.asset
    );

    return {
      ...item,
      price: thisStock.price,
      total: thisStock.price * +item.qtd,
    };
  });

  return stockAssetsWithPrices;
};
