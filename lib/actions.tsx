import prisma from './prisma';

export async function addAsset(formData: FormData) {
  const { asset, qty, wallet, type, subtype, currency, exchange, account } =
    Object.fromEntries(formData);
  console.log(
    '---  🚀 ---> | asset:',
    asset,
    qty,
    wallet,
    type,
    subtype,
    currency,
    exchange,
    account
  );

  //   try {
  //     await prisma.asset.create({
  //       data: {
  //         asset,
  //         qty,
  //         wallet,
  //         type,
  //         uid: 'fk@fkodama.com',
  //         subtype,
  //         currency,
  //         account,
  //         exchange,
  //       },
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     throw new Error('Failed to create asset');
  //   }
  //   await prisma.$disconnect();
}
