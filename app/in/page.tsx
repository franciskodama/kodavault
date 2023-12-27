import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Dashboard from './dashboard/dashboard';
import DashboardPage from './dashboard/page';

export default function InPage() {
  return (
    <>
      <Button variant='outline'>
        <Link href='/in/dashboard'>Dashboard</Link>
      </Button>
    </>
  );
}
