'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOutIcon } from 'lucide-react';

export const AuthButton = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className='flex items-center gap-4 text-xs text-left'>
        <div className='relative'>
          <Avatar>
            <AvatarImage src='https://avatars.githubusercontent.com/u/28899580?v=4' />
            <AvatarFallback>FK</AvatarFallback>
          </Avatar>
          <div className='absolute left-0 top-0 z-10 border-4 border-slate-300 transform -translate-x-1 -translate-y-1 rounded-full w-12 h-12' />
        </div>
        <div className='flex items-center mr-8'>
          <h3 className='w-auto mr-2 text-sm text-slate-600 font-semibold leading-4'>
            {`Hey ${session?.user?.name?.split(' ').pop()}!`}
          </h3>
          <span className='text-xl'>👋</span>
        </div>
        <button onClick={() => signOut()}>
          <LogOutIcon size={18} strokeWidth={1.8} color='#475569' />
          {/* slate 800 --> #475569 */}
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
