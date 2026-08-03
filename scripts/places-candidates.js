#!/usr/bin/env node
const { execSync } = require('child_process');
const fs = require('fs');

const envContent = fs.readFileSync('/Users/shareefali/clawd/bahrainnights/.env.local', 'utf8');
const keyMatch = envContent.match(/GOOGLE_PLACES_API_KEY=(.+)/);
const API_KEY = keyMatch ? keyMatch[1].trim() : null;

if (!API_KEY) { console.error('API key not found'); process.exit(1); }

const FIELDS = 'places.id,places.displayName,places.businessStatus,places.formattedAddress,places.regularOpeningHours,places.rating,places.userRatingCount';

async function searchPlace(query) {
  const body = JSON.stringify({ textQuery: query });
  const curlCmd = `curl -s -X POST 'https://places.googleapis.com/v1/places:searchText' -H "X-Goog-Api-Key: ${API_KEY}" -H 'X-Goog-FieldMask: ${FIELDS}' -H 'Content-Type: application/json' -d '${body.replace(/'/g, "'\"'\"'")}'`;
  try {
    const result = execSync(curlCmd, { timeout: 15000 });
    return JSON.parse(result.toString());
  } catch (e) { return { error: e.message }; }
}

async function main() {
  const candidates = [
    'Mai Tai Lounge Gallery 21 Bahrain',
    'Hangout Block 338 Bahrain Adliya',
    'Skybar Bahrain Four Seasons',
    'KAYA Lounge Gulf Hotel Bahrain',
    'Gallery 21 Bahrain art gallery venue',
    'Hot Table Bahrain Adliya',
    'Vibes Bahrain entertainment venue',
    'Block 338 Adliya Bahrain nightlife',
    'O Lounge Bahrain Adliya',
    'Circa Bahrain ladies night',
    'Botanica Bahrain ladies night',
    'Ace Club Bahrain Juffair nightclub',
    'Republiq Lounge Bahrain',
    'Retro Lounge Bahrain Juffair',
    'Club LIV Bahrain Juffair',
  ];

  for (const venue of candidates) {
    console.log(`\n=== ${venue} ===`);
    const result = await searchPlace(venue);
    if (result.error) {
      console.log('ERROR:', result.error);
    } else if (result.places && result.places.length > 0) {
      for (const p of result.places.slice(0,2)) {
        const hours = p.regularOpeningHours?.weekdayDescriptions
          ? '\n  Hours: ' + p.regularOpeningHours.weekdayDescriptions.join(', ')
          : '\n  Hours: (none)';
        console.log(`  ${p.displayName?.text} | ${p.businessStatus} | ${p.formattedAddress} | Rating: ${p.rating ?? 'N/A'}${hours}`);
      }
    } else {
      console.log('  NO RESULTS');
    }
    await new Promise(r => setTimeout(r, 600));
  }
}

main().catch(console.error);
