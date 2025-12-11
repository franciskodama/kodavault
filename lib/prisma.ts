import { PrismaClient } from '@prisma/client';

// NOTE: I'm assuming you might use neon for serverless, but if not, you'd use pg (see below)
// import { neon, neonConfig } from '@neondatabase/serverless';

import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

// Set up standard node-postgres (pg) Pool
// If you are connecting to Retool's database, this is the most common way.
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Initialize the Prisma PG adapter
const adapter = new PrismaPg(pool);

// Standard Next.js/TypeScript setup to prevent multiple PrismaClient instances in development
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Pass the adapter to the PrismaClient constructor
const prisma = global.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export default prisma;

// declare global {
//   var prisma: PrismaClient | undefined;
// }

// let prisma: PrismaClient;

// if (process.env.NODE_ENV === 'production') {
//   prisma = new PrismaClient();
// } else {
//   if (!global.prisma) {
//     global.prisma = new PrismaClient();
//   }
//   prisma = global.prisma;
// }

// export default prisma;
