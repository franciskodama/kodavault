'use server';

import { v4 } from 'uuid';
import prisma from '@/lib/prisma';

export async function addGoal(uid: string, goal: number) {
  try {
    await prisma.goal.create({
      data: {
        id: v4(),
        created_at: new Date(),
        uid,
        goal,
      },
    });
    return true;
  } catch (error) {
    console.error('Error in addGoal:', error);
    return false;
  }
}

export const getGoal = async (uid: string) => {
  try {
    const goal = await prisma.goal.findMany({
      where: {
        uid,
      },
    });
    return goal;
  } catch (error) {
    console.error('Error fetching net worth evolution:', error);
    return [];
  }
};

export async function updateGoal(uid: string, goal: number) {
  try {
    await prisma.goal.update({
      where: {
        uid,
      },
      data: {
        uid,
        created_at: new Date(),
        goal,
      },
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
