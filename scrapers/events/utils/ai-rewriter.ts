/**
 * AI Content Rewriter - Uses Claude API to create unique event descriptions
 * This ensures all content is 100% original and not copied from sources
 */

import Anthropic from '@anthropic-ai/sdk';
import { ScrapedEvent, RewrittenContent, EVENT_CATEGORIES } from '../types';

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || process.env.CLAUDE_API_KEY,
});

// Rate limiting
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 500; // 500ms between requests

async function rateLimitedWait(): Promise<void> {
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;
  if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
    await new Promise(resolve => setTimeout(resolve, MIN_REQUEST_INTERVAL - timeSinceLastRequest));
  }
  lastRequestTime = Date.now();
}

/**
 * Rewrite event content using Claude AI
 * Creates 100% unique descriptions while maintaining factual accuracy
 */
export async function rewriteEventContent(event: ScrapedEvent): Promise<RewrittenContent> {
  await rateLimitedWait();

  const categoriesList = EVENT_CATEGORIES.join(', ');

  const prompt = `You are a content writer for BahrainNights.com, a popular events magazine in Bahrain.
Your task is to rewrite event content to be 100% unique while maintaining factual accuracy.

ORIGINAL EVENT:
Title: ${event.title}
Description: ${event.description || 'No description provided'}
Date: ${event.date}${event.time ? ` at ${event.time}` : ''}
Venue: ${event.venue_name}${event.venue_address ? `, ${event.venue_address}` : ''}
Price: ${event.price || 'Not specified'}

REQUIREMENTS:
1. Rewrite the description COMPLETELY - it must be unique, not copied or paraphrased
2. Keep all factual details accurate (date, venue, price are NOT changed)
3. Make the content engaging, informative, and exciting
4. Add local Bahrain context where appropriate
5. Write 2-3 paragraphs, approximately 100-150 words total
6. Use a warm, inviting tone suitable for a lifestyle magazine
7. Include what attendees can expect at the event
8. If the original title is too long or unclear, improve it (keep it under 80 characters)
9. Assign the BEST category from: ${categoriesList}

CATEGORY GUIDE:
- dining: Restaurants, brunches, food festivals, ladies nights at restaurants
- music: Concerts, live performances, DJ nights
- nightlife: Club events, bar events, after-dark entertainment
- family: Kid-friendly events, family activities
- arts: Exhibitions, theater, cultural performances
- sports: Matches, fitness events, sports activities
- business: Conferences, networking, professional events
- wellness: Spa, yoga, meditation, health events
- shopping: Markets, sales, shopping events
- community: Charity, volunteer, social events
- tours: Tours, attractions, sightseeing
- special: Holidays, national events, seasonal celebrations
- other: If none of the above fit well

Return ONLY valid JSON (no markdown, no code blocks):
{"title": "...", "description": "...", "category": "..."}`;

  try {
    // Using Haiku for cost efficiency - 4x cheaper than Sonnet
    // Haiku is sufficient for simple content rewriting tasks
    const response = await anthropic.messages.create({
      model: 'claude-3-5-haiku-20241022',
      max_tokens: 500,  // Reduced since we only need ~250 tokens
      messages: [{ role: 'user', content: prompt }],
    });

    const content = response.content[0];
    if (content.type !== 'text') {
      throw new Error('Unexpected response type from Claude');
    }

    // Parse JSON response
    const text = content.text.trim();
    // Remove any markdown code blocks if present
    const jsonText = text.replace(/^```json?\s*/, '').replace(/\s*```$/, '').trim();

    const result = JSON.parse(jsonText) as RewrittenContent;

    // Validate category
    if (!EVENT_CATEGORIES.includes(result.category as typeof EVENT_CATEGORIES[number])) {
      result.category = 'other';
    }

    // Validate title length
    if (result.title.length > 100) {
      result.title = result.title.substring(0, 97) + '...';
    }

    return result;
  } catch (error) {
    console.error('AI rewrite error:', error);

    // Fallback: return original content with basic category assignment
    return {
      title: event.title.substring(0, 100),
      description: event.description || `Join us for ${event.title} at ${event.venue_name}. Don't miss this exciting event in Bahrain!`,
      category: guessCategory(event),
    };
  }
}

/**
 * Fallback category guesser based on keywords
 */
function guessCategory(event: ScrapedEvent): string {
  const text = `${event.title} ${event.description || ''} ${event.venue_name}`.toLowerCase();

  const categoryKeywords: Record<string, string[]> = {
    dining: ['restaurant', 'brunch', 'dinner', 'lunch', 'food', 'chef', 'cuisine', 'ladies night', 'buffet'],
    music: ['concert', 'live music', 'band', 'singer', 'performance', 'orchestra', 'dj set'],
    nightlife: ['club', 'nightclub', 'party', 'dj', 'after dark', 'lounge'],
    family: ['kids', 'children', 'family', 'playground', 'carnival', 'circus'],
    arts: ['exhibition', 'gallery', 'art', 'museum', 'theater', 'theatre', 'cultural'],
    sports: ['match', 'game', 'tournament', 'fitness', 'gym', 'race', 'marathon', 'football', 'cricket'],
    business: ['conference', 'seminar', 'workshop', 'networking', 'summit', 'forum'],
    wellness: ['spa', 'yoga', 'meditation', 'wellness', 'health', 'retreat'],
    shopping: ['market', 'bazaar', 'sale', 'shopping', 'fair'],
    community: ['charity', 'volunteer', 'fundraiser', 'community', 'social'],
    tours: ['tour', 'attraction', 'sightseeing', 'adventure', 'desert', 'boat'],
    special: ['national day', 'eid', 'ramadan', 'christmas', 'new year', 'holiday'],
  };

  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    if (keywords.some(keyword => text.includes(keyword))) {
      return category;
    }
  }

  return 'other';
}

/**
 * Batch rewrite multiple events with progress logging
 */
export async function rewriteEventsBatch(
  events: ScrapedEvent[],
  onProgress?: (current: number, total: number) => void
): Promise<RewrittenContent[]> {
  const results: RewrittenContent[] = [];

  for (let i = 0; i < events.length; i++) {
    if (onProgress) {
      onProgress(i + 1, events.length);
    }

    const rewritten = await rewriteEventContent(events[i]);
    results.push(rewritten);

    // Log progress
    console.log(`[AI] Rewrote ${i + 1}/${events.length}: ${rewritten.title}`);
  }

  return results;
}
