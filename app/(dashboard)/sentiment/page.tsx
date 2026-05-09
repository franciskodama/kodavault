import { getSentiments } from '@/lib/actions';
import { Sentiment } from './sentiment';
import { SentimentType } from '@/lib/types';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { Plus, BarChart3 } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { AddSentimentForm } from '@/components/forms/AddSentimentForm';
import { Button } from '@/components/ui/button';

export default async function SentimentPage() {
  const session = await getServerSession(authOptions);
  const uid = session?.user?.email;
  let sentiments: SentimentType[] = [];

  if (uid) {
    const result = await getSentiments(uid);

    if (Array.isArray(result)) {
      sentiments = result;
    } else {
      console.error('Failed to load sentiments:', result);
      sentiments = [];
    }
  }

  return (
    <div className='flex flex-col w-full mx-auto pb-20 px-4 sm:px-8'>
      <div className='flex flex-col sm:flex-row justify-between items-center mt-10 px-4 sm:px-0'>
        <div className='flex items-center gap-4'>
          <div className='w-1 h-10 bg-[#22C55E] rounded-lg' />
          <div className='flex flex-col'>
            <p className='text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 leading-none mb-1'>
              Market Analysis
            </p>
            <h1 className='text-xl font-bold text-slate-900 tracking-tight leading-none'>
              Coin Sentiment
            </h1>
          </div>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button className='gap-2' variant='outline'>
              <Plus size={16} />
              <span>Add Sentiment Link</span>
            </Button>
          </SheetTrigger>
          <SheetContent className='max-h-screen overflow-y-auto'>
            <SheetHeader className='mb-8'>
              <SheetTitle className='text-xl font-bold'>
                Add New Sentiment Link
              </SheetTitle>
              <SheetDescription>
                Add a Coinalyze URL to track market sentiment for your favorite coins.
              </SheetDescription>
            </SheetHeader>
            <AddSentimentForm />
          </SheetContent>
        </Sheet>
      </div>

      <div className='w-full'>
        <Sentiment sentiments={sentiments} />
      </div>
    </div>
  );
}
