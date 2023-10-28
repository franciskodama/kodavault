import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import MainTable from '../assets/page';
import { getAssets } from '../lib/assets.server';
import { getCryptos } from '../lib/crypto.server';
import { getStockBr } from '../lib/stock.server';

export type Asset = {
  id: string;
  asset: string | null;
  qtd: string | null;
  wallet: string | null;
  created_at: string | null;
  type: string | null;
  uid: string;
};

export default async function ProtectedRoute() {
  const session = await getServerSession();

  if (!session || !session.user) {
    redirect('/api/auth/signin');
  }

  // const stockBr = await getStockBr('BVMF:IVVB11');
  // console.log('---  🚀 ---> | crypto:', crypto.data.BTC.quote.USD.price);

  let assets: Asset[] = [];

  if (session?.user?.email) {
    try {
      const assetData = await getAssets(session.user.email);
      if (Array.isArray(assetData)) {
        assets = assetData as Asset[];
      } else {
        console.error(assetData);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const includePriceToAssets = (assets: Asset[]) => {
    assets.map((item: Asset) => {
      if (item.type === 'Crypto') {
        const crypto = getCryptos(item.asset);
        console.log('---  🚀 ---> | crypto:', crypto);
      }
    });
  };

  console.log('---  🚀 ---> | assets:', assets);
  if (assets) {
    const test = includePriceToAssets(assets);
    console.log('---  🚀 ---> | test:', test);
  }

  return (
    <>
      {/* <div>IVVB11:{stockBr && stockBr.futures_chain[0].price}</div> */}
      {assets.length > 0 && <MainTable assets={assets} />}
    </>
  );
}

// {
//   id: '973096',
//   asset: 'USDT',
//   qtd: '5800.0000',
//   wallet: 'Wealthsimple',
//   created_at: '2023-09-02',
//   type: 'Cash',
//   uid: 'fk@fkodama.com'
// }
