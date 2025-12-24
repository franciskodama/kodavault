import { Asset } from '@/lib/types';
import CashAlert from './cash-alert';
import NoNotifications from './no-notification';
import { getTotalByKey } from '@/lib/utils';

export default function NotificationsPanel({ assets }: { assets: Asset[] }) {
  const cash = assets.filter((asset) => asset?.type === 'Cash');
  const totalArray = getTotalByKey(assets, 'cash');
  const totalCash = totalArray[1]?.total;
  const totalNetWorth = totalArray.reduce(
    (sum: number, item) => sum + item.total,
    0
  );

  return (
    <div className='flex flex-col gap-2'>
      <div>
        {cash.length > 0 && (
          <CashAlert
            cash={cash}
            totalNetWorth={totalNetWorth}
            totalCash={totalCash}
          />
        )}
        {cash.length < 1 && <NoNotifications />}
      </div>
      <div>
        <NoNotifications />
      </div>
    </div>
  );
}
