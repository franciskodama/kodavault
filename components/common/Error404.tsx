import Image from 'next/image';

export default function Error404() {
  return (
    <div className='flex flex-col w-full items-center justify-center'>
      <div className='mt-12 text-2xl'>Not Found. Sifu!</div>
      <div className='my-2 text-sm'>
        Sorry, the page you were looking for could not be found.
      </div>
      <Image
        src='/goat.gif'
        width={400}
        height={400}
        alt='Goat wearing glasses image'
        className='rounded-md object-cover'
      />
    </div>
  );
}
