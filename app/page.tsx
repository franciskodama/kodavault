import { auth } from '@clerk/nextjs';

import Home from './../components/Home';
import DashboardPage from './dashboard/page';

export default async function HomePage() {
  const { userId } = auth();

  return (
    <main className='flex w-full h-screen flex-col items-center justify-between p-14'>
      <div className='flex max-w-5xl w-full h-full items-start mt-32 justify-center'>
        {!userId ? <Home /> : <DashboardPage />}
      </div>
    </main>
  );
}
