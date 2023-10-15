import NavMenu from './NavMenu';

export default function Header() {
  return (
    <div className='flex justify-between'>
      <div>LOGO</div>
      <NavMenu />
    </div>
  );
}
