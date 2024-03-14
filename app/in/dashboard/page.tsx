import { fetchGlobalMetrics } from '@/lib/crypto.server';
import Dashboard from './dashboard';
import { getCurrency } from '@/lib/currency.server';

export default async function DashboardPage() {
  // We need to upgrade the plan to have it
  // const globalMetrics = await fetchGlobalMetrics();
  // console.log('---  🚀 ---> | globalMetrics:', globalMetrics);

  const currencyRates = await getCurrency();

  return (
    <>
      <Dashboard currencyRates={currencyRates} />
    </>
  );
}
