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
} from '@/components/ui/sheet';
import { AddAssetForm } from '@/components/forms/AddAssetForm';
import { Button } from '@/components/ui/button';

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
  { label: 'Dashboard', href: '/dashboard', pathname: '/dashboard' },
  { label: 'Cryptos', href: '/cryptos', pathname: '/cryptos' },
  { label: 'Stocks', href: '/stocks', pathname: '/stocks' },
  { label: 'Assets', href: '/assets', pathname: '/assets' },
  { label: 'Elliott', href: '/elliott', pathname: '/elliott' },
  { label: 'Shortcut', href: '/shortcut', pathname: '/shortcut' },
  { label: 'Goal', href: '/retirement', pathname: '/retirement' },
  { label: 'Calendar', href: '/calendar', pathname: '/calendar' },
];
