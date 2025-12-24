import { Asset } from '@/lib/types';
import CashAlert from './cash-alert';
import NoNotifications from './no-notification';

export default function NotificationsPanel({ cash }: { cash: Asset[] }) {
  return (
    <div className='flex flex-col gap-2'>
      <div>
        {cash.length > 0 && <CashAlert cash={cash} />}
        {cash.length < 1 && <NoNotifications />}
      </div>
      <div>
        <NoNotifications />
      </div>
    </div>
  );
}
