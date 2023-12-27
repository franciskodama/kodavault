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

const ACTIVE_ROUTE =
  'mx-1 py-1 px-2 font-semibold text-white bg-slate-600 rounded-[2px]';
const INACTIVE_ROUTE =
  'mx-1 py-1 px-2 text-slate-600 font-semibold hover:text-white hover:bg-slate-400';

export default function NavMenu() {
  const pathname = usePathname();

  return (
    <>
      <hr className='my-4' />
      <ul className='flex items-center text-sm'>
        <Link href='/in/dashboard'>
          <li
            className={
              pathname === '/in/dashboard' ? ACTIVE_ROUTE : INACTIVE_ROUTE
            }
          >
            Dashboard
          </li>
        </Link>

        <Link href='/in/assets'>
          <li
            className={
              pathname === '/in/assets' ? ACTIVE_ROUTE : INACTIVE_ROUTE
            }
          >
            Assets
          </li>
        </Link>
        <Link href='/in/cryptos'>
          <li
            className={
              pathname === '/in/cryptos' ? ACTIVE_ROUTE : INACTIVE_ROUTE
            }
          >
            Cryptos
          </li>
        </Link>
        <Link href='/in/stocks'>
          <li
            className={
              pathname === '/in/stocks' ? ACTIVE_ROUTE : INACTIVE_ROUTE
            }
          >
            Stocks
          </li>
        </Link>
        <Sheet>
          <SheetTrigger className='ml-4 font-semibold border-2 border-slate-600 rounded-[2px] mx-2 py-[2px] px-2 hover:text-white hover:bg-slate-400 hover:border-slate-400'>
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
      </ul>
    </>
  );
}
