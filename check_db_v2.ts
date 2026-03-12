import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { config } from 'dotenv';
import path from 'path';

config({ path: path.join(__dirname, '.env') });

const connectionString = process.env.DATABASE_URL as string;
const adapter = new PrismaNeon({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  const models = Object.keys(prisma).filter(
    (k) => !k.startsWith('_') && !k.startsWith('$')
  );
  console.log('Detected models:', models);

  for (const model of models) {
    try {
      // @ts-ignore
      const count = await prisma[model].count();
      console.log(`${model}: ${count} records`);
    } catch (e) {
      console.log(`${model}: Error - ${e.message}`);
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
