'use server';

import { v4 } from 'uuid';
import prisma from './prisma';
import { KeyAsset, Projection, Shortcut } from '@prisma/client';
import {
  AddNetWorthChartData,
  Asset,
  CryptoGoalAllocation,
  Inputs,
  UnpricedAsset,
} from './types';

import { revalidatePath } from 'next/cache';

export async function addAsset(formData: Inputs) {
  const {
    asset,
    qty,
    wallet,
    type,
    subtype,
    currency,
    exchange,
    account,
    uid,
    category,
    purpose,
    tag,
  } = formData;

  try {
    await prisma.asset.create({
      data: {
        id: v4(),
        created_at: new Date(),
        asset,
        qty: Number(qty),
        wallet,
        type,
        uid,
        subtype,
        currency,
        account,
        exchange,
        category,
        purpose,
        tag: tag === '' ? null : tag,
      },
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function updateAsset(formData: Inputs) {
  const {
    id,
    asset,
    qty,
    wallet,
    type,
    subtype,
    currency,
    exchange,
    account,
    uid,
    purpose,
    category,
    tag,
  } = formData;

  try {
    await prisma.asset.update({
      where: {
        id,
      },
      data: {
        id,
        created_at: new Date(),
        asset,
        qty: Number(qty),
        wallet,
        type,
        uid,
        subtype,
        currency,
        account,
        exchange,
        purpose,
        category,
        tag,
      },
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function deleteAsset(id: string) {
  try {
    await prisma.asset.delete({
      where: {
        id,
      },
    });

    revalidatePath('/in/assets');
  } catch (error) {
    console.log(error);
    throw new Error('🚨 Failed to delete asset');
  }
}

export async function updateReviewedAsset(id: string, reviewed: boolean) {
  try {
    await prisma.asset.update({
      where: {
        id,
      },
      data: {
        reviewed,
      },
      select: { id: true },
    });
    return true;
  } catch (error) {
    console.error('Failed to update asset review status:', error);
    return false;
  }
}

export const getCryptoGoals = async (uid: string) => {
  try {
    const cryptoGoals = await prisma.coinGoal.findMany({
      where: {
        uid,
      },
    });
    return cryptoGoals;
  } catch (error) {
    return { error };
  }
};

export async function updateCoinShareGoal(formData: CryptoGoalAllocation) {
  const { id, uid, coin, goal, priority, obs } = formData;

  try {
    const record = await prisma.coinGoal.findUnique({
      where: {
        id,
      },
    });

    if (record) {
      await prisma.coinGoal.update({
        where: {
          id,
        },
        data: {
          uid,
          coin,
          goal: Number(goal),
          priority,
          obs,
        },
      });
    } else {
      await prisma.coinGoal.create({
        data: {
          id: v4(),
          uid,
          created_at: new Date(),
          coin,
          goal: Number(goal),
          priority,
          obs,
        },
      });
    }

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

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

export async function addShortcut(formData: Shortcut) {
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
    console.log(error);
    return false;
  }
}

export async function updateShortcut(formData: Shortcut) {
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
    console.log(error);
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

    revalidatePath('/in/shortcut');
  } catch (error) {
    console.log(error);
    throw new Error('🚨 Failed to delete Shortcut');
  }
}

export async function addNetWorthEvolution(
  addNetWorthChartData: AddNetWorthChartData
) {
  const { uid, usd, cad, brl, btc } = addNetWorthChartData;

  try {
    await prisma.netWorthEvolution.create({
      data: {
        id: v4(),
        created_at: new Date(),
        uid,
        usd,
        cad,
        brl,
        btc,
      },
    });
    return true;
  } catch (error) {
    console.log('Error in addNetWorthEvolution:', error);
    return false;
  }
}

export const getNetWorthEvolution = async (uid: string) => {
  try {
    const netWorthEvolution = await prisma.netWorthEvolution.findMany({
      where: {
        uid,
      },
    });
    return netWorthEvolution;
  } catch (error) {
    console.error('Error fetching net worth evolution:', error);
    return [];
  }
};

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

export async function addGoal(uid: string, goal: number) {
  try {
    await prisma.goal.create({
      data: {
        id: v4(),
        created_at: new Date(),
        uid,
        goal,
      },
    });
    return true;
  } catch (error) {
    console.log('Error in addGoal:', error);
    return false;
  }
}

export const getGoal = async (uid: string) => {
  try {
    const goal = await prisma.goal.findMany({
      where: {
        uid,
      },
    });
    return goal;
  } catch (error) {
    console.error('Error fetching net worth evolution:', error);
    return [];
  }
};

export async function updateGoal(uid: string, goal: number) {
  try {
    await prisma.goal.update({
      where: {
        uid,
      },
      data: {
        uid,
        created_at: new Date(),
        goal,
      },
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

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

export async function updateProjection({ data }: { data: Projection }) {
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

// ------------------------------------

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

export async function addKeyAsset(formData: { uid: string; asset: string }) {
  const { uid, asset } = formData;

  try {
    await prisma.keyAsset.create({
      data: {
        id: v4(),
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
