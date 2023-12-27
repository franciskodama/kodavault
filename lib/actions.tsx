'use server';

import { uuid } from 'uuidv4';
import prisma from './prisma';
import { Inputs } from './types';

export async function addAsset(formData: Inputs) {
  const { asset, qty, wallet, type, subtype, currency, exchange, account } =
    formData;

  try {
    await prisma.asset.create({
      data: {
        id: uuid(),
        created_at: new Date(),
        asset,
        qty,
        wallet,
        type,
        uid: 'fk@fkodama.com',
        subtype,
        currency,
        account,
        exchange,
      },
    });
  } catch (error) {
    console.log(error);
    throw new Error('Failed to create asset');
  }
}
