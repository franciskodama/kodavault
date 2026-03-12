const fs = require('fs');
const path = require('path');

function parseCSV(filePath) {
  if (!fs.existsSync(filePath)) return [];
  const content = fs.readFileSync(filePath, 'utf-8');
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
  const results = [];
  for (let i = 1; i < rows.length; i++) {
    const obj = {};
    headers.forEach((h, idx) => {
      let v = (rows[i][idx] || '').trim();
      if (v === 'null' || v === '') obj[h] = null;
      else obj[h] = v;
    });
    results.push(obj);
  }
  return results;
}

function escapeSQL(val) {
  if (val === null) return 'NULL';
  if (typeof val === 'string') return "'" + val.replace(/'/g, "''") + "'";
  return val;
}

const dataDir = path.join(process.cwd(), 'tmp');
let sql = '-- TREZO RESTORATION SCRIPT\n\n';

// Users
const users = parseCSV(path.join(dataDir, 'User.csv'));
users.forEach(u => {
  sql += `INSERT INTO "User" (uid, email, "firstName", "lastName") VALUES (${escapeSQL(u.uid)}, ${escapeSQL(u.email)}, ${escapeSQL(u.firstName)}, ${escapeSQL(u.lastName)}) ON CONFLICT (uid) DO UPDATE SET email = EXCLUDED.email, "firstName" = EXCLUDED."firstName", "lastName" = EXCLUDED."lastName";\n`;
});

// Assets
const assets = parseCSV(path.join(dataDir, 'Asset.csv'));
assets.forEach(a => {
  sql += `INSERT INTO "Asset" (id, asset, qty, wallet, type, uid, subtype, currency, account, exchange, created_at, purpose, category, tag, reviewed) VALUES (${escapeSQL(a.id)}, ${escapeSQL(a.asset)}, ${a.qty || 0}, ${escapeSQL(a.wallet)}, ${escapeSQL(a.type)}, ${escapeSQL(a.uid)}, ${escapeSQL(a.subtype)}, ${escapeSQL(a.currency)}, ${escapeSQL(a.account)}, ${escapeSQL(a.exchange)}, ${escapeSQL(a.created_at)}, ${escapeSQL(a.purpose)}, ${escapeSQL(a.category)}, ${escapeSQL(a.tag)}, ${a.reviewed === 'true'}) ON CONFLICT (id) DO UPDATE SET asset = EXCLUDED.asset, qty = EXCLUDED.qty, wallet = EXCLUDED.wallet, type = EXCLUDED.type, uid = EXCLUDED.uid, subtype = EXCLUDED.subtype, currency = EXCLUDED.currency, account = EXCLUDED.account, exchange = EXCLUDED.exchange, created_at = EXCLUDED.created_at, purpose = EXCLUDED.purpose, category = EXCLUDED.category, tag = EXCLUDED.tag, reviewed = EXCLUDED.reviewed;\n`;
});

// Shortcuts
const shortcuts = parseCSV(path.join(dataDir, 'Shortcut.csv'));
shortcuts.forEach(s => {
  sql += `INSERT INTO "Shortcut" (id, name, uid, url, created_at, description, category, "from") VALUES (${escapeSQL(s.id)}, ${escapeSQL(s.name)}, ${escapeSQL(s.uid)}, ${escapeSQL(s.url)}, ${escapeSQL(s.created_at)}, ${escapeSQL(s.description)}, ${escapeSQL(s.category)}, ${escapeSQL(s.from)}) ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, uid = EXCLUDED.uid, url = EXCLUDED.url, created_at = EXCLUDED.created_at, description = EXCLUDED.description, category = EXCLUDED.category, "from" = EXCLUDED."from";\n`;
});

fs.writeFileSync(path.join(dataDir, 'restore.sql'), sql);
console.log('SQL script generated at tmp/restore.sql');
