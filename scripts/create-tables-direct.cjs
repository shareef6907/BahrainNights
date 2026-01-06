// Create tables using Supabase REST API
const fs = require('fs');
const path = require('path');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseServiceKey) {
  console.error('SUPABASE_SERVICE_ROLE_KEY is required');
  process.exit(1);
}

async function executeSQL(sql) {
  // Extract project ref from URL
  const projectRef = supabaseUrl.replace('https://', '').replace('.supabase.co', '');

  const response = await fetch(`https://${projectRef}.supabase.co/rest/v1/rpc/exec_sql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': supabaseServiceKey,
      'Authorization': `Bearer ${supabaseServiceKey}`,
    },
    body: JSON.stringify({ sql }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`SQL execution failed: ${response.status} - ${text}`);
  }

  return response.json();
}

async function main() {
  console.log('Creating attractions system tables...\n');

  const sqlFile = path.join(__dirname, '../supabase/migrations/20260106_create_attractions_tables.sql');
  const sql = fs.readFileSync(sqlFile, 'utf8');

  try {
    await executeSQL(sql);
    console.log('✓ Tables created successfully!');
  } catch (error) {
    console.log('Could not execute SQL via RPC (function may not exist).');
    console.log('\n⚠️  Please run the SQL manually in Supabase SQL Editor:');
    console.log('   1. Go to: https://supabase.com/dashboard/project/nrnrrogxrheeoaxgdyut/sql/new');
    console.log('   2. Paste the contents of: supabase/migrations/20260106_create_attractions_tables.sql');
    console.log('   3. Click "Run"');
    console.log('\n   Or run individual table creation statements one by one.');
  }
}

main();
