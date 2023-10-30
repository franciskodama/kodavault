import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import MainTable from '../assets/page';
import { getAssets } from '../lib/assets.server';
import { getCryptos } from '../lib/crypto.server';
import { getStockBr } from '../lib/stock.server';

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
      price?: number;
      total?: number;
    });

export default async function ProtectedRoute() {
  const session = await getServerSession();

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
        price: thisCryptoPrice.data[0].priceUsd,
        total: thisCryptoPrice.data[0].priceUsd * +item.qtd,
      };
    }
    if (item.type !== 'Crypto') {
      const thisStockPrice = await getCryptos(item.asset);
      return {
        ...item,
        price: 0,
        total: 0,
      };
    }
  };

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
