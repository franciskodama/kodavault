// Load environment variables ASAP
import * as dotenv from 'dotenv';
dotenv.config();

import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import * as fs from 'fs';
import * as path from 'path';
import { encrypt } from './utils/encryption';
import { uploadFile } from './utils/gcs';

const connectionString = process.env.DATABASE_URL!;
const backupSecret = process.env.BACKUP_SECRET!;
const adapter = new PrismaNeon({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🚀 Starting Trezo Encrypted Cloud Backup...');

  if (!backupSecret) {
    console.error('❌ BACKUP_SECRET is not set in environment variables');
    process.exit(1);
  }

  try {
    const data = {
      timestamp: new Date().toISOString(),
      payload: {
        category: await prisma.category.findMany(),
        event: await prisma.event.findMany(),
        user: await prisma.user.findMany(),
        userSettings: await prisma.userSettings.findMany(),
        asset: await prisma.asset.findMany(),
        coinGoal: await prisma.coinGoal.findMany(),
        shortcut: await prisma.shortcut.findMany(),
        netWorthEvolution: await prisma.netWorthEvolution.findMany(),
        goal: await prisma.goal.findMany(),
        projection: await prisma.projection.findMany(),
        keyAsset: await prisma.keyAsset.findMany(),
      }
    };

    const jsonString = JSON.stringify(data, null, 2);
    const encryptedData = encrypt(jsonString, backupSecret);
    
    // Create backup filename
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const fileName = `backup-${timestamp}.json.enc`;
    const backupsDir = path.join(process.cwd(), 'backups');

    if (!fs.existsSync(backupsDir)) {
      fs.mkdirSync(backupsDir);
    }

    const filePath = path.join(backupsDir, fileName);
    fs.writeFileSync(filePath, encryptedData);
    console.log(`🔒 Local encrypted backup saved: ${filePath}`);

    // Upload to GCS
    await uploadFile(filePath);

    // Update 'latest' pointer
    const latestFileName = 'latest-backup.json.enc';
    const latestPath = path.join(backupsDir, latestFileName);
    fs.writeFileSync(latestPath, encryptedData);
    await uploadFile(latestPath);

    console.log('✨ Backup process completed successfully!');
  } catch (error) {
    console.error('❌ Backup failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
