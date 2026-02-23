import Image from 'next/image';
import { redirect } from 'next/navigation';

import { auth } from '@clerk/nextjs/server';
import { SignIn } from '@clerk/nextjs';

import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

export default async function HomePage() {
  const { userId } = await auth();

  if (userId) {
    redirect(`/dashboard`);
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
                alt='Money Pool'
                priority={true}
                className='rounded-md object-cover'
              />
            </div>
            <div className='flex justify-center w-1/2'>
              <SignIn forceRedirectUrl='/dashboard' />
            </div>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
