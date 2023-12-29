import WorkInProgress from '@/components/WorkInProgress';

export default function CryptosPage() {
  return (
    <>
      <div className='bg-white flex flex-col items-center mt-12 text-4xl w-full h-screen text-center mx-auto'>
        <h1 className='mt-32 uppercase font-extrabold border-2 border-slate-500 w-[10em] p-4'>
          Cryptos
        </h1>
        <WorkInProgress />
      </div>
    </>
  );
}
