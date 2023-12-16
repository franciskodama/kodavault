import { Link } from 'lucide-react';

export const Home = () => {
  return (
    <div className='flex w-full items-center justify-center'>
      {/* <Image
        src='/hero-kodavault.png'
        width={800}
        height={800}
        alt='Logo Koda Vault'
        className='rounded-md object-cover'
      /> */}
      <Link href='/dashboard'>
        <h1>Dashboard</h1>
      </Link>
    </div>
  );
};
