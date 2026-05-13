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
import { OpenFavsButton } from '@/components/common/OpenFavsButton';

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
      <div className='w-full'>
        <Sentiment sentiments={sentiments} />
      </div>
    </div>
  );
}
