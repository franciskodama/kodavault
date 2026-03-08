import { ShortcutType } from '@/lib/types';
import MessageInTable from '@/components/common/MessageInTable';
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
            title={'No shortcuts saved yet!'}
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

export const categoryDisplayMap: Record<string, string> = {
  Friend: 'For Friends',
};
