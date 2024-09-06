import Assets from './assets';

type PageProps = {
  searchParams: { type?: string };
};

export default function AssetsPage({ searchParams }: PageProps) {
  const typeFilter = searchParams.type || null;

  return (
    <div className='mx-auto'>
      <Assets typeFilter={typeFilter ? typeFilter : ''} />
    </div>
  );
}
