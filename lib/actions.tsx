'use server';

import { uuid } from 'uuidv4';
import prisma from './prisma';
import { Inputs } from './types';
import { revalidatePath } from 'next/cache';
import { InputProps } from '@/app/in/cryptos/form-allocation-goal';

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

export async function updateCoinShareGoal(formData: InputProps) {
  const { uid, goal, coin } = formData;

  try {
    await prisma.coinGoal.update({
      where: {
        uid,
        coin,
      },
      data: {
        goal,
      },
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
