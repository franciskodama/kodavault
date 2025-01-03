import Assets from './assets';

type PageProps = {
  searchParams: Promise<{ type?: string }>;
};

export default async function AssetsPage(props: PageProps) {
  const searchParams = await props.searchParams;
  const typeFilterAsParam = searchParams.type || null;

  return (
    <div className='mx-auto bg-white'>
      <Assets typeFilterAsParam={typeFilterAsParam ? typeFilterAsParam : ''} />
    </div>
  );
}
