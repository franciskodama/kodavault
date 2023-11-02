import Image from 'next/image';
import NavMenu from './NavMenu';
import { AuthButton } from './AuthButton';

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
      <AuthButton />
    </div>
  );
}
