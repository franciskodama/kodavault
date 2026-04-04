'use client';

import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LogOut, User, Check, Loader2, Edit2 } from 'lucide-react';
import { updateUserName } from '@/lib/actions/user';
import { toast } from 'sonner';

export default function UserProfileSheet() {
  const { data: session, update } = useSession();
  const [isUpdating, setIsUpdating] = useState(false);
  const [newName, setNewName] = useState(session?.user?.name || '');
  const [isOpen, setIsOpen] = useState(false);

  const handleUpdateName = async () => {
    if (!session?.user || !newName.trim()) return;

    setIsUpdating(true);
    try {
      const userId = (session?.user as any).id;
      const result = await updateUserName(userId, newName);

      if ('success' in result) {
        // Update local session
        await update({
          ...session,
          user: {
            ...session.user,
            name: newName,
          },
        });
        toast.success('Name updated successfully!');
      } else {
        toast.error(result.error || 'Failed to update name');
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
    } finally {
      setIsUpdating(false);
    }
  };

  const userInitial =
    session?.user?.name?.[0] || session?.user?.email?.[0] || '?';

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Avatar className='cursor-pointer hover:opacity-80 transition-opacity border-2 border-slate-100 w-9 h-9'>
            <AvatarImage
              src={session?.user?.image || (session?.user as any)?.picture || ''}
              alt={session?.user?.name || 'User'}
            />
          <AvatarFallback className='bg-slate-200 text-slate-700 font-bold uppercase text-xs'>
            {userInitial}
          </AvatarFallback>
        </Avatar>
      </SheetTrigger>

      <SheetContent className='sm:max-w-md bg-white'>
        <SheetHeader className='mb-8'>
          <SheetTitle className='text-2xl font-bold flex items-center gap-3'>
            <User className='w-6 h-6 text-slate-800' />
            Your Profile
          </SheetTitle>
          <SheetDescription>
            Manage your personal dashboard identity and preferences.
          </SheetDescription>
        </SheetHeader>

        <div className='flex flex-col items-center gap-6 py-8 border-y border-slate-100'>
          <Avatar className='w-24 h-24 border-4 border-slate-50 shadow-lg'>
            <AvatarImage
              src={session?.user?.image || (session?.user as any)?.picture || ''}
              alt={session?.user?.name || 'User'}
            />
            <AvatarFallback className='bg-slate-100 text-slate-800 text-3xl font-bold uppercase'>
              {userInitial}
            </AvatarFallback>
          </Avatar>

          <div className='text-center'>
            <h3 className='font-bold text-xl text-slate-900'>
              {session?.user?.name || 'Guest'}
            </h3>
            <p className='text-slate-400 text-sm'>{session?.user?.email}</p>
          </div>
        </div>

        <div className='py-10 space-y-6'>
          <div className='space-y-3'>
            <Label
              htmlFor='name'
              className='text-slate-700 font-semibold text-sm'
            >
              DisplayName / Personal Name
            </Label>
            <div className='relative group'>
              <Input
                id='name'
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder='What should we call you?'
                className='pr-12 py-6 border-slate-200 rounded-xl focus:ring-slate-400 hover:border-slate-300 transition-all font-medium'
              />
              <Button
                size='sm'
                variant='ghost'
                onClick={handleUpdateName}
                disabled={isUpdating || newName === session?.user?.name}
                className='absolute right-2 top-1/2 -translate-y-1/2 hover:bg-slate-100 rounded-lg group'
              >
                {isUpdating ? (
                  <Loader2 className='w-5 h-5 animate-spin text-slate-400' />
                ) : (
                  <Check
                    className={`w-5 h-5 ${
                      newName !== session?.user?.name
                        ? 'text-green-500 scale-110'
                        : 'text-slate-300'
                    }`}
                  />
                )}
              </Button>
            </div>
            <p className='text-[11px] text-slate-400 pl-1 italic'>
              This is how you'll be greeted throughout the application.
            </p>
          </div>
        </div>

        <SheetFooter className='absolute bottom-10 left-0 right-0 px-6 sm:justify-start'>
          <Button
            variant='ghost'
            className='w-full justify-start gap-4 text-red-500 hover:bg-red-50 hover:text-red-700 py-6 font-semibold transition-all rounded-xl'
            onClick={() => signOut({ callbackUrl: '/sign-in' })}
          >
            <LogOut className='w-5 h-5' />
            Sign Out
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
