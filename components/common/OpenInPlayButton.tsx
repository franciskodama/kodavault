'use client';

import { useState } from 'react';
import { SentimentType } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Zap, Loader2 } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

export function OpenInPlayButton({
  sentiments,
}: {
  sentiments: SentimentType[];
}) {
  const [isLaunching, setIsLaunching] = useState(false);

  const handleOpenInPlay = async () => {
    const inPlayAssets = sentiments.filter((s) => s.isInPlay);

    if (inPlayAssets.length === 0) {
      toast({
        title: 'No In-Play coins found',
        description: 'Mark some coins as In-Play first!',
        variant: 'destructive',
      });
      return;
    }

    setIsLaunching(true);

    const { id, update } = toast({
      title: 'Launching In-Play',
      description: `Preparing to open ${inPlayAssets.length} trading tabs...`,
    });

    try {
      for (let i = 0; i < inPlayAssets.length; i++) {
        const s = inPlayAssets[i];
        const assetName = s.asset ? s.asset.toUpperCase() : 'Coin';

        update({
          id,
          title: 'Launching In-Play',
          description: `Opening ${assetName} (${i + 1}/${
            inPlayAssets.length
          })...`,
        });

        const win = window.open(s.url, '_blank', 'noopener,noreferrer');

        // If we detect the window wasn't opened, it's likely a pop-up blocker
        if (!win || win.closed || typeof win.closed === 'undefined') {
          if (i === 0) {
            // Only show once
            toast({
              title: 'Pop-ups Blocked',
              description:
                'Please allow pop-ups for this site to open all trading tabs.',
              variant: 'destructive',
            });
          }
        }

        // Delay next opening by 1 second if there are more tabs remaining
        if (i < inPlayAssets.length - 1) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      }

      update({
        id,
        title: 'Success',
        description: `All ${inPlayAssets.length} tabs opened successfully.`,
      });
    } catch (error) {
      console.error('Error opening tabs:', error);
      toast({
        title: 'Error',
        description: 'An error occurred while opening trading tabs.',
        variant: 'destructive',
      });
    } finally {
      setIsLaunching(false);
    }
  };

  return (
    <Button
      onClick={handleOpenInPlay}
      disabled={isLaunching}
      variant='outline'
      className='gap-2 bg-slate-100'
    >
      {isLaunching ? (
        <Loader2 className='h-4 w-4 animate-spin' />
      ) : (
        <Zap size={16} className='fill-slate-800' />
      )}
      <span>{isLaunching ? 'Opening Tabs...' : 'Launch In-Play'}</span>
    </Button>
  );
}
