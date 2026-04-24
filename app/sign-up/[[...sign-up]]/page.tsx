'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signUp } from '@/lib/actions/user';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { toast } from 'sonner';

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await signUp(formData.email, formData.password, formData.name);
      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success('Account created successfully! You can now sign in.');
        router.push('/sign-in');
      }
    } catch (err) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className='flex flex-col min-h-screen'>
      <Header />
      <div className='flex-1 flex w-full items-center justify-center py-12'>
        <div className='flex flex-col items-center bg-white p-8 sm:p-12 rounded-3xl shadow-xl border border-slate-100 w-full max-w-[450px] mx-4'>
          <h1 className='text-3xl font-bold mb-2 text-slate-900 tracking-tight'>Create Account</h1>
          <p className='text-slate-500 mb-8 text-center text-sm'>
            Start tracking your assets with Trezo today.
          </p>

          <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-full'>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='name'>Full Name</Label>
              <Input
                id='name'
                type='text'
                placeholder='John Doe'
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className='rounded-xl border-slate-200'
              />
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                type='email'
                placeholder='name@example.com'
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className='rounded-xl border-slate-200'
              />
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='password'>Password</Label>
              <Input
                id='password'
                type='password'
                placeholder='••••••••'
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className='rounded-xl border-slate-200'
              />
            </div>
            <Button
              type='submit'
              disabled={loading}
              className='mt-2 py-6 bg-slate-900 text-white hover:bg-slate-800 transition-all duration-300 rounded-2xl shadow-md font-semibold'
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </Button>
          </form>

          <div className='mt-8 text-sm text-slate-500'>
            Already have an account?{' '}
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
