import Link from 'next/link';
import { ShortcutType } from './page';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';

export function Shortcut({ shortcuts }: { shortcuts: ShortcutType[] }) {
  const shortcutByCategory = shortcuts.reduce((acc: any, shortcut: any) => {
    if (!acc[shortcut.category]) {
      acc[shortcut.category] = [];
    }
    acc[shortcut.category].push(shortcut);
    return acc;
  }, {});
  console.log('---  🚀 ---> | shortcutByCategory:', shortcutByCategory);

  return (
    <div>
      <ul className='flex flex-col items-center justify-center mt-12 w-full text-sm'>
        {shortcuts.length > 0 &&
          shortcuts.map((shortcut: ShortcutType) => (
            <Accordion key={shortcut.id} type='single' collapsible>
              <AccordionItem value={shortcut.category}>
                <AccordionTrigger>{shortcut.category}</AccordionTrigger>
                <AccordionContent>
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            // <li
            //   key={shortcut.id}
            //   className='flex items-center w-full text-left gap-2 mb-4'
            // >
            //   <Link href={shortcut.url} target='_blank'>
            //     <p className='w-[20em]'>{shortcut.name}</p>
            //   </Link>

            //   <Separator orientation='vertical' />
            //   {/* <Separator orientation='horizontal' /> */}

            //   <div className='flex items-center justify-center h-[4ch] w-[14ch] bg-blue-400 rounded-[2px] text-white text-center'>
            //     {shortcut.category}
            //   </div>
            //   <p className='flex items-center border w-1/3 ml-4 h-[4ch]'>
            //     {shortcut.description}
            //   </p>
            // </li>
          ))}
      </ul>
    </div>
  );
}
