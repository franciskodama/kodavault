const { Pool } = require('@neondatabase/serverless');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function run() {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
        console.error("DATABASE_URL not found in .env");
        return;
    }
    
    const pool = new Pool({ connectionString });
    
    try {
        const sql = fs.readFileSync(path.join(process.cwd(), 'tmp/restore_nwe.sql'), 'utf8');
        console.log("Restoring NetWorthEvolution...");
        
        await pool.query(sql);
        
        console.log("✅ SUCCESS! NetWorthEvolution has been restored.");
    } catch (err) {
        console.error("❌ Error during restoration:", err);
    } finally {
        await pool.end();
    }
}

run();
