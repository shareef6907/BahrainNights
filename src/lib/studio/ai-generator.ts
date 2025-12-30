import Anthropic from '@anthropic-ai/sdk';

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY || process.env.ANTHROPIC_API_KEY,
});

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
  seo_title: string;
  seo_description: string;
  seo_keywords: string[];
}

export interface GeneratedFeedPost {
  title: string;
  caption: string;
  hashtags: string[];
  media_suggestion?: string;
}

export interface GeneratedStory {
  title: string;
  story_type: 'promo' | 'countdown' | 'poll' | 'question' | 'tip' | 'this_or_that';
  caption: string;
  sticker_data?: Record<string, unknown>;
  slides: { text: string; emoji?: string }[];
}

export interface GeneratedReelBrief {
  title: string;
  caption: string;
  hashtags: string[];
  concept: string;
  hook: string;
  text_overlays: { slide: number; text: string }[];
  music_suggestions: { song: string; artist: string; reason: string }[];
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

  // Political content detection
  if (settings.block_political) {
    const politicalKeywords = ['election', 'vote', 'political', 'government', 'parliament', 'minister'];
    if (politicalKeywords.some(kw => content.toLowerCase().includes(kw))) {
      issues.push('Contains political content');
    }
  }

  // Religious content detection
  if (settings.block_religious) {
    const religiousKeywords = ['religious ceremony', 'prayer service', 'sermon'];
    if (religiousKeywords.some(kw => content.toLowerCase().includes(kw))) {
      issues.push('Contains religious content');
    }
  }

  // Alcohol content detection
  if (settings.block_alcohol) {
    const alcoholKeywords = ['alcohol', 'beer', 'wine', 'cocktail', 'bar', 'nightclub drinks', 'happy hour'];
    if (alcoholKeywords.some(kw => content.toLowerCase().includes(kw))) {
      issues.push('Contains alcohol-related content');
    }
  }

  return {
    passed: issues.length === 0,
    issues,
  };
}

// Caption length guidelines
const CAPTION_LENGTHS = {
  short: { min: 50, max: 150, description: 'Very concise, 1-2 sentences' },
  medium: { min: 150, max: 300, description: 'Balanced, 2-4 sentences' },
  long: { min: 300, max: 500, description: 'Detailed, 4-6 sentences' },
};

// Generate blog post
export async function generateBlogPost(
  events: EventData[],
  settings: ContentSettings = DEFAULT_SETTINGS
): Promise<GeneratedBlogPost> {
  const prompt = `You are a professional content writer for BahrainNights.com, Bahrain's premier events and entertainment magazine.

TONE: ${settings.default_tone}
LANGUAGE: ${settings.default_language}
USE EMOJIS: ${settings.include_emojis}

EVENTS TO FEATURE:
${events.map(e => `- ${e.title} at ${e.venue_name || 'TBA'} on ${e.start_date}`).join('\n')}

COMPLIANCE RULES:
- NO political content
- NO religious content
- NO explicit alcohol promotion
- Keep content family-friendly unless event is 18+

TASK: Write a blog post about upcoming events in Bahrain.

REQUIREMENTS:
1. Engaging headline
2. SEO-optimized (2000-3000 characters)
3. Include event details naturally
4. Call-to-action at the end
5. Local Bahrain flavor

Return ONLY valid JSON:
{
  "title": "Engaging headline",
  "slug": "url-friendly-slug",
  "body": "Full blog content with markdown formatting",
  "seo_title": "SEO title under 60 chars",
  "seo_description": "Meta description under 160 chars",
  "seo_keywords": ["keyword1", "keyword2", "keyword3"]
}`;

  const response = await anthropic.messages.create({
    model: 'claude-3-haiku-20240307',
    max_tokens: 4000,
    messages: [{ role: 'user', content: prompt }],
  });

  const text = response.content[0].type === 'text' ? response.content[0].text : '';

  try {
    // Extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No JSON found in response');
    }
    return JSON.parse(jsonMatch[0]) as GeneratedBlogPost;
  } catch (error) {
    console.error('Error parsing blog post response:', error);
    // Return fallback content
    return {
      title: 'Upcoming Events in Bahrain',
      slug: 'upcoming-events-bahrain-' + new Date().toISOString().slice(0, 10),
      body: 'Check out the latest events happening in Bahrain. More details coming soon!',
      seo_title: 'Upcoming Events in Bahrain | BahrainNights',
      seo_description: 'Discover the best events and activities in Bahrain this week.',
      seo_keywords: ['Bahrain events', 'things to do in Bahrain', 'BahrainNights'],
    };
  }
}

// Generate feed post
export async function generateFeedPost(
  event: EventData | null,
  settings: ContentSettings = DEFAULT_SETTINGS
): Promise<GeneratedFeedPost> {
  const lengthGuide = CAPTION_LENGTHS[settings.caption_length];

  let eventContext = '';
  if (event) {
    eventContext = `
EVENT DETAILS:
- Title: ${event.title}
- Venue: ${event.venue_name || 'TBA'}
- Date: ${event.start_date}
- Time: ${event.start_time || 'TBA'}
- Category: ${event.category || 'General'}
- Description: ${event.description || 'No description'}`;
  }

  const prompt = `You are a social media manager for BahrainNights.com, Bahrain's premier events magazine.

TONE: ${settings.default_tone}
USE EMOJIS: ${settings.include_emojis}
CAPTION LENGTH: ${lengthGuide.description} (${lengthGuide.min}-${lengthGuide.max} characters)
HASHTAG COUNT: ${settings.hashtag_count}

${eventContext || 'Create a general lifestyle post about events in Bahrain.'}

COMPLIANCE:
- NO political content
- NO religious content
- NO explicit alcohol promotion

REQUIRED HASHTAGS (always include):
- #BahrainNights
- #Bahrain
- #BahrainEvents

Return ONLY valid JSON:
{
  "title": "Short title for internal use",
  "caption": "Instagram caption with emojis and line breaks",
  "hashtags": ["hashtag1", "hashtag2"],
  "media_suggestion": "Description of ideal image/video"
}`;

  const response = await anthropic.messages.create({
    model: 'claude-3-haiku-20240307',
    max_tokens: 1500,
    messages: [{ role: 'user', content: prompt }],
  });

  const text = response.content[0].type === 'text' ? response.content[0].text : '';

  try {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No JSON found in response');
    }
    return JSON.parse(jsonMatch[0]) as GeneratedFeedPost;
  } catch (error) {
    console.error('Error parsing feed post response:', error);
    return {
      title: event?.title || 'Bahrain Events',
      caption: `Discover amazing experiences in Bahrain! ${settings.include_emojis ? '✨🇧🇭' : ''}\n\nStay tuned for exciting events coming your way.`,
      hashtags: ['BahrainNights', 'Bahrain', 'BahrainEvents', 'ThingsToDoInBahrain'],
      media_suggestion: 'Vibrant image of Bahrain skyline or event venue',
    };
  }
}

// Generate story set
export async function generateStory(
  event: EventData | null,
  storyType: GeneratedStory['story_type'],
  settings: ContentSettings = DEFAULT_SETTINGS
): Promise<GeneratedStory> {
  const storyTypePrompts = {
    promo: 'Create a promotional story highlighting an event',
    countdown: 'Create a countdown story building excitement',
    poll: 'Create a poll story asking about preferences',
    question: 'Create a question sticker story for engagement',
    tip: 'Create a tip/advice story about Bahrain nightlife',
    this_or_that: 'Create a "This or That" choice story',
  };

  const prompt = `You are a social media manager for BahrainNights.com.

TONE: ${settings.default_tone}
USE EMOJIS: ${settings.include_emojis}
STORY TYPE: ${storyType} - ${storyTypePrompts[storyType]}

${event ? `EVENT: ${event.title} at ${event.venue_name} on ${event.start_date}` : 'General Bahrain lifestyle content'}

Create an Instagram story sequence (3-5 slides).

Return ONLY valid JSON:
{
  "title": "Story title for internal use",
  "story_type": "${storyType}",
  "caption": "Main caption",
  "sticker_data": ${storyType === 'poll' ? '{"question": "Your question?", "options": ["Option A", "Option B"]}' : storyType === 'question' ? '{"question": "Ask your question"}' : storyType === 'this_or_that' ? '{"question": "Which do you prefer?", "option_a": "Option A", "option_b": "Option B"}' : 'null'},
  "slides": [
    {"text": "Slide 1 text", "emoji": "🎉"},
    {"text": "Slide 2 text", "emoji": "✨"}
  ]
}`;

  const response = await anthropic.messages.create({
    model: 'claude-3-haiku-20240307',
    max_tokens: 1500,
    messages: [{ role: 'user', content: prompt }],
  });

  const text = response.content[0].type === 'text' ? response.content[0].text : '';

  try {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No JSON found in response');
    }
    return JSON.parse(jsonMatch[0]) as GeneratedStory;
  } catch (error) {
    console.error('Error parsing story response:', error);
    return {
      title: 'Bahrain Story',
      story_type: storyType,
      caption: 'Check this out!',
      slides: [
        { text: 'Welcome to BahrainNights!', emoji: '✨' },
        { text: 'Stay tuned for more!', emoji: '🎉' },
      ],
    };
  }
}

// Generate reel brief
export async function generateReelBrief(
  events: EventData[],
  style: string = 'trendy',
  settings: ContentSettings = DEFAULT_SETTINGS
): Promise<GeneratedReelBrief> {
  const prompt = `You are a creative director for BahrainNights.com Instagram Reels.

TONE: ${settings.default_tone}
USE EMOJIS: ${settings.include_emojis}
HASHTAG COUNT: ${settings.hashtag_count}
REEL STYLE: ${style}

EVENTS TO FEATURE:
${events.map(e => `- ${e.title} at ${e.venue_name || 'TBA'} on ${e.start_date}`).join('\n')}

Create a reel brief for a video editor to follow.

Return ONLY valid JSON:
{
  "title": "Reel title",
  "caption": "Instagram reel caption",
  "hashtags": ["hashtag1", "hashtag2"],
  "concept": "Overall concept description",
  "hook": "First 3 seconds hook to stop scrolling",
  "text_overlays": [
    {"slide": 1, "text": "Opening text"},
    {"slide": 2, "text": "Point 1"},
    {"slide": 3, "text": "Point 2"}
  ],
  "music_suggestions": [
    {"song": "Song name", "artist": "Artist", "reason": "Why it fits"}
  ],
  "duration": "15-30 seconds",
  "style": "${style}"
}`;

  const response = await anthropic.messages.create({
    model: 'claude-3-haiku-20240307',
    max_tokens: 2000,
    messages: [{ role: 'user', content: prompt }],
  });

  const text = response.content[0].type === 'text' ? response.content[0].text : '';

  try {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No JSON found in response');
    }
    return JSON.parse(jsonMatch[0]) as GeneratedReelBrief;
  } catch (error) {
    console.error('Error parsing reel brief response:', error);
    return {
      title: 'Weekend in Bahrain',
      caption: 'Save this for your weekend plans! 🇧🇭',
      hashtags: ['BahrainNights', 'Bahrain', 'BahrainReels', 'WeekendVibes'],
      concept: 'Showcase top events happening this weekend in Bahrain',
      hook: 'POV: You just discovered the best weekend plans in Bahrain',
      text_overlays: [
        { slide: 1, text: 'WEEKEND PLANS?' },
        { slide: 2, text: 'Check these out!' },
      ],
      music_suggestions: [
        { song: 'Trending audio', artist: 'Various', reason: 'High engagement' },
      ],
      duration: '15-30 seconds',
      style: style,
    };
  }
}

// Export all functions
export default {
  generateBlogPost,
  generateFeedPost,
  generateStory,
  generateReelBrief,
  checkCompliance,
};
