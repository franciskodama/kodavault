'use client';

import { AssetsProvider } from '@/context/AssetsContext';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AssetsProvider>{children}</AssetsProvider>
    </>
  );
}
