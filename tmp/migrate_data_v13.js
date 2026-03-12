const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  process.exit(1);
}

const pool = new Pool({ connectionString });

function parseCSV(filePath) {
  if (!fs.existsSync(filePath)) return [];
  const content = fs.readFileSync(filePath, 'utf-8');
  const results = [];
  const rows = [];
  let currentRow = [];
  let currentVal = '';
  let inQuotes = false;
  for (let i = 0; i < content.length; i++) {
    const char = content[i];
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
    const obj = {};
    headers.forEach((h, idx) => {
      let v = (rows[i][idx] || '').trim();
      if (v === 'null' || v === '') obj[h] = null;
      else if (v === 'true') obj[h] = true;
      else if (v === 'false') obj[h] = false;
      else obj[h] = v;
    });
    results.push(obj);
  }
  return results;
}

async function main() {
  const dataDir = path.join(process.cwd(), 'tmp');
  
  const client = await pool.connect();
  try {
    console.log('--- Migrating Users ---');
    const users = parseCSV(path.join(dataDir, 'User.csv'));
    for (const u of users) {
      await client.query(
        'INSERT INTO "User" (uid, email, "firstName", "lastName") VALUES ($1, $2, $3, $4) ON CONFLICT (uid) DO UPDATE SET email = $2, "firstName" = $3, "lastName" = $4',
        [u.uid, u.email, u.firstName, u.lastName]
      );
    }

    console.log('--- Migrating Assets ---');
    const assets = parseCSV(path.join(dataDir, 'Asset.csv'));
    for (const a of assets) {
      await client.query(
        'INSERT INTO "Asset" (id, asset, qty, wallet, type, uid, subtype, currency, account, exchange, created_at, purpose, category, tag, reviewed) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) ON CONFLICT (id) DO UPDATE SET asset = $2, qty = $3, wallet = $4, type = $5, uid = $6, subtype = $7, currency = $8, account = $9, exchange = $10, created_at = $11, purpose = $12, category = $13, tag = $14, reviewed = $15',
        [a.id, a.asset, a.qty, a.wallet, a.type, a.uid, a.subtype, a.currency, a.account, a.exchange, a.created_at, a.purpose, a.category, a.tag, a.reviewed === 'true']
      );
    }

    console.log('--- Migrating Shortcuts ---');
    const shortcuts = parseCSV(path.join(dataDir, 'Shortcut.csv'));
    for (const s of shortcuts) {
      await client.query(
        'INSERT INTO "Shortcut" (id, name, uid, url, created_at, description, category, "from") VALUES ($1, $2, $3, $4, $5, $6, $7, $8) ON CONFLICT (id) DO UPDATE SET name = $2, uid = $3, url = $4, created_at = $5, description = $6, category = $7, "from" = $8',
        [s.id, s.name, s.uid, s.url, s.created_at, s.description, s.category, s.from]
      );
    }

    console.log('Migration finished!');
  } finally {
    client.release();
  }
}

main().catch(console.error).finally(() => pool.end());
