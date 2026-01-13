import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function runMigrations() {
  console.log('='.repeat(50));
  console.log('Database Migrations - Starting');
  console.log('='.repeat(50));

  // For Supabase, we need to use the REST API or SQL editor
  // Since we can't run raw SQL directly, let's check columns and add via schema

  // Check current events table structure
  console.log('\nChecking events table structure...');
  const { data: eventsData, error: eventsError } = await supabase
    .from('events')
    .select('*')
    .limit(1);

  if (eventsData && eventsData.length > 0) {
    console.log('Current events columns:', Object.keys(eventsData[0]));
  }

  // Check current experiences table structure
  console.log('\nChecking experiences table structure...');
  const { data: expData, error: expError } = await supabase
    .from('experiences')
    .select('*')
    .limit(1);

  if (expData && expData.length > 0) {
    console.log('Current experiences columns:', Object.keys(expData[0]));
  } else {
    console.log('No experiences data found, checking if table exists...');
  }

  // Test inserting with new columns to see what's missing
  console.log('\n' + '='.repeat(50));
  console.log('Testing column availability...');
  console.log('='.repeat(50));

  // Test events columns
  const testEventInsert = {
    title: '__test_event__',
    slug: '__test_event_slug__' + Date.now(),
    description: 'Test',
    category: 'concerts',
    start_date: '2026-01-20',
    source: 'test',
    original_url: 'https://test.com/' + Date.now(),
    affiliate_url: 'https://test.com/aff',
    is_sold_out: false,
    price: 10.00,
    price_currency: 'BHD',
    cover_url: 'https://test.com/cover.jpg',
  };

  const { error: testEventError } = await supabase
    .from('events')
    .insert(testEventInsert);

  if (testEventError) {
    console.log('\nEvents table missing columns:');
    console.log('Error:', testEventError.message);

    // Parse error to find missing columns
    const missingCols = [];
    if (testEventError.message.includes('source')) missingCols.push('source');
    if (testEventError.message.includes('original_url')) missingCols.push('original_url');
    if (testEventError.message.includes('affiliate_url')) missingCols.push('affiliate_url');
    if (testEventError.message.includes('is_sold_out')) missingCols.push('is_sold_out');
    if (testEventError.message.includes('price')) missingCols.push('price');
    if (testEventError.message.includes('price_currency')) missingCols.push('price_currency');
    if (testEventError.message.includes('cover_url')) missingCols.push('cover_url');

    if (missingCols.length > 0) {
      console.log('Missing columns:', missingCols);
    }
  } else {
    console.log('✅ Events table has all required columns');
    // Delete test event
    await supabase.from('events').delete().eq('title', '__test_event__');
  }

  // Test experiences columns
  const testExpInsert = {
    title: '__test_experience__',
    slug: '__test_exp_slug__' + Date.now(),
    description: 'Test',
    category: 'tours',
    type: 'attraction',
    source: 'test',
    original_url: 'https://test.com/exp/' + Date.now(),
    affiliate_url: 'https://test.com/aff',
    is_sold_out: false,
    price: 10.00,
    price_currency: 'BHD',
    cover_url: 'https://test.com/cover.jpg',
    is_active: true,
  };

  const { error: testExpError } = await supabase
    .from('experiences')
    .insert(testExpInsert);

  if (testExpError) {
    console.log('\nExperiences table issue:');
    console.log('Error:', testExpError.message);
  } else {
    console.log('✅ Experiences table has all required columns');
    // Delete test experience
    await supabase.from('experiences').delete().eq('title', '__test_experience__');
  }

  console.log('\n' + '='.repeat(50));
  console.log('Migration Check Complete');
  console.log('='.repeat(50));
  console.log('\nNOTE: If columns are missing, you need to add them via Supabase Dashboard:');
  console.log('1. Go to https://supabase.com/dashboard');
  console.log('2. Select your project');
  console.log('3. Go to Table Editor');
  console.log('4. Add missing columns to events/experiences tables');
}

runMigrations().catch(console.error);
