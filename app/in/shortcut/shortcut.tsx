import Link from 'next/link';
import { ShortcutType } from './page';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';

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
      <div className='flex flex-col justify-center mt-12 w-full text-sm'>
        {shortcutCategoriesKeys.length > 0 &&
          shortcutCategoriesKeys.map((key: string) => (
            <Accordion key={key} type='single' collapsible>
              <AccordionItem value={key}>
                <AccordionTrigger className='flex items-center'>
                  <div className='flex items-center gap-6 my-4'>
                    <div className='text-2xl'>{getEmoji(key)}</div>
                    <h3 className='text-xl font-semibold capitalize'>{key}</h3>
                  </div>
                </AccordionTrigger>

                {/* <div className='mb-4'> */}
                {shortcutByCategory[key].map((shortcut: ShortcutType) => (
                  <AccordionContent key={shortcut.id}>
                    <ul className='grid w-full'>
                      <li className='flex items-center w-1/2 text-left border rounded-[2px] border-slate-200 p-2'>
                        <Link href={shortcut.url} target='_blank'>
                          <p className='text-sm font-normal capitalize w-[18ch]'>
                            {shortcut.name}
                          </p>
                        </Link>
                        {/* <div
                          className={`${getColor(
                            key
                            )} flex items-center justify-center h-[3ch] w-[12ch] rounded-[2px] text-xs text-white text-center`}
                            > */}
                        <div className='flex items-center justify-center h-[4ch] w-[20ch] rounded-[2px] uppercase text-light text-xs text-center border-2 border-dashed'>
                          {shortcut.from}
                        </div>
                        <p className='flex items-center ml-4 h-[4ch] text-xs'>
                          {shortcut.description}
                        </p>
                      </li>
                    </ul>
                  </AccordionContent>
                ))}
                {/* </div> */}
              </AccordionItem>
            </Accordion>
          ))}
      </div>
    </div>
  );
}

const getEmoji = (key: string) => {
  let emoji = '';

  switch (key) {
    case 'indicator':
      emoji = '🧭';
      break;
    case 'analysis':
      emoji = '🔬';
      break;
    case 'miscellaneous':
      emoji = '🧶';
      break;
    case 'platform':
      emoji = '⚓';
      break;
    case 'exchange':
      emoji = '🏦 ';
      break;
    default:
      break;
  }

  return emoji;
};

const getColor = (key: string) => {
  let color = '';

  switch (key) {
    case 'indicator':
      color = 'bg-blue-400';
      break;
    case 'analysis':
      color = 'bg-green-400';
      break;
    case 'miscellaneous':
      color = 'bg-red-400';
      break;
    case 'platform':
      color = 'bg-purple-400';
      break;
    case 'exchange':
      color = 'bg-orange-400';
      break;
    default:
      break;
  }

  return color;
};
