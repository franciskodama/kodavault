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

type MenuItem = {
  label: string;
  href: string;
  pathname: string;
};

export default function NavMenu() {
  const pathname = usePathname();

  return (
    <>
      <hr className='my-4' />
      <ul className='flex items-center text-sm gap-2'>
        {menuItems.map((item: MenuItem) => (
          <Link href={item.href} key={item.href}>
            <li>
              <Button
                variant={pathname === item.pathname ? 'default' : 'ghost'}
                size='md'
              >
                {item.label}
              </Button>
            </li>
          </Link>
        ))}

        <li>
          <Sheet>
            <SheetTrigger className='ml-12 border-2 border-slate-500 h-8 px-4 rounded-[2px] font-medium'>
              + Asset
            </SheetTrigger>
            <SheetContent className='max-h-screen overflow-y-scroll'>
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

const menuItems = [
  { label: 'Dashboard', href: '/in/dashboard', pathname: '/in' },
  { label: 'Cryptos', href: '/in/cryptos', pathname: '/in/cryptos' },
  { label: 'Stocks', href: '/in/stocks', pathname: '/in/stocks' },
  { label: 'Assets', href: '/in/assets', pathname: '/in/assets' },
  { label: 'Elliott', href: '/in/elliott', pathname: '/in/elliott' },
  { label: 'Shortcut', href: '/in/shortcut', pathname: '/in/shortcut' },
  { label: 'Goal', href: '/in/retirement', pathname: '/in/retirement' },
];
