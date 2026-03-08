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
    // Check if user exists first to satisfy foreign key constraint if necessary,
    // or just upsert the user record to be safe
    await prisma.user.upsert({
      where: { uid },
      update: {},
      create: { uid },
    });

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
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'Failed to save settings to database',
    };
  }
}
