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

// Function to include Price to Cash Assets ------------------------
const includePriceToCashAssets = async (
  cashAssetsArray: AssetWithoutPrice[]
) => {
  const currencyRates = await getCurrency();

  cashAssetsArray.map(async (item: AssetWithoutPrice) => {
    if (item.currency === 'CAD') {
      cashAssetsArrayWithPrices.push({
        ...item,
        qtd: numberFormatter.format(+item.qtd),
        price: numberFormatter.format(1 / currencyRates.quotes?.USDCAD),
        total: numberFormatter.format(
          +item.qtd / +currencyRates.quotes?.USDCAD
        ),
      });
    }
    if (item.currency === 'BRL') {
      cashAssetsArrayWithPrices.push({
        ...item,
        qtd: numberFormatter.format(+item.qtd),

        price: numberFormatter.format(1 / currencyRates.quotes?.USDBRL),
        total: numberFormatter.format(
          +item.qtd / +currencyRates.quotes?.USDBRL
        ),
      });
    }
    if (item.currency === 'USD') {
      cashAssetsArrayWithPrices.push({
        ...item,
        qtd: numberFormatter.format(+item.qtd),
        price: 1,
        total: numberFormatter.format(+item.qtd),
      });
    }
  });
};

let cryptoAssetsArrayWithPrices: Asset[] = [];
let cashAssetsArrayWithPrices: Asset[] = [];
let stocksAssetsArrayWithPrices: Asset[] = [];
let assetsWithPricesArray: Asset[] = [];

// Function to include Price to Crypto Assets ------------------------
const includePriceToCryptoAssets = async (
  cryptoAssetsArray: AssetWithoutPrice[]
) => {
  cryptoAssetsArray.map(async (item: AssetWithoutPrice) => {
    const thisCryptoPrice = await getCryptos(item.asset);
    cryptoAssetsArrayWithPrices.push({
      ...item,
      qtd: numberFormatter.format(+item.qtd),
      price: numberFormatter.format(thisCryptoPrice.data[0].priceUsd),
      total: numberFormatter.format(
        thisCryptoPrice.data[0].priceUsd * +item.qtd
      ),
    });
  });
};

const includePriceToStockAssets = async (stocksGroupedByCurrencyArray: any) => {
  // stocksGroupedByCurrencyArray.BRL.map(async (item: AssetWithoutPrice) => {
  //--------------------------------------
  // if (item.currency === 'BRL') {
  //   const thisStockPrice = await getStock(`${item.asset}.SA`);
  //   if (thisStockPrice.body) {
  //     return {
  //       ...item,
  //       price: numberFormatter.format(
  //         thisStockPrice.body[0]?.regularMarketPrice
  //       ),
  //       total: numberFormatter.format(
  //         thisStockPrice.body[0]?.regularMarketPrice * +item.qtd
  //       ),
  //     };
  //   }
  //   if (!thisStockPrice.body) {
  //     return {
  //       ...item,
  //       price: 1,
  //       total: 1,
  //     };
  //   }
  // }
  // if (item.currency === 'CAD') {
  //   const thisStockPrice = await getStock(`${item.asset}.TO`);
  //   if (thisStockPrice.body) {
  //     return {
  //       ...item,
  //       price: numberFormatter.format(
  //         thisStockPrice.body[0]?.regularMarketPrice
  //       ),
  //       total: numberFormatter.format(
  //         thisStockPrice.body[0]?.regularMarketPrice * +item.qtd
  //       ),
  //     };
  //   }
  //   if (!thisStockPrice.body) {
  //     return {
  //       ...item,
  //       price: 1,
  //       total: 1,
  //     };
  //   }
  // }
  // if (item.currency === 'USD') {
  //   const thisStockPrice = await getStockUsd(`${item.asset}:NASDAQ`);
  //   return {
  //     ...item,
  //     price: numberFormatter.format(thisStockPrice?.previous_close),
  //     total: numberFormatter.format(
  //       thisStockPrice?.previous_close * +item.qtd
  //     ),
  //   };
  // }
  //--------------------------------------
  // });
};

export default async function ProtectedRoute() {
  const session = await getServerSession();

  // Get User -------------------------------------------
  if (!session || !session.user) {
    redirect('/api/auth/signin');
  }

  // Get Assets from Database ---------------------------
  if (session?.user?.email) {
    try {
      const assetData = await getAssets(session.user.email);
      if (Array.isArray(assetData)) {
        assets = assetData as AssetWithoutPrice[];
      } else {
        console.error(assetData);
      }
    } catch (error) {
      console.error(error);
    }
  }

  if (assets.length > 0) {
    // Get Grouped Assets By Type ------------------------
    const assetsGroupedByType = assets.reduce(
      (groupedAssets: any, asset: AssetWithoutPrice) => {
        const type = asset.type;
        if (!groupedAssets[type]) groupedAssets[type] = [];
        groupedAssets[type].push(asset);
        return groupedAssets;
      },
      {}
    );

    const cryptoAssetsWithPrice: Asset[] | void =
      await includePriceToCryptoAssets(assetsGroupedByType.Crypto);

    const cashAssetsWithPrice: Asset[] | void = await includePriceToCashAssets(
      assetsGroupedByType.Cash
    );

    const stockAssetsWithPrice: Asset[] | void =
      await includePriceToStockAssets(assetsGroupedByType.Stock);

    assetsWithPricesArray = [
      ...cryptoAssetsArrayWithPrices,
      ...cashAssetsArrayWithPrices,
      ...stocksAssetsArrayWithPrices,
    ];
  }

  return (
    <>
      {assetsWithPricesArray.length > 0 ? (
        <MainTable assets={assetsWithPricesArray} />
      ) : (
        <div className='my-32'>Not loaded yet</div>
      )}
    </>
  );
}

async function fetchAssets(userEmail) {
  const assetData = await getAssets(userEmail);
  if (Array.isArray(assetData)) {
    return assetData as AssetWithoutPrice[];
  } else {
    console.error(assetData);
    return [];
  }
}

async function fetchAssetsWithPrices(assets) {
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

function groupAssetsByType(assets) {
  return assets.reduce((groupedAssets, asset) => {
    const type = asset.type;
    if (!groupedAssets[type]) groupedAssets[type] = [];
    groupedAssets[type].push(asset);
    return groupedAssets;
  }, {});
}
