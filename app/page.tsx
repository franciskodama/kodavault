import { auth } from '@clerk/nextjs';

import Home from './../components/Home';
import InPage from './in/page';

export default async function HomePage() {
  const { userId } = auth();

  return (
    <main>
      <div>{!userId ? <Home /> : <InPage />}</div>
    </main>
  );
}
