import Image from 'next/image';

export default function NoAssets() {
  return (
    <div className='flex w-full items-center justify-center'>
      <div className='my-32'>🙅🏻‍♀️ No assets found</div>
      <div className='my-32 text-5xl'> NEW PAGE - TEST</div>
      <Image
        src='/goat.gif'
        width={800}
        height={800}
        alt='Goat wearing glasses image'
        className='rounded-md object-cover'
      />
    </div>
  );
}
