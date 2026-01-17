/**
 * AI Blog Writer Service for BahrainNights.com
 * Uses Anthropic Claude to generate SEO-optimized blog posts
 *
 * CRITICAL: This service uses STRICT FACTUAL prompts to prevent
 * the AI from making up information or incorrect locations.
 */

import Anthropic from '@anthropic-ai/sdk';
import type { GeneratedBlogArticle } from '@/types/blog';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export interface EventData {
  id: string;
  title: string;
  description: string | null;
  venue_name: string | null;
  venue_address: string | null;
  location: string;
  city: string;
  country: string;
  start_date: string | null;
  end_date: string | null;
  start_time: string | null;
  category: string;
  image_url: string | null;
  cover_url: string | null;
  price: string | null;
  affiliate_url: string | null;
  booking_url: string | null;
}

export interface VenueData {
  id: string;
  name: string;
  description: string | null;
  category: string;
  area: string;
  address: string;
  city: string;
  country: string;
  features: string[] | null;
  cuisine_types: string[] | null;
  logo_url: string | null;
  cover_image_url: string | null;
}

/**
 * Generate an SEO-optimized blog post for an event
 * Uses STRICT FACTUAL prompts - only uses provided data
 */
export async function generateEventBlogPost(event: EventData): Promise<GeneratedBlogArticle> {
  // Extract ACCURATE location info from ALL available event data
  const locationSources = [
    event.venue_address,
    event.venue_name,
    event.location,
    event.city,
    event.country
  ].filter(Boolean).join(' ');

  // Determine accurate city and country
  const extractedCity = determineCity(locationSources);
  const extractedCountry = determineCountry(locationSources);

  // Use extracted values, falling back to provided values, then 'unknown'
  const actualCity = extractedCity || event.city || 'unknown';
  const actualCountry = extractedCountry || event.country || 'unknown';

  // Format country for display
  const countryDisplay = formatCountryName(actualCountry);

  const prompt = `You are a content writer for BahrainNights.com, an events platform covering the Middle East and beyond.

═══════════════════════════════════════════════════════════════════
CRITICAL RULES - YOU MUST FOLLOW THESE EXACTLY:
═══════════════════════════════════════════════════════════════════

1. ⚠️ ONLY use the information provided below. Do NOT make up ANY facts.
2. ⚠️ ONLY mention the venue, city, and country EXACTLY as provided below.
3. ⚠️ Do NOT assume this event is in Bahrain unless the data says so.
4. ⚠️ Do NOT research or add information about performers/teams/artists.
5. ⚠️ Do NOT invent history, background stories, or facts about anyone.
6. ⚠️ If information is missing, write generally without making up specifics.
7. ⚠️ Keep the tone engaging but 100% FACTUALLY ACCURATE.

═══════════════════════════════════════════════════════════════════
EVENT DATA - USE ONLY THIS INFORMATION:
═══════════════════════════════════════════════════════════════════

Title: ${event.title}
Venue: ${event.venue_name || 'Venue to be announced'}
Venue Address: ${event.venue_address || 'Address not specified'}
City: ${actualCity}
Country: ${countryDisplay}
Date: ${event.start_date || 'Date to be announced'}${event.end_date && event.end_date !== event.start_date ? ` to ${event.end_date}` : ''}
Time: ${event.start_time || 'Time to be announced'}
Category: ${event.category || 'Event'}
Price: ${event.price || 'Check website for pricing'}
Event Description: ${event.description || 'No description available'}

═══════════════════════════════════════════════════════════════════
WRITING INSTRUCTIONS:
═══════════════════════════════════════════════════════════════════

1. Write a 400-600 word blog post about this event
2. Start with an engaging hook about the TYPE of event (not made-up facts)
3. Use EXACTLY this city: ${actualCity} - do NOT use any other city
4. Use EXACTLY this country: ${countryDisplay} - do NOT use any other country
5. Mention the date and time exactly as provided above
6. If there's a description, use information from it - don't add to it
7. Include a call-to-action to get tickets
8. Use HTML formatting: <h2>, <p>, <strong>, <ul>, <li>

═══════════════════════════════════════════════════════════════════
🚫 FORBIDDEN - NEVER DO THESE:
═══════════════════════════════════════════════════════════════════

❌ Do NOT say the event is in Bahrain or Manama unless City is "Manama" above
❌ Do NOT invent performer/team biographies, histories, or achievements
❌ Do NOT make up venue descriptions, histories, or atmospheres
❌ Do NOT add facts that aren't in the provided data above
❌ Do NOT assume anything - only use what's explicitly provided
❌ Do NOT mention cities other than: ${actualCity}
❌ Do NOT mention countries other than: ${countryDisplay}

═══════════════════════════════════════════════════════════════════
FORMAT YOUR RESPONSE AS JSON:
═══════════════════════════════════════════════════════════════════

{
  "title": "Event title including ${actualCity} (50-60 chars max)",
  "slug": "url-friendly-slug-with-${actualCity.toLowerCase().replace(/\s+/g, '-')}",
  "excerpt": "2 sentence summary mentioning ${actualCity}, ${countryDisplay}",
  "content": "HTML formatted article - ONLY use facts from above",
  "meta_title": "SEO title with ${actualCity} (50-60 chars)",
  "meta_description": "SEO description mentioning ${actualCity} (150-160 chars)",
  "keywords": ["${actualCity.toLowerCase()} events", "${event.category?.toLowerCase() || 'events'}", "things to do in ${actualCity.toLowerCase()}"],
  "tags": ["${actualCity}", "${countryDisplay}", "${event.category || 'Events'}"],
  "read_time_minutes": 3
}

Remember: ACCURACY IS MANDATORY. Only use the data provided. The city is ${actualCity} and the country is ${countryDisplay}.`;

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 3000,
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  });

  const content = response.content[0];
  if (content.type !== 'text') {
    throw new Error('Unexpected response type from Claude');
  }

  // Parse JSON from response - handle potential markdown code blocks
  let jsonText = content.text.trim();

  // Remove markdown code blocks if present
  if (jsonText.startsWith('```json')) {
    jsonText = jsonText.slice(7);
  } else if (jsonText.startsWith('```')) {
    jsonText = jsonText.slice(3);
  }
  if (jsonText.endsWith('```')) {
    jsonText = jsonText.slice(0, -3);
  }
  jsonText = jsonText.trim();

  // Find JSON object in the response
  const jsonMatch = jsonText.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('Could not parse JSON from Claude response');
  }

  const article = JSON.parse(jsonMatch[0]) as GeneratedBlogArticle;

  // CRITICAL: Override with extracted values to ensure accuracy
  // This is a safety net in case the AI doesn't follow instructions

  // Validate that the article doesn't contain wrong locations
  const contentLower = article.content.toLowerCase();
  const titleLower = article.title.toLowerCase();

  // If event is NOT in Bahrain but article mentions Bahrain/Manama - this is wrong
  if (actualCountry !== 'bahrain' && actualCity.toLowerCase() !== 'manama') {
    if (contentLower.includes('bahrain') || contentLower.includes('manama') ||
        titleLower.includes('bahrain') || titleLower.includes('manama')) {
      console.error(`Location mismatch detected! Event is in ${actualCity}, ${countryDisplay} but article mentions Bahrain/Manama`);
      throw new Error(`Location mismatch: Article incorrectly mentions Bahrain/Manama for event in ${actualCity}, ${countryDisplay}`);
    }
  }

  // Ensure slug is URL-friendly and unique
  article.slug = article.slug
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  // Add event ID to ensure uniqueness
  article.slug = `${article.slug}-${event.id.slice(0, 8)}`;

  return article;
}

/**
 * Generate an SEO-optimized blog post for a venue
 * Uses STRICT FACTUAL prompts - only uses provided data
 */
export async function generateVenueBlogPost(venue: VenueData): Promise<GeneratedBlogArticle> {
  // Determine accurate location
  const locationSources = [venue.address, venue.area, venue.city, venue.country].filter(Boolean).join(' ');
  const actualCity = determineCity(locationSources) || venue.city || 'unknown';
  const actualCountry = determineCountry(locationSources) || venue.country || 'unknown';
  const countryDisplay = formatCountryName(actualCountry);

  const prompt = `You are a content writer for BahrainNights.com, covering venues in the Middle East.

═══════════════════════════════════════════════════════════════════
CRITICAL RULES - FOLLOW EXACTLY:
═══════════════════════════════════════════════════════════════════

1. ⚠️ ONLY use the information provided below. Do NOT make up facts.
2. ⚠️ Use ONLY this city: ${actualCity}
3. ⚠️ Use ONLY this country: ${countryDisplay}
4. ⚠️ Do NOT invent venue history, atmosphere details, or experiences.

═══════════════════════════════════════════════════════════════════
VENUE DATA - USE ONLY THIS:
═══════════════════════════════════════════════════════════════════

Name: ${venue.name}
Category: ${venue.category}
Area: ${venue.area}
Address: ${venue.address}
City: ${actualCity}
Country: ${countryDisplay}
Description: ${venue.description || 'A venue in the area'}
Features: ${venue.features?.join(', ') || 'Various amenities'}
Cuisine Types: ${venue.cuisine_types?.join(', ') || 'N/A'}

═══════════════════════════════════════════════════════════════════
WRITING INSTRUCTIONS:
═══════════════════════════════════════════════════════════════════

1. Write a 400-600 word blog post
2. Only mention features/details provided above
3. Use HTML formatting: <h2>, <p>, <strong>, <ul>, <li>
4. Include a call-to-action to visit

🚫 FORBIDDEN:
❌ Do NOT mention Bahrain/Manama unless that's the actual location
❌ Do NOT invent details not in the data above

═══════════════════════════════════════════════════════════════════
FORMAT AS JSON:
═══════════════════════════════════════════════════════════════════

{
  "title": "Venue title with ${actualCity} (50-60 chars)",
  "slug": "url-friendly-slug",
  "excerpt": "Summary mentioning ${actualCity} (150-160 chars)",
  "content": "HTML formatted article - ONLY use facts from above",
  "meta_title": "SEO title (50-60 chars)",
  "meta_description": "SEO description (150-160 chars)",
  "keywords": ["keyword1", "keyword2", "keyword3"],
  "tags": ["${actualCity}", "${countryDisplay}", "${venue.category}"],
  "read_time_minutes": 3
}`;

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 3000,
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  });

  const content = response.content[0];
  if (content.type !== 'text') {
    throw new Error('Unexpected response type from Claude');
  }

  let jsonText = content.text.trim();
  if (jsonText.startsWith('```json')) {
    jsonText = jsonText.slice(7);
  } else if (jsonText.startsWith('```')) {
    jsonText = jsonText.slice(3);
  }
  if (jsonText.endsWith('```')) {
    jsonText = jsonText.slice(0, -3);
  }
  jsonText = jsonText.trim();

  const jsonMatch = jsonText.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('Could not parse JSON from Claude response');
  }

  const article = JSON.parse(jsonMatch[0]) as GeneratedBlogArticle;

  // Validate location accuracy
  const contentLower = article.content.toLowerCase();
  if (actualCountry !== 'bahrain' && actualCity.toLowerCase() !== 'manama') {
    if (contentLower.includes('bahrain') || contentLower.includes('manama')) {
      throw new Error(`Location mismatch: Article mentions Bahrain/Manama for venue in ${actualCity}, ${countryDisplay}`);
    }
  }

  article.slug = article.slug
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  article.slug = `${article.slug}-${venue.id.slice(0, 8)}`;

  return article;
}

/**
 * Helper function to format country name for display
 */
function formatCountryName(country: string): string {
  const countryMap: Record<string, string> = {
    'bahrain': 'Bahrain',
    'uae': 'UAE',
    'saudi-arabia': 'Saudi Arabia',
    'saudi': 'Saudi Arabia',
    'qatar': 'Qatar',
    'uk': 'United Kingdom',
    'oman': 'Oman',
    'kuwait': 'Kuwait',
    'tba': 'TBA',
    'unknown': 'TBA'
  };
  return countryMap[country.toLowerCase()] || country;
}

/**
 * Helper function to determine country from location string
 * Returns slug-format country code
 * IMPORTANT: Does NOT default to Bahrain - returns 'unknown' if uncertain
 */
export function determineCountry(location: string): string {
  if (!location) return '';

  const locationLower = location.toLowerCase();

  // Check for UAE indicators first (more specific)
  if (locationLower.includes('dubai') ||
      locationLower.includes('abu dhabi') ||
      locationLower.includes('sharjah') ||
      locationLower.includes('ajman') ||
      locationLower.includes('ras al khaimah') ||
      locationLower.includes('fujairah') ||
      locationLower.includes('umm al quwain') ||
      locationLower.includes('al ain') ||
      locationLower.includes('khorfakkan') ||
      locationLower.includes('kalba') ||
      locationLower.includes('dibba') ||
      locationLower.includes('yas island') ||
      locationLower.includes('saadiyat') ||
      locationLower.includes('al reem') ||
      locationLower.includes('jebel ali') ||
      locationLower.includes('palm jumeirah') ||
      locationLower.includes('five palm') ||
      locationLower.includes('jumeirah') ||
      locationLower.includes('jbr') ||
      locationLower.includes('difc') ||
      locationLower.includes('deira') ||
      locationLower.includes('bur dubai') ||
      locationLower.includes('al barsha') ||
      locationLower.includes('business bay') ||
      locationLower.includes('downtown dubai') ||
      locationLower.includes('marina') ||
      locationLower.includes('mall of emirates') ||
      locationLower.includes('dubai mall') ||
      locationLower.includes('dubai opera') ||
      locationLower.includes('dubai autodrome') ||
      locationLower.includes('meydan') ||
      locationLower.includes('coca-cola arena') ||
      locationLower.includes('etihad arena') ||
      locationLower.includes('etihad') ||
      locationLower.includes('louvre abu dhabi') ||
      locationLower.includes('ferrari world') ||
      locationLower.includes('expo city') ||
      locationLower.includes('uae') ||
      locationLower.includes('united arab emirates') ||
      locationLower.includes('emirates')) {
    return 'uae';
  }

  // Check for Saudi Arabia
  if (locationLower.includes('saudi') ||
      locationLower.includes('riyadh') ||
      locationLower.includes('jeddah') ||
      locationLower.includes('dammam') ||
      locationLower.includes('khobar') ||
      locationLower.includes('mecca') ||
      locationLower.includes('makkah') ||
      locationLower.includes('medina') ||
      locationLower.includes('madinah') ||
      locationLower.includes('ksa')) {
    return 'saudi-arabia';
  }

  // Check for Qatar
  if (locationLower.includes('qatar') ||
      locationLower.includes('doha') ||
      locationLower.includes('al wakrah') ||
      locationLower.includes('lusail')) {
    return 'qatar';
  }

  // Check for Bahrain (explicit only)
  if (locationLower.includes('bahrain') ||
      locationLower.includes('manama') ||
      locationLower.includes('muharraq') ||
      locationLower.includes('seef') ||
      locationLower.includes('juffair') ||
      locationLower.includes('amwaj') ||
      locationLower.includes('riffa')) {
    return 'bahrain';
  }

  // Check for UK
  if (locationLower.includes('united kingdom') ||
      locationLower.includes('uk') ||
      locationLower.includes('england') ||
      locationLower.includes('scotland') ||
      locationLower.includes('wales') ||
      locationLower.includes('london') ||
      locationLower.includes('manchester') ||
      locationLower.includes('birmingham') ||
      locationLower.includes('edinburgh') ||
      locationLower.includes('glasgow')) {
    return 'uk';
  }

  // Check for other GCC countries
  if (locationLower.includes('oman') || locationLower.includes('muscat')) return 'oman';
  if (locationLower.includes('kuwait')) return 'kuwait';

  // IMPORTANT: Return empty string if unknown - DO NOT default to bahrain
  return '';
}

/**
 * Helper function to determine city from location string
 * IMPORTANT: Does NOT default to any city - returns empty if uncertain
 */
export function determineCity(location: string): string {
  if (!location) return '';

  const locationLower = location.toLowerCase();

  // UAE cities (check first as they're most specific)
  if (locationLower.includes('dubai')) return 'Dubai';
  // Dubai landmarks/areas that indicate Dubai city
  if (locationLower.includes('palm jumeirah')) return 'Dubai';
  if (locationLower.includes('five palm')) return 'Dubai';
  if (locationLower.includes('jumeirah')) return 'Dubai';
  if (locationLower.includes('jbr')) return 'Dubai';
  if (locationLower.includes('difc')) return 'Dubai';
  if (locationLower.includes('deira')) return 'Dubai';
  if (locationLower.includes('bur dubai')) return 'Dubai';
  if (locationLower.includes('al barsha')) return 'Dubai';
  if (locationLower.includes('business bay')) return 'Dubai';
  if (locationLower.includes('downtown dubai')) return 'Dubai';
  if (locationLower.includes('dubai mall')) return 'Dubai';
  if (locationLower.includes('dubai opera')) return 'Dubai';
  if (locationLower.includes('dubai autodrome')) return 'Dubai';
  if (locationLower.includes('meydan')) return 'Dubai';
  if (locationLower.includes('coca-cola arena')) return 'Dubai';
  if (locationLower.includes('marina')) return 'Dubai';
  if (locationLower.includes('mall of emirates')) return 'Dubai';
  if (locationLower.includes('jebel ali')) return 'Dubai';
  // Abu Dhabi
  if (locationLower.includes('abu dhabi')) return 'Abu Dhabi';
  if (locationLower.includes('yas island')) return 'Abu Dhabi';
  if (locationLower.includes('saadiyat')) return 'Abu Dhabi';
  if (locationLower.includes('etihad arena')) return 'Abu Dhabi';
  if (locationLower.includes('louvre abu dhabi')) return 'Abu Dhabi';
  if (locationLower.includes('ferrari world')) return 'Abu Dhabi';
  // Other UAE
  if (locationLower.includes('sharjah')) return 'Sharjah';
  if (locationLower.includes('ajman')) return 'Ajman';
  if (locationLower.includes('ras al khaimah')) return 'Ras Al Khaimah';
  if (locationLower.includes('fujairah')) return 'Fujairah';
  if (locationLower.includes('al ain')) return 'Al Ain';
  if (locationLower.includes('khorfakkan')) return 'Khorfakkan';
  if (locationLower.includes('kalba')) return 'Kalba';
  if (locationLower.includes('dibba')) return 'Dibba';

  // Saudi cities
  if (locationLower.includes('riyadh')) return 'Riyadh';
  if (locationLower.includes('jeddah')) return 'Jeddah';
  if (locationLower.includes('dammam')) return 'Dammam';
  if (locationLower.includes('khobar')) return 'Al Khobar';
  if (locationLower.includes('mecca') || locationLower.includes('makkah')) return 'Mecca';
  if (locationLower.includes('medina') || locationLower.includes('madinah')) return 'Medina';

  // Qatar cities
  if (locationLower.includes('doha')) return 'Doha';
  if (locationLower.includes('al wakrah')) return 'Al Wakrah';
  if (locationLower.includes('lusail')) return 'Lusail';

  // Bahrain cities
  if (locationLower.includes('manama')) return 'Manama';
  if (locationLower.includes('seef')) return 'Seef';
  if (locationLower.includes('muharraq')) return 'Muharraq';
  if (locationLower.includes('juffair')) return 'Juffair';
  if (locationLower.includes('amwaj')) return 'Amwaj';
  if (locationLower.includes('riffa')) return 'Riffa';
  if (locationLower.includes('adliya')) return 'Adliya';

  // UK cities
  if (locationLower.includes('london')) return 'London';
  if (locationLower.includes('manchester')) return 'Manchester';
  if (locationLower.includes('birmingham')) return 'Birmingham';
  if (locationLower.includes('edinburgh')) return 'Edinburgh';
  if (locationLower.includes('glasgow')) return 'Glasgow';
  if (locationLower.includes('liverpool')) return 'Liverpool';
  if (locationLower.includes('leeds')) return 'Leeds';

  // Oman
  if (locationLower.includes('muscat')) return 'Muscat';

  // Kuwait
  if (locationLower.includes('kuwait city') || locationLower.includes('kuwait')) return 'Kuwait City';

  // IMPORTANT: Return empty string if unknown - DO NOT default to any city
  return '';
}

/**
 * Validate that article location matches event location
 * Returns true if valid, throws error if mismatch detected
 */
export function validateArticleLocation(
  articleContent: string,
  articleTitle: string,
  expectedCity: string,
  expectedCountry: string
): boolean {
  const contentLower = articleContent.toLowerCase();
  const titleLower = articleTitle.toLowerCase();
  const combined = contentLower + ' ' + titleLower;

  // List of locations that should NOT appear if event is not there
  const locationChecks = [
    { name: 'bahrain', cities: ['manama', 'seef', 'muharraq', 'juffair', 'riffa', 'amwaj'] },
    { name: 'uae', cities: ['dubai', 'abu dhabi', 'sharjah', 'ajman'] },
    { name: 'saudi-arabia', cities: ['riyadh', 'jeddah', 'dammam', 'khobar', 'mecca', 'medina'] },
    { name: 'qatar', cities: ['doha', 'lusail', 'al wakrah'] },
  ];

  for (const loc of locationChecks) {
    // Skip if this is the expected location
    if (expectedCountry.toLowerCase() === loc.name) continue;
    if (loc.cities.includes(expectedCity.toLowerCase())) continue;

    // Check if article incorrectly mentions this location
    if (combined.includes(loc.name)) {
      throw new Error(`Article mentions ${loc.name} but event is in ${expectedCity}, ${expectedCountry}`);
    }

    for (const city of loc.cities) {
      if (combined.includes(city)) {
        throw new Error(`Article mentions ${city} but event is in ${expectedCity}, ${expectedCountry}`);
      }
    }
  }

  return true;
}
