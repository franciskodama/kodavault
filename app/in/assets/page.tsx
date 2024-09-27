import Assets from './assets';

type PageProps = {
  searchParams: { type?: string };
};

export default function AssetsPage({ searchParams }: PageProps) {
  const typeFilterAsParam = searchParams.type || null;

  return (
    <div className='mx-auto bg-white'>
      <Assets typeFilterAsParam={typeFilterAsParam ? typeFilterAsParam : ''} />
    </div>
  );
}
