/**
 * Fix all Platinumlist affiliate URLs in the database
 * Run with: npx tsx scripts/fix-platinumlist-affiliate.ts
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const AFFILIATE_REF = 'yjg3yzi';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

function generateAffiliateUrl(originalUrl: string): string {
  // If already has correct affiliate format, return as-is
  if (originalUrl.includes(`/aff/?ref=${AFFILIATE_REF}`)) {
    return originalUrl;
  }
  
  // Get the base URL (remove any existing affiliate params)
  let cleanUrl = originalUrl;
  if (originalUrl.includes('?affiliate=')) {
    cleanUrl = originalUrl.split('?affiliate=')[0];
  }
  
  const encodedUrl = encodeURIComponent(cleanUrl);
  return `https://platinumlist.net/aff/?ref=${AFFILIATE_REF}&link=${encodedUrl}`;
}

async function fixEvents() {
  console.log('Fixing Platinumlist events...');
  
  // Get all events with platinumlist URLs
  const { data: events, error } = await supabase
    .from('events')
    .select('id, title, affiliate_url, booking_url, source_url')
    .or('source_name.eq.platinumlist,affiliate_url.ilike.%platinumlist%,booking_url.ilike.%platinumlist%');

  if (error) {
    console.error('Error fetching events:', error);
    return;
  }

  console.log(`Found ${events?.length || 0} events to check`);
  
  let fixed = 0;
  let alreadyCorrect = 0;
  
  for (const event of events || []) {
    const sourceUrl = event.booking_url || event.source_url;
    if (!sourceUrl || !sourceUrl.includes('platinumlist')) continue;
    
    const correctAffiliateUrl = generateAffiliateUrl(sourceUrl);
    
    if (event.affiliate_url === correctAffiliateUrl) {
      alreadyCorrect++;
      continue;
    }
    
    const { error: updateError } = await supabase
      .from('events')
      .update({ affiliate_url: correctAffiliateUrl })
      .eq('id', event.id);
    
    if (updateError) {
      console.error(`Error updating event ${event.id}:`, updateError);
    } else {
      console.log(`Fixed: ${event.title}`);
      fixed++;
    }
  }
  
  console.log(`\nEvents: ${fixed} fixed, ${alreadyCorrect} already correct`);
}

async function fixAttractions() {
  console.log('\nFixing Platinumlist attractions...');
  
  const { data: attractions, error } = await supabase
    .from('attractions')
    .select('id, name, affiliate_url, booking_url')
    .or('source.eq.platinumlist,affiliate_url.ilike.%platinumlist%,booking_url.ilike.%platinumlist%');

  if (error) {
    console.error('Error fetching attractions:', error);
    return;
  }

  console.log(`Found ${attractions?.length || 0} attractions to check`);
  
  let fixed = 0;
  let alreadyCorrect = 0;
  
  for (const attraction of attractions || []) {
    const sourceUrl = attraction.booking_url;
    if (!sourceUrl || !sourceUrl.includes('platinumlist')) continue;
    
    const correctAffiliateUrl = generateAffiliateUrl(sourceUrl);
    
    if (attraction.affiliate_url === correctAffiliateUrl) {
      alreadyCorrect++;
      continue;
    }
    
    const { error: updateError } = await supabase
      .from('attractions')
      .update({ affiliate_url: correctAffiliateUrl })
      .eq('id', attraction.id);
    
    if (updateError) {
      console.error(`Error updating attraction ${attraction.id}:`, updateError);
    } else {
      console.log(`Fixed: ${attraction.name}`);
      fixed++;
    }
  }
  
  console.log(`\nAttractions: ${fixed} fixed, ${alreadyCorrect} already correct`);
}

async function main() {
  console.log('=== Platinumlist Affiliate URL Fixer ===\n');
  console.log(`Affiliate code: ${AFFILIATE_REF}`);
  console.log(`Correct format: https://platinumlist.net/aff/?ref=${AFFILIATE_REF}&link=[URL]\n`);
  
  await fixEvents();
  await fixAttractions();
  
  console.log('\n=== Done! ===');
}

main().catch(console.error);
