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
    return { error };
  }
};
