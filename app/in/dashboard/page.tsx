import Dashboard from './dashboard';
import { getCurrency } from '@/lib/currency.server';

export default async function DashboardPage() {
  const currencyRates = await getCurrency();

  return <>{currencyRates && <Dashboard currencyRates={currencyRates} />}</>;
}
