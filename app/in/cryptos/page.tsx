import { getAllTimeHighData } from '@/lib/crypto.server';
import Cryptos from './cryptos';

export default async function CryptosPage() {
  const allTimeHighData = await getAllTimeHighData();

  const athImageData = allTimeHighData.map(
    (crypto: { symbol: string; ath: number; image: string }) => ({
      symbol: crypto.symbol.toUpperCase(),
      image: crypto.image,
      ath: crypto.ath,
    })
  );

  return (
    <div className='mx-auto'>
      <Cryptos athImageData={athImageData} />
    </div>
  );
}
