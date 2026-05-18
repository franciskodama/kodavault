'use client';

import { AssetsProvider } from '@/context/AssetsContext';
import { ReviewedAssetsProvider } from '@/app/(dashboard)/assets/reviewed-context';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AssetsProvider>
      <ReviewedAssetsProvider>{children}</ReviewedAssetsProvider>
    </AssetsProvider>
  );
}
