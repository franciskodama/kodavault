import { Shortcut } from './page';

export function Shortcut({ shortcuts }: { shortcuts: Shortcut[] }) {
  return (
    <div className='flex flex-col items-center justify-center w-full'>
      {shortcuts.length > 0 && <div>{shortcuts[0].name}</div>}
    </div>
  );
}
