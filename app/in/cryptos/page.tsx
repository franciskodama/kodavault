import Cryptos, { AllCryptosData } from './cryptos';
import { getAllTimeHighData } from '@/lib/crypto.server';
import { getProjections } from '@/lib/actions';
import { currentUser } from '@clerk/nextjs/server';

export default async function CryptosPage() {
  const user = await currentUser();
  const uid = user?.emailAddresses?.[0]?.emailAddress;

  const allTimeHighData = (await getAllTimeHighData()) || [];
  const projectionsData = await getProjections(uid ? uid : '');

  const allCryptosData = allTimeHighData.map((crypto: AllCryptosData) => ({
    symbol: crypto.symbol.toUpperCase(),
    image: crypto.image,
    ath: crypto.ath,
    market_cap_rank: crypto.market_cap_rank,
    current_price: crypto.current_price,
    market_cap: crypto.market_cap,
    price_change_percentage_24h: crypto.price_change_percentage_24h,
    total_volume: crypto.total_volume,
    circulating_supply: crypto.circulating_supply,
    max_supply: crypto.max_supply,
  }));

  return (
    <div className='mx-auto'>
      <Cryptos
        allCryptosData={allCryptosData}
        projections={projectionsData ? projectionsData : []}
      />
    </div>
  );
}
