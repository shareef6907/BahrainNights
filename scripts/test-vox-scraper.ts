#!/usr/bin/env npx tsx

/**
 * Test script for VOX scraper - just tests scraping without database
 */

import { scrapeVOXBahrain } from '../src/lib/scrapers/vox-bahrain';

async function test() {
  console.log('Testing VOX Bahrain scraper...\n');
  
  try {
    const result = await scrapeVOXBahrain();
    
    console.log('\n\n='.repeat(60));
    console.log('TEST RESULTS');
    console.log('='.repeat(60));
    console.log(`\nNow Showing: ${result.nowShowing.length} movies`);
    console.log(`Coming Soon: ${result.comingSoon.length} movies`);
    
    if (result.nowShowing.length >= 20) {
      console.log('\n✅ Now Showing count looks correct (20+ movies)');
    } else {
      console.log(`\n⚠️ Now Showing count seems low: ${result.nowShowing.length} (expected ~22)`);
    }
    
    if (result.comingSoon.length >= 10) {
      console.log('✅ Coming Soon count looks correct (10+ movies)');
    } else {
      console.log(`⚠️ Coming Soon count seems low: ${result.comingSoon.length} (expected ~11)`);
    }
    
  } catch (error) {
    console.error('Test failed:', error);
    process.exit(1);
  }
}

test();
