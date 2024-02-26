import WorkInProgress from '@/components/WorkInProgress';
import { getShortcuts } from '@/lib/actions';
import { currentUser } from '@clerk/nextjs';
import { Shortcut } from './shortcut';

export type Shortcut = {
  id: string;
  created_at: Date;
  name: string;
  uid: string;
  url: string;
  description?: string;
  category?: string;
};

export default async function ShortcutPage() {
  const user = await currentUser();
  const uid = user && user.emailAddresses[0].emailAddress;
  let shortcuts: Shortcut[] = [];

  if (uid) {
    const result = await getShortcuts(uid);

    if (Array.isArray(result)) {
      shortcuts = result;
    } else {
      // Handle the case where result is not an array (e.g., "", { error: unknown; }, or null)
      console.error('Failed to load shortcuts:', result);
      shortcuts = []; // Ensures shortcuts is always an array of Shortcut
    }
  }

  return (
    <div className='flex flex-col items-center justify-center w-full'>
      <Shortcut shortcuts={shortcuts} />
    </div>
  );
}
