const https = require('https');
const fs = require('fs');
require('dotenv').config({ path: '.env.local' });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error('Missing SUPABASE_URL or SERVICE_KEY');
  process.exit(1);
}

// Read migration file
const fullSql = fs.readFileSync('./supabase/migrations/20260112_add_venue_reels.sql', 'utf8');

// Split into individual statements
const statements = fullSql
  .split(';')
  .map(s => s.trim())
  .filter(s => s.length > 0 && !s.startsWith('--') && !s.startsWith('COMMENT'));

const url = new URL(SUPABASE_URL);

async function runStatement(sql, index) {
  return new Promise((resolve) => {
    // Use the SQL endpoint
    const postData = JSON.stringify({ query: sql });
    
    const options = {
      hostname: url.hostname,
      port: 443,
      path: '/rest/v1/rpc/pg_execute',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SERVICE_KEY,
        'Authorization': 'Bearer ' + SERVICE_KEY,
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const preview = sql.substring(0, 50).replace(/\n/g, ' ');
        if (res.statusCode === 200 || res.statusCode === 201 || res.statusCode === 204) {
          console.log(`✅ [${index}] ${preview}...`);
        } else {
          console.log(`⚠️ [${index}] ${preview}... (${res.statusCode})`);
        }
        resolve();
      });
    });

    req.on('error', (e) => {
      console.log(`❌ [${index}] Error: ${e.message}`);
      resolve();
    });

    req.write(postData);
    req.end();
  });
}

async function main() {
  console.log('Running migration with', statements.length, 'statements...\n');
  
  for (let i = 0; i < statements.length; i++) {
    await runStatement(statements[i], i + 1);
  }
  
  console.log('\nMigration attempt complete.');
}

main();
