import { fetchGlobalMetrics } from '@/lib/crypto.server';
import Dashboard from './dashboard';

export default async function DashboardPage() {
  // We need to upgrade the plan to have it
  // const globalMetrics = await fetchGlobalMetrics();
  // console.log('---  🚀 ---> | globalMetrics:', globalMetrics);

  return (
    <>
      <Dashboard />
    </>
  );
}
