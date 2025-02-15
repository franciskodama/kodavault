'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { toast } from '@/components/ui/use-toast';

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

  const addReviewedAsset = (assetId: string) => {
    setReviewedAssets((prev) => {
      if (!prev.includes(assetId)) {
        return [...prev, assetId];
      }
      return prev;
    });
  };

  const removeReviewedAsset = (assetId: string) => {
    setReviewedAssets((prev) => prev.filter((id) => id !== assetId));
  };

  const isAssetReviewed = (assetId: string) => {
    return reviewedAssets.includes(assetId);
  };

  const clearAllReviewed = () => {
    setReviewedAssets([]);
    localStorage.removeItem('reviewed-assets');
    toast({
      title: 'Reviews Cleared! 🧹',
      description: 'All review marks have been cleared.',
      variant: 'dark',
    });
  };

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
