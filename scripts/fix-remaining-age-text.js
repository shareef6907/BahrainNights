#!/usr/bin/env node
/**
 * Fix remaining age-related text in specific events
 */

const SUPABASE_URL = 'https://nrnrrogxrheeoaxgdyut.supabase.co';
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ybnJyb2d4cmhlZW9heGdkeXV0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NjgwOTExMSwiZXhwIjoyMDgyMzg1MTExfQ.R7b3H-2noh9jGfxxnhwH4SMAk0JMKNwMaCYVFX1RPq4';

// More comprehensive patterns
const AGE_PATTERNS = [
  /\bfor all ages\b/gi,
  /\ball ages\b/gi,
  /\b21\+ party\b/gi,
  /\b21\+\b/gi,
  /\b18\+\b/gi,
  /\bfor adults 18\+\b/gi,
  /\bThis pass is for adults[^.]*\./gi,
  /\bfans of all ages\b/gi,
  /\bdesigned for fans of all ages\b/gi,
  /\bpeople of all ages\b/gi,
  /\bguests of all ages\b/gi,
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
  const ids = [
    '5d8ac079-e0df-4fb6-9176-a7ad90bbbc8b',
    '56fe61bd-a0bd-4b57-a35b-d941522eae0a', 
    '38cf401d-ff52-4142-b9ed-076b18f3334e'
  ];
  
  for (const id of ids) {
    // Fetch event
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/events?select=id,title,description&id=eq.${id}`,
      {
        headers: {
          'apikey': SERVICE_KEY,
          'Authorization': `Bearer ${SERVICE_KEY}`,
        }
      }
    );
    
    const [event] = await response.json();
    if (!event) continue;
    
    const cleanedDesc = cleanDescription(event.description);
    console.log(`Updating: ${event.title}`);
    
    const updateResponse = await fetch(
      `${SUPABASE_URL}/rest/v1/events?id=eq.${id}`,
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
    
    console.log(`  Status: ${updateResponse.ok ? 'OK' : updateResponse.status}`);
  }
  
  console.log('Done!');
}

main().catch(console.error);
