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
    <div className='flex flex-col items-center w-full mx-auto pb-20'>
      <div className='w-full py-12 px-8 flex flex-col items-center justify-center relative overflow-hidden mb-8'>
        <div className='max-w-4xl w-full text-center relative z-10'>
          <div className='flex flex-col items-center justify-center space-y-2'>
            <h1 className='text-3xl md:text-5xl font-serif font-semibold text-slate-800 tracking-tighter'>
              Treasure Chest
            </h1>
            <div className='flex items-center gap-3'>
              <div className='h-[1.5px] w-8 bg-[#bd554c] opacity-50' />
              <h2 className='text-sm md:text-base font-semibold text-slate-500 uppercase tracking-[0.3em]'>
                Your Personal Shortcut Hub
              </h2>
              <div className='h-[1.5px] w-8 bg-[#bd554c] opacity-50' />
            </div>
          </div>
        </div>
      </div>

      <div className='w-full px-8'>
        <Shortcut shortcuts={shortcuts} />
      </div>
    </div>
  );
}
