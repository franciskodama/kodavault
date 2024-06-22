import { getShortcuts } from '@/lib/actions';
import { currentUser } from '@clerk/nextjs';
import { Shortcut } from './shortcut';
import { ShortcutType } from '@/lib/types';
import { category_enum_f421eb4b, color_enum_bd2ecc46 } from '@prisma/client';

export default async function ShortcutPage() {
  const user = await currentUser();
  const uid = user && user.emailAddresses[0].emailAddress;
  let shortcuts: ShortcutType[] = [];

  if (uid) {
    const result = await getShortcuts(uid);

    if (Array.isArray(result)) {
      shortcuts = result;
    } else {
      console.error('Failed to load shortcuts:', result);
      shortcuts = [];
    }
  }

  return (
    <div className='flex flex-col w-full p-4'>
      <Shortcut shortcuts={shortcuts} />
    </div>
  );
}
