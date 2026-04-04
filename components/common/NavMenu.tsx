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
      <ul className='flex items-center gap-2'>
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
            <SheetTrigger className='text-sm font-bold ml-10 border-2 border-slate-500 h-10 px-4 rounded-xl cursor-pointer'>
              + Asset
            </SheetTrigger>
            <SheetContent className='max-h-screen overflow-y-auto'>
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

export const menuItems = [
  { label: 'Dashboard', href: '/dashboard', pathname: '/dashboard' },
  { label: 'Crypto', href: '/cryptos', pathname: '/cryptos' },
  { label: 'Stock', href: '/stocks', pathname: '/stocks' },
  { label: 'Radar', href: '/radar', pathname: '/radar' },
  { label: 'Assets', href: '/assets', pathname: '/assets' },
  { label: 'Alert', href: '/alert', pathname: '/alert' },
  { label: 'Calendar', href: '/calendar', pathname: '/calendar' },
  { label: 'Elliott', href: '/elliott', pathname: '/elliott' },
  { label: 'Shortcut', href: '/shortcut', pathname: '/shortcut' },
  { label: 'Goal', href: '/retirement', pathname: '/retirement' },
];
