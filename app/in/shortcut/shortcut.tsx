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

  const shortcutCategoriesKeys = Object.keys(shortcutByCategory);

  return (
    <div>
      <ul className='flex flex-col justify-center mt-12 w-full text-sm border'>
        {shortcutCategoriesKeys.map((key: string) => (
          <Accordion key={key} type='single' collapsible>
            <AccordionItem value={key}>
              <AccordionTrigger>{key}</AccordionTrigger>

              {shortcutByCategory[key].map((shortcut: ShortcutType) => (
                <AccordionContent key={shortcut.id}>
                  <li className='flex items-center w-full text-left gap-2 mb-4'>
                    <Link href={shortcut.url} target='_blank'>
                      <p className='w-[20em]'>{shortcut.name}</p>
                    </Link>

                    {/* <Separator orientation='vertical' /> */}
                    {/* <Separator orientation='horizontal' /> */}

                    <div className='flex items-center justify-center h-[4ch] w-[14ch] bg-blue-400 rounded-[2px] text-white text-center'>
                      {shortcut.category}
                    </div>
                    <p className='flex items-center border w-1/3 ml-4 h-[4ch]'>
                      {shortcut.description}
                    </p>
                  </li>
                </AccordionContent>
              ))}
            </AccordionItem>
          </Accordion>
        ))}
      </ul>
    </div>
  );
}
