import { auth } from '@clerk/nextjs';

import Home from './../components/Home';
import DashboardPage from './in/dashboard/page';

export default async function HomePage() {
  const { userId } = auth();

  return (
    <main>
      <div>{!userId ? <Home /> : <DashboardPage />}</div>
    </main>
  );
}
