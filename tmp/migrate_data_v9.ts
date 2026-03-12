import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { Pool } from '@neondatabase/serverless';
import fs from 'fs';
import path from 'path';

// Manual env loading
const envFile = fs.readFileSync('.env', 'utf-8');
const connectionString = envFile
  .split('\n')
  .find(line => line.startsWith('DATABASE_URL='))
  ?.split('=')[1]
  .replace(/"/g, '')
  .trim();

if (!connectionString) {
  console.error('DATABASE_URL not found in .env');
  process.exit(1);
}

console.log('Connecting to:', connectionString.substring(0, 20) + '...');

const pool = new Pool({ connectionString });
const adapter = new PrismaNeon(pool);
const prisma = new PrismaClient({ adapter });

function parseCSV(filePath: string) {
  if (!fs.existsSync(filePath)) return [];
  const content = fs.readFileSync(filePath, 'utf-8');
  const results: any[] = [];
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentVal = '';
  let inQuotes = false;
  for (let i = 0; i < content.length; i++) {
    const char = content[i];
    const nextChar = content[i + 1];
    if (char === '"' && inQuotes && nextChar === '"') { currentVal += '"'; i++; continue; }
    if (char === '"') { inQuotes = !inQuotes; continue; }
    if (char === ',' && !inQuotes) { currentRow.push(currentVal); currentVal = ''; continue; }
    if ((char === '\n' || char === '\r') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') i++;
      currentRow.push(currentVal);
      rows.push(currentRow);
      currentRow = [];
      currentVal = '';
      continue;
    }
    currentVal += char;
  }
  if (currentRow.length > 0 || currentVal !== '') { currentRow.push(currentVal); rows.push(currentRow); }
  const headers = rows[0].map(h => h.trim());
  for (let i = 1; i < rows.length; i++) {
    const values = rows[i];
    if (values.length < headers.length) continue;
    const obj: any = {};
    headers.forEach((header, index) => {
      let val = (values[index] || '').trim();
      if (val === 'null' || val === '' || val === 'N/A') obj[header] = null;
      else if (val === 'true') obj[header] = true;
      else if (val === 'false') obj[header] = false;
      else if (!isNaN(Number(val)) && val.length > 0 && !val.includes('-') && !val.includes(':') && !val.includes('/')) obj[header] = Number(val);
      else obj[header] = val;
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
        const data = {
            firstName: user.firstName,
            lastName: user.lastName,
            city: user.city,
            state: user.state,
            country: user.country,
            email: user.email,
            uid: user.uid,
        };
        await prisma.user.upsert({ where: { uid: user.uid }, update: data, create: data });
    } catch (e: any) { console.error(`Failed user ${user.uid}: ${e.message}`); }
  }

  console.log('--- Migrating Assets ---');
  const assets = parseCSV(path.join(dataDir, 'Asset.csv'));
  for (const asset of assets) {
    try {
        const data: any = { ...asset };
        if (data.created_at) data.created_at = new Date(data.created_at);
        if (data.qty) data.qty = Number(data.qty);
        data.reviewed = !!data.reviewed;
        await prisma.asset.upsert({ where: { id: asset.id }, update: data, create: data });
    } catch (e: any) { console.error(`Failed asset ${asset.asset}: ${e.message}`); }
  }

  console.log('--- Migrating Shortcuts ---');
  const shortcuts = parseCSV(path.join(dataDir, 'Shortcut.csv'));
  for (const s of shortcuts) {
    try {
      const { color, ...data } = s;
      if (data.created_at) data.created_at = new Date(data.created_at);
      await prisma.shortcut.upsert({ where: { id: s.id }, update: data, create: data });
    } catch (e: any) { console.error(`Failed shortcut ${s.name}: ${e.message}`); }
  }

  console.log('Migration finished!');
}

main().catch(console.error).finally(async () => { await prisma.$disconnect(); await pool.end(); });
