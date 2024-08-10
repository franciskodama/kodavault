import { redirect } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { currentUser } from '@clerk/nextjs/server';
import Image from 'next/image';
import SignInPage from '../sign-in/page';
import { fetchAssets, fetchAssetsWithPrices } from '@/lib/assets';
import { signal } from '@preact/signals-react';

export default async function HomePage() {
  const user = await currentUser();
  // const uid = user?.emailAddresses?.[0]?.emailAddress;
  // console.log('---  🚀 ---> | uid:', uid);

  // const refreshAssets = async () => {
  //   try {
  //     if (uid) {
  //       const unpricedAssets = await fetchAssets(uid);
  //       const result = await fetchAssetsWithPrices(unpricedAssets);
  //     }
  //   } catch (error) {
  //     console.error('Error loading assets:', error);
  //   }
  // };

  // const assets = signal(await refreshAssets());
  // console.log('---  🚀 ---> | assets:', assets);

  if (user) {
    redirect('/in/dashboard');
  }

  return (
    <main className='flex flex-col'>
      <Header />
      <div>
        {!user && (
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
