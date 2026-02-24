'use server';

import { v4 } from 'uuid';
import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';
import { Inputs } from '@/lib/types';

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
    reviewed,
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
        reviewed: reviewed || false,
      },
    });
    return true;
  } catch (error) {
    console.error(error);
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
    reviewed,
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
        reviewed: reviewed || false,
      },
    });
    return true;
  } catch (error) {
    console.error(error);
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

    revalidatePath('/assets');
  } catch (error) {
    console.error(error);
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
