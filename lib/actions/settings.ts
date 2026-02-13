'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getMonthlyBurn(uid: string) {
  try {
    const settings = await prisma.userSettings.findUnique({
      where: { uid },
      select: { monthlyBurn: true },
    });
    return settings?.monthlyBurn || 4000;
  } catch (error) {
    console.error('Error fetching monthly burn:', error);
    return 4000;
  }
}

export async function updateMonthlyBurn(uid: string, burnRate: number) {
  try {
    await prisma.userSettings.upsert({
      where: { uid },
      update: { monthlyBurn: burnRate },
      create: {
        uid,
        monthlyBurn: burnRate,
      },
    });
    revalidatePath('/dashboard');
    return { success: true };
  } catch (error) {
    console.error('Error updating monthly burn:', error);
    return { success: false, error };
  }
}
