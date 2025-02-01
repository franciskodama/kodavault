import Assets from './assets';
import { ReviewedAssetsProvider } from './reviewed-context';

type PageProps = {
  searchParams: Promise<{ type?: string }>;
};

export default async function AssetsPage(props: PageProps) {
  const searchParams = await props.searchParams;
  const typeFilterAsParam = searchParams.type || null;

  return (
    <div className='mx-auto bg-white'>
      <ReviewedAssetsProvider>
        <Assets
          typeFilterAsParam={typeFilterAsParam ? typeFilterAsParam : ''}
        />
      </ReviewedAssetsProvider>
    </div>
  );
}
