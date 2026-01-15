import dotenv from 'dotenv';
import { resolve } from 'path';

// Load environment variables from project root
dotenv.config({ path: resolve(process.cwd(), '../../.env.local') });
dotenv.config({ path: resolve(process.cwd(), '../../.env') });
import { fetchEvents } from './fetch-events.js';
import { fetchAttractions } from './fetch-attractions.js';
import { log } from './utils.js';

/**
 * Main orchestrator for Platinumlist sync
 * Fetches both events and attractions
 */
async function main(): Promise<void> {
  const startTime = Date.now();

  console.log('');
  console.log('╔════════════════════════════════════════════════════════╗');
  console.log('║        🌙 BahrainNights - Platinumlist Sync 🌙         ║');
  console.log('╚════════════════════════════════════════════════════════╝');
  console.log('');

  let eventsSuccess = false;
  let attractionsSuccess = false;

  // Sync Events
  try {
    await fetchEvents();
    eventsSuccess = true;
  } catch (error) {
    log(`Events sync failed: ${error}`, 'error');
  }

  console.log('');

  // Sync Attractions
  try {
    await fetchAttractions();
    attractionsSuccess = true;
  } catch (error) {
    log(`Attractions sync failed: ${error}`, 'error');
  }

  // Final Summary
  const duration = ((Date.now() - startTime) / 1000).toFixed(2);

  console.log('');
  console.log('╔════════════════════════════════════════════════════════╗');
  console.log('║                    📊 SYNC SUMMARY                     ║');
  console.log('╠════════════════════════════════════════════════════════╣');
  console.log(`║  Events:      ${eventsSuccess ? '✅ Success' : '❌ Failed'}                             ║`);
  console.log(`║  Attractions: ${attractionsSuccess ? '✅ Success' : '❌ Failed'}                             ║`);
  console.log(`║  Duration:    ${duration}s                                  ║`);
  console.log('╚════════════════════════════════════════════════════════╝');
  console.log('');

  // Exit with error code if any sync failed
  if (!eventsSuccess || !attractionsSuccess) {
    process.exit(1);
  }
}

// Run
main().catch((error) => {
  log(`Fatal error: ${error}`, 'error');
  process.exit(1);
});
