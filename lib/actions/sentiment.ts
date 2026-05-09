'use server';

import { v4 } from 'uuid';
import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';
import { SentimentType } from '@/lib/types';
import { getCryptosData } from '@/lib/crypto.server';

export const getSentiments = async (uid: string) => {
  try {
    const [sentiments, cryptosData] = await Promise.all([
      prisma.sentiment.findMany({
        where: {
          uid,
        },
        orderBy: {
          asset: 'asc',
        },
      }),
      getCryptosData(),
    ]);

    const sentimentsWithImages = sentiments.map((sentiment) => {
      const symbol = sentiment.asset.toUpperCase();
      const matchedCrypto = cryptosData.find(
        (crypto: any) => crypto.symbol?.toUpperCase() === symbol
      );
      return {
        ...sentiment,
        image: matchedCrypto?.image || null,
      };
    });

    return JSON.parse(JSON.stringify(sentimentsWithImages));
  } catch (error) {
    return { error: 'Failed to find sentiments' };
  }
};

export async function addSentiment(formData: Omit<SentimentType, 'id' | 'created_at'>) {
  const { asset, uid, url, exchange } = formData;

  try {
    await prisma.sentiment.create({
      data: {
        id: v4(),
        created_at: new Date(),
        asset,
        uid,
        url,
        exchange,
      },
    });
    revalidatePath('/sentiment');
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function deleteSentiment(id: string) {
  try {
    await prisma.sentiment.delete({
      where: {
        id,
      },
    });

    revalidatePath('/sentiment');
    return true;
  } catch (error) {
    console.error(error);
    throw new Error('🚨 Failed to delete Sentiment');
  }
}
