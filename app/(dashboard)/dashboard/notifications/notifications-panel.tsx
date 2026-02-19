import { Asset } from '@/lib/types';
import CashAlert from './cash-alert';
import NoNotifications from './no-notification';
import { getTotalByKey } from '@/lib/utils';

export default function NotificationsPanel({ assets }: { assets: Asset[] }) {
  const cash = assets.filter(
    (asset): asset is NonNullable<Asset> => asset?.type === 'Cash'
  );
  const totalCash = cash.reduce((sum, asset) => sum + (asset.total || 0), 0);
  const totalNetWorth = assets.reduce(
    (sum, asset) => sum + (asset?.total || 0),
    0
  );

  return (
    <div className=''>
      {cash.length > 0 && (
        <CashAlert
          cash={cash}
          totalNetWorth={totalNetWorth}
          totalCash={totalCash}
        />
      )}
      {cash.length === 0 && <NoNotifications />}
    </div>
  );
}
