import { assetsSignal } from '@/context/signals';
import Assets from './assets';
import { Loading } from '@/components/Loading';

export default function AssetsPage() {
  return (
    <div className='mx-auto'>
      {assetsSignal.value ? (
        <Assets assets={assetsSignal.value?.assets} />
      ) : (
        <Loading />
      )}
    </div>
  );
}
