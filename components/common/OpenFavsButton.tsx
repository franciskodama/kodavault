'use client';

import { useState } from 'react';
import { SentimentType } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Star, Loader2 } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

export function OpenFavsButton({
  sentiments,
}: {
  sentiments: SentimentType[];
}) {
  const [isLaunching, setIsLaunching] = useState(false);

  const handleOpenFavs = async () => {
    const favorites = sentiments.filter((s) => s.isFavorite);

    if (favorites.length === 0) {
      toast({
        title: 'No favorites found',
        description: 'Mark some coins as favorite first!',
        variant: 'destructive',
      });
      return;
    }

    setIsLaunching(true);

    const { id, update } = toast({
      title: 'Opening Favorites',
      description: `Preparing to open ${favorites.length} tabs...`,
    });

    try {
      for (let i = 0; i < favorites.length; i++) {
        const s = favorites[i];
        const assetName = s.asset ? s.asset.toUpperCase() : 'Coin';

        update({
          id,
          title: 'Opening Favorites',
          description: `Opening ${assetName} (${i + 1}/${favorites.length})...`,
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

        // Delay next opening by 1.5 seconds if there are more tabs remaining
        if (i < favorites.length - 1) {
          await new Promise((resolve) => setTimeout(resolve, 1500));
        }
      }

      update({
        id,
        title: 'Success',
        description: `All ${favorites.length} tabs opened successfully.`,
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
      onClick={handleOpenFavs}
      disabled={isLaunching}
      variant='outline'
      className='gap-2 bg-yellow-50'
    >
      {isLaunching ? (
        <Loader2 className='h-4 w-4 animate-spin' />
      ) : (
        <Star size={16} className='text-yellow-500 fill-yellow-500' />
      )}
      <span>{isLaunching ? 'Opening Tabs...' : 'Launch Favorites'}</span>
    </Button>
  );
}
