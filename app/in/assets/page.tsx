import { assetsSignal } from '@/context/signals';
import Assets from './assets';

export default function AssetsPage() {
  return (
    <div className='mx-auto'>
      {assetsSignal.value ? (
        <Assets assets={assetsSignal.value?.assets} />
      ) : null}
    </div>
  );
}
