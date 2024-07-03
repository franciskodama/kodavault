"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.metadata = void 0;
const nextjs_1 = require("@clerk/nextjs");
const themes_1 = require("@clerk/themes");
require("./../components/ui/globals.css");
// See font optimization with Tailwind -->  https://nextjs.org/docs/app/building-your-application/optimizing/fonts
// export const gabarito = Gabarito({ subsets: ['latin'], display: 'swap' });
// export const cairoPlay = Cairo_Play({ subsets: ['latin'], display: 'swap' });
// export const inter = Inter({ subsets: ['latin'], display: 'swap' });
exports.metadata = {
    title: 'Koda Vault',
    description: 'Assets Analysis for Right Decisions',
};
function RootLayout({ children, }) {
    return (<nextjs_1.ClerkProvider afterSignInUrl='/in/dashboard' afterSignUpUrl='/' appearance={{
            elements: {
                logoBox: 'hidden',
                socialButtonsBlockButton: 'rounded-sm border border-primary',
                card: 'bg-[#FAFAFB] border-0 drop-shadow-none shadow-none',
                formButtonPrimary: 'rounded-sm border border-primary text-primary bg-accent',
                formFieldInput: 'rounded-sm border border-primary',
                footerActionLink: 'text-slate-500',
                formResendCodeLink: 'text-slate-500',
                identityPreviewEditButton: 'text-slate-500',
                userButtonPopoverCard: 'border-[1px] border-slate-200 rounded-[4px] shadow-sm bg-[#FFFFFF]',
            },
            signIn: {
                baseTheme: themes_1.neobrutalism,
                variables: { colorPrimary: '#DDF906' },
            },
        }}>
      <html lang='en'>
        <body 
    // className={`${inter.className} bg-[#FAFAFB] text-xs text-slate-600`}
    className='bg-[#FAFAFB] text-xs text-slate-600'>
          <div className='max-w-[1400px] mx-auto'>
            {/* <Template key={routeParam}> */}
            {children}
            {/* </Template> */}
          </div>
        </body>
      </html>
    </nextjs_1.ClerkProvider>);
}
exports.default = RootLayout;
