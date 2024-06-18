import WorkInProgress from '@/components/WorkInProgress';
import { getShortcuts } from '@/lib/actions';
import { currentUser } from '@clerk/nextjs';
import { Shortcut } from './shortcut';

export type ShortcutType = {
  id: string;
  created_at: Date;
  name: string;
  uid: string;
  url: string;
  description: string;
  category: string;
};

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
    <div className='flex flex-col items-center justify-center w-full'>
      <Shortcut shortcuts={shortcuts} />
    </div>
  );
}
