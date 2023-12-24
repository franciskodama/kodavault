import prisma from './prisma';
import { UnpricedAsset } from './types';

export async function addAsset(formData: FormData) {
  //   'use server';

  const {
    assetName,
    assetQty,
    assetWallet,
    assetType,
    assetSubtype,
    assetCurrency,
    assetExchange,
    assetAccount,
  } = Object.fromEntries(formData);
  console.log('---  🚀 ---> | assetAccount:', assetAccount);
  console.log('---  🚀 ---> | assetExchange:', assetExchange);
  console.log('---  🚀 ---> | assetCurrency:', assetCurrency);
  console.log('---  🚀 ---> | assetSubtype:', assetSubtype);
  console.log('---  🚀 ---> | assetType:', assetType);
  console.log('---  🚀 ---> | assetWallet:', assetWallet);
  console.log('---  🚀 ---> | assetQty:', assetQty);
  console.log('---  🚀 ---> | assetName:', assetName);

  //   : UnpricedAsset

  //   try {
  //     const newAsset = await prisma.asset.create({
  //       data: {
  //         name: assetName,
  //         qty: assetQty,
  //         wallet: assetWallet,
  //         type: assetType,
  //         uid: 'fk@fkodama.com',
  //         subtype: assetSubtype,
  //         currency: assetCurrency,
  //         account: assetAccount,
  //         exchange: assetExchange,
  //       },
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     throw new Error('Failed to create asset');
  //   }
}

// const assetName = formData.get('asset');
// const assetQty = formData.get('qty');
// const assetWallet = formData.get('wallet');
// const assetType = formData.get('type');
// const assetSubtype = formData.get('subtype');
// const assetCurrency = formData.get('currency');
// const assetExchange = formData.get('exchange');
// const assetAccount = formData.get('account');
