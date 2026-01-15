import dotenv from 'dotenv';
import { resolve } from 'path';

// Load environment variables from project root
dotenv.config({ path: resolve(process.cwd(), '../../.env.local') });
dotenv.config({ path: resolve(process.cwd(), '../../.env') });
import { fetchEvents } from './fetch-events.js';
import { fetchAttractions } from './fetch-attractions.js';
import { fetchInternationalEvents } from './fetch-international.js';
import { log, getInternationalCountries } from './utils.js';

/**
 * Main orchestrator for Platinumlist sync
 * Fetches Bahrain events, attractions, and international events
 */
async function main(): Promise<void> {
  const startTime = Date.now();

  console.log('');
  console.log('╔════════════════════════════════════════════════════════╗');
  console.log('║        🌙 BahrainNights - Platinumlist Sync 🌙         ║');
  console.log('╚════════════════════════════════════════════════════════╝');
  console.log('');
  console.log(`🇧🇭 Bahrain Events & Attractions`);
  console.log(`🌍 International Events: ${getInternationalCountries().join(', ')}`);
  console.log('');

  let bahrainEventsSuccess = false;
  let attractionsSuccess = false;
  let internationalEventsSuccess = false;

  // Sync Bahrain Events
  try {
    await fetchEvents();
    bahrainEventsSuccess = true;
  } catch (error) {
    log(`Bahrain events sync failed: ${error}`, 'error');
  }

  console.log('');

  // Sync Attractions
  try {
    await fetchAttractions();
    attractionsSuccess = true;
  } catch (error) {
    log(`Attractions sync failed: ${error}`, 'error');
  }

  console.log('');

  // Sync International Events
  try {
    await fetchInternationalEvents();
    internationalEventsSuccess = true;
  } catch (error) {
    log(`International events sync failed: ${error}`, 'error');
  }

  // Final Summary
  const duration = ((Date.now() - startTime) / 1000).toFixed(2);

  console.log('');
  console.log('╔════════════════════════════════════════════════════════╗');
  console.log('║                    📊 SYNC SUMMARY                     ║');
  console.log('╠════════════════════════════════════════════════════════╣');
  console.log(`║  🇧🇭 Bahrain Events:      ${bahrainEventsSuccess ? '✅ Success' : '❌ Failed'}                    ║`);
  console.log(`║  🎯 Attractions:          ${attractionsSuccess ? '✅ Success' : '❌ Failed'}                    ║`);
  console.log(`║  🌍 International Events: ${internationalEventsSuccess ? '✅ Success' : '❌ Failed'}                    ║`);
  console.log(`║  ⏱️  Duration:            ${duration}s                         ║`);
  console.log('╚════════════════════════════════════════════════════════╝');
  console.log('');

  // Exit with error code if any sync failed
  if (!bahrainEventsSuccess || !attractionsSuccess || !internationalEventsSuccess) {
    process.exit(1);
  }
}

// Run
main().catch((error) => {
  log(`Fatal error: ${error}`, 'error');
  process.exit(1);
});
