import prisma from './prisma';

export const getAssets = async (uid: string) => {
  try {
    const assets = await prisma.asset.findMany({
      where: {
        uid,
      },
    });
    return JSON.parse(JSON.stringify(assets));
  } catch (error) {
    return [];
  }
};
