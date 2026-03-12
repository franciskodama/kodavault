// Load environment variables ASAP
import * as dotenv from 'dotenv';
dotenv.config();

import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import * as fs from 'fs';
import * as path from 'path';
import { decrypt } from './utils/encryption';

const connectionString = process.env.DATABASE_URL!;
const backupSecret = process.env.BACKUP_SECRET!;
const adapter = new PrismaNeon({ connectionString });
const prisma = new PrismaClient({ adapter });

const ID_MAP: Record<string, string> = {
  category: 'cid',
  event: 'eid',
  user: 'uid',
  userSettings: 'id',
  asset: 'id',
  coinGoal: 'id',
  shortcut: 'id',
  netWorthEvolution: 'id',
  goal: 'id',
  projection: 'id',
  keyAsset: 'id',
};

async function main() {
  const filePath = process.argv[2];

  if (!filePath) {
    console.error('Usage: yarn db:restore <path_to_backup_file>');
    process.exit(1);
  }

  const absolutePath = path.resolve(filePath);
  if (!fs.existsSync(absolutePath)) {
    console.error(`❌ File not found: ${absolutePath}`);
    process.exit(1);
  }

  try {
    let content = fs.readFileSync(absolutePath, 'utf8');

    // Auto-detect encryption
    if (absolutePath.endsWith('.enc')) {
      console.log('🔓 Encrypted file detected. Decrypting...');
      if (!backupSecret) {
        throw new Error('BACKUP_SECRET is not set in environment variables');
      }
      content = decrypt(content, backupSecret);
    }

    const backup = JSON.parse(content);
    const payload = backup.payload || backup.data;

    if (!payload) {
      throw new Error('Invalid backup format: missing payload or data');
    }

    console.log(`📥 Restoring data from backup generated at: ${backup.timestamp}`);

    const modelNames = Object.keys(payload);

    for (const modelKey of modelNames) {
      const records = payload[modelKey];
      if (!Array.isArray(records)) continue;

      console.log(`⏳ Restoring ${modelKey} (${records.length} records)...`);

      // @ts-ignore
      const model = prisma[modelKey];
      if (!model) {
        console.warn(`⚠️ Model ${modelKey} not found in Prisma client. Skipping.`);
        continue;
      }

      const idField = ID_MAP[modelKey] || 'id';

      for (const record of records) {
        try {
          // Identify unique filter
          const where: any = {};
          if (record[idField]) {
            where[idField] = record[idField];
          } else if (record.id) {
            where.id = record.id;
          } else {
            // Fallback for models without clear ID in the record
            console.warn(`⚠️ Record in ${modelKey} missing primary key ${idField}. Skipping.`);
            continue;
          }

          // NetWorthEvolution created_at is a Date in schema but string in JSON
          if (record.created_at) record.created_at = new Date(record.created_at);
          if (record.updatedAt) record.updatedAt = new Date(record.updatedAt);
          if (record.createdAt) record.createdAt = new Date(record.createdAt);
          if (record.periodStart) record.periodStart = new Date(record.periodStart);

          await model.upsert({
            where,
            update: record,
            create: record,
          });
        } catch (e: any) {
          console.error(`❌ Error restoring record in ${modelKey}: ${e.message}`);
        }
      }
    }

    console.log('✅ Restoration completed successfully!');
  } catch (error: any) {
    console.error('❌ Restoration failed:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();
