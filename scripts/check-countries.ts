import dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(process.cwd(), '.env.local') });
dotenv.config({ path: resolve(process.cwd(), '.env') });

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

async function checkCountries() {
  const { data, error } = await supabase
    .from('events')
    .select('country, city, title')
    .not('country', 'eq', 'Bahrain')
    .not('country', 'is', null);

  if (error) {
    console.error('Error:', error);
    return;
  }

  // Count by country
  const counts: Record<string, number> = {};
  data?.forEach(e => {
    counts[e.country] = (counts[e.country] || 0) + 1;
  });

  console.log('International events by country in database:');
  Object.entries(counts).sort((a, b) => b[1] - a[1]).forEach(([country, count]) => {
    console.log(`  ${country}: ${count}`);
  });

  // Show unique country values
  console.log('\nUnique country values:');
  const uniqueCountries = [...new Set(data?.map(e => e.country))];
  uniqueCountries.forEach(c => console.log(`  '${c}'`));

  // Show some UK events
  console.log('\nLooking for UK events:');
  const ukEvents = data?.filter(e =>
    e.country?.toLowerCase().includes('uk') ||
    e.country?.toLowerCase().includes('united kingdom') ||
    e.country?.toLowerCase().includes('england') ||
    e.country?.toLowerCase().includes('london')
  );
  console.log(`  Found ${ukEvents?.length || 0} UK-related events`);
  ukEvents?.slice(0, 3).forEach(e => {
    console.log(`    Country: '${e.country}', City: '${e.city}', Title: ${e.title?.substring(0, 50)}`);
  });

  // Check for Egypt and Turkey
  console.log('\nLooking for Egypt events:');
  const egyptEvents = data?.filter(e => e.country?.toLowerCase().includes('egypt'));
  console.log(`  Found ${egyptEvents?.length || 0} Egypt events`);

  console.log('\nLooking for Turkey/Türkiye events:');
  const turkeyEvents = data?.filter(e =>
    e.country?.toLowerCase().includes('turkey') ||
    e.country?.toLowerCase().includes('türkiye')
  );
  console.log(`  Found ${turkeyEvents?.length || 0} Turkey events`);
}

checkCountries();
