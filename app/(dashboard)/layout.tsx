import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import { Toaster } from '@/components/ui/toaster';
import Providers from './providers';

export default function InLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Providers>
        <Header />
        {children}
        <Toaster />
        <Footer />
      </Providers>
    </>
  );
}
