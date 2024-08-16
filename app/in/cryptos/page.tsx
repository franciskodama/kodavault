import { assetsSignal } from '@/context/signals';
import Cryptos from './cryptos';

export default function CryptosPage() {
  return (
    <>
      {assetsSignal.value ? (
        <Cryptos cryptoAssets={assetsSignal.value?.assetsByType.Crypto} />
      ) : null}
    </>
  );
}
