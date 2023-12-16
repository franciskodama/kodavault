import Home from './../components/Home';

export default async function HomePage() {
  return (
    <main className='flex w-full h-screen flex-col items-center justify-between p-14'>
      <div className='flex max-w-5xl w-full h-full items-start mt-32 justify-center'>
        <Home />
      </div>
    </main>
  );
}
