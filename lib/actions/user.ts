'use server';

import prisma from '@/lib/prisma';

export const getUids = async () => {
  try {
    const assets = await prisma.asset.findMany();

    const userIds = new Set();
    for (const asset of assets) {
      const userId = asset.uid;
      userIds.add(userId);
    }
    const uids = Array.from(userIds);

    return uids;
  } catch (error) {
    return { error: 'Failed to fetch uids' };
  }
};

export const updateUserName = async (userId: string | number, newName: string) => {
  try {
    const id = typeof userId === 'string' ? parseInt(userId) : userId;
    
    await prisma.user.update({
      where: { id },
      data: { firstName: newName },
    });
    
    return { success: true };
  } catch (error) {
    console.error('Error updating user name:', error);
    return { error: 'Failed to update user name' };
  }
};
