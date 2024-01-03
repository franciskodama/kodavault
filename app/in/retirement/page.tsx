import { auth, currentUser } from '@clerk/nextjs';
import Image from 'next/image';

export default async function Retirement() {
  const user = await currentUser();

  return (
    <>
      <div className='bg-[#a6cae2] flex flex-col items-center w-full text-center mx-auto mb-12 px-8'>
        {user && (
          <h1 className='uppercase font-extrabold w-full text-2xl border-2 border-slate-500 py-2 px-4 my-8'>
            {`${user.firstName}, just choose your Goal!`}
          </h1>
        )}

        <Image
          src='/cost-retirement.png'
          width={1400}
          height={800}
          alt='Study of the Retirement Cost Around the World'
          className='rounded-md object-cover'
        />
      </div>
    </>
  );
}
