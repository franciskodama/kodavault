import { assetsSignal } from '@/context/signals';
import Assets from './assets';

export default function AssetsPage() {
  const assets = assetsSignal.value;
  console.log('---  🚀 ---> | assets:', assets);

  return (
    <div className='mx-auto'>{assets ? <Assets assets={assets} /> : null}</div>
  );
}
