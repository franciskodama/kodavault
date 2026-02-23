import { getShortcuts } from '@/lib/actions';
import { Shortcut } from './shortcut';
import { ShortcutType } from '@/lib/types';
import { currentUser } from '@clerk/nextjs/server';

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
    <div className='flex flex-col w-full mx-auto pb-20 px-8'>
      <div className='flex flex-col items-center justify-center mt-12 mb-12'>
        <p className='text-[10px] font-bold uppercase tracking-[0.4em] text-slate-400 leading-none mb-3'>
          Personal Hub
        </p>
        <h1 className='text-3xl font-bold text-slate-900 tracking-tight leading-none'>
          Treasure Chest
        </h1>
        <div className='w-12 h-1.5 bg-[#22C55E] rounded-full mt-6 shadow-sm shadow-green-100' />
      </div>

      <div className='w-full px-8'>
        <Shortcut shortcuts={shortcuts} />
      </div>
    </div>
  );
}
