import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import * as fs from 'fs';
import * as path from 'path';

// Load environment variables if not already present
if (!process.env.DATABASE_URL) {
  require('dotenv').config();
}

const connectionString = process.env.DATABASE_URL!;
const adapter = new PrismaNeon({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🚀 Starting Trezo system-wide backup...');

  try {
    // Fetch all data from all models
    const categories = await prisma.category.findMany();
    const events = await prisma.event.findMany();
    const users = await prisma.user.findMany();
    const userSettings = await prisma.userSettings.findMany();
    const assets = await prisma.asset.findMany();
    const coinGoals = await prisma.coinGoal.findMany();
    const shortcuts = await prisma.shortcut.findMany();
    const netWorthEvolution = await prisma.netWorthEvolution.findMany();
    const goals = await prisma.goal.findMany();
    const projections = await prisma.projection.findMany();
    const keyAssets = await prisma.keyAsset.findMany();

    const backupData = {
      timestamp: new Date().toISOString(),
      version: '1.0',
      data: {
        categories,
        events,
        users,
        userSettings,
        assets,
        coinGoals,
        shortcuts,
        netWorthEvolution,
        goals,
        projections,
        keyAssets,
      }
    };

    const timestamp = new Date().toISOString();
    const fileName = `backup_${timestamp.replace(/[:.]/g, '-')}.json`;
    const backupsDir = path.join(process.cwd(), 'backups');

    if (!fs.existsSync(backupsDir)) {
      fs.mkdirSync(backupsDir);
    }

    // Save timestamped version
    const filePath = path.join(backupsDir, fileName);
    fs.writeFileSync(filePath, JSON.stringify(backupData, null, 2));

    // Save 'latest' version for GitHub tracking
    const latestPath = path.join(backupsDir, 'automated_latest.json');
    fs.writeFileSync(latestPath, JSON.stringify(backupData, null, 2));

    console.log(`✅ Backup successfully saved to: ${filePath}`);
    console.log(`✅ Latest version updated: ${latestPath}`);
    console.log(`📊 Exported ${Object.keys(backupData.data).length} models.`);
  } catch (error) {
    console.error('❌ Backup failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
