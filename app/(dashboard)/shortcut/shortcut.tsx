import { ShortcutType } from '@/lib/types';
import MessageInTable from '@/components/MessageInTable';
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
      {shortcuts.length > 0 ? (
        <ShortcutInteractions
          shortcutByCategory={shortcutByCategory}
          shortcutCategoriesKeys={shortcutCategoriesKeys}
        />
      ) : (
        <div className='mt-8'>
          <MessageInTable
            image={'/dylan-severance.webp'}
            objectPosition={'50% 10%'}
            alt={'Superman looking something'}
            title={'🤷🏻‍♂️ No shortcuts saved yet!'}
            subtitle={
              'Start adding your favorite links and soon this space will be your go-to treasure chest of wisdom!'
            }
            buttonCopy={''}
            hasNoButton={true}
            formTitle={'Add a new Asset'}
            formSubtitle={
              'Add a New Asset and expand your investment portfolio.'
            }
          />
        </div>
      )}
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
