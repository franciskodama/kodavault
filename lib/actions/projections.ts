'use server';

import { v4 } from 'uuid';
import prisma from '@/lib/prisma';
import { CryptoProjection } from '@/lib/types';

export async function addProjection(
  uid: string,
  asset: string,
  projection: number,
  source?: string
) {
  try {
    await prisma.projection.create({
      data: {
        id: v4(),
        created_at: new Date(),
        uid,
        asset,
        projection,
        source: source ? source : '',
      },
    });
    return true;
  } catch (error) {
    console.log('Error in adding Projection:', error);
    return false;
  }
}

export async function updateProjection({ data }: { data: CryptoProjection }) {
  const { uid, asset, projection, source, note } = data;

  try {
    await prisma.projection.upsert({
      where: {
        uid_asset: {
          uid,
          asset,
        },
      },
      create: {
        id: v4(),
        created_at: new Date(),
        uid,
        asset,
        projection,
        source: source ?? '',
        note: note ?? '',
      },
      update: {
        projection,
        source: source ?? '',
        note: note ?? '',
      },
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export const getProjections = async (uid: string) => {
  try {
    const projections = await prisma.projection.findMany({
      where: {
        uid,
      },
    });
    return projections;
  } catch (error) {
    console.error('Error fetching prjections:', error);
    return [];
  }
};
