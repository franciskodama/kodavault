'use client';

import { usePathname } from 'next/navigation';

import Image from 'next/image';
import { UserButton } from '@clerk/nextjs';

import NavMenu from './NavMenu';
import Link from 'next/link';

export default function Header() {
  const pathname = usePathname();

  return (
    <div className='flex justify-between my-4 mx-4 p-4'>
      <Link href='/'>
        <Image
          src='/logo.png'
          alt='Logo Koda Vault'
          width={100}
          height={100}
          className='rounded-md object-cover'
        />
      </Link>
      <div className='flex items-center gap-20'>
        {pathname.includes('dashboard') && (
          <>
            <NavMenu />
            <UserButton afterSignOutUrl='/' />
          </>
        )}
      </div>
    </div>
  );
}
