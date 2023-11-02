'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const ACTIVE_ROUTE = 'py-1 px-2 text-white bg-gray-700';
const INACTIVE_ROUTE =
  'py-1 px-2 text-gray-500 hover:text-gray-300 hover:bg-gray-700';

export default function NavMenu() {
  const pathname = usePathname();

  return (
    <>
      <hr className='my-4' />
      <ul className='flex items-center text-sm'>
        <Link href='/'>
          <li
            className={`${
              pathname === '/' ? ACTIVE_ROUTE : INACTIVE_ROUTE
            } mr-4`}
          >
            Home
          </li>
        </Link>
        <Link href='protected'>
          <li
            className={
              pathname === '/protected' ? ACTIVE_ROUTE : INACTIVE_ROUTE
            }
          >
            Dashboard
          </li>
        </Link>
        {/* <Link href='/serverAction'>
          <li
            className={
              pathname === '/serverAction' ? ACTIVE_ROUTE : INACTIVE_ROUTE
            }
          >
            Server Action
          </li>
        </Link>

        <Link href='/apiFromClient'>
          <li
            className={
              pathname === '/apiFromClient' ? ACTIVE_ROUTE : INACTIVE_ROUTE
            }
          >
            API From Client
          </li>
        </Link>

        <Link href='/apiFromServer'>
          <li
            className={
              pathname === '/apiFromServer' ? ACTIVE_ROUTE : INACTIVE_ROUTE
            }
          >
            API From Server
          </li>
        </Link> */}
      </ul>
    </>
  );
}
