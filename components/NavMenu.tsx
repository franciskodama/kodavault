'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import { AddAssetForm } from './AddAssetForm';
import { Button } from './ui/button';

export default function NavMenu() {
  const pathname = usePathname();

  return (
    <>
      <hr className='my-4' />
      <ul className='flex items-center text-sm gap-2'>
        <Link href='/in/dashboard'>
          <li>
            <Button
              variant={pathname === '/in/dashboard' ? 'default' : 'ghost'}
              size='md'
            >
              Dashboard
            </Button>
          </li>
        </Link>

        <Link href='/in/cryptos'>
          <li>
            <Button
              variant={pathname === '/in/cryptos' ? 'default' : 'ghost'}
              size='md'
            >
              Cryptos
            </Button>
          </li>
        </Link>

        <Link href='/in/stocks'>
          <li>
            <Button
              variant={pathname === '/in/stocks' ? 'default' : 'ghost'}
              size='md'
            >
              Stocks
            </Button>
          </li>
        </Link>

        <Link href='/in/assets'>
          <li>
            <Button
              variant={pathname === '/in/assets' ? 'default' : 'ghost'}
              size='md'
            >
              Assets
            </Button>
          </li>
        </Link>

        <Link href='/in/shortcut'>
          <li>
            <Button
              variant={pathname === '/in/shortcut' ? 'default' : 'ghost'}
              size='md'
            >
              Shortcut
            </Button>
          </li>
        </Link>

        <Link href='/in/retirement'>
          <li>
            <Button
              variant={pathname === '/in/retirement' ? 'default' : 'ghost'}
              size='md'
            >
              Goal
            </Button>
          </li>
        </Link>

        <li>
          <Sheet>
            <SheetTrigger className='ml-12 border-2 border-slate-500 h-8 px-4 rounded-[2px] font-medium'>
              + Asset
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Add a new Asset</SheetTitle>
                <SheetDescription>
                  Add a New Asset and expand your investment portfolio.
                </SheetDescription>
              </SheetHeader>
              <AddAssetForm />
            </SheetContent>
          </Sheet>
        </li>
      </ul>
    </>
  );
}

const getGreeting = (name: string) => {
  const chosen = Math.random();
  switch (true) {
    case chosen > 1 / 2:
      return `Hi ${name}`;
    case chosen > 1 / 4:
      return `Hello ${name}`;
    case chosen > 1 / 8:
      return `Hey ${name}`;
    case chosen > 1 / 16:
      return `👋 ${name}`;
    case chosen > 1 / 32:
      return `Yo! ${name}!`;
    case chosen > 1 / 64:
      return `Sup ${name}`;
    case chosen > 1 / 128:
      return `Ahoy ${name}`;
    default:
      return `Lookin' 🔥 ${name}`;
  }
};
