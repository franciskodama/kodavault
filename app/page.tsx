import { getServerSession } from 'next-auth';

export default async function Home() {
  const session = await getServerSession();

  return (
    <main className='flex h-screen flex-col items-center justify-between p-14'>
      <div className='z-10 max-w-5xl w-full h-full items-center justify-between font-mono text-sm border-2'>
        SERVER:
        {session?.user?.name ? (
          <div>{session?.user?.name}</div>
        ) : (
          <div>Not logged in</div>
        )}
        Hello World!
      </div>
    </main>
  );
}
