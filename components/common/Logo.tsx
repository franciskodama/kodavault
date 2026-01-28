import Image from 'next/image';

export const Logo = () => {
  return (
    <>
      <Image
        src='/goat.gif'
        width={300}
        height={300}
        alt='Mari in the middle of a buch of money'
        className='absolute bottom-0 right-10 rounded-md object-cover opacity-20'
      />
    </>
  );
};
