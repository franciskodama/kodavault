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

export default async function ProtectedRoute() {
  const session = await getServerSession();

  // Get User -------------------------------------------
  if (!session || !session.user) {
    redirect('/api/auth/signin');
  }

  let assets: AssetWithoutPrice[] = [];

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

  if (assets) {
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

    // Get Grouped Assets By Type and Currency ------------
    const stocksGroupedByCurrency = assetsGroupedByType.Stock.reduce(
      (groupedStocks: any, stock: AssetWithoutPrice) => {
        const currency = stock.currency;
        if (!groupedStocks[currency]) groupedStocks[currency] = [];
        groupedStocks[currency].push(stock);
        return groupedStocks;
      },
      {}
    );

    includePriceToCryptoAssets(assetsGroupedByType.Crypto);
    includePriceToCashAssets(assetsGroupedByType.Cash);
  }

  assetsWithPricesArray = [
    ...cryptoAssetsArrayWithPrices,
    ...cashAssetsArrayWithPrices,
    ...stocksAssetsArrayWithPrices,
  ];
  console.log('---  🚀 ---> | assetsWithPricesArray:', assetsWithPricesArray);

  //   const asyncTasks = assets.map(async (asset: AssetWithoutPrice) => {
  //     const assetWithPrice: Asset = await includePriceToAsset(asset);
  //     return assetWithPrice;
  //   });
  //   assetsWithPricesArray = await Promise.all(asyncTasks);
  // }

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

// assetsWithPricesArray.push(assetWithPrice);
// {/* <div>IVVB11:{stockBr && stockBr.futures_chain[0].price}</div> */}
// const stockBr = await getStockBr('BVMF:IVVB11');

const includePriceToAsset = async (item: AssetWithoutPrice) => {
  // https://marketstack.com/documentation

  if (item.type === 'Stock') {
    if (item.currency === 'BRL') {
      const thisStockPrice = await getStock(`${item.asset}.SA`);

      if (thisStockPrice.body) {
        return {
          ...item,
          price: numberFormatter.format(
            thisStockPrice.body[0]?.regularMarketPrice
          ),
          total: numberFormatter.format(
            thisStockPrice.body[0]?.regularMarketPrice * +item.qtd
          ),
        };
      }

      if (!thisStockPrice.body) {
        return {
          ...item,
          price: 1,
          total: 1,
        };
      }
    }

    if (item.currency === 'CAD') {
      const thisStockPrice = await getStock(`${item.asset}.TO`);
      if (thisStockPrice.body) {
        return {
          ...item,
          price: numberFormatter.format(
            thisStockPrice.body[0]?.regularMarketPrice
          ),
          total: numberFormatter.format(
            thisStockPrice.body[0]?.regularMarketPrice * +item.qtd
          ),
        };
      }
      if (!thisStockPrice.body) {
        return {
          ...item,
          price: 1,
          total: 1,
        };
      }
    }

    if (item.currency === 'USD') {
      const thisStockPrice = await getStockUsd(`${item.asset}:NASDAQ`);
      return {
        ...item,
        price: numberFormatter.format(thisStockPrice?.previous_close),
        total: numberFormatter.format(
          thisStockPrice?.previous_close * +item.qtd
        ),
      };
    }
  }
};
