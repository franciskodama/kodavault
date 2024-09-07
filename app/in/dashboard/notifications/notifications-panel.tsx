import { Asset } from '@/lib/types';
import CashAlert from './cash-alert';
import NoNotifications from './no-notification';
import TagAlert from './tag-alert';

export default function NotificationsPanel({ cash }: { cash: Asset[] }) {
  return (
    <>
      <div className='flex flex-col gap-2 flex-1'>
        {cash.length > 0 && <CashAlert cash={cash} />}
        {cash.length < 1 && <NoNotifications />}
        <TagAlert />
      </div>
    </>
  );
}
