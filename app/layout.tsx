import type { Metadata } from 'next';

import { ClerkProvider } from '@clerk/nextjs';
import { neobrutalism } from '@clerk/themes';

import './../components/ui/globals.css';
import { Gabarito, Cairo_Play, Inter } from 'next/font/google';
import Template from './in/template';

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
      <html lang='en'>
        <body
          // className={`${inter.className} bg-[#FAFAFB] text-xs text-slate-600`}
          className='bg-[#FAFAFB] text-xs text-slate-600'
        >
          <div className='max-w-[1400px] mx-auto'>
            {/* <Template key={routeParam}> */}
            {children}
            {/* </Template> */}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
