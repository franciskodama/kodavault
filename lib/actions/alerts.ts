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
    return { error: 'Failed to find alerts' };
  }
};

export async function addAlert(formData: AlertType) {
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

//   id         String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
//   uid        String
//   created_at DateTime @default(now()) @db.Timestamptz(6)
//   asset      String
//   price      Float    @default(0)
//   exchange   String?
//   note       String?
//   email      Boolean  @default(true)
//   whatsapp   Boolean  @default(true)

export async function updateAlert(formData: ShortcutType) {
  const { id, name, uid, url, description, category, from } = formData;

  try {
    await prisma.alert.update({
      where: {
        id,
      },
      data: {
        id,
        created_at: new Date(),
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
