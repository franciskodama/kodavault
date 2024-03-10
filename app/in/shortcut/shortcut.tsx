import Link from 'next/link';
import { Shortcut } from './page';

export function Shortcut({ shortcuts }: { shortcuts: Shortcut[] }) {
  return (
    <div>
      <h1 className='text-3xl mb-4'>Shortcuts</h1>
      <ul className='flex flex-col items-center justify-center w-full text-sm'>
        {shortcuts.length > 0 &&
          shortcuts.map((shortcut: Shortcut) => (
            <li
              key={shortcut.id}
              className='flex items-center border-2 w-full text-left gap-2'
            >
              <Link href={shortcut.url} target='_blank'>
                <p className='w-[20em]'>{shortcut.name}</p>
              </Link>
              <div className='w-[10ch] border-2 bg-blue-400 text-white'>
                {shortcut.category}TAG
              </div>
              <p className='w-1/3'>{shortcut.description}</p>
            </li>
          ))}
      </ul>
    </div>
  );
}
