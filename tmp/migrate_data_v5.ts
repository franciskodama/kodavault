import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { Pool } from '@neondatabase/serverless';
import fs from 'fs';
import path from 'path';
import 'dotenv/config';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error('DATABASE_URL not found in .env');
  process.exit(1);
}

const pool = new Pool({ connectionString });
const adapter = new PrismaNeon(pool);
const prisma = new PrismaClient({ adapter });

// A more robust CSV parser that handles quotes and multiline values
function parseCSV(filePath: string) {
  if (!fs.existsSync(filePath)) {
    console.warn(`File not found: ${filePath}`);
    return [];
  }
  const content = fs.readFileSync(filePath, 'utf-8');
  const results: any[] = [];
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentVal = '';
  let inQuotes = false;

  for (let i = 0; i < content.length; i++) {
    const char = content[i];
    const nextChar = content[i + 1];

    if (char === '"' && inQuotes && nextChar === '"') {
      currentVal += '"'; // Escaped quote
      i++;
      continue;
    }

    if (char === '"') {
      inQuotes = !inQuotes;
      continue;
    }

    if (char === ',' && !inQuotes) {
      currentRow.push(currentVal);
      currentVal = '';
      continue;
    }

    if (char === '\n' && !inQuotes) {
      currentRow.push(currentVal);
      rows.push(currentRow);
      currentRow = [];
      currentVal = '';
      continue;
    }

    if (char === '\r' && !inQuotes) {
      if (nextChar === '\n') i++;
      currentRow.push(currentVal);
      rows.push(currentRow);
      currentRow = [];
      currentVal = '';
      continue;
    }

    currentVal += char;
  }

  if (currentRow.length > 0 || currentVal !== '') {
    currentRow.push(currentVal);
    rows.push(currentRow);
  }

  if (rows.length < 2) return [];

  const headers = rows[0].map(h => h.trim());
  
  for (let i = 1; i < rows.length; i++) {
    const values = rows[i];
    if (values.length < headers.length) continue;
    
    const obj: any = {};
    headers.forEach((header, index) => {
      let val = (values[index] || '').trim();
      if (val === 'null' || val === '' || val === 'N/A') {
        obj[header] = null;
      } else if (val === 'true') {
        obj[header] = true;
      } else if (val === 'false') {
        obj[header] = false;
      } else if (!isNaN(Number(val)) && val.length > 0 && !val.includes('-') && !val.includes(':') && !val.includes('/')) {
        obj[header] = Number(val);
      } else {
        obj[header] = val;
      }
    });
    results.push(obj);
  }
  return results;
}

async function main() {
  const dataDir = path.join(process.cwd(), 'tmp');
  
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
                uid: user.uid,
                createdAt: user.createdAt ? new Date(user.createdAt) : undefined,
                updatedAt: user.updatedAt ? new Date(user.updatedAt) : undefined,
            },
            create: {
                firstName: user.firstName,
                lastName: user.lastName,
                city: user.city,
                state: user.state,
                country: user.country,
                email: user.email,
                uid: user.uid,
                createdAt: user.createdAt ? new Date(user.createdAt) : undefined,
                updatedAt: user.updatedAt ? new Date(user.updatedAt) : undefined,
            }
        });
    } catch (e) { console.error(`Failed user ${user.uid}`); }
  }

  console.log('--- Migrating Assets ---');
  const assets = parseCSV(path.join(dataDir, 'Asset.csv'));
  for (const asset of assets) {
    try {
        const data: any = { ...asset };
        if (data.created_at) data.created_at = new Date(data.created_at);
        if (data.qty) data.qty = Number(data.qty);
        
        await prisma.asset.upsert({
            where: { id: asset.id },
            update: data,
            create: data
        });
    } catch (e) { console.error(`Failed asset ${asset.asset}`); }
  }

  console.log('--- Migrating Shortcuts ---');
  const shortcuts = parseCSV(path.join(dataDir, 'Shortcut.csv'));
  for (const s of shortcuts) {
    try {
        const { color, ...data } = s; 
        if (data.created_at) data.created_at = new Date(data.created_at);
        await prisma.shortcut.upsert({
            where: { id: s.id },
            update: data,
            create: data
        });
    } catch (e) { console.error(`Failed shortcut ${s.name}`); }
  }

  console.log('--- Migrating Goals ---');
  const goals = parseCSV(path.join(dataDir, 'Goal.csv'));
  for (const g of goals) {
    try {
        const data: any = { ...g };
        if (data.created_at) data.created_at = new Date(data.created_at);
        if (data.goal) data.goal = Number(data.goal);
        
        await prisma.goal.upsert({
            where: { uid: g.uid },
            update: data,
            create: data
        });
    } catch (e) { console.error(`Failed goal ${g.uid}`); }
  }

  console.log('--- Migrating KeyAssets ---');
  const keyAssets = parseCSV(path.join(dataDir, 'KeyAsset.csv'));
  for (const ka of keyAssets) {
    try {
        const data: any = { ...ka };
        if (data.created_at) data.created_at = new Date(data.created_at);
        await prisma.keyAsset.upsert({
            where: { id: ka.id },
            update: data,
            create: data
        });
    } catch (e) { console.error(`Failed keyAsset ${ka.asset}`); }
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
    await pool.end();
  });
