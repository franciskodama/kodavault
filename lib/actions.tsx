'use server';

import { uuid } from 'uuidv4';
import prisma from './prisma';
import { CryptoGoalAllocation, Inputs } from './types';
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
  } = formData;

  try {
    await prisma.asset.create({
      data: {
        id: uuid(),
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
          id: uuid(),
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
