'use client';

import { SentimentType } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { ExternalLink, Star } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

export function OpenFavsButton({
  sentiments,
}: {
  sentiments: SentimentType[];
}) {
  const handleOpenFavs = () => {
    const favorites = sentiments.filter((s) => s.isFavorite);

    if (favorites.length === 0) {
      toast({
        title: 'No favorites found',
        description: 'Mark some coins as favorite first!',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Opening Favorites',
      description: `Opening ${favorites.length} links in new tabs...`,
    });

    favorites.forEach((s, index) => {
      const win = window.open(s.url, '_blank', 'noopener,noreferrer');

      // If we detect the window wasn't opened, it's likely a pop-up blocker
      if (!win || win.closed || typeof win.closed === 'undefined') {
        if (index === 0) {
          // Only show once
          toast({
            title: 'Pop-ups Blocked',
            description:
              'Please allow pop-ups for this site to open all trading tabs.',
            variant: 'destructive',
          });
        }
      }
    });
  };

  return (
    <Button
      onClick={handleOpenFavs}
      variant='outline'
      className='gap-2 bg-yellow-50'
    >
      <Star size={16} className='text-yellow-500 fill-yellow-500' />
      <span>Launch Favorites</span>
    </Button>
  );
}
