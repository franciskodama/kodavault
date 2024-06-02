import Dashboard from './dashboard';
import { currencyRatesApiStatus, getCurrency } from '@/lib/currency.server';

export default async function DashboardPage() {
  const currencyRates = await getCurrency();
  // const getCurrencyApiStatus = await currencyRatesApiStatus();

  return (
    <>
      <Dashboard currencyRates={currencyRates} />
    </>
  );
}
