import { getShortcuts } from '@/lib/actions';
import { Shortcut } from './shortcut';
import { ShortcutType } from '@/lib/types';
import { currentUser } from '@clerk/nextjs/server';
import { Plus } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { AddShortcutForm } from '@/components/forms/AddShortcutForm';
import { Button } from '@/components/ui/button';

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
    <div className='flex flex-col w-full mx-auto pb-20 px-4 sm:px-8'>
      <div className='flex items-center justify-between mt-12 mb-8'>
        <div className='flex flex-col'>
          <p className='text-[10px] font-bold uppercase tracking-[0.4em] text-slate-400 leading-none mb-3'>
            Personal Hub
          </p>
          <h1 className='text-3xl font-bold text-slate-900 tracking-tight leading-none'>
            Quick Access
          </h1>
          <div className='w-12 h-1.5 bg-[#22C55E] rounded-full mt-6 shadow-sm shadow-green-100' />
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button className='gap-1' variant='outline'>
              <Plus size={16} />
              <span>Add Shortcut</span>
            </Button>
          </SheetTrigger>
          <SheetContent className='max-h-screen overflow-y-auto'>
            <SheetHeader className='mb-8'>
              <SheetTitle className='text-xl font-bold'>
                Add New Shortcut
              </SheetTitle>
              <SheetDescription>
                Create a new quick link for your personal dashboard collection.
              </SheetDescription>
            </SheetHeader>
            <AddShortcutForm />
          </SheetContent>
        </Sheet>
      </div>

      <div className='w-full'>
        <Shortcut shortcuts={shortcuts} />
      </div>
    </div>
  );
}
