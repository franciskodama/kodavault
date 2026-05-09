import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';

const connectionString = process.env.DATABASE_URL as string;
const adapter = new PrismaNeon({ connectionString });

/**
 * Singleton pattern for PrismaClient to avoid multiple instances in development.
 */
const prismaClient = (globalThis as any).prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') {
  (globalThis as any).prisma = prismaClient;
}

export default prismaClient as PrismaClient;

// Updated to pick up new models
