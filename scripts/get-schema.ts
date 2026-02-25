import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { autoRefreshToken: false, persistSession: false }
});

async function getSchema() {
  console.log('='.repeat(80));
  console.log('BAHRAINNIGHTS DATABASE SCHEMA');
  console.log('='.repeat(80));
  console.log('');

  // Query 1: All columns
  console.log('## TABLES AND COLUMNS');
  console.log('-'.repeat(80));
  
  const { data: columns, error: colError } = await supabase.rpc('exec_sql', {
    query: `
      SELECT table_name, column_name, data_type, is_nullable, column_default, character_maximum_length
      FROM information_schema.columns
      WHERE table_schema = 'public'
      ORDER BY table_name, ordinal_position
    `
  });
  
  if (colError) {
    // Try alternative approach - query tables directly
    const { data: tables } = await supabase.from('information_schema.columns').select('*');
    console.log('Error with rpc, trying fetch...');
  }
  
  console.log(JSON.stringify(columns, null, 2));
  
  // Query 2: Constraints
  console.log('\n## CONSTRAINTS AND RELATIONSHIPS');
  console.log('-'.repeat(80));
  
  const { data: constraints, error: constError } = await supabase.rpc('exec_sql', {
    query: `
      SELECT tc.table_name, tc.constraint_name, tc.constraint_type, 
             kcu.column_name, ccu.table_name AS foreign_table_name, 
             ccu.column_name AS foreign_column_name
      FROM information_schema.table_constraints AS tc
      JOIN information_schema.key_column_usage AS kcu ON tc.constraint_name = kcu.constraint_name
      LEFT JOIN information_schema.constraint_column_usage AS ccu ON ccu.constraint_name = tc.constraint_name
      WHERE tc.table_schema = 'public'
      ORDER BY tc.table_name
    `
  });
  
  console.log(JSON.stringify(constraints, null, 2));
  
  // Query 3: RLS Policies
  console.log('\n## RLS POLICIES');
  console.log('-'.repeat(80));
  
  const { data: policies, error: polError } = await supabase.rpc('exec_sql', {
    query: `
      SELECT tablename, policyname, permissive, roles, cmd, qual, with_check
      FROM pg_policies
      WHERE schemaname = 'public'
      ORDER BY tablename
    `
  });
  
  console.log(JSON.stringify(policies, null, 2));
  
  // Query 4: Indexes
  console.log('\n## INDEXES');
  console.log('-'.repeat(80));
  
  const { data: indexes, error: idxError } = await supabase.rpc('exec_sql', {
    query: `
      SELECT tablename, indexname, indexdef
      FROM pg_indexes
      WHERE schemaname = 'public'
      ORDER BY tablename
    `
  });
  
  console.log(JSON.stringify(indexes, null, 2));
}

getSchema().catch(console.error);
