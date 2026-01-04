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
    const { title, category, venue, date, time, existingDescription } = body;

    if (!title) {
      return NextResponse.json(
        { error: 'Event title is required' },
        { status: 400 }
      );
    }

    // Build the prompt
    const prompt = buildPrompt({ title, category, venue, date, time, existingDescription });

    // Generate with Gemini 1.5 Flash (free tier)
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

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
      model: 'gemini-1.5-flash',
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

interface PromptParams {
  title: string;
  category?: string;
  venue?: string;
  date?: string;
  time?: string;
  existingDescription?: string;
}

function buildPrompt({ title, category, venue, date, time, existingDescription }: PromptParams): string {
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

  let prompt = `You are a professional event copywriter for BahrainNights.com, a cultural discovery platform in Bahrain.

Write an engaging, compelling event description for the following event. The description should:
- Be 100-150 words
- Create excitement and urgency
- Highlight what makes this event special
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
    prompt += `\n\nExisting description to improve upon:\n"${existingDescription}"

Please enhance and expand this description while maintaining the key information.`;
  }

  prompt += `\n\nWrite the description now (just the description text, no headers or formatting):`;

  return prompt;
}
