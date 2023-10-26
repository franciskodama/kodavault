import { getServerSession } from 'next-auth';
import { getStockBr } from './lib/stock.server';
import { getCryptos } from './lib/crypto.server';
import { gabarito } from './layout';

export default async function Home() {
  const session = await getServerSession();
  const stockBr = await getStockBr('BVMF:IVVB11');
  const crypto = await getCryptos();

  console.log('---  🚀 ---> | crypto:', crypto);
  console.log('---  🚀 ---> | stockBr:', stockBr);

  return (
    <main className='flex h-screen flex-col items-center justify-between p-14'>
      <div className='z-10 max-w-5xl w-full h-full items-center justify-between font-mono text-sm border-2'>
        <div className='mb-32'>{`layout --> page.tsx`}</div>
        <div>IVVB11:{stockBr && stockBr.futures_chain[0].price}</div>
        {session?.user?.name ? (
          <div
            className='text-2xl'
            style={{
              fontFamily: 'gabarito',
            }}
          >
            {session?.user?.name}
          </div>
        ) : (
          <div>Not logged in</div>
        )}
      </div>
    </main>
  );
}
