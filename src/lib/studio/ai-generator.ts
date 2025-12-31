import Anthropic from '@anthropic-ai/sdk';
import { getAdminClient } from '@/lib/supabase/server';

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY || process.env.ANTHROPIC_API_KEY,
});

const MODEL = 'claude-3-haiku-20240307';

// All 12 content categories for BahrainNights
export const CONTENT_CATEGORIES = {
  dining: 'Dining & Restaurants - new restaurant openings, brunches, ladies nights, happy hours, food festivals, fine dining, casual eateries, cafes, food reviews',
  family: 'Family & Kids - theme parks, kids events, family dining, educational activities, children entertainment, family-friendly venues, playgrounds',
  arts: 'Arts & Culture - exhibitions, theater, museums, local artists, cultural festivals, art galleries, heritage sites, traditional crafts, concerts',
  music: 'Music & Nightlife - concerts, live music, DJ nights, clubs, bars, lounges, karaoke, entertainment venues, parties',
  cinema: 'Cinema - now showing movies, coming soon releases, special screenings, film festivals, movie reviews, cinema experiences',
  sports: 'Sports & Fitness - matches, fitness events, water sports, tournaments, gyms, yoga studios, running clubs, marathons, F1',
  shopping: 'Shopping & Markets - pop-up markets, craft fairs, local vendors, souks, malls, boutiques, seasonal sales',
  business: 'Business & Networking - conferences, meetups, workshops, seminars, professional events, coworking spaces',
  wellness: 'Wellness & Spa - spa offers, yoga, meditation, wellness retreats, health centers, beauty treatments, relaxation',
  special: 'Special Occasions - holidays, seasonal events, national celebrations, Eid, National Day, New Year, Ramadan events',
  tours: 'Tours & Adventures - boat tours, desert trips, cultural tours, pearl diving, island hopping, adventure activities',
  community: 'Community & Charity - volunteer events, fundraisers, social causes, community gatherings, charity galas',
};

// Get random categories for diverse content
function getRandomCategories(count: number = 4): string[] {
  const keys = Object.keys(CONTENT_CATEGORIES);
  const shuffled = keys.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

// Get category context string
function getCategoryContext(categories?: string[]): string {
  const cats = categories || getRandomCategories(4);
  return cats.map(cat => CONTENT_CATEGORIES[cat as keyof typeof CONTENT_CATEGORIES] || cat).join('\n- ');
}

// Content settings type
export interface ContentSettings {
  default_tone: string;
  default_language: string;
  include_emojis: boolean;
  hashtag_count: number;
  caption_length: 'short' | 'medium' | 'long';
  block_political: boolean;
  block_religious: boolean;
  block_inappropriate: boolean;
  block_alcohol: boolean;
}

// Event data type
export interface EventData {
  id: string;
  title: string;
  description?: string;
  venue_name?: string;
  start_date: string;
  end_date?: string;
  start_time?: string;
  category?: string;
  price_range?: string;
  booking_url?: string;
  featured_image?: string;
}

// Generated content types
export interface GeneratedBlogPost {
  title: string;
  slug: string;
  body: string;
  hook: string;
  seo_title: string;
  seo_description: string;
  seo_keywords: string[];
  imageDescription?: string;
}

export interface GeneratedFeedPost {
  title: string;
  caption: string;
  hashtags: string[];
  callToAction?: string;
  imageDescription?: string;
}

export interface GeneratedStory {
  title: string;
  story_type: 'promo' | 'countdown' | 'poll' | 'question' | 'tip' | 'this_or_that';
  headline: string;
  subtext: string;
  sticker_data?: Record<string, unknown>;
  backgroundColor?: string;
  imageDescription?: string;
}

export interface GeneratedReelBrief {
  title: string;
  caption: string;
  hashtags: string[];
  concept: string;
  hook: string;
  slides: { order: number; text: string; duration: string; visualNote: string }[];
  music_suggestions: { song: string; artist: string; reason: string; searchTip?: string }[];
  duration: string;
  style: string;
}

// Default settings
const DEFAULT_SETTINGS: ContentSettings = {
  default_tone: 'friendly',
  default_language: 'en',
  include_emojis: true,
  hashtag_count: 12,
  caption_length: 'medium',
  block_political: true,
  block_religious: true,
  block_inappropriate: true,
  block_alcohol: true,
};

// Compliance checker
export function checkCompliance(content: string, settings: ContentSettings): { passed: boolean; issues: string[] } {
  const issues: string[] = [];

  if (settings.block_political) {
    const politicalKeywords = ['election', 'vote', 'political', 'government', 'parliament', 'minister'];
    if (politicalKeywords.some(kw => content.toLowerCase().includes(kw))) {
      issues.push('Contains political content');
    }
  }

  if (settings.block_religious) {
    const religiousKeywords = ['religious ceremony', 'prayer service', 'sermon'];
    if (religiousKeywords.some(kw => content.toLowerCase().includes(kw))) {
      issues.push('Contains religious content');
    }
  }

  if (settings.block_alcohol) {
    const alcoholKeywords = ['alcohol', 'beer', 'wine', 'cocktail', 'nightclub drinks'];
    if (alcoholKeywords.some(kw => content.toLowerCase().includes(kw))) {
      issues.push('Contains alcohol-related content');
    }
  }

  return { passed: issues.length === 0, issues };
}

// Fetch events from database for AI context
export async function fetchEventsForAI(): Promise<string> {
  try {
    const supabase = getAdminClient();
    const today = new Date().toISOString().split('T')[0];

    const { data: events } = await supabase
      .from('events')
      .select('title, start_date, venue_name, category, price_range')
      .gte('start_date', today)
      .eq('status', 'published')
      .order('start_date')
      .limit(15);

    if (!events || events.length === 0) return 'No upcoming events found.';

    return events.map((e: { title: string; start_date: string; venue_name: string | null; category: string | null; price_range: string | null }) =>
      `- ${e.title} at ${e.venue_name || 'TBA'} on ${new Date(e.start_date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} (${e.category || 'General'}${e.price_range ? `, ${e.price_range}` : ''})`
    ).join('\n');
  } catch {
    return 'Unable to fetch events.';
  }
}

// Fetch cinema data for AI context
export async function fetchCinemaForAI(): Promise<string> {
  try {
    const supabase = getAdminClient();

    const { data: movies } = await supabase
      .from('movies')
      .select('title, rating, genres, runtime_minutes')
      .eq('is_now_showing', true)
      .order('rating', { ascending: false })
      .limit(10);

    if (!movies || movies.length === 0) return 'No movies currently showing.';

    return movies.map((m: { title: string; rating: number | null; genres: string[] | null; runtime_minutes: number | null }) =>
      `- ${m.title} (${m.rating ? `${m.rating}/10` : 'No rating'}${m.genres ? `, ${m.genres.slice(0, 2).join('/')}` : ''}${m.runtime_minutes ? `, ${m.runtime_minutes}min` : ''})`
    ).join('\n');
  } catch {
    return 'Unable to fetch movies.';
  }
}

// ============================================
// BLOG POST GENERATION (Viral Content)
// ============================================
export async function generateBlogPosts(params: {
  userInput?: string;
  contentSource?: string;
  contentStyle?: string;
  count?: number;
  settings?: ContentSettings;
}): Promise<GeneratedBlogPost[]> {
  const { userInput, contentSource = 'custom', contentStyle = 'listicle', count = 3, settings = DEFAULT_SETTINGS } = params;

  // Fetch source data if needed
  let sourceData = '';
  if (contentSource === 'events') {
    sourceData = await fetchEventsForAI();
  } else if (contentSource === 'cinema') {
    sourceData = await fetchCinemaForAI();
  }

  // Get diverse categories for content generation
  const diverseCategories = getCategoryContext();

  const prompt = `You are a viral content creator for BahrainNights, the #1 events and lifestyle platform in Bahrain.

IMPORTANT: BahrainNights covers ALL aspects of life in Bahrain - NOT just nightlife! Our categories include:
- ${diverseCategories}

YOUR MISSION: Create content that people SAVE, SHARE, and TALK ABOUT. Not generic boring content.

${userInput ? `
🎯 THE USER WANTS TO WRITE ABOUT:
"${userInput}"

CRITICAL: You MUST incorporate the user's specific opinions, places, prices, and ideas. Don't ignore what they said. Make their voice come through in the content.
` : `
🎯 CREATE DIVERSE CONTENT covering different categories like dining, family activities, arts, sports, wellness, tours, shopping, etc. - NOT just nightlife!
`}

${sourceData && sourceData !== 'Unable to fetch events.' && sourceData !== 'Unable to fetch movies.' ? `
📊 AVAILABLE DATA FROM BAHRAIN:
${sourceData}
` : ''}

CONTENT STYLE: ${contentStyle}

🔥 VIRAL CONTENT RULES (FOLLOW THESE):
1. HOOK FIRST - Start with something that creates curiosity or FOMO
2. SPECIFIC NUMBERS - "7 spots" not "some spots", "BD 25" not "affordable"
3. INSIDER KNOWLEDGE - Make readers feel like they're getting exclusive info
4. HOT TAKES - Add opinions that spark discussion (but stay respectful)
5. ACTIONABLE - Readers should be able to DO something with this info
6. REAL VALUE - Include specific prices, times, locations, tips
7. CONVERSATIONAL - Write like you're telling a friend, not a corporate blog
8. PERSONAL - Add opinions like "honestly, this place is underrated because..."
9. DIVERSE TOPICS - Mix categories: dining, family, arts, sports, wellness, tours, shopping, etc.

❌ BAD EXAMPLE (boring):
"Bahrain has many great restaurants. Here are some options for dining out. The food scene is diverse."

✅ GOOD EXAMPLES (viral):
"I've eaten at 50+ restaurants in Bahrain and these 7 are the ONLY ones worth your money"
"5 Hidden Beaches in Bahrain That Locals Don't Want Tourists to Know About"
"The Complete Guide to Weekend Brunches in Bahrain (With Prices)"
"Best Family Activities in Bahrain - Tested With My 3 Kids"
"Bahrain's Best Kept Secret: The Art Scene Nobody's Talking About"

🇧🇭 BAHRAIN RULES (never break):
- No political content or commentary
- No religious content or commentary
- Keep it family-friendly
- Be positive about Bahrain overall

Generate ${count} different blog post ideas. Each should have a UNIQUE angle and cover DIFFERENT categories - not all nightlife!

Return ONLY valid JSON array (no markdown, no explanation):
[
  {
    "title": "Viral, curiosity-inducing title with number if possible (50-60 chars)",
    "hook": "Opening line that makes people NEED to keep reading",
    "seo_description": "Meta description for Google (150-160 chars)",
    "seo_keywords": ["keyword1", "keyword2", "keyword3"],
    "seo_title": "SEO optimized title",
    "body": "Full article in markdown format (800-1200 words). Include headers, bullet points, specific details.",
    "slug": "url-friendly-slug-here",
    "imageDescription": "Brief description of what the featured image should show"
  }
]`;

  const response = await anthropic.messages.create({
    model: MODEL,
    max_tokens: 8000,
    messages: [{ role: 'user', content: prompt }],
  });

  const text = response.content[0].type === 'text' ? response.content[0].text : '';

  try {
    const cleanedText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const jsonMatch = cleanedText.match(/\[[\s\S]*\]/);
    if (!jsonMatch) throw new Error('No JSON array found');
    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error('Failed to parse blog response:', text.substring(0, 500));
    // Return fallback
    return [{
      title: userInput ? `${userInput.substring(0, 40)}...` : 'Things to Do in Bahrain This Weekend',
      hook: 'Here are some exciting things happening in Bahrain!',
      seo_description: 'Discover the best events and activities in Bahrain.',
      seo_keywords: ['Bahrain events', 'things to do Bahrain'],
      seo_title: 'Best Things to Do in Bahrain | BahrainNights',
      body: userInput || 'Check out the latest events in Bahrain on BahrainNights.com',
      slug: `bahrain-events-${Date.now()}`,
      imageDescription: 'Bahrain skyline or lifestyle scene'
    }];
  }
}

// Legacy function for compatibility
export async function generateBlogPost(
  events: EventData[],
  settings: ContentSettings = DEFAULT_SETTINGS
): Promise<GeneratedBlogPost> {
  const results = await generateBlogPosts({
    contentSource: 'events',
    count: 1,
    settings,
  });
  return results[0];
}

// ============================================
// FEED POST GENERATION (Instagram)
// ============================================
export async function generateFeedPosts(params: {
  userInput?: string;
  contentSource?: string;
  count?: number;
  settings?: ContentSettings;
}): Promise<GeneratedFeedPost[]> {
  const { userInput, contentSource = 'custom', count = 3, settings = DEFAULT_SETTINGS } = params;

  let sourceData = '';
  if (contentSource === 'events') {
    sourceData = await fetchEventsForAI();
  } else if (contentSource === 'cinema') {
    sourceData = await fetchCinemaForAI();
  }

  // Get diverse categories for content generation
  const diverseCategories = getCategoryContext();

  const prompt = `You are an Instagram expert creating viral posts for BahrainNights (Bahrain's #1 events & lifestyle platform).

IMPORTANT: BahrainNights covers ALL aspects of life in Bahrain - NOT just nightlife! Our categories include:
- ${diverseCategories}

YOUR GOAL: Create posts that get SAVED, SHARED, and COMMENTED on. We want ENGAGEMENT.

${userInput ? `
🎯 USER'S INPUT - USE THIS AS THE MAIN TOPIC:
"${userInput}"

IMPORTANT: Build the post around what the user said. Include their specific details.
` : `
🎯 CREATE DIVERSE POSTS about different topics: dining, family fun, arts, sports, wellness, tours, shopping, special events - NOT just nightlife!
`}

${sourceData && sourceData !== 'Unable to fetch events.' && sourceData !== 'Unable to fetch movies.' ? `
📊 DATA FROM BAHRAIN:
${sourceData}
` : ''}

🔥 VIRAL INSTAGRAM RULES:
1. First line = HOOK (question, bold statement, or curiosity gap)
2. Use line breaks for easy reading
3. Include a clear call-to-action (save this, tag a friend, comment your favorite)
4. Emojis: Use 4-6, strategically placed, not random
5. End with engagement question
6. VARY THE TOPICS - cover dining, family, wellness, arts, sports, tours, etc.

❌ BAD CAPTION:
"Check out this event happening in Bahrain! 🎉 It's going to be fun! #Bahrain #Events"

✅ GOOD CAPTIONS (diverse topics):
"This just became the hottest ticket in Bahrain 🔥

Calvin Harris. Al Dana Amphitheatre. January 15th..."

"Best brunch spots in Bahrain - ranked by someone who's tried them ALL 🍳

After 20+ brunches, these are my top 5..."

"Taking the kids somewhere special this weekend? 👨‍👩‍👧‍👦

Here are 5 family spots that won't break the bank..."

"Hidden gem alert: This yoga studio in Seef has classes for just BD 5 🧘‍♀️"

Generate ${count} different captions with DIFFERENT angles covering VARIOUS categories.

Return ONLY valid JSON array:
[
  {
    "title": "Short internal title",
    "caption": "Full caption with \\n for line breaks",
    "hashtags": ["BahrainNights", "Bahrain", "etc"],
    "callToAction": "what you want people to do",
    "imageDescription": "Brief description of what image should show"
  }
]`;

  const response = await anthropic.messages.create({
    model: MODEL,
    max_tokens: 4000,
    messages: [{ role: 'user', content: prompt }],
  });

  const text = response.content[0].type === 'text' ? response.content[0].text : '';

  try {
    const cleanedText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const jsonMatch = cleanedText.match(/\[[\s\S]*\]/);
    if (!jsonMatch) throw new Error('No JSON array found');
    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error('Failed to parse feed response:', text.substring(0, 500));
    // Diverse fallback options
    const fallbackOptions = [
      { title: 'Weekend Guide', caption: `Your weekend guide is here! ✨🇧🇭\n\nFrom brunches to family fun, Bahrain has it all.\n\nWhat are your plans? 👇`, imageDescription: 'Bahrain lifestyle collage' },
      { title: 'Dining Discovery', caption: `Hungry? We got you! 🍽️\n\nBahrain's food scene never disappoints.\n\nTag someone you'd eat with! 👇`, imageDescription: 'Beautiful restaurant or food scene' },
      { title: 'Family Weekend', caption: `Family time this weekend? 👨‍👩‍👧‍👦\n\nBahrain has amazing spots for all ages.\n\nSave this for later! 🔖`, imageDescription: 'Family-friendly venue or activity' },
      { title: 'Hidden Gem', caption: `Hidden gem alert! 💎\n\nBahrain keeps surprising us with new spots.\n\nHave you been? 👇`, imageDescription: 'Unique venue or attraction' },
      { title: 'Self-Care', caption: `Self-care Sunday vibes 🧘‍♀️\n\nBahrain's wellness scene is thriving.\n\nWhat's your favorite spa? 👇`, imageDescription: 'Spa or wellness setting' },
    ];
    const randomFallback = fallbackOptions[Math.floor(Math.random() * fallbackOptions.length)];
    return [{
      title: randomFallback.title,
      caption: randomFallback.caption,
      hashtags: ['BahrainNights', 'Bahrain', 'BahrainEvents', 'ThingsToDoInBahrain'],
      callToAction: 'Engage with the post',
      imageDescription: randomFallback.imageDescription
    }];
  }
}

// Legacy function for compatibility
export async function generateFeedPost(
  event: EventData | null,
  settings: ContentSettings = DEFAULT_SETTINGS
): Promise<GeneratedFeedPost> {
  const results = await generateFeedPosts({
    contentSource: event ? 'events' : 'custom',
    count: 1,
    settings,
  });
  return results[0];
}

// ============================================
// STORIES GENERATION
// ============================================
export async function generateStories(params: {
  userInput?: string;
  storyTypes?: string[];
  count?: number;
  settings?: ContentSettings;
}): Promise<GeneratedStory[]> {
  const { userInput, storyTypes = ['promo', 'poll', 'tip', 'countdown', 'question'], count = 10, settings = DEFAULT_SETTINGS } = params;

  // Get diverse categories for content generation
  const diverseCategories = getCategoryContext();

  const prompt = `Create ${count} Instagram stories for BahrainNights (Bahrain's #1 events & lifestyle platform).

IMPORTANT: BahrainNights covers ALL aspects of life in Bahrain - NOT just nightlife! Our categories include:
- ${diverseCategories}

${userInput ? `Topic focus: "${userInput}"` : 'Topic: Create DIVERSE stories about dining, family, arts, sports, wellness, tours, shopping, events - NOT just nightlife!'}

Story types to create (mix of these): ${storyTypes.join(', ')}

🔥 VIRAL STORY RULES:
1. Text must be SHORT - max 8 words per line
2. Create FOMO or curiosity
3. Make it feel exclusive/insider
4. VARY THE TOPICS across different categories

STORY TYPES:
- promo: "This weekend only 👀" style
- countdown: Build anticipation "X days until..."
- poll: Engaging A vs B question
- question: Open-ended to get DM replies
- tip: "Insider tip:" valuable info
- this_or_that: Fun comparison

✅ GOOD STORY TEXT (diverse topics):
"POV: You scored tickets 🎟️"
"Best brunch spot? 🍳"
"Family weekend plans 👨‍👩‍👧"
"Hidden spa gem in Bahrain 🧘"
"This museum is so underrated"
"Unpopular opinion: [food take] 🔥"

Return ONLY valid JSON array:
[
  {
    "title": "Internal title",
    "story_type": "promo|countdown|poll|question|tip|this_or_that",
    "headline": "Short punchy text (max 8 words)",
    "subtext": "Supporting text if needed",
    "sticker_data": {"question": "...", "options": ["A", "B"]},
    "backgroundColor": "from-orange-500 to-red-500",
    "imageDescription": "What the background image should show"
  }
]`;

  const response = await anthropic.messages.create({
    model: MODEL,
    max_tokens: 4000,
    messages: [{ role: 'user', content: prompt }],
  });

  const text = response.content[0].type === 'text' ? response.content[0].text : '';

  try {
    const cleanedText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const jsonMatch = cleanedText.match(/\[[\s\S]*\]/);
    if (!jsonMatch) throw new Error('No JSON array found');
    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error('Failed to parse stories response:', text.substring(0, 500));
    // Diverse fallback options
    const fallbackOptions = [
      { title: 'Weekend Plans', headline: 'This weekend in Bahrain 🔥', imageDescription: 'Bahrain skyline or lifestyle scene' },
      { title: 'Dining Guide', headline: 'Best brunch spots? 🍳', imageDescription: 'Beautiful restaurant or food scene' },
      { title: 'Family Fun', headline: 'Kids activities this week 👨‍👩‍👧', imageDescription: 'Family-friendly venue in Bahrain' },
      { title: 'Wellness Tip', headline: 'Self-care Sunday? 🧘', imageDescription: 'Spa or wellness setting' },
      { title: 'Hidden Gem', headline: 'This place is underrated 💎', imageDescription: 'Unique venue or attraction in Bahrain' },
    ];
    const randomFallback = fallbackOptions[Math.floor(Math.random() * fallbackOptions.length)];
    return [{
      title: randomFallback.title,
      story_type: 'promo',
      headline: randomFallback.headline,
      subtext: 'Swipe up for more',
      backgroundColor: 'from-purple-600 to-pink-600',
      imageDescription: randomFallback.imageDescription
    }];
  }
}

// Legacy function for compatibility
export async function generateStory(
  event: EventData | null,
  storyType: GeneratedStory['story_type'],
  settings: ContentSettings = DEFAULT_SETTINGS
): Promise<GeneratedStory> {
  const results = await generateStories({
    storyTypes: [storyType],
    count: 1,
    settings,
  });
  return results[0];
}

// ============================================
// REEL BRIEF GENERATION
// ============================================
export async function generateReelBriefs(params: {
  userInput?: string;
  reelStyle?: string;
  count?: number;
  settings?: ContentSettings;
}): Promise<GeneratedReelBrief[]> {
  const { userInput, reelStyle = 'trendy', count = 1, settings = DEFAULT_SETTINGS } = params;

  // Get diverse categories for content generation
  const diverseCategories = getCategoryContext();

  const prompt = `Create ${count} viral reel content brief(s) for BahrainNights (Bahrain's #1 events & lifestyle platform).

IMPORTANT: BahrainNights covers ALL aspects of life in Bahrain - NOT just nightlife! Our categories include:
- ${diverseCategories}

${userInput ? `
🎯 USER'S REEL IDEA:
"${userInput}"

Build the entire reel around this concept. Include their specific ideas.
` : 'Create DIVERSE reels about dining, family activities, arts, sports, wellness, tours, shopping - NOT just nightlife!'}

REEL STYLE: ${reelStyle}

🔥 VIRAL REEL RULES:
1. First 1 second = HOOK (stops the scroll)
2. Keep it 15-30 seconds
3. Fast cuts = more watch time
4. Trending audio = more reach
5. End with CTA
6. VARY THE TOPICS - cover different categories

HOOK IDEAS THAT WORK (diverse topics):
- "POV: You live in Bahrain"
- "Things in Bahrain that just hit different"
- "I tried every brunch in Bahrain so you don't have to"
- "Best family spots in Bahrain ranked"
- "Hidden gems in Bahrain you NEED to visit"
- "Unpopular Bahrain food opinion:"
- "Bahrain spa day for under BD 50"
- "Stop scrolling if you live in Bahrain 🇧🇭"

Return ONLY valid JSON array:
[
  {
    "title": "Reel title",
    "concept": "One line description",
    "hook": "The text/visual that appears first",
    "duration": "15-30 seconds",
    "style": "${reelStyle}",
    "slides": [
      {
        "order": 1,
        "text": "Text overlay for this part",
        "duration": "2-3s",
        "visualNote": "What to show visually"
      }
    ],
    "music_suggestions": [
      {
        "song": "Song Name",
        "artist": "Artist",
        "reason": "Why it works",
        "searchTip": "Search for X on Instagram"
      }
    ],
    "caption": "Ready to post caption with line breaks using \\n",
    "hashtags": ["tag1", "tag2"]
  }
]`;

  const response = await anthropic.messages.create({
    model: MODEL,
    max_tokens: 4000,
    messages: [{ role: 'user', content: prompt }],
  });

  const text = response.content[0].type === 'text' ? response.content[0].text : '';

  try {
    const cleanedText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const jsonMatch = cleanedText.match(/\[[\s\S]*\]/);
    if (!jsonMatch) throw new Error('No JSON array found');
    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error('Failed to parse reel response:', text.substring(0, 500));
    return [{
      title: 'Weekend in Bahrain',
      concept: 'Showcase top things to do this weekend',
      hook: 'POV: You just discovered the best weekend plans in Bahrain',
      duration: '15-30 seconds',
      style: reelStyle,
      slides: [
        { order: 1, text: 'WEEKEND PLANS?', duration: '2s', visualNote: 'Eye-catching opening' },
        { order: 2, text: 'Check these out!', duration: '3s', visualNote: 'Show highlights' },
      ],
      music_suggestions: [
        { song: 'Trending audio', artist: 'Various', reason: 'High engagement', searchTip: 'Check Instagram trending' },
      ],
      caption: 'Save this for your weekend plans! 🇧🇭\n\nWhich one are you trying first? 👇',
      hashtags: ['BahrainNights', 'Bahrain', 'BahrainReels', 'WeekendVibes'],
    }];
  }
}

// Legacy function for compatibility
export async function generateReelBrief(
  events: EventData[],
  style: string = 'trendy',
  settings: ContentSettings = DEFAULT_SETTINGS
): Promise<GeneratedReelBrief> {
  const results = await generateReelBriefs({
    reelStyle: style,
    count: 1,
    settings,
  });

  // Transform to legacy format
  const result = results[0];
  return {
    ...result,
    text_overlays: result.slides?.map(s => ({ slide: s.order, text: s.text })) || [],
  } as GeneratedReelBrief & { text_overlays: { slide: number; text: string }[] };
}

// Export all functions
export default {
  generateBlogPost,
  generateBlogPosts,
  generateFeedPost,
  generateFeedPosts,
  generateStory,
  generateStories,
  generateReelBrief,
  generateReelBriefs,
  checkCompliance,
  fetchEventsForAI,
  fetchCinemaForAI,
};
