'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { resetPassword } from '@/lib/actions/auth';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import Link from 'next/link';

export default function ResetPasswordPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({
        title: 'Error',
        description: 'Passwords do not match',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    try {
      const token = params.token as string;
      const res = await resetPassword(token, password);
      
      if (res.error) {
        toast({
          title: 'Error',
          description: res.error,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Success',
          description: 'Your password has been reset successfully. You can now sign in.',
        });
        router.push('/sign-in');
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
          <h1 className='text-3xl font-bold mb-2 text-slate-900 tracking-tight'>Reset Password</h1>
          <p className='text-slate-500 mb-8 text-center text-sm'>
            Please enter your new password below.
          </p>

          <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-full'>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='password'>New Password</Label>
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
            <div className='flex flex-col gap-2'>
              <Label htmlFor='confirmPassword'>Confirm New Password</Label>
              <Input
                id='confirmPassword'
                type='password'
                placeholder='••••••••'
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className='rounded-xl border-slate-200'
              />
            </div>
            <Button
              type='submit'
              disabled={loading}
              className='mt-2 py-6 bg-slate-900 text-white hover:bg-slate-800 transition-all duration-300 rounded-2xl shadow-md font-semibold'
            >
              {loading ? 'Resetting...' : 'Reset Password'}
            </Button>
          </form>

          <div className='mt-8 text-sm text-slate-500'>
            Back to{' '}
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
