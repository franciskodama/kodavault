import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import './../components/ui/globals.css';
import { Gabarito, Cairo_Play, Inter } from 'next/font/google';

import { AssetsProvider } from '@/context/AssetsContext';

// See font optimization with Tailwind -->  https://nextjs.org/docs/app/building-your-application/optimizing/fonts
// export const gabarito = Gabarito({ subsets: ['latin'], display: 'swap' });
// export const cairoPlay = Cairo_Play({ subsets: ['latin'], display: 'swap' });

// export const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: 'Koda Vault',
  description: 'Assets Analysis for Right Decisions',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body
          // className={`${inter.className} bg-[#FAFAFB] text-xs text-slate-600`}
          className={`bg-[#FAFAFB] text-xs text-slate-600`}
        >
          <div className='max-w-[1400px] mx-auto'>
            <AssetsProvider>{children}</AssetsProvider>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
