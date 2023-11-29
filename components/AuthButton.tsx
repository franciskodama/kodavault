'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { LogOutIcon } from 'lucide-react';

export const AuthButton = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className='flex items-center gap-4 text-xs text-left'>
        <div className='flex items-center mr-2'>
          <h3 className='w-auto mr-2 text-sm text-slate-600 font-semibold leading-4'>
            {`Hey ${session?.user?.name?.split(' ').pop()}!`}
          </h3>
          <span className='text-xl'>👋</span>
        </div>

        <div className='relative mr-2'>
          <Avatar>
            <AvatarImage src='https://avatars.githubusercontent.com/u/28899580?v=4' />
            <AvatarFallback>FK</AvatarFallback>
          </Avatar>
          {/* <div className='absolute left-0 top-0 z-10 border-4 border-slate-600 transform -translate-x-1 -translate-y-1 rounded-full w-12 h-12' /> */}
          <div className='absolute left-0 top-0 z-10 border-2 border-slate-600 transform -translate-x-1 -translate-y-1 rounded-full w-12 h-12' />
        </div>

        <button onClick={() => signOut()}>
          <LogOutIcon size={18} strokeWidth={2.4} color='#1e293b' />
          {/* slate 800 --> #1e293b */}
          {/* slate 600 --> #475569 */}
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

// const DAY = 24 * 60 * 60 * 1000;

// export function NavbarGreeting() {
//   const { user, loading } = useAuth();
//   const [greeting, setGreeting] = useState("");

//   useEffect(() => {
//     const [value, expiry] = localStorage.getItem("greeting")?.split("|") ?? [];
//     if (value && Number(expiry) > Date.now()) {
//       setGreeting(value);
//     }
//   }, []);

//   useEffect(() => {
//     if (!loading) {
//       if (user?.displayName) {
//         const [value, expiry, uid] =
//           localStorage.getItem("greeting")?.split("|") ?? [];
//         if (!value || Number(expiry) < Date.now() || uid !== user.uid) {
//           const newValue = getGreeting(user?.displayName);
//           setGreeting(newValue);
//           const toStore = `${newValue}|${Date.now() + DAY}|${user.uid}`;
//           localStorage.setItem("greeting", toStore);
//         }
//       } else {
//         localStorage.removeItem("greeting");
//         setGreeting("");
//       }
//     }
//   }, [user, loading]);

//   return (
//     <Link href="/account" className="p-1" locale={false}>
//       <div className="flex items-center justify-center gap-1">
//         <div className="flex-none">
//           {user?.photoURL ? (
//             <div className="relative w-6 h-6 rounded-full overflow-hidden">
//               <Image
//                 src={user?.photoURL}
//                 className="object-cover"
//                 alt={`Avatar for ${user?.displayName}`}
//                 sizes="6rem"
//                 priority
//                 fill
//               />
//             </div>
//           ) : (
//             <User className="h-[22px] w-[22px]" strokeWidth="1.9" />
//           )}
//         </div>
//         {greeting && (
//           <div className="font-medium truncate max-w-[12rem]">{greeting}</div>
//         )}
//       </div>
//     </Link>
//   );
// }

// function getGreeting(name: string) {
//   const chosen = Math.random();
//   switch (true) {
//     case chosen > 1 / 2:
//       return `Hi ${name}`;
//     case chosen > 1 / 4:
//       return `Hello ${name}`;
//     case chosen > 1 / 8:
//       return `Hey ${name}`;
//     case chosen > 1 / 16:
//       return `👋 ${name}`;
//     case chosen > 1 / 32:
//       return `Yo! ${name}!`;
//     case chosen > 1 / 64:
//       return `Sup ${name}`;
//     case chosen > 1 / 128:
//       return `Ahoy ${name}`;
//     default:
//       return `Lookin' 🔥 ${name}`;
//   }
// }
