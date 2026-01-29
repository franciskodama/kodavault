'use server';

import { v4 } from 'uuid';
import prisma from '@/lib/prisma';
import { AddNetWorthChartData } from '@/lib/types';

export async function addNetWorthEvolution(
  addNetWorthChartData: AddNetWorthChartData
) {
  const { uid, usd, cad, brl, btc } = addNetWorthChartData;

  try {
    await prisma.netWorthEvolution.create({
      data: {
        id: v4(),
        created_at: new Date(),
        uid,
        usd,
        cad,
        brl,
        btc,
      },
    });
    return true;
  } catch (error) {
    console.error('Error in addNetWorthEvolution:', error);
    return false;
  }
}

export const getNetWorthEvolution = async (uid: string) => {
  try {
    const netWorthEvolution = await prisma.netWorthEvolution.findMany({
      where: {
        uid,
      },
    });
    return netWorthEvolution;
  } catch (error) {
    console.error('Error fetching net worth evolution:', error);
    return [];
  }
};
