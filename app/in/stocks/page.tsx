import { assetsSignal } from '@/context/signals';
import Stocks from './stocks';

export default function StocksPage() {
  return (
    <>
      {assetsSignal.value ? (
        <Stocks stockAssets={assetsSignal.value?.assetsByType.Stocks} />
      ) : null}
    </>
  );
}
