import Image from 'next/image';

export const Hero = () => {
  return (
    <div className='flex w-full items-center justify-center'>
      <Image
        src='/hero-kodavault.png'
        width={800}
        height={800}
        alt='Logo Koda Vault'
        className='rounded-md object-cover'
      />
    </div>
  );
};
