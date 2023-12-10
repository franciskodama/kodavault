import { UserButton } from '@clerk/nextjs';
import { Hero } from './../components/Hero';

export default async function Home() {
  return (
    <main className='flex w-full h-screen flex-col items-center justify-between p-14'>
      <div className='flex max-w-5xl w-full h-full items-start mt-32 justify-center'>
        <UserButton afterSignOutUrl='/' />
        <Hero />
      </div>
    </main>
  );
}
