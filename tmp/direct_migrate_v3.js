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
        const sql = fs.readFileSync(path.join(process.cwd(), 'tmp/restore.sql'), 'utf8');
        console.log("Running restoration script... (Single transaction)");
        
        await pool.query(sql);
        
        console.log("✅ SUCCESS! Your data has been migrated to the new Neon database.");
    } catch (err) {
        console.error("❌ Error during restoration:", err);
    } finally {
        await pool.end();
    }
}

run();
