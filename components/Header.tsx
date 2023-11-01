import { Logo } from './Logo';
import NavMenu from './NavMenu';

export default function Header() {
  return (
    <div className='flex justify-between'>
      <div>
        <Logo />
      </div>

      <NavMenu />
    </div>
  );
}
