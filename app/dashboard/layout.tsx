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
      <div className='max-w-[1400px] mx-auto bg-red-600'>{children}</div>
      <Footer />
    </>
  );
}
