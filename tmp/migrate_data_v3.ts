import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

function parseCSV(filePath: string) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const headers = lines[0].split(',');
  
  const results: any[] = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    // Very basic CSV parser that handles commas but doesn't handle escaped commas in quotes yet.
    // Given the data, we might need a more robust parser for columns with descriptions.
    // Let's use a simple regex for splitting by comma but respecting quotes.
    const regex = /,(?=(?:(?:[^"]*"){2})*[^"]*$)/;
    const values = line.split(regex);
    
    const obj: any = {};
    headers.forEach((header, index) => {
      let val = (values[index] || '').trim().replace(/^"|"$/g, '');
      if (val === 'null' || val === '' || val === 'N/A') {
        obj[header.trim()] = null;
      } else if (val === 'true') {
        obj[header.trim()] = true;
      } else if (val === 'false') {
        obj[header.trim()] = false;
      } else if (!isNaN(Number(val)) && val.length > 0 && !val.includes('-')) {
        obj[header.trim()] = Number(val);
      } else {
        obj[header.trim()] = val;
      }
    });
    results.push(obj);
  }
  return results;
}

async function main() {
  const dataDir = path.join(__dirname, 'tmp');
  
  console.log('--- Migrating Users ---');
  const users = parseCSV(path.join(dataDir, 'User.csv'));
  for (const user of users) {
    try {
        await prisma.user.upsert({
            where: { uid: user.uid },
            update: {
                firstName: user.firstName,
                lastName: user.lastName,
                city: user.city,
                state: user.state,
                country: user.country,
                email: user.email,
                createdAt: new Date(user.createdAt),
                updatedAt: new Date(user.updatedAt),
            },
            create: {
                firstName: user.firstName,
                lastName: user.lastName,
                city: user.city,
                state: user.state,
                country: user.country,
                email: user.email,
                uid: user.uid,
                createdAt: new Date(user.createdAt),
                updatedAt: new Date(user.updatedAt),
            }
        });
    } catch (e) { console.error(`Failed user ${user.uid}:`, e); }
  }

  console.log('--- Migrating Assets ---');
  const assets = parseCSV(path.join(dataDir, 'Asset.csv'));
  for (const asset of assets) {
    try {
        await prisma.asset.upsert({
            where: { id: asset.id },
            update: { ...asset, created_at: new Date(asset.created_at), qty: Number(asset.qty) },
            create: { ...asset, created_at: new Date(asset.created_at), qty: Number(asset.qty) }
        });
    } catch (e) {
        // Handle potential enum mismatches
        console.error(`Failed asset ${asset.asset}:`, e);
    }
  }

  console.log('--- Migrating Shortcuts ---');
  const shortcuts = parseCSV(path.join(dataDir, 'Shortcut.csv'));
  for (const s of shortcuts) {
    try {
        // Remove 'color' as it is no longer in schema
        const { color, ...data } = s;
        await prisma.shortcut.upsert({
            where: { id: s.id },
            update: { ...data, created_at: new Date(s.created_at) },
            create: { ...data, created_at: new Date(s.created_at) }
        });
    } catch (e) { console.error(`Failed shortcut ${s.name}:`, e); }
  }

  console.log('--- Migrating Goals ---');
  const goals = parseCSV(path.join(dataDir, 'Goal.csv'));
  for (const g of goals) {
    try {
        await prisma.goal.upsert({
            where: { uid: g.uid },
            update: { ...g, created_at: new Date(g.created_at), goal: g.goal ? Number(g.goal) : 0 },
            create: { ...g, created_at: new Date(g.created_at), goal: g.goal ? Number(g.goal) : 0 }
        });
    } catch (e) { console.error(`Failed goal ${g.uid}:`, e); }
  }

  console.log('--- Migrating NetWorthEvolution ---');
  const nwe = parseCSV(path.join(dataDir, 'NetWorthEvolution.csv'));
  for (const row of nwe) {
    try {
        await prisma.netWorthEvolution.create({
            data: { ...row, created_at: new Date(row.created_at) }
        });
    } catch (e) { console.error(`Failed nwe row:`, e); }
  }

  console.log('Migration finished!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
