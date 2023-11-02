import Image from 'next/image';
import NavMenu from './NavMenu';

export default function Header() {
  return (
    <div className='flex justify-between'>
      <Image
        src='/logo.png'
        alt='Logo Koda Vault'
        width={100}
        height={100}
        className='rounded-md object-cover'
      />
      <NavMenu />
    </div>
  );
}
