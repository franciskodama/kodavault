import Image from 'next/image';

export default function NoAssets() {
  return (
    <div className='flex flex-col w-full items-center justify-center'>
      <div className='mt-12 text-2xl'>Ops... No assets found</div>
      <div className='my-2 text-sm'>
        Soon you will have a way to input assets. Please, wait for it! :)
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
