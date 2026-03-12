import prisma from '../lib/prisma';
import fs from 'fs';
import path from 'path';

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
    if (char === '"' && inQuotes && content[i+1] === '"') { currentVal += '"'; i++; continue; }
    if (char === '"') { inQuotes = !inQuotes; continue; }
    if (char === ',' && !inQuotes) { currentRow.push(currentVal); currentVal = ''; continue; }
    if ((char === '\n' || char === '\r') && !inQuotes) {
      if (char === '\r' && content[i+1] === '\n') i++;
      currentRow.push(currentVal); rows.push(currentRow); currentRow = []; currentVal = '';
      continue;
    }
    currentVal += char;
  }
  if (currentRow.length > 0) { currentRow.push(currentVal); rows.push(currentRow); }
  const headers = rows[0].map(h => h.trim());
  for (let i = 1; i < rows.length; i++) {
    const obj: any = {};
    headers.forEach((h, idx) => {
      let v = (rows[i][idx] || '').trim();
      if (v === 'null' || v === '') obj[h] = null;
      else if (v === 'true') obj[h] = true;
      else if (v === 'false') obj[h] = false;
      else if (!isNaN(Number(v)) && v.length > 0 && !v.includes('-') && !v.includes(':') && !v.includes('/')) obj[h] = Number(v);
      else obj[h] = v;
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
        await (prisma.user as any).upsert({
            where: { uid: user.uid },
            update: { email: user.email, firstName: user.firstName, lastName: user.lastName },
            create: { uid: user.uid, email: user.email, firstName: user.firstName, lastName: user.lastName }
        });
    } catch (e: any) { console.error(`Failed user ${user.uid}: ${e.message}`); }
  }

  console.log('--- Migrating Assets ---');
  const assets = parseCSV(path.join(dataDir, 'Asset.csv'));
  for (const asset of assets) {
    try {
        const data = { ...asset };
        if (data.created_at) data.created_at = new Date(data.created_at);
        if (data.qty) data.qty = Number(data.qty);
        data.reviewed = !!data.reviewed;
        await (prisma.asset as any).upsert({ where: { id: asset.id }, update: data, create: data });
    } catch (e: any) { console.error(`Failed asset ${asset.asset}: ${e.message}`); }
  }

  console.log('Migration finished!');
}

main().catch(console.error).finally(() => (prisma as any).$disconnect());
