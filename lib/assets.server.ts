import prisma from './prisma';

export const getAssets = async (uid: string) => {
  try {
    const assets = await prisma.asset.findMany({
      where: {
        uid,
      },
    });
    return assets;
  } catch (error) {
    return { error };
  }
};
