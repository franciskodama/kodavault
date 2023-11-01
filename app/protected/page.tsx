import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import MainTable from '../assets/page';
import { getAssets } from '../lib/assets.server';
import { getCryptos } from '../lib/crypto.server';
import { getStockBr } from '../lib/stock.server';
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

export default async function ProtectedRoute() {
  const session = await getServerSession();
  const currencyRates = await getCurrency();
  console.log('---  🚀 ---> | currencyRates:', currencyRates);

  if (!session || !session.user) {
    redirect('/api/auth/signin');
  }

  let assets: AssetWithoutPrice[] = [];

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

  const includePriceToAsset = async (item: AssetWithoutPrice) => {
    if (item.type === 'Crypto') {
      const thisCryptoPrice = await getCryptos(item.asset);
      return {
        ...item,
        price: numberFormatter.format(thisCryptoPrice.data[0].priceUsd),
        total: numberFormatter.format(
          thisCryptoPrice.data[0].priceUsd * +item.qtd
        ),
      };
    }

    if (item.type === 'Stock') {
      return {
        ...item,
        price: 1,
        total: 1,
      };
    }

    if (item.type === 'Cash') {
      if (item.currency === 'CAD') {
        return {
          ...item,
          price: numberFormatter.format(1 / currencyRates.quotes.USDCAD),
          total: numberFormatter.format(
            +item.qtd / +currencyRates.quotes.USDCAD
          ),
        };
      }

      if (item.currency === 'BRL') {
        return {
          ...item,
          price: numberFormatter.format(1 / currencyRates.quotes.USDBRL),
          total: numberFormatter.format(
            +item.qtd / +currencyRates.quotes.USDBRL
          ),
        };
      }

      if (item.currency === 'USD') {
        return {
          ...item,
          price: 1,
          total: numberFormatter.format(+item.qtd),
        };
      }
    }
  };

  // thisCashPrice: {
  //   success: true,
  //   terms: 'https://currencylayer.com/terms',
  //   privacy: 'https://currencylayer.com/privacy',
  //   timestamp: 1698713463,
  //   source: 'USD',
  //   quotes: {
  //     USDAED: 3.672972,

  let assetsWithPricesArray: Asset[] = [];
  if (assets) {
    const asyncTasks = assets.map(async (asset: AssetWithoutPrice) => {
      const assetWithPrice: Asset = await includePriceToAsset(asset);
      return assetWithPrice;
    });
    assetsWithPricesArray = await Promise.all(asyncTasks);
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

// assetsWithPricesArray.push(assetWithPrice);
// {/* <div>IVVB11:{stockBr && stockBr.futures_chain[0].price}</div> */}
// const stockBr = await getStockBr('BVMF:IVVB11');
