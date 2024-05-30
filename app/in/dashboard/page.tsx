import { fetchGlobalMetrics } from '@/lib/crypto.server';
import Dashboard from './dashboard';
import { currencyRatesApiStatus, getCurrency } from '@/lib/currency.server';

export default async function DashboardPage() {
  // We need to upgrade the plan to have it
  // const globalMetrics = await fetchGlobalMetrics();
  // console.log('---  🚀 ---> | globalMetrics:', globalMetrics);

  const currencyRates = await getCurrency();

  // ===============================================================
  const getCurrencyApiStatus = await currencyRatesApiStatus();
  console.log('---  🚀 ---> | getCurrencyApiStatus:', getCurrencyApiStatus);
  console.log('---  🚀 ---> | currencyRates:', currencyRates);
  // ===============================================================

  return (
    <>
      <Dashboard currencyRates={currencyRates} />
    </>
  );
}
