// export default function Footer() {
//   return (
//     <div className='flex items-center justify-between m-4 p-4 my-8 text-sm text-slate-500'>
//       <p>Trezo.App, 2025</p>
//       <p>© All rights reserved.</p>
//     </div>
//   );
// }

import Link from 'next/link';
import Image from 'next/image';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Card, CardContent } from '@/components/ui/card';
import { HeartHandshake, PocketKnife, Shield, Terminal, X } from 'lucide-react';
import { AlertDialogCancel } from '@radix-ui/react-alert-dialog';

const menuItems = [
  { label: 'Dashboard', href: '/in/dashboard' },
  { label: 'Cryptos', href: '/in/cryptos' },
  { label: 'Stocks', href: '/in/stocks' },
  { label: 'Assets', href: '/in/assets' },
  { label: 'Shortcuts', href: '/in/shortcut' },
  { label: 'Goals', href: '/in/goals' },
];

export default function Footer() {
  return (
    <Card className='px-4 py-4 bg-slate-600 text-white text-sm w-full my-4'>
      <CardContent className='flex flex-col sm:flex-row gap-12 items-start justify-between p-4'>
        <div className='flex flex-col sm:w-1/5 gap-2'>
          <div className='flex items-center gap-2 mb-2'>
            <Terminal size={16} color='#ecc94b' />
            <h4 className='font-semibold text-yellow-500 uppercase'>
              Behind the Code
            </h4>
          </div>
          <p className='pr-4 max-w-80 text-xs'>
            This app was originally created to simplify my life, achieve more,
            and practice my skills as a software developer. Now, it’s here to
            help you do the same. One feature at a time. Enjoy!
          </p>
        </div>

        <div className='flex flex-col w-full sm:w-2/5 gap-2'>
          <div className='flex items-center gap-2 mb-2'>
            <PocketKnife size={18} color='#ecc94b' />
            <h4 className='font-semibold text-yellow-500 uppercase'>
              Features
            </h4>
          </div>
          <div className='flex flex-wrap content-start leading-6 gap-1'>
            {menuItems.map((item) => (
              <Link key={item.label} href={item.href}>
                <p className='text-white text-left w-[20ch] underline-offset-4 hover:underline'>
                  {item.label}
                </p>
              </Link>
            ))}
          </div>
        </div>

        <div className='flex justify-end sm:w-1/5'>
          <Image
            src={'/logo/trezo-logo-white-yellow.png'}
            width={36}
            height={36}
            alt='Trezo.App Logo'
            className='w-[5em] sm:mr-4 sm:mt-4'
          />
        </div>
      </CardContent>
      <div className='flex items-end justify-between text-right text-xs gap-4 p-4'>
        <div className='flex gap-4 sm:gap-8'>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <p className='text-xs text-white text-left underline-offset-4 hover:underline'>
                Terms of Service
              </p>
            </AlertDialogTrigger>
            <AlertDialogContent className='w-[calc(100%-35px)] h-[calc(100%-10em)] max-h-screen overflow-y-scroll'>
              <AlertDialogHeader>
                <AlertDialogTitle className='flex items-center gap-2'>
                  <HeartHandshake size={24} strokeWidth={1.8} />
                  Terms of Service
                </AlertDialogTitle>
                <AlertDialogDescription className='p-4 text-base text-primary text-left'>
                  Welcome to{' '}
                  <span className='font-bold text-green-500'>Trezo.App</span>!
                  These Terms of Service (“Terms”) govern your access to and use
                  of our website, mobile application, and services
                  (collectively, the “Service”). By using our Service, you agree
                  to these Terms. If you do not agree, please do not use the
                  Service.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className='bg-white text-gray-800 p-6 md:p-12 max-w-4xl mx-auto my-10 shadow-lg'>
                <section className='mb-8'>
                  <h2 className='text-xl font-semibold mb-2'>
                    1. General Overview
                  </h2>
                  <p className='text-gray-700'>
                    Welcome to{' '}
                    <span className='font-bold text-green-500'>Trezo.App</span>!
                    This app is designed to simplify life, foster growth, and
                    enhance decision-making. By using our app, you agree to
                    comply with these Terms. If you do not agree, please
                    discontinue use.
                  </p>
                </section>

                <section className='mb-8'>
                  <h2 className='text-xl font-semibold mb-2'>2. Eligibility</h2>
                  <ul className='flex flex-col gap-4 list-disc list-inside text-gray-700'>
                    <li>
                      You must be at least 18 years old or have permission from
                      a legal guardian.
                    </li>
                    <li>
                      You must comply with all applicable local, state, and
                      national laws.
                    </li>
                  </ul>
                </section>

                <section className='mb-8'>
                  <h2 className='text-xl font-semibold mb-2'>
                    3. Features and Functionality
                  </h2>
                  <p className='text-gray-700 mb-4'>
                    <span className='font-bold text-green-500'>Trezo.App</span>{' '}
                    includes the following features:
                  </p>
                  <ul className='flex flex-col gap-4 list-disc list-inside text-gray-700'>
                    <li>
                      <span className='font-semibold'>Dashboard:</span>{' '}
                      Centralized summary of user assets such as Stocks,
                      Cryptos, and Cash.
                    </li>

                    <li>
                      <span className='font-semibold'>Cryptos:</span> Lorem
                      ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                      nec purus lacinia, feugiat ipsum vulputate, faucibus
                      libero.
                    </li>
                    <li>
                      <span className='font-semibold'>Stocks:</span> Lorem ipsum
                      dolor sit amet, consectetur adipiscing elit. Etiam nec
                      purus lacinia, feugiat ipsum vulputate, faucibus libero.
                    </li>
                    <li>
                      <span className='font-semibold'>Assets:</span> Lorem ipsum
                      dolor sit amet, consectetur adipiscing elit. Etiam nec
                      purus lacinia, feugiat ipsum vulputate, faucibus libero.
                    </li>
                    <li>
                      <span className='font-semibold'>Assets Page:</span> Lorem
                      ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                      nec purus lacinia, feugiat ipsum vulputate, faucibus
                      libero.
                    </li>
                    <li>
                      <span className='font-semibold'>Goals:</span> Lorem ipsum
                      dolor sit amet, consectetur adipiscing elit. Etiam nec
                      purus lacinia, feugiat ipsum vulputate, faucibus libero.
                    </li>
                  </ul>
                </section>

                <section className='mb-8'>
                  <h2 className='text-xl font-semibold mb-2'>
                    4. User Content
                  </h2>
                  <p className='text-gray-700'>
                    You retain ownership of the content you upload or input. By
                    using the app, you grant us a non-exclusive, worldwide
                    license to use, store, and display your content solely for
                    app functionality.
                  </p>
                </section>

                <section className='mb-8'>
                  <h2 className='text-xl font-semibold mb-2'>
                    5. Acceptable Use Policy
                  </h2>
                  <ul className='flex flex-col gap-4 list-disc list-inside text-gray-700'>
                    <li>Do not misuse the app for unlawful purposes.</li>
                    <li>
                      Do not attempt to reverse-engineer or modify the app.
                    </li>
                    <li>
                      Do not upload harmful content, such as viruses or malware.
                    </li>
                    <li>
                      Do not harass, abuse, or harm other users or the app
                      owner.
                    </li>
                  </ul>
                </section>

                <section className='mb-8'>
                  <h2 className='text-xl font-semibold mb-2'>6. Privacy</h2>
                  <p className='text-gray-700'>
                    We respect your privacy. Please refer to our Privacy Policy
                    for more information.
                  </p>
                </section>

                <section className='mb-8'>
                  <h2 className='text-xl font-semibold mb-2'>
                    7. Intellectual Property
                  </h2>
                  <p className='text-gray-700'>
                    The app’s design, content, and code are owned by Francis
                    Kodama and are protected by intellectual property laws.
                  </p>
                </section>

                <section className='mb-8'>
                  <h2 className='text-xl font-semibold mb-2'>
                    8. Limitation of Liability
                  </h2>
                  <p className='text-gray-700'>
                    {/* The app is provided "as-is" without warranties. The owner is */}
                    not liable for damages resulting from its use.
                  </p>
                </section>

                <section className='mb-8'>
                  <h2 className='text-xl font-semibold mb-2'>
                    9. Modifications to the Terms
                  </h2>
                  <p className='text-gray-700'>
                    These Terms may be updated periodically. Continued use of
                    the app constitutes acceptance of the new Terms.
                  </p>
                </section>
              </div>
              <AlertDialogFooter>
                <AlertDialogAction className='w-full'>Ok</AlertDialogAction>
                <AlertDialogCancel className='absolute -right-4 -top-4 sm:right-0 sm:top-0 sm:border-0 border border-primary bg-white p-1 z-50'>
                  <X size={24} color='black' strokeWidth={1.8} />
                </AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <p className='text-xs text-white text-left underline-offset-4 hover:underline'>
                Privacy Policy
              </p>
            </AlertDialogTrigger>
            <AlertDialogContent className='w-[calc(100%-35px)] h-[calc(100%-10em)] max-h-screen overflow-y-scroll'>
              <AlertDialogHeader>
                <AlertDialogTitle className='flex items-center gap-2'>
                  <Shield size={24} strokeWidth={1.8} />
                  Privacy Policy
                </AlertDialogTitle>
                <AlertDialogDescription className='p-4 text-base text-primary text-left'>
                  Welcome to{' '}
                  <span className='font-bold text-green-500'>Trezo.App</span>!
                  Your privacy is important to us. This Privacy Policy explains
                  how we collect, use, and protect your information while you
                  use our app.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className='bg-white text-gray-800 p-6 md:p-12 max-w-4xl mx-auto mb-10 rounded-lg shadow-lg'>
                <section className='mb-8'>
                  <h2 className='text-xl font-semibold mb-2'>
                    1. Information We Collect
                  </h2>
                  <ul className='flex flex-col gap-4 list-disc list-inside text-gray-700'>
                    <li>
                      <span className='font-semibold'>
                        Personal Information:
                      </span>{' '}
                      Your name, email address, or other contact details
                      provided during account creation or usage.
                    </li>
                    <li>
                      <span className='font-semibold'>Usage Data:</span>{' '}
                      Information about how you use the app, such as accessed
                      features, timestamps, and app interactions.
                    </li>
                    <li>
                      <span className='font-semibold'>Device Information:</span>{' '}
                      Non-identifiable data like your device type, operating
                      system, and browser version.
                    </li>
                  </ul>
                </section>

                <section className='mb-8'>
                  <h2 className='text-xl font-semibold mb-2'>
                    2. How We Use Your Information
                  </h2>
                  <p className='text-gray-700'>Your information is used to:</p>
                  <ul className='flex flex-col gap-4 list-disc list-inside text-gray-700'>
                    <li>Provide and maintain app functionality.</li>
                    <li>
                      Personalize your experience based on your input and usage.
                    </li>
                    <li>
                      Communicate updates, offers, or feature notifications.
                    </li>
                    <li>Improve the app through aggregated analytics.</li>
                  </ul>
                </section>

                <section className='mb-8'>
                  <h2 className='text-xl font-semibold mb-2'>
                    3. Sharing of Information
                  </h2>
                  <p className='text-gray-700'>
                    We do not sell, trade, or rent your personal information to
                    third parties. However, we may share your data in the
                    following cases:
                  </p>
                  <ul className='flex flex-col gap-4 list-disc list-inside text-gray-700'>
                    {/* <li>
                      With service providers assisting in app functionality
                      (e.g., hosting or analytics).
                    </li> */}
                    <li className='mt-2'>
                      To comply with legal obligations or protect against misuse
                      of the app.
                    </li>
                    {/* <li>
                      In the event of a merger, acquisition, or asset sale.
                    </li> */}
                  </ul>
                </section>

                <section className='mb-8'>
                  <h2 className='text-xl font-semibold mb-2'>
                    4. Data Security
                  </h2>
                  <p className='text-gray-700'>
                    We take reasonable measures to secure your data using
                    industry-standard protocols. However, no method of
                    transmission or storage is entirely secure. Use the app at
                    your own discretion.
                  </p>
                </section>

                <section className='mb-8'>
                  <h2 className='text-xl font-semibold mb-2'>5. Your Rights</h2>
                  <ul className='flex flex-col gap-4 list-disc list-inside text-gray-700'>
                    <li>
                      <span className='font-semibold'>Access:</span> You have
                      the right to view the information we hold about you.
                    </li>
                    <li>
                      <span className='font-semibold'>Correction:</span> You can
                      request corrections to inaccurate or incomplete data.
                    </li>
                    {/* <li>
                      <span className="font-semibold">Deletion:</span> You may
                      request that your data be erased, subject to applicable
                      legal obligations.
                    </li> */}
                  </ul>
                </section>

                <section className='mb-8'>
                  <h2 className='text-xl font-semibold mb-2'>6. Cookies</h2>
                  <p className='text-gray-700'>
                    We may use cookies to enhance your experience, track app
                    usage, and personalize features. You can manage cookie
                    preferences through your browser settings.
                  </p>
                </section>

                <section className='mb-8'>
                  <h2 className='text-xl font-semibold mb-2'>
                    7. Changes to This Policy
                  </h2>
                  <p className='text-gray-700'>
                    This Privacy Policy may be updated periodically. We
                    encourage you to review it for any changes. Continued use of
                    the app constitutes acceptance of the updated terms.
                  </p>
                </section>
              </div>
              <AlertDialogFooter>
                <AlertDialogAction className='w-full'>Ok</AlertDialogAction>
                <AlertDialogCancel className='absolute -right-4 -top-4 sm:right-0 sm:top-0 sm:border-0 border border-primary bg-white p-1 z-50'>
                  <X size={24} color='black' strokeWidth={1.8} />
                </AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        <div className='flex flex-col gap-1'>
          <p>Trezo.App - 2025</p>
          <p>© All rights reserved.</p>
        </div>
      </div>
    </Card>
  );
}
