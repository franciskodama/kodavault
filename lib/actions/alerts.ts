'use server';

import { v4 } from 'uuid';
import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';
import { AlertType, ShortcutType } from '@/lib/types';

export const getAlerts = async (uid: string) => {
  try {
    const alerts = await prisma.alert.findMany({
      where: {
        uid,
      },
    });
    return JSON.parse(JSON.stringify(alerts));
  } catch (error) {
    return { error: 'Failed to find alerts' };
  }
};

export async function addAlert(formData: AlertType) {
  const { uid, asset, price, exchange, note, emailOptin, whatsappOptin } =
    formData;

  try {
    await prisma.alert.create({
      data: {
        id: v4(),
        uid,
        created_at: new Date(),
        asset,
        price,
        exchange,
        note,
        emailOptin,
        whatsappOptin,
      },
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function updateAlert(formData: AlertType) {
  const { id, uid, asset, price, exchange, note, emailOptin, whatsappOptin } =
    formData;

  try {
    await prisma.alert.update({
      where: {
        id,
      },
      data: {
        id,
        created_at: new Date(),
        uid,
        asset,
        price,
        exchange,
        note,
        emailOptin,
        whatsappOptin,
      },
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function deleteAlert(id: string) {
  try {
    await prisma.alert.delete({
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
