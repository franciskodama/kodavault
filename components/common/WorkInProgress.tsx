import Image from 'next/image';

export default function WorkInProgress() {
  return (
    <div className='relative mt-12'>
      <h1 className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-8xl font-extrabold text-slate-800 text-center'>
        Come in soon!
        <br />
        <br />
        Work in Progress
      </h1>
      <Image
        src='/bg-3d.gif'
        width={1000}
        height={800}
        alt='Work in Progress image'
        className='rounded-md object-cover'
      />
    </div>
  );
}
