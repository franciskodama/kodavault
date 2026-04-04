'use client';

import Image from 'next/image';
import { signIn } from 'next-auth/react';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { Button } from '@/components/ui/button';

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
          <div className='flex flex-col items-center bg-white p-12 rounded-3xl shadow-xl border border-slate-100'>
            <h1 className='text-3xl font-bold mb-2 text-slate-900 tracking-tight'>Welcome back!</h1>
            <p className='text-slate-500 mb-10 text-center text-sm'>
              Sign in to your personal dashboard to track your assets.
            </p>
            
            <div className='flex flex-col gap-4 w-full max-w-[280px]'>
              <Button 
                onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
                className='flex items-center justify-center gap-4 py-6 bg-white text-slate-700 border-2 border-slate-100 hover:border-slate-200 hover:bg-slate-50 transition-all duration-300 rounded-2xl shadow-sm group'
              >
                <div className='w-6 h-6 flex items-center justify-center grayscale group-hover:grayscale-0 transition-all'>
                  <Image 
                    src="https://www.gstatic.com/images/branding/product/2x/googleg_48dp.png" 
                    alt="Google" 
                    width={20} 
                    height={20} 
                  />
                </div>
                <span className='font-semibold'>Google</span>
              </Button>

              <Button 
                onClick={() => signIn('github', { callbackUrl: '/dashboard' })}
                className='flex items-center justify-center gap-4 py-6 bg-slate-900 text-white hover:bg-slate-800 transition-all duration-300 rounded-2xl shadow-md border-none group'
              >
                <div className='w-6 h-6 flex items-center justify-center'>
                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-white fill-current">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                </div>
                <span className='font-semibold'>GitHub</span>
              </Button>
            </div>
            
            <p className='mt-8 text-xs text-slate-400 font-medium'>
              Secure authentication via personal providers
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
