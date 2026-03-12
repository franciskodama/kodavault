import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { config } from 'dotenv';
import path from 'path';

config({ path: path.join(__dirname, '.env') });

const connectionString = process.env.DATABASE_URL as string;
const adapter = new PrismaNeon({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  const models = [
    'Asset',
    'Shortcut',
    'User',
    'CoinGoal',
    'Goal',
    'Projection',
    'KeyAsset',
    'NetWorthEvolution',
  ];

  for (const model of models) {
    try {
      // @ts-ignore
      const count = await prisma[model.toLowerCase()].count();
      console.log(`${model}: ${count} records`);
    } catch (e) {
      console.log(`${model}: Error querying ${model} - ${e.message}`);
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
