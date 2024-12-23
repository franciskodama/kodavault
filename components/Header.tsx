'use client';

import Image from 'next/image';
import { UserButton, useUser } from '@clerk/nextjs';

import NavMenu from './NavMenu';
import Link from 'next/link';

export default function Header() {
  const { user } = useUser();
  const greeting = getGreeting(user?.firstName ? user.firstName : '');

  return (
    <div className='flex justify-between m-4 p-4'>
      <Link href='/'>
        <Image
          src='/logo/trezo-logo-green.png'
          alt='Trezo.App Logo'
          width={75}
          height={75}
          className='w-auto h-auto'
          priority
        />
      </Link>
      <div className='flex items-center'>
        <NavMenu />
        {user?.firstName ? (
          <h4 className='ml-12 mr-4 font-semibold text-sm'>
            {greeting}
            <span className='ml-2 text-xl'>{getEmoji(greeting)}</span>
          </h4>
        ) : null}
        <UserButton />
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
