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
      <ul className='flex items-center text-sm gap-4'>
        <Link href='/in/dashboard'>
          <li>
            <Button
              variant={pathname === '/in/dashboard' ? 'default' : 'ghost'}
              // size='md'
            >
              Dashboard
            </Button>
          </li>
        </Link>

        <Link href='/in/assets'>
          <li>
            <Button variant={pathname === '/in/assets' ? 'default' : 'ghost'}>
              Assets
            </Button>
          </li>
        </Link>

        <Link href='/in/cryptos'>
          <li>
            <Button variant={pathname === '/in/cryptos' ? 'default' : 'ghost'}>
              Cryptos
            </Button>
          </li>
        </Link>

        <Link href='/in/stocks'>
          <li>
            <Button variant={pathname === '/in/stocks' ? 'default' : 'ghost'}>
              Stocks
            </Button>
          </li>
        </Link>

        <Link href='/in/retirement'>
          <li>
            <Button
              variant={pathname === '/in/retirement' ? 'default' : 'ghost'}
            >
              Goal
            </Button>
          </li>
        </Link>

        <li>
          <Sheet>
            <SheetTrigger className='ml-12 border-2'>+ Asset</SheetTrigger>
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
