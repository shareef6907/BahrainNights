/**
 * AI Blog Writer Service for BahrainNights.com
 * Uses Anthropic Claude to generate SEO-optimized blog posts
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
 */
export async function generateEventBlogPost(event: EventData): Promise<GeneratedBlogArticle> {
  const prompt = `You are a world-class entertainment and lifestyle writer for BahrainNights.com, the premier events platform for Bahrain and the Middle East.

Write an engaging, inspiring, and SEO-optimized blog post about this event:

EVENT DETAILS:
- Title: ${event.title}
- Venue: ${event.venue_name || 'TBA'}
- Location: ${event.venue_address || event.location}
- City: ${event.city}
- Country: ${event.country}
- Date: ${event.start_date || 'Check website'}${event.end_date ? ` to ${event.end_date}` : ''}
- Time: ${event.start_time || 'Check website'}
- Category: ${event.category}
- Description: ${event.description || 'No description provided'}
- Price: ${event.price || 'Check website for pricing'}

WRITING GUIDELINES:

1. **HOOK**: Start with a captivating opening that draws readers in. Don't start with the event name - start with emotion, a story, or a compelling fact.

2. **STORYTELLING**: Include interesting elements about:
   - The performer/artist/event (their journey, achievements, interesting facts)
   - The venue (ambiance, what makes it special)
   - The city/location (why it's a great place for this event)

3. **PERSONAL & INSPIRING**:
   - Connect with the reader emotionally
   - Include motivational elements ("If you've ever dreamed of...")
   - Make them feel like they NEED to be there

4. **PRACTICAL INFO**:
   - What to expect at the event
   - Best time to arrive
   - What to wear (if relevant)
   - Nearby attractions or restaurants

5. **SEO REQUIREMENTS**:
   - Naturally include keywords: "${event.city} events", "things to do in ${event.city}", "${event.category} ${event.country}"
   - Use headers (H2, H3) to structure content
   - Write 800-1200 words

6. **TONE**:
   - Exciting but not cheesy
   - Informative but entertaining
   - Premium but approachable
   - Like a knowledgeable friend sharing insider tips

7. **FORMAT**:
   - Use HTML formatting (<h2>, <h3>, <p>, <strong>, <ul>, <li>)
   - Break up text with subheadings
   - Keep paragraphs short and scannable

8. **CALL TO ACTION**: End with urgency to book tickets or attend

DO NOT:
- Use generic filler content
- Be boring or corporate
- Copy the event description verbatim
- Use clickbait or misleading info
- Include any competitor names

Respond ONLY with valid JSON in this exact format (no markdown, no code blocks):
{
  "title": "Catchy, SEO-friendly title (50-60 chars)",
  "slug": "url-friendly-slug-no-special-chars",
  "excerpt": "Compelling 2-sentence summary (150-160 chars)",
  "content": "Full HTML-formatted article content",
  "meta_title": "SEO title with keywords (50-60 chars)",
  "meta_description": "SEO description (150-160 chars)",
  "keywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"],
  "tags": ["tag1", "tag2", "tag3"],
  "read_time_minutes": 5
}`;

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4000,
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
 */
export async function generateVenueBlogPost(venue: VenueData): Promise<GeneratedBlogArticle> {
  const prompt = `You are a world-class food, nightlife, and lifestyle writer for BahrainNights.com.

Write an engaging, SEO-optimized blog post about this venue:

VENUE DETAILS:
- Name: ${venue.name}
- Category: ${venue.category}
- Area: ${venue.area}
- Address: ${venue.address}
- City: ${venue.city}
- Country: ${venue.country}
- Description: ${venue.description || 'A popular venue in the area'}
- Features: ${venue.features?.join(', ') || 'Various amenities'}
- Cuisine Types: ${venue.cuisine_types?.join(', ') || 'N/A'}

WRITING GUIDELINES:

1. **HOOK**: Start with an engaging opening about the venue's atmosphere or unique selling point.

2. **CONTENT**: Cover:
   - What makes this venue special
   - The ambiance and atmosphere
   - Food/drinks highlights (if applicable)
   - Best times to visit
   - What to expect

3. **SEO REQUIREMENTS**:
   - Include keywords: "best ${venue.category} in ${venue.city}", "${venue.area} ${venue.category}", "where to go in ${venue.city}"
   - Use headers to structure content
   - Write 600-900 words

4. **FORMAT**: Use HTML formatting (<h2>, <h3>, <p>, <strong>, <ul>, <li>)

5. **CALL TO ACTION**: Encourage readers to visit

Respond ONLY with valid JSON in this exact format (no markdown, no code blocks):
{
  "title": "Engaging title about the venue (50-60 chars)",
  "slug": "url-friendly-slug",
  "excerpt": "Compelling summary (150-160 chars)",
  "content": "Full HTML-formatted article",
  "meta_title": "SEO title (50-60 chars)",
  "meta_description": "SEO description (150-160 chars)",
  "keywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"],
  "tags": ["tag1", "tag2", "tag3"],
  "read_time_minutes": 4
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

  article.slug = article.slug
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  article.slug = `${article.slug}-${venue.id.slice(0, 8)}`;

  return article;
}

/**
 * Helper function to determine country from location string
 */
export function determineCountry(location: string): string {
  const locationLower = location.toLowerCase();

  if (locationLower.includes('bahrain')) return 'bahrain';
  if (locationLower.includes('dubai') || locationLower.includes('abu dhabi') ||
    locationLower.includes('sharjah') || locationLower.includes('uae') ||
    locationLower.includes('emirates') || locationLower.includes('ajman')) return 'uae';
  if (locationLower.includes('saudi') || locationLower.includes('riyadh') ||
    locationLower.includes('jeddah') || locationLower.includes('dammam') ||
    locationLower.includes('khobar')) return 'saudi-arabia';
  if (locationLower.includes('qatar') || locationLower.includes('doha')) return 'qatar';
  if (locationLower.includes('uk') || locationLower.includes('london') ||
    locationLower.includes('manchester') || locationLower.includes('england') ||
    locationLower.includes('birmingham') || locationLower.includes('scotland')) return 'uk';

  return 'bahrain'; // Default
}

/**
 * Helper function to determine city from location string
 */
export function determineCity(location: string): string {
  const locationLower = location.toLowerCase();

  // UAE cities
  if (locationLower.includes('dubai')) return 'Dubai';
  if (locationLower.includes('abu dhabi')) return 'Abu Dhabi';
  if (locationLower.includes('sharjah')) return 'Sharjah';
  if (locationLower.includes('ajman')) return 'Ajman';

  // Saudi cities
  if (locationLower.includes('riyadh')) return 'Riyadh';
  if (locationLower.includes('jeddah')) return 'Jeddah';
  if (locationLower.includes('dammam')) return 'Dammam';
  if (locationLower.includes('khobar')) return 'Al Khobar';

  // Qatar
  if (locationLower.includes('doha')) return 'Doha';

  // UK cities
  if (locationLower.includes('london')) return 'London';
  if (locationLower.includes('manchester')) return 'Manchester';
  if (locationLower.includes('birmingham')) return 'Birmingham';
  if (locationLower.includes('edinburgh')) return 'Edinburgh';

  // Bahrain cities
  if (locationLower.includes('manama')) return 'Manama';
  if (locationLower.includes('seef')) return 'Seef';
  if (locationLower.includes('muharraq')) return 'Muharraq';
  if (locationLower.includes('juffair')) return 'Juffair';
  if (locationLower.includes('amwaj')) return 'Amwaj';
  if (locationLower.includes('riffa')) return 'Riffa';

  // Default to Manama for Bahrain
  if (determineCountry(location) === 'bahrain') return 'Manama';

  return '';
}
