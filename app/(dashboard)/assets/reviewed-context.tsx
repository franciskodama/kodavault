'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { useSession } from 'next-auth/react';
import { toast } from '@/components/ui/use-toast';
import { useAssetsContext } from '@/context/AssetsContext';
import { clearAllReviewedAssets } from '@/lib/actions';

interface ReviewedAssetsContextType {
  reviewedAssets: string[];
  addReviewedAsset: (assetId: string) => void;
  removeReviewedAsset: (assetId: string) => void;
  isAssetReviewed: (assetId: string) => boolean;
  clearAllReviewed: () => void;
}

const ReviewedAssetsContext = createContext<
  ReviewedAssetsContextType | undefined
>(undefined);

export const ReviewedAssetsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [reviewedAssets, setReviewedAssets] = useState<string[]>([]);
  const { data: session } = useSession();
  const uid = session?.user?.email;
  const { setAssets, refreshAssets } = useAssetsContext();

  useEffect(() => {
    try {
      const stored = localStorage.getItem('reviewed-assets');
      if (stored) {
        const parsed = JSON.parse(stored);
        setReviewedAssets(Array.isArray(parsed) ? parsed : []);
      }
    } catch (error) {
      console.error('Error loading reviewed assets:', error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('reviewed-assets', JSON.stringify(reviewedAssets));
    } catch (error) {
      console.error('Error saving reviewed assets:', error);
      toast({
        title: 'Error saving review status',
        description: 'Unable to save review status to local storage.',
        variant: 'destructive',
      });
    }
  }, [reviewedAssets]);

  const addReviewedAsset = React.useCallback((assetId: string) => {
    setReviewedAssets((prev) => {
      if (!prev.includes(assetId)) {
        return [...prev, assetId];
      }
      return prev;
    });
  }, []);

  const removeReviewedAsset = React.useCallback((assetId: string) => {
    setReviewedAssets((prev) => prev.filter((id) => id !== assetId));
  }, []);

  const isAssetReviewed = React.useCallback((assetId: string) => {
    return reviewedAssets.includes(assetId);
  }, [reviewedAssets]);

  const clearAllReviewed = React.useCallback(async () => {
    if (!uid) {
      toast({
        title: 'Error clearing reviews',
        description: 'You must be logged in to clear reviews.',
        variant: 'destructive',
      });
      return;
    }

    setReviewedAssets([]);
    localStorage.removeItem('reviewed-assets');
    setAssets((prevAssets) =>
      prevAssets.map((asset) => (asset ? { ...asset, reviewed: false } : asset))
    );

    const success = await clearAllReviewedAssets(uid);
    if (success) {
      await refreshAssets();
      toast({
        title: 'Reviews Cleared! 🧹',
        description: 'All review marks have been cleared.',
        variant: 'dark',
      });
    } else {
      await refreshAssets();
      toast({
        title: 'Error clearing reviews',
        description: 'Something went wrong while clearing reviews in the database.',
        variant: 'destructive',
      });
    }
  }, [uid, setAssets, refreshAssets]);

  return (
    <ReviewedAssetsContext.Provider
      value={{
        reviewedAssets,
        addReviewedAsset,
        removeReviewedAsset,
        isAssetReviewed,
        clearAllReviewed,
      }}
    >
      {children}
    </ReviewedAssetsContext.Provider>
  );
};

export const useReviewedAssets = () => {
  const context = useContext(ReviewedAssetsContext);
  if (context === undefined) {
    throw new Error(
      'useReviewedAssets must be used within a ReviewedAssetsProvider'
    );
  }
  return context;
};
