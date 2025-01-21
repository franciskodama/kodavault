import Cryptos from './cryptos';
import { getAllTimeHighData } from '@/lib/crypto.server';
import { getProjections } from '@/lib/actions';
import { currentUser } from '@clerk/nextjs/server';

export default async function CryptosPage() {
  const user = await currentUser();
  const uid = user?.emailAddresses?.[0]?.emailAddress;

  const allTimeHighData = (await getAllTimeHighData()) || [];
  console.log('---  🚀 ---> | allTimeHighData:', allTimeHighData);
  const projectionsData = await getProjections(uid ? uid : '');

  const athImageData = allTimeHighData.map(
    (crypto: { symbol: string; ath: number; image: string }) => ({
      symbol: crypto.symbol.toUpperCase(),
      image: crypto.image,
      ath: crypto.ath,
    })
  );

  return (
    <div className='mx-auto'>
      <Cryptos
        athImageData={athImageData}
        projections={projectionsData ? projectionsData : []}
      />
    </div>
  );
}
