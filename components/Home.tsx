import SignInPage from '@/app/sign-in/page';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className='flex w-full items-center justify-center my-8'>
      <div className='flex justify-center w-1/2'>
        <Image
          src='/money-pool.gif'
          width={1000}
          height={800}
          alt='Logo Koda Vault'
          className='rounded-md object-cover'
        />
      </div>

      <div className='flex justify-center w-1/2'>
        <SignInPage />
      </div>
    </div>
  );
}
