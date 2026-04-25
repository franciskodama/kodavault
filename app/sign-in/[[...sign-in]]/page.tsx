'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleCredentialsSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl: '/dashboard',
      });

      if (result?.error) {
        toast({
          title: 'Error',
          description: result.error,
          variant: 'destructive',
        });
      } else {
        window.location.href = '/dashboard';
      }
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Something went wrong',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className='flex flex-col min-h-screen'>
      <Header />
      <div className='flex-1 flex w-full items-center justify-center pb-8'>
        <div className='flex flex-col lg:flex-row items-stretch justify-between gap-12 max-w-[1400px] w-full px-4'>
          <div className='hidden lg:flex flex-1 overflow-hidden rounded-3xl shadow-2xl'>
            <div className='grid grid-cols-6 gap-1 w-full h-full p-1 bg-slate-50'>
              {Array.from({ length: 30 }).map((_, i) => (
                <div key={i} className='relative aspect-square'>
                  <Image
                    src={`/welcome/welcome-${(i % 45) + 1}.webp`}
                    alt={`Welcome ${i + 1}`}
                    fill
                    className='object-cover rounded-md'
                  />
                </div>
              ))}
            </div>
          </div>
          <div className='flex-1 flex justify-end w-full max-w-[450px]'>
            <div className='flex flex-col items-center bg-white p-8 sm:p-12 rounded-3xl shadow-xl border border-slate-100 w-full'>
              <h1 className='text-3xl font-bold mb-2 text-slate-900 tracking-tight'>
                Welcome back!
                <span className='ml-4 text-4xl'>👋</span>
              </h1>
              <p className='text-slate-500 mb-8 text-center text-sm'>
                Sign in to your personal dashboard to track your assets.
              </p>

              <form
                onSubmit={handleCredentialsSignIn}
                className='flex flex-col gap-4 w-full mb-8'
              >
                <div className='flex flex-col gap-2'>
                  <Input
                    id='email'
                    type='email'
                    placeholder='name@example.com'
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='rounded-xl border-slate-200'
                  />
                </div>
                <div className='flex flex-col gap-2'>
                  <Input
                    id='password'
                    type='password'
                    placeholder='••••••••'
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='rounded-xl border-slate-200'
                  />
                </div>
                <div className='flex justify-center'>
                  <Link
                    href='/forgot-password'
                    className='text-xs text-slate-500 hover:text-slate-900 transition-colors font-medium'
                  >
                    Forgot Password?
                  </Link>
                </div>
                <Button
                  type='submit'
                  disabled={loading}
                  className='mt-2 py-6 bg-slate-900 text-white hover:bg-slate-800 transition-all duration-300 rounded-2xl shadow-md font-semibold'
                >
                  {loading ? 'Signing in...' : 'Sign In'}
                </Button>
              </form>

              <div className='relative w-full mb-8'>
                <div className='absolute inset-0 flex items-center'>
                  <span className='w-full border-t border-slate-100'></span>
                </div>
                <div className='relative flex justify-center text-xs uppercase'>
                  <span className='bg-white py-4 px-4 text-slate-400 font-medium'>
                    Or
                  </span>
                </div>
              </div>

              <div className='flex flex-col gap-4 w-full'>
                <Button
                  onClick={() =>
                    signIn('google', { callbackUrl: '/dashboard' })
                  }
                  className='flex items-center justify-center gap-4 py-6 bg-white text-slate-700 border-2 border-slate-100 hover:border-slate-200 hover:bg-slate-50 transition-all duration-300 rounded-2xl shadow-sm group'
                >
                  <div className='w-6 h-6 flex items-center justify-center grayscale group-hover:grayscale-0 transition-all'>
                    <Image
                      src='https://www.gstatic.com/images/branding/product/2x/googleg_48dp.png'
                      alt='Google'
                      width={20}
                      height={20}
                    />
                  </div>
                  <span className='font-semibold'>Google</span>
                </Button>

                <Button
                  onClick={() =>
                    signIn('github', { callbackUrl: '/dashboard' })
                  }
                  className='flex items-center justify-center gap-4 py-6 bg-[#24292F] text-white hover:bg-[#1a1e22] transition-all duration-300 rounded-2xl shadow-md border-none group'
                >
                  <div className='w-6 h-6 flex items-center justify-center'>
                    <svg
                      viewBox='0 0 24 24'
                      width='20'
                      height='20'
                      stroke='currentColor'
                      strokeWidth='2'
                      fill='none'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      className='text-white fill-current'
                    >
                      <path d='M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22'></path>
                    </svg>
                  </div>
                  <span className='font-semibold'>GitHub</span>
                </Button>
              </div>

              <div className='mt-8 text-sm text-slate-500'>
                Don&apos;t have an account?{' '}
                <Link
                  href='/sign-up'
                  className='text-slate-900 font-semibold hover:underline'
                >
                  Sign Up
                </Link>
              </div>

              <p className='mt-8 text-[10px] text-slate-400 font-bold uppercase tracking-widest'>
                Secure authentication
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
