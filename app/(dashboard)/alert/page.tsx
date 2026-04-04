import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { Plus } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { getAlerts } from '@/lib/actions/alert';
import { AlertType } from '@/lib/types';
import { AddAlertForm } from '@/components/forms/AddAlertForm';
import { Alert } from './alert';

export default async function AlertPage() {
  const session = await getServerSession(authOptions);
  const uid = session?.user?.email;
  let alerts: AlertType[] = [];

  if (uid) {
    const result = await getAlerts(uid);

    if (Array.isArray(result)) {
      alerts = result;
    } else {
      console.error('Failed to load alerts:', result);
      alerts = [];
    }
  }

  return (
    <div className='flex flex-col w-full mx-auto pb-20 px-4 sm:px-8'>
      <div className='flex flex-col sm:flex-row justify-between items-center mt-10 mb-10 px-4 sm:px-0'>
        <div className='flex items-center gap-4'>
          <div className='w-1 h-10 bg-[#22C55E] rounded-lg' />
          <div className='flex flex-col'>
            <p className='text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 leading-none mb-1'>
              Notification Hub
            </p>
            <h1 className='text-xl font-bold text-slate-900 tracking-tight leading-none'>
              Alerts by Emails and WhatsApp
            </h1>
          </div>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button className='gap-1' variant='outline'>
              <Plus size={16} />
              <span>Add Alert</span>
            </Button>
          </SheetTrigger>
          <SheetContent className='max-h-screen overflow-y-auto'>
            <SheetHeader className='mb-8'>
              <SheetTitle className='text-xl font-bold'>
                Add New Alert
              </SheetTitle>
              <SheetDescription>
                Create a new alert to notify you when a specific price is
                reached.
              </SheetDescription>
            </SheetHeader>
            <AddAlertForm />
          </SheetContent>
        </Sheet>
      </div>

      <div className='w-full'>
        <Alert alerts={alerts} />
      </div>
    </div>
  );
}
