import Anthropic from '@anthropic-ai/sdk';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Lazy initialization to avoid errors at module load time
let supabase: SupabaseClient | null = null;
let anthropic: Anthropic | null = null;

function getSupabase(): SupabaseClient {
  if (!supabase) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!url || !key) {
      throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables');
    }

    supabase = createClient(url, key);
  }
  return supabase;
}

function getAnthropic(): Anthropic {
  if (!anthropic) {
    const apiKey = process.env.ANTHROPIC_API_KEY || process.env.CLAUDE_API_KEY;

    if (!apiKey) {
      throw new Error('Missing ANTHROPIC_API_KEY or CLAUDE_API_KEY environment variable');
    }

    anthropic = new Anthropic({ apiKey });
  }
  return anthropic;
}

export async function enrichProspectsWithAI(): Promise<void> {
  // Get prospects that haven't been AI enriched yet
  const { data: prospects } = await getSupabase()
    .from('prospects')
    .select('*')
    .eq('ai_enriched', false)
    .limit(20); // Process 20 at a time

  if (!prospects || prospects.length === 0) {
    console.log('No prospects to enrich');
    return;
  }

  for (const prospect of prospects) {
    try {
      const prompt = `You are a sales intelligence assistant for BahrainNights, a platform that connects visitors with events, dining, and nightlife in Bahrain.

Analyze this advertising prospect and provide:
1. Company industry/category
2. Estimated advertising budget (small/medium/large/enterprise)
3. Relevance score for BahrainNights sponsorship (1-100)
4. Brief summary of the company
5. Suggested approach for sales outreach
6. Likely contact email pattern (e.g., info@, marketing@, firstname@)

Company Name: ${prospect.company_name}
Website: ${prospect.website || 'Unknown'}
Found on: ${prospect.source}
Ad Content: ${prospect.ad_content || 'None'}

Respond in JSON format:
{
  "industry": "string",
  "estimated_budget": "small|medium|large|enterprise",
  "relevance_score": number,
  "summary": "string (2-3 sentences)",
  "suggested_approach": "string (1-2 sentences)",
  "likely_email_pattern": "string",
  "contact_title_to_target": "string (e.g., Marketing Manager)"
}`;

      const response = await getAnthropic().messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 500,
        messages: [{ role: 'user', content: prompt }],
      });

      const content = response.content[0];
      if (content.type === 'text') {
        // Parse JSON from response
        const jsonMatch = content.text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const enrichment = JSON.parse(jsonMatch[0]);

          // Update prospect with AI enrichment
          await getSupabase()
            .from('prospects')
            .update({
              industry: enrichment.industry,
              estimated_budget: enrichment.estimated_budget,
              relevance_score: enrichment.relevance_score,
              ai_summary: enrichment.summary,
              ai_suggested_approach: enrichment.suggested_approach,
              contact_title: enrichment.contact_title_to_target,
              ai_enriched: true,
              ai_enriched_at: new Date().toISOString(),
            })
            .eq('id', prospect.id);

          console.log(`✅ Enriched: ${prospect.company_name}`);
        }
      }

      // Rate limit
      await new Promise(resolve => setTimeout(resolve, 1000));

    } catch (error) {
      console.error(`Failed to enrich ${prospect.company_name}:`, error);
    }
  }
}

// Enrich manual entries
export async function enrichManualEntry(entryId: string): Promise<void> {
  const { data: entry } = await getSupabase()
    .from('prospect_manual_entries')
    .select('*')
    .eq('id', entryId)
    .single();

  if (!entry) return;

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

  try {
    const response = await getAnthropic().messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 500,
      messages: [{ role: 'user', content: prompt }],
    });

    const content = response.content[0];
    if (content.type === 'text') {
      const jsonMatch = content.text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const enrichment = JSON.parse(jsonMatch[0]);

        // Create prospect from manual entry
        const { data: newProspect } = await getSupabase()
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
          })
          .select()
          .single();

        // Mark manual entry as processed
        if (newProspect) {
          await getSupabase()
            .from('prospect_manual_entries')
            .update({
              processed: true,
              prospect_id: newProspect.id,
            })
            .eq('id', entryId);
        }
      }
    }
  } catch (error) {
    console.error('Manual entry enrichment failed:', error);
  }
}
