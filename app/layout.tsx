import './../components/ui/globals.css';
import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';

import { Gabarito, Cairo_Play, Inter } from 'next/font/google';
import Header from '../components/Header';
import Footer from './dashboard/footer/footer';

// See font optimization with Tailwind -->  https://nextjs.org/docs/app/building-your-application/optimizing/fonts
// export const gabarito = Gabarito({ subsets: ['latin'], display: 'swap' });
// export const cairoPlay = Cairo_Play({ subsets: ['latin'], display: 'swap' });

export const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: 'Koda Vault',
  description: 'Assets Analysis for Right Decisions',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body className={`${inter.className} bg-[#FAFAFB]`}>
          <main className='mx-auto max-w-[1400px] text-xl gap-2'>
            <Header />
            {children}
            <Footer />
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
