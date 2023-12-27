'use server';

import { Inputs } from '@/components/AddAssetForm';
import prisma from './prisma';

export async function addAsset(formData: Inputs) {
  const { asset, qty, wallet, type, subtype, currency, exchange, account } =
    formData;

  try {
    await prisma.asset.create({
      data: {
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
