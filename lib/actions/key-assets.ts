'use server';

import prisma from '@/lib/prisma';

export const getKeyAssets = async (uid: string) => {
  try {
    const keyAssets = await prisma.keyAsset.findMany({
      where: { uid },
    });
    return keyAssets;
  } catch (error) {
    console.error('🚨 Error fetching key assets:', error);
    return [];
  }
};

export async function addKeyAsset(formData: {
  uid: string;
  asset: string;
  id: string;
}) {
  const { uid, asset, id } = formData;

  try {
    await prisma.keyAsset.create({
      data: {
        id,
        uid,
        asset,
        created_at: new Date(),
      },
    });
    return true;
  } catch (error) {
    console.error('🚨 Failed to create Key Asset:', error);
  }
}

export async function deleteKeyAsset(id: string) {
  try {
    await prisma.keyAsset.delete({
      where: {
        id,
      },
    });
    return true;
  } catch (error) {
    console.error('🚨 Failed to delete Key Asset:', error);
  }
}
