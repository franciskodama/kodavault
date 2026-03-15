'use server';

import { v4 } from 'uuid';
import prisma from '@/lib/prisma';
import { CryptoGoalAllocation } from '@/lib/types';

export const getCryptoGoals = async (uid: string) => {
  try {
    const cryptoGoals = await prisma.coinGoal.findMany({
      where: {
        uid,
      },
    });
    // Convert Prisma objects to plain objects
    return JSON.parse(JSON.stringify(cryptoGoals));
  } catch (error) {
    console.error('Error fetching crypto goals:', error);
    return { error: 'Failed to fetch crypto goals' };
  }
};

export async function updateCoinShareGoal(formData: CryptoGoalAllocation) {
  const { id, uid, coin, goal, priority, obs } = formData;

  try {
    const record = await prisma.coinGoal.findUnique({
      where: {
        id,
      },
    });

    if (record) {
      await prisma.coinGoal.update({
        where: {
          id,
        },
        data: {
          uid,
          coin,
          goal: Number(goal),
          priority,
          obs,
        },
      });
    } else {
      await prisma.coinGoal.create({
        data: {
          id: v4(),
          uid,
          created_at: new Date(),
          coin,
          goal: Number(goal),
          priority,
          obs,
        },
      });
    }

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
