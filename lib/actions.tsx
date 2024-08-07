'use server';

import prisma from './prisma';
import {
  netWorthChartData,
  CryptoGoalAllocation,
  Inputs,
  ShortcutType,
  Asset,
} from './types';
import { revalidatePath } from 'next/cache';
import { v4 } from 'uuid';

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
        tag,
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
    console.log(error);
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
  netWorthChartData: netWorthChartData
) {
  const { uid, usdTotal, cadTotal, brlTotal, btcTotal } = netWorthChartData;

  try {
    await prisma.netWorthEvolution.create({
      data: {
        id: v4(),
        created_at: new Date(),
        uid,
        usd_total: usdTotal,
        cad_total: cadTotal,
        brl_total: brlTotal,
        btc_total: btcTotal,
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
    return { error };
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
