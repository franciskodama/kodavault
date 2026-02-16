import type { Metadata } from 'next';

import { ClerkProvider } from '@clerk/nextjs';
import { neobrutalism } from '@clerk/themes';

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        elements: {
          logoBox: 'hidden',
          socialButtonsBlockButton: 'rounded-sm border border-primary',
          card: 'bg-[#FAFAFB] border-0 drop-shadow-none shadow-none',
          formButtonPrimary:
            'rounded-sm border border-primary text-primary bg-accent',
          formFieldInput: 'rounded-sm border border-primary',
          footerActionLink: 'text-slate-500',
          formResendCodeLink: 'text-slate-500',
          identityPreviewEditButton: 'text-slate-500',
          userButtonPopoverCard:
            'border-[1px] border-slate-200 rounded-[4px] shadow-sm bg-[#FFFFFF]',
        },
        signIn: {
          baseTheme: neobrutalism,
          variables: { colorPrimary: '#DDF906' },
        },
      }}
    >
      <html lang='en' className={outfit.className}>
        <body className='bg-[#FAFAFB] text-sm text-slate-600'>
          <div className='max-w-[1400px] mx-auto'>{children}</div>
        </body>
      </html>
    </ClerkProvider>
  );
}
