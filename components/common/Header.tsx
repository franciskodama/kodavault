'use client';

import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import NavMenu from './NavMenu';
import UserProfileSheet from './UserProfileSheet';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Header() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const userName =
    session?.user?.name?.split(' ')[0] || session?.user?.email?.split('@')[0];
  const greeting = getGreeting(userName ? userName : '');
  const isSignInPage = pathname?.startsWith('/sign-in');

  return (
    <div className='flex justify-between m-4 p-4'>
      <Link href='/'>
        <Image
          src='/logo/trezo-logo-green.png'
          alt='Trezo.App Logo'
          width={75}
          height={40}
          priority
        />
      </Link>
      <div className='flex items-center gap-4'>
        {session && <NavMenu />}
        {userName ? (
          <div className='flex items-center gap-4'>
            <h4 className='ml-12 mr-4 font-semibold text-sm'>
              {greeting}
              <span className='ml-2 text-xl'>{getEmoji(greeting)}</span>
            </h4>
            <UserProfileSheet />
          </div>
        ) : (
          !isSignInPage && (
            <Link href='/sign-in'>
              <Button variant='outline' size='sm'>
                Sign In
              </Button>
            </Link>
          )
        )}
      </div>
    </div>
  );
}

const getGreeting = (name: string) => {
  const chosen = Math.random();
  switch (true) {
    case chosen > 1 / 2:
      return `Hi ${name}!`;
    case chosen > 1 / 4:
      return `Howdy ${name}!`;
    case chosen > 1 / 8:
      return `Hey ${name}!`;
    case chosen > 1 / 16:
      return `Hola ${name}`;
    case chosen > 1 / 32:
      return `Yo! ${name}!`;
    case chosen > 1 / 64:
      return `Sup ${name}`;
    case chosen > 1 / 128:
      return `Ahoy ${name}`;
    default:
      return `Hello ${name}!`;
  }
};

const getEmoji = (greeting: string) => {
  switch (true) {
    case greeting.includes('Hi'):
      return `👋`;
    case greeting.includes('Howdy'):
      return `🤠`;
    case greeting.includes('Hey'):
      return `✌️`;
    case greeting.includes('Hola'):
      return `🙌`;
    case greeting.includes('Yo'):
      return `😎`;
    case greeting.includes('Sup'):
      return `🤙`;
    case greeting.includes('Ahoy'):
      return `🏴‍☠️`;
    default:
      return `👋`;
  }
};
