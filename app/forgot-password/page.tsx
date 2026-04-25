'use client';

import { useState } from 'react';
import { requestPasswordReset } from '@/lib/actions/auth';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await requestPasswordReset(email);
      if (res.error) {
        toast({
          title: 'Error',
          description: res.error,
          variant: 'destructive',
        });
      } else {
        setSubmitted(true);
        toast({
          title: 'Email Sent',
          description: 'If an account exists with that email, we have sent password reset instructions.',
        });
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
      <div className='flex-1 flex w-full items-center justify-center py-12'>
        <div className='flex flex-col items-center bg-white p-8 sm:p-12 rounded-3xl shadow-xl border border-slate-100 w-full max-w-[450px] mx-4'>
          <h1 className='text-3xl font-bold mb-2 text-slate-900 tracking-tight'>Forgot Password</h1>
          <p className='text-slate-500 mb-8 text-center text-sm'>
            Enter your email address and we&apos;ll send you a link to reset your password.
          </p>

          {!submitted ? (
            <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-full'>
              <div className='flex flex-col gap-2'>
                <Label htmlFor='email'>Email Address</Label>
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
              <Button
                type='submit'
                disabled={loading}
                className='mt-2 py-6 bg-slate-900 text-white hover:bg-slate-800 transition-all duration-300 rounded-2xl shadow-md font-semibold'
              >
                {loading ? 'Sending link...' : 'Send Reset Link'}
              </Button>
            </form>
          ) : (
            <div className='text-center p-6 bg-slate-50 rounded-2xl w-full border border-slate-100'>
              <div className='w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4'>
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <p className='font-semibold text-slate-900 mb-2'>Email Dispatched</p>
              <p className='text-slate-500 text-sm'>
                Please check your inbox (and spam folder) for further instructions.
              </p>
            </div>
          )}

          <div className='mt-8 text-sm text-slate-500'>
            Remembered your password?{' '}
            <Link href='/sign-in' className='text-slate-900 font-semibold hover:underline'>
              Sign In
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
