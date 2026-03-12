import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { config } from 'dotenv';
import path from 'path';

config({ path: path.join(__dirname, '.env') });

const connectionString = process.env.DATABASE_URL as string;
const adapter = new PrismaNeon({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  // @ts-ignore
  const users = await prisma.user.findMany();
  console.log('Users in DB:', JSON.stringify(users, null, 2));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
