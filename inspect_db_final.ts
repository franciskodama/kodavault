import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { config } from 'dotenv';
import path from 'path';

config({ path: path.join(__dirname, '.env') });

const connectionString = process.env.DATABASE_URL as string;
const adapter = new PrismaNeon({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  const result = await prisma.$queryRawUnsafe(`
    SELECT n.nspname::text as schema,
           c.relname::text as name,
           CASE c.relkind WHEN 'r' THEN 'table' WHEN 'v' THEN 'view' END as type
    FROM pg_catalog.pg_class c
         LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
    WHERE c.relkind IN ('r','v')
      AND n.nspname NOT IN ('pg_catalog', 'information_schema')
    ORDER BY 1,2;
  `);
  console.log('Database objects:', JSON.stringify(result, null, 2));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
