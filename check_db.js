const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const models = ['Asset', 'Shortcut', 'User', 'CoinGoal', 'Goal', 'Projection', 'KeyAsset', 'NetWorthEvolution'];
  
  for (const model of models) {
    try {
      const count = await prisma[model.toLowerCase()] ? await prisma[model.toLowerCase()].count() : 'unknown';
      console.log(`${model}: ${count} records`);
    } catch (e) {
      console.log(`${model}: Error querying`);
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
