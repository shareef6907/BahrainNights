#!/usr/bin/env node
/**
 * Remove all age-related text from event descriptions
 * and clear age_restriction field
 */

const SUPABASE_URL = 'https://nrnrrogxrheeoaxgdyut.supabase.co';
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ybnJyb2d4cmhlZW9heGdkeXV0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NjgwOTExMSwiZXhwIjoyMDgyMzg1MTExfQ.R7b3H-2noh9jGfxxnhwH4SMAk0JMKNwMaCYVFX1RPq4';

// Patterns to remove from descriptions
const AGE_PATTERNS = [
  /\bfor all ages\b/gi,
  /\ball ages are welcome\b/gi,
  /\ball ages welcome\b/gi,
  /\bsuitable for all ages\b/gi,
  /\bopen to all ages\b/gi,
  /\bactivities for all ages\b/gi,
  /\bexperiences designed for all ages\b/gi,
  /\bexperiences for all ages\b/gi,
  /\bfun for all ages\b/gi,
  /\bentertainment for all ages\b/gi,
  /\binteractive experiences designed for all ages\b/gi,
  /\bfor audiences of all ages\b/gi,
  /\baudiences of all ages\b/gi,
  /\bfor children of all ages\b/gi,
  /\bchildren of all ages\b/gi,
  /\bfamilies of all ages\b/gi,
  /\bguests of all ages\b/gi,
  /\bvisitors of all ages\b/gi,
  /\bpeople of all ages\b/gi,
  /\bAll ages,? including expecting mothers,? are welcome[^.]*\./gi,
  /\bAll ages[^.]*are welcome[^.]*\./gi,
  /\bmusic for all ages\b/gi,
  /\bclassical music for all ages\b/gi,
  /\b21\+\b/gi,
  /\b18\+\b/gi,
  /\bage restriction[s]?:?\s*\w+/gi,
  /\bminimum age[^.]*\./gi,
  /\bages? \d+\s*(and|&)?\s*(above|over|up)\b/gi,
];

function cleanDescription(text) {
  if (!text) return text;
  let cleaned = text;
  for (const pattern of AGE_PATTERNS) {
    cleaned = cleaned.replace(pattern, '');
  }
  // Clean up double spaces and awkward punctuation
  cleaned = cleaned.replace(/\s{2,}/g, ' ');
  cleaned = cleaned.replace(/,\s*,/g, ',');
  cleaned = cleaned.replace(/\.\s*\./g, '.');
  cleaned = cleaned.replace(/\s+\./g, '.');
  cleaned = cleaned.replace(/\s+,/g, ',');
  return cleaned.trim();
}

async function main() {
  console.log('Fetching events with age-related text...');
  
  // Fetch all events
  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/events?select=id,title,description,age_restriction`,
    {
      headers: {
        'apikey': SERVICE_KEY,
        'Authorization': `Bearer ${SERVICE_KEY}`,
      }
    }
  );
  
  const events = await response.json();
  console.log(`Found ${events.length} total events`);
  
  let updated = 0;
  let errors = 0;
  
  for (const event of events) {
    const hasAgeInDesc = event.description && AGE_PATTERNS.some(p => p.test(event.description));
    const hasAgeRestriction = event.age_restriction;
    
    // Reset regex lastIndex
    AGE_PATTERNS.forEach(p => p.lastIndex = 0);
    
    if (!hasAgeInDesc && !hasAgeRestriction) continue;
    
    const cleanedDesc = cleanDescription(event.description);
    const needsUpdate = cleanedDesc !== event.description || hasAgeRestriction;
    
    if (!needsUpdate) continue;
    
    console.log(`Updating: ${event.title}`);
    
    const updateResponse = await fetch(
      `${SUPABASE_URL}/rest/v1/events?id=eq.${event.id}`,
      {
        method: 'PATCH',
        headers: {
          'apikey': SERVICE_KEY,
          'Authorization': `Bearer ${SERVICE_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal',
        },
        body: JSON.stringify({
          description: cleanedDesc,
          age_restriction: null,
        }),
      }
    );
    
    if (updateResponse.ok) {
      updated++;
    } else {
      console.error(`  Error: ${updateResponse.status}`);
      errors++;
    }
  }
  
  console.log(`\nDone! Updated ${updated} events, ${errors} errors`);
}

main().catch(console.error);
