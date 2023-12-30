import { currentUser } from '@clerk/nextjs';

import Home from './../components/Home';
import { redirect } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default async function HomePage() {
  const user = await currentUser();

  if (user) {
    redirect('/in/dashboard');
  }

  return (
    <main className='flex flex-col'>
      <Header />
      <div>{!user && <Home />}</div>
      <Footer />
    </main>
  );
}
