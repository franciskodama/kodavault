'use client';

import { AssetsContext } from '@/context/AssetsContext';
import { Asset } from '@/lib/types';
import { useContext } from 'react';

export default function AssetContext({ assets }: { assets: Asset[] }) {
  return (
    <>
      <div className='bg-orange-300 text-white text-xs'>
        Ok, it is working but we need to set it in the context without relying
        on this fake component
      </div>
    </>
  );
}
