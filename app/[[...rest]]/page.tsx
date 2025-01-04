import Image from 'next/image';
import { redirect } from 'next/navigation';

import { auth } from '@clerk/nextjs/server';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SignInPage from '../sign-in/page';

export default async function HomePage() {
  const { userId } = await auth();

  if (userId) {
    redirect(`/in`);
  }

  return (
    <main className='flex flex-col'>
      <Header />
      <div>
        {!userId && (
          <div className='flex w-full items-center justify-center my-8'>
            <div className='flex justify-center w-1/2'>
              <Image
                src='/money-pool.gif'
                width={1000}
                height={800}
                alt='Logo Koda Vault'
                priority={true}
                className='rounded-md object-cover'
              />
            </div>
            <div className='flex justify-center w-1/2'>
              <SignInPage />
            </div>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
