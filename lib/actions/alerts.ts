'use server';

import { v4 } from 'uuid';
import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';
import { ShortcutType } from '@/lib/types';

export const getAlerts = async (uid: string) => {
  try {
    const alerts = await prisma.alert.findMany({
      where: {
        uid,
      },
    });
    return JSON.parse(JSON.stringify(alerts));
  } catch (error) {
    return { error: 'Failed to find shortcuts' };
  }
};

export async function addAlert(formData: ShortcutType) {
  const { name, uid, url, description, category, from } = formData;

  try {
    await prisma.shortcut.create({
      data: {
        id: v4(),
        created_at: new Date(),
        name,
        uid,
        url,
        description,
        category,
        from,
      },
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function updateShortcut(formData: ShortcutType) {
  const { id, name, uid, url, description, category, from } = formData;

  try {
    await prisma.shortcut.update({
      where: {
        id,
      },
      data: {
        id,
        created_at: new Date(),
        name,
        uid,
        url,
        description,
        category,
        from,
      },
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function deleteShortcut(id: string) {
  try {
    await prisma.shortcut.delete({
      where: {
        id,
      },
    });

    revalidatePath('/shortcut');
  } catch (error) {
    console.error(error);
    throw new Error('🚨 Failed to delete Shortcut');
  }
}
