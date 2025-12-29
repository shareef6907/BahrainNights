/**
 * Event Categorizer - Maps source categories to our standard categories
 */

import { EVENT_CATEGORIES, EventCategory } from '../types';

// Category keywords for auto-detection
const CATEGORY_KEYWORDS: Record<EventCategory, string[]> = {
  dining: [
    'restaurant', 'brunch', 'dinner', 'lunch', 'food', 'chef', 'cuisine',
    'ladies night', 'buffet', 'iftar', 'suhoor', 'ghabga', 'eid brunch',
    'friday brunch', 'afternoon tea', 'wine', 'dine', 'culinary',
  ],
  music: [
    'concert', 'live music', 'band', 'singer', 'performance', 'orchestra',
    'dj set', 'gig', 'acoustic', 'jazz', 'classical', 'recital', 'symphony',
  ],
  nightlife: [
    'club', 'nightclub', 'party', 'dj', 'after dark', 'lounge', 'bar',
    'disco', 'rave', 'night out', 'late night',
  ],
  family: [
    'kids', 'children', 'family', 'playground', 'carnival', 'circus',
    'cartoon', 'animation', 'magic show', 'puppet', 'storytime', 'toddler',
  ],
  arts: [
    'exhibition', 'gallery', 'art', 'museum', 'theater', 'theatre',
    'cultural', 'painting', 'sculpture', 'photography', 'poetry', 'drama',
    'opera', 'ballet', 'dance', 'performance art',
  ],
  cinema: [
    'movie', 'film', 'cinema', 'screening', 'premiere', 'imax', '3d',
  ],
  sports: [
    'match', 'game', 'tournament', 'fitness', 'gym', 'race', 'marathon',
    'football', 'cricket', 'tennis', 'golf', 'f1', 'formula 1', 'racing',
    'run', 'swim', 'cycling', 'triathlon', 'boxing', 'mma', 'ufc',
  ],
  business: [
    'conference', 'seminar', 'workshop', 'networking', 'summit', 'forum',
    'expo', 'trade', 'b2b', 'entrepreneurship', 'startup', 'webinar',
  ],
  wellness: [
    'spa', 'yoga', 'meditation', 'wellness', 'health', 'retreat',
    'mindfulness', 'relaxation', 'massage', 'therapy', 'healing',
  ],
  shopping: [
    'market', 'bazaar', 'sale', 'shopping', 'fair', 'popup', 'pop-up',
    'craft', 'handmade', 'artisan', 'flea',
  ],
  community: [
    'charity', 'volunteer', 'fundraiser', 'community', 'social', 'donation',
    'awareness', 'ngo', 'non-profit', 'cause',
  ],
  tours: [
    'tour', 'attraction', 'sightseeing', 'adventure', 'desert', 'boat',
    'cruise', 'diving', 'snorkeling', 'pearl', 'heritage', 'historical',
    'water park', 'theme park', 'amusement',
  ],
  special: [
    'national day', 'eid', 'ramadan', 'christmas', 'new year', 'holiday',
    'diwali', 'halloween', 'valentine', 'mother day', 'father day',
    'independence', 'anniversary', 'celebration', 'festival',
  ],
  other: [],
};

// Platinumlist category mappings
const PLATINUMLIST_CATEGORY_MAP: Record<string, EventCategory> = {
  'concerts': 'music',
  'arabic': 'music',
  'festivals': 'special',
  'shows': 'arts',
  'nightlife': 'nightlife',
  'comedy': 'arts',
  'dining': 'dining',
  'sports': 'sports',
  'fashion': 'arts',
  'kids': 'family',
  'family': 'family',
  'theatre': 'arts',
  'theater': 'arts',
  'exhibitions': 'arts',
  'attractions': 'tours',
  'experiences': 'tours',
};

// Bahrain.com category mappings
const BAHRAIN_CALENDAR_CATEGORY_MAP: Record<string, EventCategory> = {
  'art & culture': 'arts',
  'art and culture': 'arts',
  'arts': 'arts',
  'music': 'music',
  'concerts': 'music',
  'food & dining': 'dining',
  'food and dining': 'dining',
  'dining': 'dining',
  'sports': 'sports',
  'fitness': 'sports',
  'family': 'family',
  'kids': 'family',
  'nightlife': 'nightlife',
  'festivals': 'special',
  'celebrations': 'special',
  'business': 'business',
  'networking': 'business',
  'wellness': 'wellness',
  'health': 'wellness',
  'shopping': 'shopping',
  'markets': 'shopping',
  'tours': 'tours',
  'attractions': 'tours',
  'community': 'community',
  'charity': 'community',
};

/**
 * Map a source category to our standard categories
 */
export function mapSourceCategory(
  sourceCategory: string,
  sourceName: string
): EventCategory {
  const normalizedCategory = sourceCategory.toLowerCase().trim();

  // Try source-specific mapping first
  if (sourceName === 'platinumlist-events' || sourceName === 'platinumlist-attractions') {
    const mapped = PLATINUMLIST_CATEGORY_MAP[normalizedCategory];
    if (mapped) return mapped;
  }

  if (sourceName === 'bahrain-calendar') {
    const mapped = BAHRAIN_CALENDAR_CATEGORY_MAP[normalizedCategory];
    if (mapped) return mapped;
  }

  // Try generic mappings
  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    for (const keyword of keywords) {
      if (normalizedCategory.includes(keyword)) {
        return category as EventCategory;
      }
    }
  }

  return 'other';
}

/**
 * Auto-detect category from event title and description
 */
export function detectCategory(title: string, description?: string): EventCategory {
  const text = `${title} ${description || ''}`.toLowerCase();

  // Score each category based on keyword matches
  const scores: Record<EventCategory, number> = {} as Record<EventCategory, number>;

  for (const category of EVENT_CATEGORIES) {
    scores[category] = 0;
    const keywords = CATEGORY_KEYWORDS[category];

    for (const keyword of keywords) {
      if (text.includes(keyword)) {
        // Longer keywords get higher scores
        scores[category] += keyword.split(' ').length;
      }
    }
  }

  // Find highest scoring category
  let bestCategory: EventCategory = 'other';
  let bestScore = 0;

  for (const [category, score] of Object.entries(scores)) {
    if (score > bestScore) {
      bestScore = score;
      bestCategory = category as EventCategory;
    }
  }

  return bestCategory;
}

/**
 * Validate that a category is in our allowed list
 */
export function validateCategory(category: string): EventCategory {
  const normalized = category.toLowerCase().trim();

  if (EVENT_CATEGORIES.includes(normalized as EventCategory)) {
    return normalized as EventCategory;
  }

  return 'other';
}

/**
 * Get display name for a category
 */
export function getCategoryDisplayName(category: EventCategory): string {
  const displayNames: Record<EventCategory, string> = {
    dining: 'Dining & Food',
    family: 'Family & Kids',
    arts: 'Arts & Culture',
    music: 'Music & Concerts',
    cinema: 'Cinema',
    sports: 'Sports & Fitness',
    shopping: 'Shopping & Markets',
    business: 'Business & Networking',
    wellness: 'Wellness & Spa',
    special: 'Special Events',
    tours: 'Tours & Attractions',
    community: 'Community',
    nightlife: 'Nightlife',
    other: 'Other Events',
  };

  return displayNames[category] || 'Other Events';
}
