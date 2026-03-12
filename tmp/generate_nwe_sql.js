const fs = require('fs');
const path = require('path');

function parseCSV(filePath) {
  if (!fs.existsSync(filePath)) return [];
  const content = fs.readFileSync(filePath, 'utf-8');
  const rows = [];
  let currentRow = [];
  let currentVal = '';
  // Simplified CSV parser for standard CSVs
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
let sql = '-- NETWORTH EVOLUTION RESTORATION\n\n';

const nwe = parseCSV(path.join(dataDir, 'NetWorthEvolution.csv'));
nwe.forEach(row => {
  // Convert numeric values to numbers or 0
  const usd = parseFloat(row.usd) || 0;
  const cad = parseFloat(row.cad) || 0;
  const brl = parseFloat(row.brl) || 0;
  const btc = parseFloat(row.btc) || 0;
  const created_at = row.created_at;
  const id = row.id;
  const uid = row.uid;

  sql += `INSERT INTO "NetWorthEvolution" (id, created_at, usd, cad, brl, btc, uid) VALUES (${escapeSQL(id)}, ${escapeSQL(created_at)}, ${usd}, ${cad}, ${brl}, ${btc}, ${escapeSQL(uid)}) ON CONFLICT (id) DO UPDATE SET created_at = EXCLUDED.created_at, usd = EXCLUDED.usd, cad = EXCLUDED.cad, brl = EXCLUDED.brl, btc = EXCLUDED.btc, uid = EXCLUDED.uid;\n`;
});

fs.writeFileSync(path.join(dataDir, 'restore_nwe.sql'), sql);
console.log('NWE SQL script generated at tmp/restore_nwe.sql');
