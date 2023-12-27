import SignInPage from '@/app/sign-in/page';
import Link from 'next/link';

export default function Home() {
  return (
    <div className='flex w-full items-center justify-center h-32'>
      {/* <Image
        src='/hero-kodavault.png'
        width={800}
        height={800}
        alt='Logo Koda Vault'
        className='rounded-md object-cover'
      /> */}
      <div className='border-2 w-1/2'>
        You are not logged in
        <Link href='/in/dashboard'>
          <h1>Dashboard</h1>
        </Link>
      </div>

      <div className='border-2 w-1/2'>
        <SignInPage />
      </div>
    </div>
  );
}
