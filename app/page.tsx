import { Hero } from '@/components/Hero';
import { getServerSession } from 'next-auth';

export default async function Home() {
  const session = await getServerSession();

  return (
    <main className='flex w-full h-screen flex-col items-center justify-between p-14'>
      <div className='flex max-w-5xl w-full h-full items-start mt-32 justify-center'>
        {session?.user?.name ? <Hero /> : <div>Not logged in</div>}
      </div>
    </main>
  );
}
