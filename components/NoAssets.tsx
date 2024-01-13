import Image from 'next/image';

export default function NoAssets() {
  return (
    <div className='flex flex-col w-full items-center justify-center'>
      <div className='mt-12 text-2xl'>
        Whoa there! Your dashboard is feeling a bit empty. 🕵️‍♂️
      </div>
      <Image
        src='/no-assets-travolta.gif'
        width={400}
        height={400}
        alt='John Travolta looking at around inside a wallet'
        className='rounded-md object-cover'
      />
      <div className='mt-12 text-2xl'>
        Whoa there! Your dashboard is feeling a bit empty. 🕵️‍♂️
      </div>
      {`Spice it up by adding some assets! Let's make your financial playground pop! 🚀💰`}
      <div className='my-2 text-sm'>#AddSomeAssetsMagic</div>
    </div>
  );
}
