import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

// Venue type matching database
interface Venue {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string | null;
  cover_image: string | null;
  price_range: string | null;
  average_rating: number | null;
  address: string | null;
}

// Itinerary types
interface ItineraryStop {
  time: string;
  venue: {
    id: string;
    name: string;
    slug: string;
    category: string;
    description: string;
    image?: string;
    priceRange?: string;
    rating?: number;
    address?: string;
  };
  activity: string;
  tip: string;
  duration: string;
}

interface Itinerary {
  title: string;
  mood: string;
  totalBudget: string;
  stops: ItineraryStop[];
  proTip: string;
}

// Mood-based venue category mapping
const moodCategories: Record<string, string[]> = {
  romantic: ['fine-dining', 'restaurant', 'lounge', 'rooftop', 'beach-club'],
  party: ['nightclub', 'bar', 'lounge', 'pub', 'club'],
  chill: ['cafe', 'lounge', 'shisha', 'beach-club', 'restaurant'],
  adventurous: ['sports-bar', 'karaoke', 'bowling', 'escape-room', 'pub'],
  foodie: ['restaurant', 'fine-dining', 'cafe', 'dessert', 'international'],
  cultural: ['museum', 'gallery', 'theatre', 'cafe', 'restaurant'],
};

// Time slot configurations
const timeSlots: Record<string, { startHour: number; stops: number; label: string }> = {
  afternoon: { startHour: 14, stops: 2, label: 'afternoon' },
  evening: { startHour: 18, stops: 3, label: 'evening' },
  night: { startHour: 22, stops: 3, label: 'night' },
  fullnight: { startHour: 18, stops: 4, label: 'full night' },
};

// Budget ranges in BD
const budgetRanges: Record<string, { min: number; max: number; label: string }> = {
  low: { min: 10, max: 25, label: 'BD 10-25' },
  medium: { min: 25, max: 50, label: 'BD 25-50' },
  high: { min: 50, max: 100, label: 'BD 50-100' },
  luxury: { min: 100, max: 500, label: 'BD 100+' },
};

// Activity descriptions by category
const activityDescriptions: Record<string, string[]> = {
  restaurant: ['Dinner', 'Late lunch', 'Fine dining experience', 'Culinary adventure'],
  'fine-dining': ['Gourmet dinner', 'Chef\'s tasting menu', 'Upscale dining'],
  cafe: ['Coffee & desserts', 'Light bites', 'Chill session'],
  lounge: ['Drinks & vibes', 'Cocktails', 'Chill drinks'],
  bar: ['Happy hour', 'Drinks', 'Pre-party drinks'],
  pub: ['Pints & banter', 'Casual drinks', 'Live sports & drinks'],
  nightclub: ['Dancing', 'Party time', 'Night out'],
  club: ['VIP experience', 'Dancing & bottle service'],
  'beach-club': ['Sunset drinks', 'Beach vibes', 'Pool party'],
  rooftop: ['Skyline views', 'Rooftop cocktails', 'Sunset session'],
  shisha: ['Shisha & chill', 'Hookah session'],
  karaoke: ['Sing your heart out', 'Karaoke night'],
  bowling: ['Strike time', 'Bowling & drinks'],
};

// Pro tips by mood
const proTips: Record<string, string[]> = {
  romantic: [
    'Book a table with a view for extra romance points!',
    'Ask for their signature cocktail - great conversation starter.',
    'Most places are quieter early in the week - perfect for intimate conversations.',
  ],
  party: [
    'Arrive before midnight to skip the queues.',
    'Check if there\'s a dress code - most clubs require smart casual.',
    'Pre-book a table if you\'re a group - walk-ins can be hit or miss on weekends.',
  ],
  chill: [
    'Weekday evenings are perfect for a relaxed vibe.',
    'Ask about their happy hour deals!',
    'Try the outdoor seating if weather permits.',
  ],
  adventurous: [
    'Ask staff for their hidden menu items or local favorites.',
    'Check for any live events or theme nights happening.',
    'Be open to last-minute plan changes - the best nights are spontaneous!',
  ],
  foodie: [
    'Ask the chef for recommendations - they love sharing their favorites!',
    'Save room for dessert - it\'s always worth it.',
    'Consider booking a tasting menu for the full experience.',
  ],
  cultural: [
    'Check gallery/museum hours - some have special evening events.',
    'Many cultural venues have cafes with unique atmospheres.',
    'Ask about guided tours or upcoming exhibitions.',
  ],
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { mood, groupSize, budget, timeSlot } = body;

    // Validate inputs
    if (!mood || !groupSize || !budget || !timeSlot) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get relevant categories for the mood
    const relevantCategories = moodCategories[mood] || ['restaurant', 'bar', 'lounge'];
    const slotConfig = timeSlots[timeSlot] || timeSlots.evening;
    const budgetInfo = budgetRanges[budget] || budgetRanges.medium;

    // Fetch venues matching the mood categories
    const { data: venues, error } = await supabaseAdmin
      .from('venues')
      .select('id, name, slug, category, description, cover_image, price_range, average_rating, address')
      .eq('is_published', true)
      .limit(50);

    if (error) {
      console.error('Error fetching venues:', error);
      return NextResponse.json(
        { error: 'Failed to fetch venues' },
        { status: 500 }
      );
    }

    // Filter and score venues
    const scoredVenues = (venues || [])
      .map((venue: Venue) => {
        let score = 0;
        const category = (venue.category || '').toLowerCase();

        // Category match
        if (relevantCategories.some(cat => category.includes(cat))) {
          score += 10;
        }

        // Price range match
        if (venue.price_range) {
          const priceLevel = venue.price_range.length; // $ = 1, $$ = 2, etc.
          if (budget === 'low' && priceLevel <= 2) score += 5;
          if (budget === 'medium' && priceLevel >= 2 && priceLevel <= 3) score += 5;
          if (budget === 'high' && priceLevel >= 3) score += 5;
          if (budget === 'luxury' && priceLevel >= 4) score += 5;
        }

        // Rating boost
        if (venue.average_rating && venue.average_rating >= 4) {
          score += 3;
        }

        return { ...venue, score };
      })
      .filter((v: Venue & { score: number }) => v.score > 0)
      .sort((a: Venue & { score: number }, b: Venue & { score: number }) => b.score - a.score);

    // Build itinerary
    const stops: ItineraryStop[] = [];
    const usedVenueIds = new Set<string>();
    let currentHour = slotConfig.startHour;

    // Create stops based on time slot
    const stopTypes = getStopTypes(mood, timeSlot);

    for (let i = 0; i < Math.min(slotConfig.stops, stopTypes.length); i++) {
      const stopType = stopTypes[i];
      const matchingVenues = scoredVenues.filter(
        (v: Venue & { score: number }) =>
          !usedVenueIds.has(v.id) &&
          (v.category || '').toLowerCase().includes(stopType.category)
      );

      // Fallback to any scored venue if no specific match
      const venue = matchingVenues[0] || scoredVenues.find((v: Venue & { score: number }) => !usedVenueIds.has(v.id));

      if (venue) {
        usedVenueIds.add(venue.id);

        const activity = getActivityDescription(venue.category || '', stopType.category);
        const tip = getVenueTip(venue, mood);

        stops.push({
          time: formatTime(currentHour),
          venue: {
            id: venue.id,
            name: venue.name,
            slug: venue.slug,
            category: venue.category || 'Venue',
            description: venue.description || '',
            image: venue.cover_image || undefined,
            priceRange: venue.price_range || undefined,
            rating: venue.average_rating || undefined,
            address: venue.address || undefined,
          },
          activity,
          tip,
          duration: stopType.duration,
        });

        currentHour += stopType.hours;
      }
    }

    // Generate itinerary title
    const title = generateTitle(mood, timeSlot);

    // Select a pro tip
    const tips = proTips[mood] || proTips.chill;
    const proTip = tips[Math.floor(Math.random() * tips.length)];

    const itinerary: Itinerary = {
      title,
      mood,
      totalBudget: `${budgetInfo.label} per person`,
      stops,
      proTip,
    };

    return NextResponse.json({ itinerary });
  } catch (error) {
    console.error('Error generating itinerary:', error);
    return NextResponse.json(
      { error: 'Failed to generate itinerary' },
      { status: 500 }
    );
  }
}

function getStopTypes(mood: string, timeSlot: string): { category: string; duration: string; hours: number }[] {
  // Define stop sequences based on mood and time
  const sequences: Record<string, Record<string, { category: string; duration: string; hours: number }[]>> = {
    romantic: {
      afternoon: [
        { category: 'cafe', duration: '1.5 hours', hours: 2 },
        { category: 'restaurant', duration: '2 hours', hours: 2 },
      ],
      evening: [
        { category: 'restaurant', duration: '2 hours', hours: 2 },
        { category: 'lounge', duration: '1.5 hours', hours: 2 },
        { category: 'rooftop', duration: '1.5 hours', hours: 2 },
      ],
      night: [
        { category: 'restaurant', duration: '2 hours', hours: 2 },
        { category: 'lounge', duration: '2 hours', hours: 2 },
        { category: 'club', duration: '2+ hours', hours: 3 },
      ],
      fullnight: [
        { category: 'restaurant', duration: '2 hours', hours: 2 },
        { category: 'lounge', duration: '1.5 hours', hours: 2 },
        { category: 'rooftop', duration: '1.5 hours', hours: 2 },
        { category: 'club', duration: '2+ hours', hours: 3 },
      ],
    },
    party: {
      afternoon: [
        { category: 'beach-club', duration: '2 hours', hours: 2 },
        { category: 'bar', duration: '2 hours', hours: 2 },
      ],
      evening: [
        { category: 'restaurant', duration: '1.5 hours', hours: 2 },
        { category: 'bar', duration: '2 hours', hours: 2 },
        { category: 'nightclub', duration: '3+ hours', hours: 4 },
      ],
      night: [
        { category: 'bar', duration: '1.5 hours', hours: 2 },
        { category: 'lounge', duration: '1.5 hours', hours: 2 },
        { category: 'nightclub', duration: '3+ hours', hours: 4 },
      ],
      fullnight: [
        { category: 'restaurant', duration: '1.5 hours', hours: 2 },
        { category: 'bar', duration: '1.5 hours', hours: 2 },
        { category: 'lounge', duration: '1.5 hours', hours: 2 },
        { category: 'nightclub', duration: '3+ hours', hours: 4 },
      ],
    },
    // Default for other moods
    default: {
      afternoon: [
        { category: 'cafe', duration: '1.5 hours', hours: 2 },
        { category: 'restaurant', duration: '2 hours', hours: 2 },
      ],
      evening: [
        { category: 'restaurant', duration: '2 hours', hours: 2 },
        { category: 'lounge', duration: '2 hours', hours: 2 },
        { category: 'bar', duration: '2 hours', hours: 2 },
      ],
      night: [
        { category: 'restaurant', duration: '1.5 hours', hours: 2 },
        { category: 'bar', duration: '2 hours', hours: 2 },
        { category: 'lounge', duration: '2+ hours', hours: 3 },
      ],
      fullnight: [
        { category: 'restaurant', duration: '2 hours', hours: 2 },
        { category: 'bar', duration: '1.5 hours', hours: 2 },
        { category: 'lounge', duration: '2 hours', hours: 2 },
        { category: 'nightclub', duration: '2+ hours', hours: 3 },
      ],
    },
  };

  const moodSequence = sequences[mood] || sequences.default;
  return moodSequence[timeSlot] || moodSequence.evening;
}

function getActivityDescription(venueCategory: string, targetCategory: string): string {
  const category = venueCategory.toLowerCase();
  const activities = activityDescriptions[category] || activityDescriptions[targetCategory] || ['Hanging out'];
  return activities[Math.floor(Math.random() * activities.length)];
}

function getVenueTip(venue: Venue, mood: string): string {
  const tips = [
    venue.average_rating && venue.average_rating >= 4.5 ? 'Highly rated - expect great service!' : '',
    venue.price_range === '$$$$' ? 'Premium spot - worth the splurge!' : '',
    venue.category?.toLowerCase().includes('rooftop') ? 'Get there early for the best seats!' : '',
    venue.category?.toLowerCase().includes('nightclub') ? 'Check their Instagram for tonight\'s DJ lineup.' : '',
    mood === 'romantic' ? 'Ask for a corner table for privacy.' : '',
    mood === 'party' && venue.category?.toLowerCase().includes('bar') ? 'Great spot to warm up before the club!' : '',
  ].filter(Boolean);

  return tips[0] || 'Call ahead to check availability!';
}

function formatTime(hour: number): string {
  const adjustedHour = hour >= 24 ? hour - 24 : hour;
  const period = adjustedHour >= 12 ? 'PM' : 'AM';
  const displayHour = adjustedHour > 12 ? adjustedHour - 12 : adjustedHour === 0 ? 12 : adjustedHour;
  return `${displayHour}:00 ${period}`;
}

function generateTitle(mood: string, timeSlot: string): string {
  const titles: Record<string, string[]> = {
    romantic: ['A Night to Remember', 'Romance in Bahrain', 'Love Under the Stars', 'The Perfect Date Night'],
    party: ['Let\'s Get This Party Started', 'Night of Your Life', 'Paint the Town Red', 'Squad Goals Activated'],
    chill: ['Easy Does It', 'Relaxation Mode: ON', 'Chill Vibes Only', 'The Perfect Wind-Down'],
    adventurous: ['Adventure Awaits', 'Try Something New', 'The Unexpected Journey', 'Breaking the Routine'],
    foodie: ['A Culinary Journey', 'Feast Mode Activated', 'Taste of Bahrain', 'The Foodie\'s Dream'],
    cultural: ['Culture & Class', 'An Evening of Elegance', 'Art & Soul', 'The Refined Experience'],
  };

  const moodTitles = titles[mood] || titles.chill;
  return moodTitles[Math.floor(Math.random() * moodTitles.length)];
}
