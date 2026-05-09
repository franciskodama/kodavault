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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AddAssetForm } from '@/components/forms/AddAssetForm';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChartLine, ExternalLink, Goal } from 'lucide-react';

type MenuItem = {
  label: string;
  href: string;
  pathname: string;
  icon?: any;
};

export default function NavMenu() {
  const pathname = usePathname();

  return (
    <>
      <hr className='my-4' />
      <ul className='flex items-center gap-2'>
        {mainItems.map((item: MenuItem) => (
          <Link href={item.href} key={item.href}>
            <li>
              <Button
                variant={
                  pathname.startsWith(item.pathname) ? 'default' : 'ghost'
                }
                size='md'
              >
                {item.label}
              </Button>
            </li>
          </Link>
        ))}

        {/* Tools Dropdown */}
        <li>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant={
                  toolItems.some((i) => pathname.startsWith(i.pathname))
                    ? 'default'
                    : 'ghost'
                }
                size='md'
                className='gap-2'
              >
                Tools
                <ChevronDown className='w-4 h-4 opacity-50' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='min-w-[160px] p-2'>
              {toolItems.map((item) => (
                <Link href={item.href} key={item.href}>
                  <DropdownMenuItem className='gap-3 py-2 cursor-pointer rounded-lg'>
                    {item.icon && (
                      <item.icon className='w-4 h-4 text-slate-400' />
                    )}
                    <span className='font-medium'>{item.label}</span>
                  </DropdownMenuItem>
                </Link>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </li>

        <li>
          <Sheet>
            <SheetTrigger className='text-sm font-bold ml-10 border-2 border-slate-500 h-10 px-4 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors'>
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

export const mainItems = [
  { label: 'Dashboard', href: '/dashboard', pathname: '/dashboard' },
  { label: 'Crypto', href: '/cryptos', pathname: '/cryptos' },
  { label: 'Stock', href: '/stocks', pathname: '/stocks' },
  { label: 'Radar', href: '/radar', pathname: '/radar' },
  { label: 'Assets', href: '/assets', pathname: '/assets' },
  { label: 'Sentiment', href: '/sentiment', pathname: '/sentiment' },
  { label: 'Alert', href: '/alert', pathname: '/alert' },
  { label: 'Calendar', href: '/calendar', pathname: '/calendar' },
];

export const toolItems = [
  { label: 'Elliott', href: '/elliott', pathname: '/elliott', icon: ChartLine },
  {
    label: 'Shortcut',
    href: '/shortcut',
    pathname: '/shortcut',
    icon: ExternalLink,
  },
  { label: 'Goal', href: '/retirement', pathname: '/retirement', icon: Goal },
];
