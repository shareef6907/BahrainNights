import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

export const dynamic = 'force-dynamic';

// All 12 content categories for BahrainNights
const CATEGORY_CONTEXT: Record<string, string> = {
  dining: 'Dining & Restaurants - new openings, brunches, ladies nights, happy hours, food festivals, fine dining, casual eateries, cafes',
  family: 'Family & Kids - theme parks, kids events, family dining, educational activities, children entertainment, family-friendly venues',
  arts: 'Arts & Culture - exhibitions, theater, museums, local artists, cultural festivals, art galleries, heritage sites, traditional crafts',
  music: 'Music & Nightlife - concerts, live music, DJ nights, clubs, bars, lounges, karaoke, entertainment venues',
  cinema: 'Cinema - now showing movies, coming soon releases, special screenings, film festivals, movie reviews, cinema experiences',
  sports: 'Sports & Fitness - matches, fitness events, water sports, tournaments, gyms, yoga studios, running clubs, marathons',
  shopping: 'Shopping & Markets - pop-up markets, craft fairs, local vendors, souks, malls, boutiques, seasonal sales',
  business: 'Business & Networking - conferences, meetups, workshops, seminars, professional events, coworking spaces',
  wellness: 'Wellness & Spa - spa offers, yoga, meditation, wellness retreats, health centers, beauty treatments, relaxation',
  special: 'Special Occasions - holidays, seasonal events, national celebrations, Eid, National Day, New Year, Ramadan events',
  tours: 'Tours & Adventures - boat tours, desert trips, cultural tours, pearl diving, island hopping, adventure activities',
  community: 'Community & Charity - volunteer events, fundraisers, social causes, community gatherings, charity galas',
};

const CONTENT_TYPE_CONTEXT: Record<string, string> = {
  blog: 'comprehensive blog article (800-1500 words) with SEO optimization, detailed information, tips, and insider knowledge',
  feed: 'Instagram feed post with engaging caption (150-300 words), call-to-action, and relevant hashtags',
  story: 'Instagram story content - short, punchy, attention-grabbing with interactive elements like polls or questions',
  reel_brief: 'Instagram Reel concept - hook, visual sequence, trending audio suggestions, and text overlays',
};

export async function POST(request: NextRequest) {
  try {
    const { idea, category, contentType } = await request.json();

    if (!idea || !idea.trim()) {
      return NextResponse.json(
        { error: 'Please provide an idea or topic' },
        { status: 400 }
      );
    }

    const anthropic = new Anthropic({
      apiKey: process.env.CLAUDE_API_KEY,
    });

    const categoryContext = category && CATEGORY_CONTEXT[category]
      ? `Focus on the ${CATEGORY_CONTEXT[category]} category.`
      : 'Consider all categories: dining, family activities, arts & culture, music & nightlife, cinema, sports, shopping, business events, wellness, special occasions, tours, and community events.';

    const contentContext = contentType && CONTENT_TYPE_CONTEXT[contentType]
      ? `The content should be suitable for a ${CONTENT_TYPE_CONTEXT[contentType]}.`
      : 'The content can be adapted for various formats including blog posts, social media posts, stories, and video content.';

    const prompt = `You are a creative content strategist for BahrainNights.com, Bahrain's premier events and lifestyle magazine covering ALL aspects of life in Bahrain - not just nightlife.

USER'S IDEA/TOPIC:
"${idea}"

CONTEXT:
${categoryContext}
${contentContext}

Your task is to generate 5 creative, specific, and actionable content suggestions based on the user's idea. Each suggestion should:
1. Be specific to Bahrain (mention real areas, landmarks, or cultural elements)
2. Be timely and relevant
3. Include a unique angle or hook
4. Be engaging for the target audience
5. Have viral potential on social media

Return ONLY a JSON array of 5 suggestion strings, each 1-2 sentences describing the content idea clearly.

Example format:
["Suggestion 1 text here", "Suggestion 2 text here", ...]

Generate suggestions that are creative, specific, and would genuinely interest people in Bahrain.`;

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      messages: [{ role: 'user', content: prompt }],
    });

    // Extract the text response
    const textContent = response.content.find(c => c.type === 'text');
    if (!textContent || textContent.type !== 'text') {
      throw new Error('No text response from AI');
    }

    // Parse the JSON array from the response
    let suggestions: string[] = [];
    try {
      // Try to extract JSON from the response
      const jsonMatch = textContent.text.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        suggestions = JSON.parse(jsonMatch[0]);
      } else {
        // If no JSON array found, split by newlines and clean up
        suggestions = textContent.text
          .split('\n')
          .filter(line => line.trim().length > 10)
          .slice(0, 5);
      }
    } catch {
      // Fallback: split by numbered items or newlines
      suggestions = textContent.text
        .split(/\d\.\s+/)
        .filter(s => s.trim().length > 10)
        .slice(0, 5);
    }

    // Ensure we have at least some suggestions
    if (suggestions.length === 0) {
      suggestions = [
        `Create engaging content about "${idea}" focusing on the Bahrain audience`,
        `Explore unique angles of "${idea}" that showcase Bahrain's culture`,
        `Highlight local venues and events related to "${idea}"`,
        `Feature local personalities or businesses connected to "${idea}"`,
        `Create a guide or list about "${idea}" in Bahrain`,
      ];
    }

    return NextResponse.json({ suggestions });
  } catch (error) {
    console.error('Error generating suggestions:', error);
    return NextResponse.json(
      { error: 'Failed to generate suggestions' },
      { status: 500 }
    );
  }
}
