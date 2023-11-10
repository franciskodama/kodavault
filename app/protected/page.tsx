import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import MainTable from '../assets/page';
import { getAssets } from '../lib/assets.server';
import { getCryptos } from '../lib/crypto.server';
import { getStock, getStockUsd } from '../lib/stock.server';
import { getCurrency } from '../lib/currency.server';
import { numberFormatter } from '../lib/utils';

export type AssetWithoutPrice = {
  id: string;
  walllet: string;
  account: string;
  asset: string;
  qtd: string;
  wallet: string;
  created_at: string;
  type: string;
  subtype: string;
  currency: string;
  uid: string;
  exchange: string;
};

export type Asset =
  | undefined
  | (AssetWithoutPrice & {
      price?: number | string;
      total?: number | string;
    });

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
      price: numberFormatter.format(price),
      total: numberFormatter.format(total),
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
        price: numberFormatter.format(price),
        total: numberFormatter.format(total),
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
    symbolsPlusExchanges.push(
      `${item.asset}.${item.exchange === 'NASDAQ' ? '' : item.exchange}`
    );

    // fix here that MSFT is not found beacause of the exchange
  });

  const symbolsToMakeACall = symbolsPlusExchanges.toString();
  const callResult = await getStock(symbolsToMakeACall);

  console.log('---  🚀 ---> | callResult:', callResult);

  const onlySymbolAndPriceArray = callResult.body.map((item: any) => {
    return {
      asset: item.symbol.split('.')[0],
      price: item.regularMarketPrice,
    };
  });

  console.log(
    '---  🚀 ---> | onlySymbolAndPriceArray:',
    onlySymbolAndPriceArray
  );

  const stockAssetsWithPrices: Asset[] = stockAssetsArray.map((item: any) => {
    const thisStock = onlySymbolAndPriceArray.find(
      (el: any) => el.asset === item.asset
    );
    return {
      ...item,
      price: numberFormatter.format(thisStock.price),
      total: numberFormatter.format(thisStock.price * +item.qtd),
    };
  });

  console.log('---  🚀 ---> | stockAssetsWithPrices:', stockAssetsWithPrices);

  return stockAssetsWithPrices;
};

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
          {assetsWithPricesArray.length > 0 ? (
            <MainTable assets={assetsWithPricesArray} />
          ) : (
            <div className='my-32'>Not loaded yet</div>
          )}
        </>
      );
    } else {
      return <div className='my-32'>No assets found</div>;
    }
  } catch (error) {
    console.error(error);
    return <div className='my-32'>Error loading assets</div>;
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
