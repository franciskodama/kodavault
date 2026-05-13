'use client';

import { SentimentType } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Zap } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

export function OpenInPlayButton({
  sentiments,
}: {
  sentiments: SentimentType[];
}) {
  const handleOpenInPlay = () => {
    const inPlayAssets = sentiments.filter((s) => s.isInPlay);

    if (inPlayAssets.length === 0) {
      toast({
        title: 'No In-Play coins found',
        description: 'Mark some coins as In-Play first!',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Launching In-Play',
      description: `Opening ${inPlayAssets.length} active trades in new tabs...`,
    });

    inPlayAssets.forEach((s) => {
      window.open(s.url, '_blank');
    });
  };

  return (
    <Button
      onClick={handleOpenInPlay}
      variant='outline'
      className='gap-2 bg-slate-100'
    >
      <Zap size={16} className='fill-slate-800' />
      <span>Launch In-Play</span>
    </Button>
  );
}
