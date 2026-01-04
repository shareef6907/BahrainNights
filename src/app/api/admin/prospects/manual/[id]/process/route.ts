import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import Anthropic from '@anthropic-ai/sdk';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || process.env.CLAUDE_API_KEY!,
});

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Get the manual entry
    const { data: entry, error: fetchError } = await supabase
      .from('prospect_manual_entries')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError || !entry) {
      return NextResponse.json({ error: 'Entry not found' }, { status: 404 });
    }

    if (entry.processed) {
      return NextResponse.json({ error: 'Entry already processed' }, { status: 400 });
    }

    // Use AI to enrich the entry
    const prompt = `You are a sales intelligence assistant. A user spotted this advertisement in Bahrain.

Company Name: ${entry.company_name}
Source: ${entry.source_type} (${entry.location || 'location not specified'})
Description: ${entry.description || 'None'}
Date Spotted: ${entry.spotted_date}

Research this company and provide:
1. Full company name (correct spelling/formatting)
2. Industry/category
3. Likely website URL
4. Estimated advertising budget based on the source type
5. Relevance for a nightlife/events platform (1-100)
6. Brief company summary
7. Suggested sales approach
8. Likely contact email domain

Respond in JSON format:
{
  "company_name": "string (properly formatted)",
  "industry": "string",
  "website": "string (URL or null)",
  "estimated_budget": "small|medium|large|enterprise",
  "relevance_score": number,
  "summary": "string",
  "suggested_approach": "string",
  "likely_email_domain": "string"
}`;

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 500,
      messages: [{ role: 'user', content: prompt }],
    });

    const content = response.content[0];
    if (content.type !== 'text') {
      return NextResponse.json({ error: 'AI response error' }, { status: 500 });
    }

    // Parse JSON from response
    const jsonMatch = content.text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json({ error: 'Failed to parse AI response' }, { status: 500 });
    }

    const enrichment = JSON.parse(jsonMatch[0]);

    // Create prospect from manual entry
    const { data: newProspect, error: insertError } = await supabase
      .from('prospects')
      .insert({
        company_name: enrichment.company_name || entry.company_name,
        industry: enrichment.industry,
        website: enrichment.website,
        source: entry.source_type,
        ad_content: entry.description,
        estimated_budget: enrichment.estimated_budget,
        relevance_score: enrichment.relevance_score,
        ai_summary: enrichment.summary,
        ai_suggested_approach: enrichment.suggested_approach,
        ai_enriched: true,
        ai_enriched_at: new Date().toISOString(),
        status: 'new',
      })
      .select()
      .single();

    if (insertError) {
      console.error('Error creating prospect:', insertError);
      return NextResponse.json({ error: 'Failed to create prospect' }, { status: 500 });
    }

    // Mark manual entry as processed
    await supabase
      .from('prospect_manual_entries')
      .update({
        processed: true,
        prospect_id: newProspect.id,
      })
      .eq('id', id);

    return NextResponse.json({
      success: true,
      prospect: newProspect,
      enrichment,
    });
  } catch (error) {
    console.error('Process manual entry error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
