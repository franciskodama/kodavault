import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import MainTable from '../assets/page';
import { getAssets } from '../lib/assets.server';
import { getCryptos } from '../lib/crypto.server';
import { getStockBr } from '../lib/stock.server';

export type Asset = {
  id: string;
  asset: string;
  qtd: string;
  wallet: string;
  created_at: string;
  type: string;
  uid: string;
};

export default async function ProtectedRoute() {
  const session = await getServerSession();

  if (!session || !session.user) {
    redirect('/api/auth/signin');
  }

  const stockBr = await getStockBr('BVMF:IVVB11');
  const crypto = await getCryptos();

  let assets: Asset[] | [] | null | undefined | any = [];
  if (session?.user?.email) {
    try {
      assets = await getAssets(session.user.email);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div>This is a protected route.</div>
      {/* <div>IVVB11:{stockBr && stockBr.futures_chain[0].price}</div> */}

      {assets && <MainTable assets={assets} />}
    </>
  );
}
