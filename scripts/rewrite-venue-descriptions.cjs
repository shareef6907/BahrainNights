require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// Test venues to skip
const testVenues = [
  'Image Test Venue',
  'Mobile Test Venue',
  'Test Venue 2',
  'Test Venue Registration',
  'Free Cafe',
  'Production Test Cafe',
  'Podcast Cafe - Test 3',
  'Podcast Cafe - Test 4',
];

const categoryLabels = {
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

function buildVenuePrompt(venue) {
  const categoryLabel = categoryLabels[venue.category] || venue.category || 'Venue';

  let prompt = `You are a professional SEO copywriter for BahrainNights.com, the premier cultural discovery platform in Bahrain.

Write a compelling, SEO-optimized venue description. The description should:
- Be 150-200 words
- Highlight the venue's unique atmosphere, amenities, and offerings
- Include natural SEO keywords like "Bahrain", "best ${categoryLabel.toLowerCase()} in Bahrain", location names
- Mention specific features like spa, restaurants, pool, beach access if it's a hotel
- Use enticing language that appeals to visitors and tourists
- Be written in a sophisticated, inviting tone
- NOT include the venue name (it will be shown separately)
- NOT include placeholder text or brackets

Venue Details:
- Name: ${venue.name}
- Type: ${categoryLabel}`;

  if (venue.area) {
    prompt += `\n- Location: ${venue.area}, Bahrain`;
  }

  if (venue.address) {
    prompt += `\n- Address: ${venue.address}`;
  }

  prompt += `\n\nWrite the SEO-optimized description now (just the description text, no headers or formatting):`;

  return prompt;
}

async function generateDescription(venue) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    const prompt = buildVenuePrompt(venue);

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
      return null;
    }

    // Clean up the response
    const cleanedDescription = generatedText
      .replace(/^#+\s*/gm, '')
      .replace(/\*\*/g, '')
      .replace(/\n{3,}/g, '\n\n')
      .trim();

    return cleanedDescription;
  } catch (error) {
    console.error(`  Error generating for ${venue.name}:`, error.message);
    return null;
  }
}

async function rewriteAllDescriptions() {
  console.log('Rewriting venue descriptions with AI...\n');

  if (!process.env.GEMINI_API_KEY) {
    console.error('GEMINI_API_KEY not found in environment variables');
    return;
  }

  const { data: venues, error } = await supabase
    .from('venues')
    .select('id, name, description, category, area, address')
    .order('name');

  if (error) {
    console.error('Error fetching venues:', error);
    return;
  }

  // Filter out test venues
  const realVenues = venues.filter(v => !testVenues.includes(v.name));
  console.log(`Processing ${realVenues.length} real venues...\n`);

  let updated = 0;
  let failed = 0;

  for (let i = 0; i < realVenues.length; i++) {
    const venue = realVenues[i];
    console.log(`[${i + 1}/${realVenues.length}] ${venue.name}...`);

    // Generate new description
    const newDescription = await generateDescription(venue);

    if (newDescription) {
      // Update in database
      const { error: updateError } = await supabase
        .from('venues')
        .update({ description: newDescription })
        .eq('id', venue.id);

      if (updateError) {
        console.log(`  ❌ Database error: ${updateError.message}`);
        failed++;
      } else {
        console.log(`  ✅ Updated (${newDescription.length} chars)`);
        updated++;
      }
    } else {
      console.log(`  ❌ Failed to generate`);
      failed++;
    }

    // Rate limiting - wait 1 second between requests to avoid API limits
    if (i < realVenues.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  console.log('\n========================================');
  console.log(`Updated: ${updated} venues`);
  console.log(`Failed: ${failed} venues`);
  console.log('========================================');
}

rewriteAllDescriptions();
