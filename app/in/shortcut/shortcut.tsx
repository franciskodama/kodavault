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
  'Exchange',
  'Knowledge',
  'Course',
  'Analysis',
  'Indicator',
  'Miscellaneous',
  'Platform',
  'Video',
  'Friend',
];

export const allColors = [
  'Blue',
  'Green',
  'Red',
  'Orange',
  'Pink',
  'Black',
  'Gray',
];

export const getColor = (key: string) => {
  let color = '';

  switch (key) {
    case 'Blue':
      color = 'bg-blue-400';
      break;
    case 'Red':
      color = 'bg-red-400';
      break;
    case 'Green':
      color = 'bg-green-400';
      break;
    case 'Orange':
      color = 'bg-orange-400';
      break;
    case 'Black':
      color = 'bg-gray-900';
      break;
    case 'Gray':
      color = 'bg-slate-300';
      break;
    case 'Pink':
      color = 'bg-pink-400';
      break;
    default:
      break;
  }

  return color;
};
