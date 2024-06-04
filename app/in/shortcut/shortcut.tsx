import Link from 'next/link';
import { ShortcutType } from './page';

export function Shortcut({ shortcuts }: { shortcuts: ShortcutType[] }) {
  return (
    <div>
      <h1 className='text-3xl mb-4'>Shortcuts</h1>
      <ul className='flex flex-col items-center justify-center w-full text-sm'>
        {shortcuts.length > 0 &&
          shortcuts.map((shortcut: ShortcutType) => (
            <li
              key={shortcut.id}
              className='flex items-center w-full text-left gap-2 mb-4'
            >
              <Link href={shortcut.url} target='_blank'>
                <p className='w-[20em]'>{shortcut.name}</p>
              </Link>
              <div className='flex items-center justify-center h-[4ch] w-[14ch] bg-blue-400 rounded-[2px] text-white text-center'>
                {shortcut.category}
              </div>
              <p className='flex items-center border w-1/3 ml-4 h-[4ch]'>
                {shortcut.description}
              </p>
            </li>
          ))}
      </ul>
    </div>
  );
}
