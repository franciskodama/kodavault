import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Toaster } from '@/components/ui/toaster';
import Providers from './providers';
import { AssetsProvider } from '@/context/AssetsContext';

export default function InLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <AssetsProvider>
        <Header />
        {children}
        <Toaster />
        <Footer />
      </AssetsProvider>
    </Providers>
  );
}
