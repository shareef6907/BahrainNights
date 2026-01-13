import { createClient } from '@supabase/supabase-js';

// Environment variables
const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent';

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  throw new Error('Missing required environment variables: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY');
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

interface EventToVerify {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  date: string | null;
  start_date: string | null;
  end_date: string | null;
  venue_name: string | null;
  price: string | null;
  price_min: number | null;
  source_url: string | null;
  source_name: string | null;
}

interface VerificationResult {
  eventId: string;
  isValid: boolean;
  issues: string[];
  suggestions: string[];
  confidence: number;
  categoryCorrect: boolean;
  suggestedCategory?: string;
  dateValid: boolean;
  needsReview: boolean;
}

// Known artist names for category verification
const KNOWN_CONCERT_ARTISTS = [
  'josh groban', 'linkin park', 'calvin harris', 'andre rieu', 'andré rieu',
  'john mayer', 'maroon 5', 'coldplay', 'ed sheeran', 'drake', 'the weeknd',
  'taylor swift', 'beyonce', 'rihanna', 'bruno mars', 'justin bieber',
  'majid al mohandis', 'balti', 'dystinct', 'masha vincent', 'moii', 'sara',
  'yubik', 'julees', 'mahmoud el lithy', 'wailing wailers', 'bob marley',
];

// Category keywords
const CATEGORY_INDICATORS: Record<string, string[]> = {
  concerts: ['concert', 'live music', 'singer', 'band', 'performance', 'gig', 'tour', 'amphitheatre', 'live at'],
  comedy: ['comedy', 'stand-up', 'standup', 'comedian', 'laugh', 'humour', 'humor', 'el daheeh'],
  nightlife: ['night', 'club', 'dj', 'party', 'lounge', 'dance', 'ava club', 'klub360', 'volto'],
  cultural: ['theatre', 'theater', 'musical', 'opera', 'ballet', 'play', 'festival', 'art', 'exhibition', 'wicked'],
  sports: ['sports', 'match', 'championship', 'tournament', 'race', 'grand prix', 'f1', 'formula', 'football'],
  family: ['family', 'kids', 'children', 'circus', 'magic show', 'disney', 'cartoon'],
};

// Verify date is valid (not in past, not too far in future)
function verifyDate(dateStr: string | null): { valid: boolean; issue?: string } {
  if (!dateStr) {
    return { valid: false, issue: 'Missing date' };
  }

  const eventDate = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Check if date is valid
  if (isNaN(eventDate.getTime())) {
    return { valid: false, issue: 'Invalid date format' };
  }

  // Check if date is in the past
  if (eventDate < today) {
    return { valid: false, issue: 'Event date is in the past' };
  }

  // Check if date is more than 2 years in the future
  const twoYearsFromNow = new Date();
  twoYearsFromNow.setFullYear(twoYearsFromNow.getFullYear() + 2);
  if (eventDate > twoYearsFromNow) {
    return { valid: false, issue: 'Event date is more than 2 years in the future' };
  }

  return { valid: true };
}

// Verify category assignment
function verifyCategory(title: string, description: string | null, assignedCategory: string | null): {
  correct: boolean;
  suggestedCategory?: string;
  confidence: number;
} {
  const combined = `${title} ${description || ''}`.toLowerCase();

  // Check for known artists (should be concerts)
  for (const artist of KNOWN_CONCERT_ARTISTS) {
    if (combined.includes(artist)) {
      if (assignedCategory?.toLowerCase() === 'concerts') {
        return { correct: true, confidence: 0.95 };
      }
      return { correct: false, suggestedCategory: 'concerts', confidence: 0.9 };
    }
  }

  // Check category indicators
  let bestMatch: { category: string; score: number } | null = null;

  for (const [category, keywords] of Object.entries(CATEGORY_INDICATORS)) {
    let score = 0;
    for (const keyword of keywords) {
      if (combined.includes(keyword)) {
        score += keyword.length; // Longer matches = higher confidence
      }
    }
    if (score > 0 && (!bestMatch || score > bestMatch.score)) {
      bestMatch = { category, score };
    }
  }

  if (bestMatch) {
    const normalizedAssigned = assignedCategory?.toLowerCase();
    const isCorrect = normalizedAssigned === bestMatch.category ||
      (normalizedAssigned === 'events' && bestMatch.score < 15); // "events" is acceptable for low-confidence matches

    return {
      correct: isCorrect,
      suggestedCategory: isCorrect ? undefined : bestMatch.category,
      confidence: Math.min(0.9, 0.5 + bestMatch.score * 0.05),
    };
  }

  // No strong indicators found, accept assigned category
  return { correct: true, confidence: 0.5 };
}

// Use AI to verify event data quality
async function aiVerifyEvent(event: EventToVerify): Promise<{
  issues: string[];
  suggestions: string[];
  confidence: number;
}> {
  if (!GEMINI_API_KEY) {
    return { issues: [], suggestions: [], confidence: 0.5 };
  }

  const prompt = `Analyze this event data for quality and accuracy. Identify any issues or inconsistencies.

Event Title: ${event.title}
Category: ${event.category}
Date: ${event.date || event.start_date}
Venue: ${event.venue_name}
Price: ${event.price || event.price_min || 'Not specified'}
Description: ${event.description?.substring(0, 500) || 'No description'}

Check for:
1. Does the category match the event type?
2. Is the title formatted correctly (not garbage text)?
3. Does the description make sense?
4. Are there any red flags or inconsistencies?

Respond in JSON format:
{
  "issues": ["list of issues found"],
  "suggestions": ["list of improvement suggestions"],
  "confidence": 0.0 to 1.0 confidence in data quality
}`;

  try {
    const response = await fetch(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 500,
        }
      })
    });

    if (!response.ok) {
      console.error('Gemini API error:', response.status);
      return { issues: [], suggestions: [], confidence: 0.5 };
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

    // Extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return {
        issues: Array.isArray(parsed.issues) ? parsed.issues : [],
        suggestions: Array.isArray(parsed.suggestions) ? parsed.suggestions : [],
        confidence: typeof parsed.confidence === 'number' ? parsed.confidence : 0.5,
      };
    }

    return { issues: [], suggestions: [], confidence: 0.5 };
  } catch (error) {
    console.error('AI verification error:', error);
    return { issues: [], suggestions: [], confidence: 0.5 };
  }
}

// Main verification function
async function verifyEvent(event: EventToVerify): Promise<VerificationResult> {
  const issues: string[] = [];
  const suggestions: string[] = [];

  // 1. Verify date
  const dateResult = verifyDate(event.date || event.start_date);
  if (!dateResult.valid && dateResult.issue) {
    issues.push(dateResult.issue);
  }

  // 2. Verify category
  const categoryResult = verifyCategory(event.title, event.description, event.category);
  if (!categoryResult.correct && categoryResult.suggestedCategory) {
    issues.push(`Category mismatch: assigned "${event.category}", suggested "${categoryResult.suggestedCategory}"`);
    suggestions.push(`Change category to "${categoryResult.suggestedCategory}"`);
  }

  // 3. Basic data quality checks
  if (!event.title || event.title.length < 3) {
    issues.push('Title is missing or too short');
  }

  if (event.title && /^[^a-zA-Z]*$/.test(event.title)) {
    issues.push('Title contains no readable text');
  }

  if (!event.venue_name) {
    issues.push('Venue name is missing');
  }

  if (!event.price && !event.price_min) {
    suggestions.push('Consider adding price information');
  }

  // 4. AI verification (if API key available)
  const aiResult = await aiVerifyEvent(event);
  issues.push(...aiResult.issues);
  suggestions.push(...aiResult.suggestions);

  // Calculate overall confidence
  const confidence = Math.min(
    1.0,
    (categoryResult.confidence + aiResult.confidence + (dateResult.valid ? 1 : 0)) / 3
  );

  // Determine if needs manual review
  const needsReview = issues.length > 2 || confidence < 0.6 || !dateResult.valid;

  return {
    eventId: event.id,
    isValid: issues.length === 0,
    issues,
    suggestions,
    confidence,
    categoryCorrect: categoryResult.correct,
    suggestedCategory: categoryResult.suggestedCategory,
    dateValid: dateResult.valid,
    needsReview,
  };
}

// Batch verify events
async function verifyRecentEvents(limit: number = 50): Promise<{
  total: number;
  verified: number;
  needsReview: number;
  fixed: number;
  results: VerificationResult[];
}> {
  console.log('='.repeat(50));
  console.log('Event Verification Agent - Starting');
  console.log('='.repeat(50));

  // Fetch recent events from platinumlist source
  const { data: events, error } = await supabase
    .from('events')
    .select('id, title, description, category, date, start_date, end_date, venue_name, price, price_min, source_url, source_name')
    .eq('source_name', 'platinumlist')
    .eq('is_active', true)
    .order('last_scraped_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching events:', error);
    throw new Error('Failed to fetch events for verification');
  }

  if (!events || events.length === 0) {
    console.log('No events to verify');
    return { total: 0, verified: 0, needsReview: 0, fixed: 0, results: [] };
  }

  console.log(`Found ${events.length} events to verify`);

  const results: VerificationResult[] = [];
  let needsReviewCount = 0;
  let fixedCount = 0;

  for (const event of events) {
    console.log(`\nVerifying: ${event.title?.substring(0, 50)}...`);

    const result = await verifyEvent(event);
    results.push(result);

    if (result.needsReview) {
      needsReviewCount++;
      console.log(`  - Needs review: ${result.issues.join(', ')}`);
    }

    // Auto-fix category if suggested
    if (result.suggestedCategory && !result.categoryCorrect) {
      console.log(`  - Auto-fixing category: ${event.category} -> ${result.suggestedCategory}`);
      const { error: updateError } = await supabase
        .from('events')
        .update({
          category: result.suggestedCategory,
          updated_at: new Date().toISOString(),
        })
        .eq('id', event.id);

      if (!updateError) {
        fixedCount++;
      }
    }

    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 200));
  }

  console.log('\n' + '='.repeat(50));
  console.log('Verification Complete');
  console.log('='.repeat(50));
  console.log(`Total events: ${events.length}`);
  console.log(`Needs review: ${needsReviewCount}`);
  console.log(`Auto-fixed: ${fixedCount}`);

  return {
    total: events.length,
    verified: events.length,
    needsReview: needsReviewCount,
    fixed: fixedCount,
    results,
  };
}

// Run if called directly
async function main() {
  try {
    const result = await verifyRecentEvents(50);
    console.log('\nResult:', JSON.stringify({
      total: result.total,
      verified: result.verified,
      needsReview: result.needsReview,
      fixed: result.fixed,
    }, null, 2));

    // Log events that need review
    const reviewEvents = result.results.filter(r => r.needsReview);
    if (reviewEvents.length > 0) {
      console.log('\nEvents needing review:');
      for (const event of reviewEvents) {
        console.log(`  - ${event.eventId}: ${event.issues.join(', ')}`);
      }
    }

    process.exit(0);
  } catch (error) {
    console.error('Verification failed:', error);
    process.exit(1);
  }
}

main();

export { verifyEvent, verifyRecentEvents };
