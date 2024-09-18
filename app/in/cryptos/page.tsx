import { getAllTimeHighData } from '@/lib/crypto.server';
import Cryptos from './cryptos';

export default async function CryptosPage() {
  const allTimeHighData = await getAllTimeHighData();
  const athAssets = allTimeHighData.map(
    (crypto: { symbol: string; ath: number; image: string }) => ({
      symbol: crypto.symbol.toUpperCase(),
      image: crypto.image,
      ath: crypto.ath,
    })
  );
  console.log('---  🚀 ---> | athAssets:', athAssets);

  return (
    <div className='mx-auto'>
      <Cryptos athAssets={athAssets} />
    </div>
  );
}
