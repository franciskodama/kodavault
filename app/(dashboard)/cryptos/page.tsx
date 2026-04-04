import Cryptos, { AllCryptosData } from './cryptos';
import { getCryptosData } from '@/lib/crypto.server';
import { getProjections } from '@/lib/actions';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export default async function CryptosPage() {
  const session = await getServerSession(authOptions);
  const uid = session?.user?.email;

  const cryptosData = (await getCryptosData()) || [];
  const projectionsData = await getProjections(uid ? uid : '');

  const allCryptosData = cryptosData.map((crypto: AllCryptosData) => ({
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
