'use server';

import { v4 } from 'uuid';
import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';
import { SentimentType } from '@/lib/types';

export const getSentiments = async (uid: string) => {
  try {
    const sentiments = await prisma.sentiment.findMany({
      where: {
        uid,
      },
      orderBy: {
        asset: 'asc',
      },
    });
    return JSON.parse(JSON.stringify(sentiments));
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
