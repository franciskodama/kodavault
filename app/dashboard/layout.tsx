import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className='max-w-screen-2xl mx-auto'>{children}</div>
      <Footer />
    </>
  );
}
