const { Client } = require('pg');
const fs = require('fs');
require('dotenv').config();

// Standard pg client should work if it's in node_modules, 
// but we saw earlier it might not be. 
// Let's try to use the one from @neondatabase/serverless which we KNOW is there.
const { Pool } = require('@neondatabase/serverless');

async function run() {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
        console.error("DATABASE_URL not found");
        return;
    }
    
    console.log("Connecting to new Neon DB...");
    const pool = new Pool({ connectionString });
    
    try {
        const sql = fs.readFileSync('tmp/restore.sql', 'utf8');
        console.log("Running restoration script...");
        
        // Split by semicolon and filter out empty lines to run one by one
        // This is safer than running one giant block
        const commands = sql.split(';').map(cmd => cmd.trim()).filter(cmd => cmd.length > 0);
        
        for (let i = 0; i < commands.length; i++) {
            if (i % 50 === 0) console.log(`Progress: ${i}/${commands.length} commands...`);
            await pool.query(commands[i]);
        }
        
        console.log("✅ SUCCESS! Your data has been migrated to the new Neon database.");
    } catch (err) {
        console.error("❌ Error during restoration:", err);
    } finally {
        await pool.end();
    }
}

run();
