#!/usr/bin/env node
const { execSync } = require('child_process');
const fs = require('fs');

// Load API key from .env.local
const envContent = fs.readFileSync('/Users/shareefali/clawd/bahrainnights/.env.local', 'utf8');
const keyMatch = envContent.match(/GOOGLE_PLACES_API_KEY=(.+)/);
const API_KEY = keyMatch ? keyMatch[1].trim() : null;

if (!API_KEY) {
  console.error('API key not found in .env.local');
  process.exit(1);
}

const FIELDS = 'places.id,places.displayName,places.businessStatus,places.formattedAddress,places.regularOpeningHours,places.rating,places.userRatingCount';

async function searchPlace(query) {
  const body = JSON.stringify({ textQuery: query });
  const curlCmd = `curl -s -X POST 'https://places.googleapis.com/v1/places:searchText' \
    -H "X-Goog-Api-Key: ${API_KEY}" \
    -H 'X-Goog-FieldMask: ${FIELDS}' \
    -H 'Content-Type: application/json' \
    -d '${body.replace(/'/g, "'\"'\"'")}'`;

  try {
    const result = execSync(curlCmd, { timeout: 15000 });
    return JSON.parse(result.toString());
  } catch (e) {
    return { error: e.message, stderr: e.stderr ? e.stderr.toString() : '' };
  }
}

async function main() {
  const venues = [
    'Coda Jazz Lounge Bahrain Palmyard Hotel',
    're/Asian Four Seasons Bahrain Bay',
    'Mezzanine Le Meridien City Centre Bahrain',
    'Piano Piano Gulf Hotel Bahrain',
    "Trader Vic's Ritz-Carlton Bahrain",
    'Typhoon Bar Gulf Hotel Bahrain',
    'Sheraton Bahrain Hotel Manama',
    'Calexico restaurant Bahrain Adliya',
    'CUT Lounge Four Seasons Bahrain Bay',
    'Club Wahoo Bahrain Juffair nightclub',
    'The Meat Company restaurant Bahrain Adliya',
    'Gaucho restaurant Bahrain',
    'Bushido Ritz-Carlton Bahrain',
    "JJ's Irish Pub Bahrain Gulf Hotel",
    'La Med Ritz-Carlton Bahrain',
    'Gulf Hotel Bahrain Adliya',
    'Diggers bar Bahrain Juffair',
    'Palmyard Hotel Bahrain Adliya',
    'Hazel Rooftop Lounge Bahrain',
    'Escobar Bahrain Block 338',
    'Botanica Bahrain restaurant',
    'Orangery Bahrain Palmyard Hotel',
    'Circa Bahrain Palmyard Hotel',
  ];

  let count = 0;
  for (const venue of venues) {
    count++;
    console.log(`\n[${count}/${venues.length}] === ${venue} ===`);
    const result = await searchPlace(venue);
    
    if (result.error) {
      console.log('ERROR:', result.error);
    } else if (result.places && result.places.length > 0) {
      for (const p of result.places) {
        const hours = p.regularOpeningHours
          ? `\n  Hours: ${p.regularOpeningHours.weekdayDescriptions ? p.regularOpeningHours.weekdayDescriptions.join(', ') : 'listed'}`
          : '\n  Hours: (none)';
        console.log(`  ID: ${p.id}`);
        console.log(`  Name: ${p.displayName?.text}`);
        console.log(`  Status: ${p.businessStatus}`);
        console.log(`  Address: ${p.formattedAddress}`);
        console.log(`  Rating: ${p.rating ?? 'N/A'} (${p.userRatingCount ?? 0} reviews)${hours}`);
      }
    } else {
      console.log('  NO RESULTS');
    }
    
    // Rate limit: sleep between calls
    await new Promise(r => setTimeout(r, 600));
  }
  
  console.log(`\n\nTotal calls: ${count}`);
}

main().catch(console.error);
