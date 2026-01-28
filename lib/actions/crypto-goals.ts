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
    return cryptoGoals;
  } catch (error) {
    return { error };
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
    console.log(error);
    return false;
  }
}
