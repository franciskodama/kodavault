import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';

// Load environment variables
if (!process.env.DATABASE_URL) {
  require('dotenv').config();
}

const connectionString = process.env.DATABASE_URL!;
const backupPassword = process.env.BACKUP_PASSWORD; // New Secret!
const adapter = new PrismaNeon({ connectionString });
const prisma = new PrismaClient({ adapter });

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 12;

function encrypt(text: string, password: string): string {
  const iv = crypto.randomBytes(IV_LENGTH);
  const salt = crypto.randomBytes(16);
  // Derive key from password
  const key = crypto.scryptSync(password, salt as any, 32);
  const cipher = crypto.createCipheriv(ALGORITHM as any, key as any, iv as any);
  
  const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()] as any);
  const authTag = cipher.getAuthTag();

  // Combine salt, iv, authTag and encrypted data into one buffer
  return Buffer.concat([salt, iv, authTag, encrypted] as any).toString('base64');
}

async function main() {
  console.log('🚀 Starting Trezo system-wide backup...');

  if (!backupPassword) {
    console.error('❌ BACKUP_PASSWORD is not set. Encryption aborted for safety.');
    process.exit(1);
  }

  try {
    const backupData = {
      timestamp: new Date().toISOString(),
      version: '1.0',
      data: {
        categories: await prisma.category.findMany(),
        events: await prisma.event.findMany(),
        users: await prisma.user.findMany(),
        userSettings: await prisma.userSettings.findMany(),
        assets: await prisma.asset.findMany(),
        coinGoals: await prisma.coinGoal.findMany(),
        shortcuts: await prisma.shortcut.findMany(),
        netWorthEvolution: await prisma.netWorthEvolution.findMany(),
        goals: await prisma.goal.findMany(),
        projections: await prisma.projection.findMany(),
        keyAssets: await prisma.keyAsset.findMany(),
      }
    };

    const jsonString = JSON.stringify(backupData, null, 2);
    const encryptedData = encrypt(jsonString, backupPassword);
    
    const timestamp = new Date().toISOString();
    const backupsDir = path.join(process.cwd(), 'backups');

    if (!fs.existsSync(backupsDir)) {
      fs.mkdirSync(backupsDir);
    }

    // Save timestamped encrypted version
    const fileName = `backup_${timestamp.replace(/[:.]/g, '-')}.enc`;
    fs.writeFileSync(path.join(backupsDir, fileName), encryptedData);

    // Save 'latest' encrypted version
    fs.writeFileSync(path.join(backupsDir, 'automated_latest.enc'), encryptedData);

    console.log('✅ Backup encrypted and saved successfully!');
    console.log(`📊 Exported ${Object.keys(backupData.data).length} models.`);
  } catch (error) {
    console.error('❌ Backup failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
