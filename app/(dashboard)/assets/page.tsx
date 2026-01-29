import React, { Suspense } from 'react';
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
      <Suspense fallback={<SkeletonAssets />}>
        <ReviewedAssetsProvider>
          <Assets
            typeFilterAsParam={typeFilterAsParam ? typeFilterAsParam : ''}
          />
        </ReviewedAssetsProvider>
      </Suspense>
    </div>
  );
}

function SkeletonAssets() {
  return (
    <div className='p-8'>
      <div className='animate-pulse space-y-4'>
        <div className='h-8 bg-gray-300 rounded w-1/3'></div>
        <div className='h-6 bg-gray-300 rounded w-full'></div>
        <div className='h-6 bg-gray-300 rounded w-full'></div>
        <div className='h-6 bg-gray-300 rounded w-full'></div>
      </div>
    </div>
  );
}
