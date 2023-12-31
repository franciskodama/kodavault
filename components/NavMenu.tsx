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
          <Button
            variant={pathname === '/in/dashboard' ? 'default' : 'ghost'}
            size='md'
          >
            <li>Dashboard</li>
          </Button>
        </Link>

        <Link href='/in/assets'>
          <Button
            variant={pathname === '/in/assets' ? 'default' : 'ghost'}
            size='md'
          >
            <li>Assets</li>
          </Button>
        </Link>

        <Link href='/in/cryptos'>
          <Button
            variant={pathname === '/in/cryptos' ? 'default' : 'ghost'}
            size='md'
          >
            <li>Cryptos</li>
          </Button>
        </Link>

        <Link href='/in/stocks'>
          <Button
            variant={pathname === '/in/stocks' ? 'default' : 'ghost'}
            size='md'
          >
            <li>Stocks</li>
          </Button>
        </Link>

        <Link href='/in/retirement'>
          <Button
            variant={pathname === '/in/retirement' ? 'default' : 'ghost'}
            size='md'
          >
            <li>Goal</li>
          </Button>
        </Link>

        <Sheet>
          <SheetTrigger>
            <Button size='md' variant='outline' className='ml-12'>
              + Asset
            </Button>
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
      </ul>
    </>
  );
}
