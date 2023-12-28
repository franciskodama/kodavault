import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Toaster } from '@/components/ui/toaster';

export default function InLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Toaster />
      <Footer />
    </>
  );
}
