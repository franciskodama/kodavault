'use server';

import { v4 } from 'uuid';
import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';
import { Inputs } from '@/lib/types';

const purposeMapping: Record<string, any> = {
  'Swing Trade': 'SwingTrade',
  'Position Trade': 'PositionTrade',
  'Long-term Hold': 'LongTermHold',
  'Trade': 'Trade',
  'Investment': 'Investment',
};

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
    const quantity = Number(qty.toString().replace(',', '.'));
    if (isNaN(quantity)) {
      return {
        success: false,
        error: 'Invalid quantity format. Please use numbers.',
      };
    }

    const mappedPurpose = (purpose && purposeMapping[purpose]) || purpose;
    const finalCategory = category || 'Unknown';

    await prisma.asset.create({
      data: {
        id: v4(),
        created_at: new Date(),
        asset: asset.toUpperCase(),
        qty: quantity,
        wallet,
        type,
        uid,
        subtype,
        currency,
        account,
        exchange,
        category: finalCategory,
        purpose: mappedPurpose,
        tag: tag === '' ? null : tag,
        reviewed: reviewed || false,
      },
    });
    return { success: true };
  } catch (error: any) {
    console.error(error);
    return {
      success: false,
      error:
        error.message || 'An unexpected error occurred while adding the asset.',
    };
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
    const quantity = Number(qty.toString().replace(',', '.'));
    if (isNaN(quantity)) {
      return {
        success: false,
        error: 'Invalid quantity format. Please use numbers.',
      };
    }

    const mappedPurpose = (purpose && purposeMapping[purpose]) || purpose;
    const finalCategory = category || 'Unknown';

    await prisma.asset.update({
      where: {
        id,
      },
      data: {
        id,
        created_at: new Date(),
        asset,
        qty: quantity,
        wallet,
        type,
        uid,
        subtype,
        currency,
        account,
        exchange,
        purpose: mappedPurpose,
        category: finalCategory,
        tag,
        reviewed: reviewed || false,
      },
    });
    return { success: true };
  } catch (error: any) {
    console.error(error);
    return {
      success: false,
      error:
        error.message ||
        'An unexpected error occurred while updating the asset.',
    };
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
