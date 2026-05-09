'use client';

import { SentimentType } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
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

    favorites.forEach((s) => {
      window.open(s.url, '_blank');
    });
  };

  return (
    <Button onClick={handleOpenFavs} variant='outline' className='gap-2'>
      <ExternalLink size={16} />
      <span>Launch Favorites</span>
    </Button>
  );
}
