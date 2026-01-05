import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// Rate limiting: simple in-memory store (resets on server restart)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 10; // requests per minute
const RATE_WINDOW = 60 * 1000; // 1 minute in ms

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT) {
    return false;
  }

  record.count++;
  return true;
}

// Content types supported
type ContentType = 'event' | 'venue' | 'offer';

export async function POST(request: NextRequest) {
  try {
    // Check for API key
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'AI service not configured. Please add GEMINI_API_KEY to environment variables.' },
        { status: 503 }
      );
    }

    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a moment before trying again.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const {
      title,
      category,
      venue,
      date,
      time,
      existingDescription,
      contentType = 'event',
      // Additional fields for different content types
      venueName,
      venueCategory,
      location,
      offerType,
      daysAvailable,
      whatsIncluded,
    } = body;

    // Validate based on content type
    if (contentType === 'event' && !title) {
      return NextResponse.json(
        { error: 'Event title is required' },
        { status: 400 }
      );
    }

    if (contentType === 'venue' && !venueName) {
      return NextResponse.json(
        { error: 'Venue name is required' },
        { status: 400 }
      );
    }

    if (contentType === 'offer' && !title) {
      return NextResponse.json(
        { error: 'Offer title is required' },
        { status: 400 }
      );
    }

    // Build the appropriate prompt based on content type
    let prompt: string;
    switch (contentType as ContentType) {
      case 'venue':
        prompt = buildVenuePrompt({ venueName, venueCategory, location, existingDescription });
        break;
      case 'offer':
        prompt = buildOfferPrompt({ title, offerType, venueName, daysAvailable, time, whatsIncluded, existingDescription });
        break;
      case 'event':
      default:
        prompt = buildEventPrompt({ title, category, venue, date, time, existingDescription });
        break;
    }

    // Generate with Gemini 2.0 Flash (free tier)
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 500,
      },
    });

    const response = result.response;
    const generatedText = response.text();

    if (!generatedText) {
      return NextResponse.json(
        { error: 'Failed to generate description. Please try again.' },
        { status: 500 }
      );
    }

    // Clean up the response (remove any markdown formatting)
    const cleanedDescription = generatedText
      .replace(/^#+\s*/gm, '') // Remove markdown headers
      .replace(/\*\*/g, '') // Remove bold markers
      .replace(/\n{3,}/g, '\n\n') // Normalize multiple newlines
      .trim();

    return NextResponse.json({
      description: cleanedDescription,
      model: 'gemini-2.0-flash',
    });

  } catch (error) {
    console.error('AI Generation Error:', error);

    // Handle specific Gemini errors
    if (error instanceof Error) {
      if (error.message.includes('API_KEY')) {
        return NextResponse.json(
          { error: 'Invalid API key. Please check your GEMINI_API_KEY configuration.' },
          { status: 401 }
        );
      }
      if (error.message.includes('quota') || error.message.includes('rate')) {
        return NextResponse.json(
          { error: 'API quota exceeded. Please try again later.' },
          { status: 429 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Failed to generate description. Please try again.' },
      { status: 500 }
    );
  }
}

// SEO Keywords for Bahrain
const SEO_KEYWORDS = [
  'Bahrain', 'things to do in Bahrain', 'Bahrain nightlife', 'Bahrain events',
  'Manama', 'Juffair', 'Seef', 'Amwaj', 'best in Bahrain', 'Bahrain entertainment'
];

interface EventPromptParams {
  title: string;
  category?: string;
  venue?: string;
  date?: string;
  time?: string;
  existingDescription?: string;
}

interface VenuePromptParams {
  venueName: string;
  venueCategory?: string;
  location?: string;
  existingDescription?: string;
}

interface OfferPromptParams {
  title: string;
  offerType?: string;
  venueName?: string;
  daysAvailable?: string[];
  time?: string;
  whatsIncluded?: string[];
  existingDescription?: string;
}

function buildEventPrompt({ title, category, venue, date, time, existingDescription }: EventPromptParams): string {
  const categoryLabels: Record<string, string> = {
    music: 'Concert / Live Music',
    sports: 'Sports Event',
    arts: 'Arts & Culture',
    dining: 'Dining Experience',
    community: 'Community Event',
    shopping: 'Shopping / Market',
    special: 'Special Event',
    nightlife: 'Nightlife / Party',
    family: 'Family Event',
    cultural: 'Cultural Event',
    business: 'Business / Networking',
    wellness: 'Wellness / Health',
  };

  const categoryLabel = category ? categoryLabels[category] || category : 'Event';

  let prompt = `You are a professional SEO copywriter for BahrainNights.com, the premier cultural discovery platform in Bahrain.

Write an engaging, SEO-optimized event description for the following event. The description should:
- Be 120-180 words
- Create excitement and urgency
- Highlight what makes this event special in Bahrain
- Include natural SEO keywords like "Bahrain", "things to do in Bahrain", location names (Manama, Juffair, Seef)
- Use compelling language that ranks well on Google
- Include a call-to-action
- Be written in a warm, inviting tone
- NOT include the title (it will be shown separately)
- NOT include placeholder text like [date] or [venue]

Event Details:
- Title: ${title}
- Type: ${categoryLabel}`;

  if (venue) {
    prompt += `\n- Venue: ${venue}`;
  }

  if (date) {
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    prompt += `\n- Date: ${formattedDate}`;
  }

  if (time) {
    prompt += `\n- Time: ${time}`;
  }

  if (existingDescription && existingDescription.trim().length > 20) {
    prompt += `\n\nExisting description to improve and make more SEO-friendly:\n"${existingDescription}"

Please enhance this description with better SEO keywords while maintaining the key information.`;
  }

  prompt += `\n\nWrite the SEO-optimized description now (just the description text, no headers or formatting):`;

  return prompt;
}

function buildVenuePrompt({ venueName, venueCategory, location, existingDescription }: VenuePromptParams): string {
  const categoryLabels: Record<string, string> = {
    restaurant: 'Restaurant',
    cafe: 'Café',
    bar: 'Bar & Lounge',
    nightclub: 'Nightclub',
    hotel: 'Hotel',
    beach_club: 'Beach Club',
    lounge: 'Lounge',
    sports_bar: 'Sports Bar',
    shisha_lounge: 'Shisha Lounge',
    fine_dining: 'Fine Dining',
    casual_dining: 'Casual Dining',
    entertainment: 'Entertainment Venue',
  };

  const categoryLabel = venueCategory ? categoryLabels[venueCategory] || venueCategory : 'Venue';

  let prompt = `You are a professional SEO copywriter for BahrainNights.com, the premier cultural discovery platform in Bahrain.

Write a compelling, SEO-optimized venue description for the following establishment. The description should:
- Be 150-200 words
- Highlight the venue's unique atmosphere and offerings
- Include natural SEO keywords like "Bahrain", "best ${categoryLabel.toLowerCase()} in Bahrain", location names
- Mention what makes this venue a must-visit destination in Bahrain
- Use enticing language that appeals to visitors and tourists
- Include keywords that help Google understand this is a top venue in Bahrain
- Be written in a sophisticated, inviting tone
- NOT include the venue name (it will be shown separately)
- NOT include placeholder text

Venue Details:
- Name: ${venueName}
- Type: ${categoryLabel}`;

  if (location) {
    prompt += `\n- Location: ${location}, Bahrain`;
  }

  if (existingDescription && existingDescription.trim().length > 20) {
    prompt += `\n\nExisting description to improve and make more SEO-friendly:\n"${existingDescription}"

Please enhance this description with better SEO keywords, more compelling language, and ensure it ranks well on Google searches for "${categoryLabel.toLowerCase()} in Bahrain".`;
  } else {
    prompt += `\n\nCreate a fresh, compelling description that will help this venue rank well on Google searches for "${categoryLabel.toLowerCase()} in Bahrain".`;
  }

  prompt += `\n\nWrite the SEO-optimized description now (just the description text, no headers or formatting):`;

  return prompt;
}

function buildOfferPrompt({ title, offerType, venueName, daysAvailable, time, whatsIncluded, existingDescription }: OfferPromptParams): string {
  const offerTypeLabels: Record<string, string> = {
    'ladies-night': 'Ladies Night',
    'brunch': 'Brunch Deal',
    'happy-hour': 'Happy Hour',
    'special-deal': 'Special Deal',
    'buy1get1': 'Buy 1 Get 1 Free',
    'buffet': 'Buffet Offer',
  };

  const offerLabel = offerType ? offerTypeLabels[offerType] || offerType : 'Special Offer';

  let prompt = `You are a professional SEO copywriter for BahrainNights.com, the premier cultural discovery platform in Bahrain.

Write an enticing, SEO-optimized offer description. The description should:
- Be 100-150 words
- Create urgency and excitement
- Highlight the value and savings customers get
- Include natural SEO keywords like "Bahrain", "best ${offerLabel.toLowerCase()} in Bahrain", "deals in Bahrain"
- Use persuasive language that encourages bookings
- Include keywords that help Google find this offer
- Be written in an exciting, promotional tone
- NOT include the offer title (it will be shown separately)
- NOT include placeholder text

Offer Details:
- Title: ${title}
- Type: ${offerLabel}`;

  if (venueName) {
    prompt += `\n- Venue: ${venueName}`;
  }

  if (daysAvailable && daysAvailable.length > 0) {
    prompt += `\n- Available: ${daysAvailable.join(', ')}`;
  }

  if (time) {
    prompt += `\n- Time: ${time}`;
  }

  if (whatsIncluded && whatsIncluded.length > 0) {
    prompt += `\n- Includes: ${whatsIncluded.filter(i => i.trim()).join(', ')}`;
  }

  if (existingDescription && existingDescription.trim().length > 20) {
    prompt += `\n\nExisting description to improve and make more SEO-friendly:\n"${existingDescription}"

Please enhance this description with better SEO keywords and more persuasive language.`;
  } else {
    prompt += `\n\nCreate a compelling description that will help this offer rank well on Google searches for "${offerLabel.toLowerCase()} Bahrain".`;
  }

  prompt += `\n\nWrite the SEO-optimized description now (just the description text, no headers or formatting):`;

  return prompt;
}
