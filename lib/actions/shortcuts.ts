'use server';

import { v4 } from 'uuid';
import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';
import { ShortcutType } from '@/lib/types';

export const getShortcuts = async (uid: string) => {
  try {
    const shortcuts = await prisma.shortcut.findMany({
      where: {
        uid,
      },
    });
    return shortcuts;
  } catch (error) {
    return { error };
  }
};

export async function addShortcut(formData: ShortcutType) {
  const { name, uid, url, description, category, from, color } = formData;

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
        color,
      },
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function updateShortcut(formData: ShortcutType) {
  const { id, name, uid, url, description, category, from, color } = formData;

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
        color,
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
