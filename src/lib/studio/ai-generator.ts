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
  caption?: string;  // Full descriptive caption for the story
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
  music_suggestions: {
    genre: string;       // Main genre: epic/cinematic/dramatic/violin/funk/hip-hop/house/piano
    mood: string;        // The mood: energetic/emotional/suspenseful/uplifting
    tempo: string;       // slow/medium/fast
    reason: string;      // Why this style fits
  }[];
  duration: string;
  style: string;
  // Video editing trends
  editing_style?: {
    trend_name: string;         // e.g., "Mask Transition", "Velocity Edit", "3D Zoom"
    description: string;        // How to execute this trend
    difficulty: 'easy' | 'medium' | 'hard';
    apps_to_use: string[];      // CapCut, VN, Premiere, etc.
  };
  // Higgsfield AI transition prompt
  higgsfield_prompt?: {
    start_frame_description: string;   // Description of the starting frame
    end_frame_description: string;     // Description of the ending frame
    transition_type: string;           // morph/zoom/pan/reveal
    full_prompt: string;               // Complete prompt for Higgsfield
  };
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

// Fetch cinema data for AI context (VOX movies only)
export async function fetchCinemaForAI(): Promise<string> {
  try {
    const supabase = getAdminClient();

    const { data: movies } = await supabase
      .from('movies')
      .select('title, rating, genres, runtime_minutes')
      .eq('is_now_showing', true)
      .or('scraped_from.is.null,scraped_from.cs.{vox}')
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
  userInput: string;  // REQUIRED - user's topic is PRIMARY
  contentSource?: string;
  contentStyle?: string;
  count?: number;
  settings?: ContentSettings;
}): Promise<GeneratedBlogPost[]> {
  const { userInput, contentSource = 'custom', contentStyle = 'listicle', count = 3, settings = DEFAULT_SETTINGS } = params;

  // Validate user input is provided
  if (!userInput || userInput.trim().length < 3) {
    throw new Error('User input is required. Please specify what topic you want to write about.');
  }

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

🎯 **PRIMARY TOPIC - THIS IS WHAT THE USER WANTS:**
"${userInput}"

⚠️ CRITICAL RULES:
1. Your ENTIRE content MUST be about "${userInput}" - this is NON-NEGOTIABLE
2. Every blog post title MUST include keywords from the user's topic
3. DO NOT generate generic "Weekend Guide" or "Things to Do" content
4. The user's specific topic is the ONLY thing you should write about
5. Include the user's specific opinions, places, prices, and ideas if mentioned

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

// Legacy function for compatibility (deprecated - use generateBlogPosts with userInput instead)
export async function generateBlogPost(
  events: EventData[],
  settings: ContentSettings = DEFAULT_SETTINGS
): Promise<GeneratedBlogPost> {
  // Extract topic from events if available
  const eventTopics = events.map(e => e.title).join(', ');
  const userInput = eventTopics || 'Best things to do in Bahrain this week';

  const results = await generateBlogPosts({
    userInput,
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
  userInput: string;  // REQUIRED - user's topic is PRIMARY
  contentSource?: string;
  count?: number;
  settings?: ContentSettings;
}): Promise<GeneratedFeedPost[]> {
  const { userInput, contentSource = 'custom', count = 3, settings = DEFAULT_SETTINGS } = params;

  // Validate user input is provided
  if (!userInput || userInput.trim().length < 3) {
    throw new Error('User input is required. Please specify what topic you want to post about.');
  }

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

🎯 **PRIMARY TOPIC - THIS IS WHAT THE USER WANTS:**
"${userInput}"

⚠️ CRITICAL RULES:
1. Your ENTIRE post MUST be about "${userInput}" - this is NON-NEGOTIABLE
2. DO NOT generate generic "Weekend Guide" or "Things to Do" posts
3. The user's specific topic is the ONLY thing you should write about
4. Include the user's specific details, places, times, and ideas

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

// Legacy function for compatibility (deprecated - use generateFeedPosts with userInput instead)
export async function generateFeedPost(
  event: EventData | null,
  settings: ContentSettings = DEFAULT_SETTINGS
): Promise<GeneratedFeedPost> {
  // Extract topic from event if available
  const userInput = event?.title || 'What to do in Bahrain this weekend';

  const results = await generateFeedPosts({
    userInput,
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
  userInput: string;  // REQUIRED - user's topic is PRIMARY
  storyTypes?: string[];
  count?: number;
  settings?: ContentSettings;
}): Promise<GeneratedStory[]> {
  const { userInput, storyTypes = ['promo', 'poll', 'tip', 'countdown', 'question'], count = 10, settings = DEFAULT_SETTINGS } = params;

  // Validate user input is provided
  if (!userInput || userInput.trim().length < 3) {
    throw new Error('User input is required. Please specify what topic you want stories about.');
  }

  // Get diverse categories for content generation
  const diverseCategories = getCategoryContext();

  const prompt = `Create ${count} Instagram stories for BahrainNights (Bahrain's #1 events & lifestyle platform).

IMPORTANT: BahrainNights covers ALL aspects of life in Bahrain - NOT just nightlife! Our categories include:
- ${diverseCategories}

🎯 **PRIMARY TOPIC - THIS IS WHAT THE USER WANTS:**
"${userInput}"

⚠️ CRITICAL: ALL ${count} stories MUST be about "${userInput}" - no generic content!

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
    "title": "Internal title (descriptive, 5-10 words)",
    "story_type": "promo|countdown|poll|question|tip|this_or_that",
    "headline": "Short punchy text (max 8 words)",
    "subtext": "Supporting text line (10-15 words)",
    "caption": "Full descriptive caption (50-100 words) that provides context, details, and encourages engagement. Include specific Bahrain locations, times, prices when relevant. End with a call to action.",
    "sticker_data": {"question": "...", "options": ["A", "B"]},
    "backgroundColor": "from-orange-500 to-red-500",
    "imageDescription": "Detailed description for image generation (20-30 words)"
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
    // Diverse fallback options with full captions
    const fallbackOptions = [
      {
        title: 'Weekend Plans in Bahrain',
        headline: 'This weekend in Bahrain 🔥',
        subtext: 'So many amazing things happening!',
        caption: 'Your ultimate guide to the best things happening in Bahrain this weekend! From exciting events to hidden gems, we\'ve got you covered. Whether you\'re looking for family fun, romantic dinners, or adventure - Bahrain has it all. Save this for your weekend planning! 📍 DM us for specific recommendations.',
        imageDescription: 'Stunning Bahrain skyline at golden hour with modern buildings and traditional architecture, vibrant city life'
      },
      {
        title: 'Best Brunch Spots in Bahrain',
        headline: 'Best brunch spots? 🍳',
        subtext: 'We tested them all for you',
        caption: 'Looking for the perfect brunch in Bahrain? We\'ve tried over 20 spots so you don\'t have to! From luxurious hotel brunches starting at BD 25 to cozy cafes in Adliya, we\'ve got recommendations for every budget. Comment "BRUNCH" and we\'ll send you our top 5 picks! 🥂',
        imageDescription: 'Elegant brunch spread with fresh pastries, eggs benedict, and mimosas at a luxury Bahrain restaurant with natural lighting'
      },
      {
        title: 'Family Activities This Weekend',
        headline: 'Kids activities this week 👨‍👩‍👧',
        subtext: 'Fun for the whole family!',
        caption: 'Looking for family-friendly activities in Bahrain? This week has some amazing options! From educational workshops at Bahrain National Museum to fun at Wahooo! Waterpark, there\'s something for every age. Most activities are under BD 10 per person. Save this for your family day planning! 🎨',
        imageDescription: 'Happy family enjoying outdoor activities in Bahrain, colorful playground, children playing, sunny day, joyful atmosphere'
      },
      {
        title: 'Wellness and Self-Care in Bahrain',
        headline: 'Self-care Sunday? 🧘',
        subtext: 'You deserve this break',
        caption: 'Time to treat yourself! Bahrain has incredible spa and wellness options from traditional hammams to modern wellness centers. Whether you want a quick massage (starting BD 15) or a full day retreat, we\'ve got the insider scoop. DM us "SPA" for our favorite spots in Seef, Juffair, and Amwaj! 💆‍♀️',
        imageDescription: 'Serene spa setting with candles, essential oils, and relaxation area, soft lighting, luxury wellness center in Bahrain'
      },
      {
        title: 'Hidden Gem Discovery in Bahrain',
        headline: 'This place is underrated 💎',
        subtext: 'A spot locals love',
        caption: 'We found another hidden gem in Bahrain that most people don\'t know about! This local favorite has been serving authentic cuisine for years but stays under the radar. The ambiance is incredible and prices are reasonable. Want to know where it is? Comment "GEM" below! 🗺️',
        imageDescription: 'Charming hidden alley in old Bahrain with traditional architecture, warm lighting, authentic local atmosphere, cozy setting'
      },
    ];
    const randomFallback = fallbackOptions[Math.floor(Math.random() * fallbackOptions.length)];
    return [{
      title: randomFallback.title,
      story_type: 'promo' as const,
      headline: randomFallback.headline,
      subtext: randomFallback.subtext,
      caption: randomFallback.caption,
      backgroundColor: 'from-purple-600 to-pink-600',
      imageDescription: randomFallback.imageDescription
    }];
  }
}

// Legacy function for compatibility (deprecated - use generateStories with userInput instead)
export async function generateStory(
  event: EventData | null,
  storyType: GeneratedStory['story_type'],
  settings: ContentSettings = DEFAULT_SETTINGS
): Promise<GeneratedStory> {
  // Extract topic from event if available
  const userInput = event?.title || 'Bahrain events and activities';

  const results = await generateStories({
    userInput,
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
  userInput: string;  // REQUIRED - user's topic is PRIMARY
  reelStyle?: string;
  count?: number;
  settings?: ContentSettings;
}): Promise<GeneratedReelBrief[]> {
  const { userInput, reelStyle = 'trendy', count = 1, settings = DEFAULT_SETTINGS } = params;

  // Validate user input is provided
  if (!userInput || userInput.trim().length < 3) {
    throw new Error('User input is required. Please specify what topic you want the reel about.');
  }

  // Get diverse categories for content generation
  const diverseCategories = getCategoryContext();

  const prompt = `Create ${count} viral reel content brief(s) for BahrainNights (Bahrain's #1 events & lifestyle platform).

IMPORTANT: BahrainNights covers ALL aspects of life in Bahrain - NOT just nightlife! Our categories include:
- ${diverseCategories}

🎯 **PRIMARY TOPIC - THIS IS WHAT THE USER WANTS:**
"${userInput}"

⚠️ CRITICAL RULES:
1. The ENTIRE reel MUST be about "${userInput}" - this is NON-NEGOTIABLE
2. DO NOT create generic "Weekend Guide" or "Things to Do" reels
3. Every slide, hook, and visual MUST relate to the user's specific topic
4. Include specific details, places, and ideas from the user's input

REEL STYLE: ${reelStyle}

🔥 VIRAL REEL RULES:
1. First 1 second = HOOK (stops the scroll)
2. Keep it 30-60 seconds
3. Fast cuts = more watch time
4. End with CTA
5. Generate 10-15 SLIDES (not 5 - we need more content!)

📱 VIRAL HOOK FORMULAS (use one of these for "${userInput}"):
- "POV: [scenario related to ${userInput}]"
- "Stop scrolling if you want to know about ${userInput} 🛑"
- "I tried ${userInput} so you don't have to"
- "${userInput} - everything you need to know"
- "The TRUTH about ${userInput} in Bahrain"
- "This is your sign to try ${userInput}"
- "Wait for it... ${userInput} reveal"
- "Things about ${userInput} that just hit different"
- "You're doing ${userInput} wrong - here's how"
- "[Number] things about ${userInput} you didn't know"
- "Nobody's talking about ${userInput} but..."
- "The secret to ${userInput} in Bahrain"

⚠️ CRITICAL: Generate EXACTLY 10-15 slides. Each slide should be 2-3 seconds with unique visual content.

🎬 VIDEO EDITING TRENDS (2024-2025):
Suggest ONE trending editing style for this reel:
  * MASK TRANSITION - Use shape/object masks to reveal next scene (e.g., swipe phone to reveal new location)
  * VELOCITY EDIT - Speed ramping with beat sync, slow-mo to fast cuts
  * 3D ZOOM - Fake 3D camera movement using parallax layers
  * CLONE EFFECT - Appear in multiple places in same frame
  * TEXT TRACKING - Text follows objects/movements in video
  * SEAMLESS TRANSITION - Match cut between similar actions/shapes
  * MORPH CUT - AI-assisted smooth transformation between scenes
  * SPLIT SCREEN REVEAL - Creative screen divisions
  * CINEMATIC BARS - Add letterbox for movie feel with animated reveals
  * LIGHT LEAK TRANSITION - Vintage film light leak effects

🤖 HIGGSFIELD AI TRANSITION:
Create a prompt for AI video transition:
- Describe the START frame (what you see at the beginning)
- Describe the END frame (what you want to transition TO)
- The AI will morph between these two frames

Return ONLY valid JSON array:
[
  {
    "title": "Reel title related to ${userInput}",
    "concept": "One line description (50-100 words with specific Bahrain details about ${userInput})",
    "hook": "Viral hook using one of the formulas above - MUST relate to ${userInput}",
    "duration": "30-60 seconds",
    "style": "${reelStyle}",
    "slides": [
      {
        "order": 1,
        "text": "Hook text (grabs attention)",
        "duration": "2-3s",
        "visualNote": "Detailed description of what to show (20-30 words)"
      },
      {"order": 2, "text": "...", "duration": "2-3s", "visualNote": "..."},
      {"order": 3, "text": "...", "duration": "2-3s", "visualNote": "..."},
      {"order": 4, "text": "...", "duration": "2-3s", "visualNote": "..."},
      {"order": 5, "text": "...", "duration": "2-3s", "visualNote": "..."},
      {"order": 6, "text": "...", "duration": "2-3s", "visualNote": "..."},
      {"order": 7, "text": "...", "duration": "2-3s", "visualNote": "..."},
      {"order": 8, "text": "...", "duration": "2-3s", "visualNote": "..."},
      {"order": 9, "text": "...", "duration": "2-3s", "visualNote": "..."},
      {"order": 10, "text": "...", "duration": "2-3s", "visualNote": "..."},
      {"order": 11, "text": "Call to action", "duration": "2-3s", "visualNote": "..."}
    ],
    "editing_style": {
      "trend_name": "Name of trending edit style (e.g., Mask Transition, Velocity Edit)",
      "description": "Step-by-step how to execute this edit effect (50-100 words)",
      "difficulty": "easy/medium/hard",
      "apps_to_use": ["CapCut", "VN", "etc - apps that can do this effect"]
    },
    "higgsfield_prompt": {
      "start_frame_description": "Detailed description of the starting frame/scene (20-30 words)",
      "end_frame_description": "Detailed description of the ending frame/scene to morph into (20-30 words)",
      "transition_type": "morph/zoom/pan/reveal",
      "full_prompt": "Complete Higgsfield prompt combining start and end frames for AI video generation"
    },
    "caption": "Ready to post caption (100-150 words) with line breaks using \\n, include call-to-action",
    "hashtags": ["tag1", "tag2", "up to 12 relevant hashtags"]
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
    // Fallback with 12 slides based on user's topic
    const topic = userInput || 'Bahrain experiences';
    return [{
      title: `${topic} - Complete Guide`,
      concept: `A comprehensive guide to ${topic} in Bahrain with insider tips, specific locations, and actionable advice.`,
      hook: `Stop scrolling if you want to know about ${topic} 🛑`,
      duration: '30-60 seconds',
      style: reelStyle,
      slides: [
        { order: 1, text: `${topic.toUpperCase()}`, duration: '2s', visualNote: `Eye-catching intro scene related to ${topic} in Bahrain` },
        { order: 2, text: 'Everything you need to know', duration: '2s', visualNote: `Overview shot of ${topic} scene in Bahrain` },
        { order: 3, text: '#1 Tip', duration: '2s', visualNote: `First key insight about ${topic}` },
        { order: 4, text: 'The best spot', duration: '2s', visualNote: `Featured location for ${topic}` },
        { order: 5, text: 'Hidden gem alert', duration: '2s', visualNote: `Lesser-known place for ${topic}` },
        { order: 6, text: 'Pro tip', duration: '2s', visualNote: `Insider knowledge about ${topic}` },
        { order: 7, text: 'What to expect', duration: '2s', visualNote: `Realistic expectation for ${topic}` },
        { order: 8, text: 'Price range', duration: '2s', visualNote: `Cost breakdown visual for ${topic}` },
        { order: 9, text: 'Best time to go', duration: '2s', visualNote: `Timing recommendation visual` },
        { order: 10, text: 'Don\'t miss this', duration: '2s', visualNote: `Must-see highlight of ${topic}` },
        { order: 11, text: 'Final thoughts', duration: '2s', visualNote: `Summary scene of ${topic} experience` },
        { order: 12, text: 'Save this! 🔖', duration: '2s', visualNote: 'BahrainNights logo with follow CTA overlay' },
      ],
      // NO music_suggestions - user will add music manually
      music_suggestions: [],
      editing_style: {
        trend_name: 'Velocity Edit',
        description: 'Use speed ramping to sync with music beats. Slow down on key reveals, speed up during transitions.',
        difficulty: 'easy' as const,
        apps_to_use: ['CapCut', 'VN', 'InShot'],
      },
      higgsfield_prompt: {
        start_frame_description: `Person looking at phone with ${topic} search on screen`,
        end_frame_description: `Person now experiencing ${topic} in Bahrain, excited expression`,
        transition_type: 'morph',
        full_prompt: `Morph transition from searching about ${topic} to experiencing it firsthand in Bahrain`,
      },
      caption: `${topic} in Bahrain - the COMPLETE guide! 🇧🇭\n\nSave this for later ⬇️\n\n📍 Best spots revealed\n💰 Price breakdown included\n⏰ Best timing tips\n\nComment your questions below! 👇\n\n#BahrainNights #Bahrain #${topic.replace(/\s+/g, '')} #BahrainLife #ThingsToDoInBahrain`,
      hashtags: ['BahrainNights', 'Bahrain', 'BahrainLife', 'ThingsToDoInBahrain', 'ExploreBahrain'],
    }];
  }
}

// Legacy function for compatibility (deprecated - use generateReelBriefs with userInput instead)
export async function generateReelBrief(
  events: EventData[],
  style: string = 'trendy',
  settings: ContentSettings = DEFAULT_SETTINGS
): Promise<GeneratedReelBrief> {
  // Extract topic from events if available
  const eventTopics = events.map(e => e.title).join(', ');
  const userInput = eventTopics || 'Best experiences in Bahrain';

  const results = await generateReelBriefs({
    userInput,
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
