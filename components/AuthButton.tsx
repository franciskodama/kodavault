'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOutIcon } from 'lucide-react';

export const AuthButton = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className='flex items-center gap-4 text-xs text-left'>
        <Avatar>
          <AvatarImage src='https://avatars.githubusercontent.com/u/28899580?v=4' />
          <AvatarFallback>FK</AvatarFallback>
        </Avatar>
        <h3 className='w-[6ch] mr-4 text-sm'>{session?.user?.name}</h3>
        <button onClick={() => signOut()}>
          <LogOutIcon size={18} strokeWidth={1.8} color='#3c3c3c' />
        </button>
      </div>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sing in</button>
    </>
  );
};
