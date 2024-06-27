import { ShortcutType } from '@/lib/types';
import { AddShortcutForm } from '@/components/AddShortcutForm';
import { ShortcutInteractions } from './shortcut-interactions';

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
    <>
      <AddShortcutForm />
      <ShortcutInteractions
        shortcutByCategory={shortcutByCategory}
        shortcutCategoriesKeys={shortcutCategoriesKeys}
      />
    </>
  );
}

export const allCategories = [
  'exchange',
  'knowledge',
  'course',
  'analysis',
  'indicator',
  'miscellaneous',
  'platform',
];

export const allColors = [
  'blue',
  'green',
  'red',
  'orange',
  'pink',
  'black',
  'gray',
];

export const getColor = (key: string) => {
  let color = '';

  switch (key) {
    case 'blue':
      color = 'bg-blue-400';
      break;
    case 'red':
      color = 'bg-red-400';
      break;
    case 'green':
      color = 'bg-green-400';
      break;
    case 'orange':
      color = 'bg-orange-400';
      break;
    case 'black':
      color = 'bg-gray-900';
      break;
    case 'gray':
      color = 'bg-slate-300';
      break;
    case 'pink':
      color = 'bg-pink-400';
      break;
    default:
      break;
  }

  return color;
};
