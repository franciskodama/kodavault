import type { Metadata } from 'next';

import './../components/ui/globals.css';
import { Outfit, Manrope } from 'next/font/google';

const outfit = Outfit({ subsets: ['latin'], display: 'swap' });
const manrope = Manrope({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: 'Trezo.App',
  description: 'Assets Analysis for Right Decisions',
  icons: {
    icon: '/favicon.ico',
  },
};

import { AuthProvider } from './providers';
import { Toaster } from '@/components/ui/toaster';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <html lang='en' className={outfit.className}>
        <body className='bg-[#FAFAFB] text-sm text-slate-600'>
          <div className='max-w-[1400px] mx-auto'>{children}</div>
          <Toaster />
        </body>
      </html>
    </AuthProvider>
  );
}
