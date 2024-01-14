import { auth, currentUser } from '@clerk/nextjs';
import Image from 'next/image';

export default async function Retirement() {
  const user = await currentUser();

  return (
    <>
      <div className='bg-[#a6cae2] flex flex-col items-center w-full text-center mx-auto mb-12 px-8'>
        {user && (
          <h1 className='uppercase font-extrabold w-full text-[#bd554c] text-2xl bg-white drop-shadow-[7px_7px_rgba(130,173,205,1)] py-2 px-4 my-8'>
            {`${user.firstName}, choose your Goal, work for it, and believe in it!`}{' '}
            <span className='ml-2'>🚩</span>
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
