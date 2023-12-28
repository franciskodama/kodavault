'use server';

import { uuid } from 'uuidv4';
import prisma from './prisma';
import { Inputs } from './types';

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
    // throw new Error('Failed to create asset');
  }
}
