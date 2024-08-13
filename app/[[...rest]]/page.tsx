import { redirect } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { currentUser } from '@clerk/nextjs/server';
import Image from 'next/image';
import SignInPage from '../sign-in/page';
import { fetchAssets, fetchAssetsWithPrices } from '@/lib/assets';
import { signal } from '@preact/signals-react';
import { AssetsByType, UnpricedAsset } from '@/lib/types';
import { Asset } from '@prisma/client';

export default async function HomePage() {
  const user = await currentUser();
  const uid = user?.emailAddresses?.[0]?.emailAddress;
  const assetsSignal = signal<AssetsByType | undefined>(undefined);
  const loadingSignal = signal<boolean>(true);
  const errorSignal = signal<Error | undefined>(undefined);
  const fetchRawAssets = async () => {
    try {
      if (uid) {
        const unpricedAssets = await fetchAssets(uid);
        const result = await fetchAssetsWithPrices(unpricedAssets);
        assetsSignal.value = result; // Update the signal with fetched assets
      }
    } catch (error) {
      console.error('Error loading assets:', error);
      errorSignal.value = error as Error; // Update the signal with the error
    } finally {
      loadingSignal.value = false; // Set loading state to false
    }
  };

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
