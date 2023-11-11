import Image from 'next/image';
import NavMenu from './NavMenu';
import { AuthButton } from './AuthButton';

export default function Header() {
  return (
    <div className='flex justify-between my-4 mx-4 p-4'>
      <Image
        src='/logo.png'
        alt='Logo Koda Vault'
        width={100}
        height={100}
        className='rounded-md object-cover'
      />
      <div className='flex items-center gap-20'>
        <NavMenu />
        <AuthButton />
      </div>
    </div>
  );
}
