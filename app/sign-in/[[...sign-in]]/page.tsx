import Image from 'next/image';
import { SignIn } from '@clerk/nextjs';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

export default function SignInPage() {
  return (
    <main className='flex flex-col'>
      <Header />
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
          <div className='relative'>
            <SignIn />
            <div className='absolute top-10 -left-2 w-10 h-[20em] bg-[#FAFAFB]' />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
