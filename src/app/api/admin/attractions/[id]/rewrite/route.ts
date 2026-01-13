import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';
import { getAttractionById, updateAttraction } from '@/lib/db/attractions';
import Anthropic from '@anthropic-ai/sdk';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Auth check
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await verifyToken(token);
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const { id } = await params;

    // Get attraction
    const attraction = await getAttractionById(id);
    if (!attraction) {
      return NextResponse.json({ error: 'Attraction not found' }, { status: 404 });
    }

    // Check for Claude API key
    const apiKey = process.env.CLAUDE_API_KEY || process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'AI service not configured' }, { status: 500 });
    }

    // Initialize Claude client
    const anthropic = new Anthropic({ apiKey });

    // Generate improved description
    const prompt = `You are a professional copywriter for a Bahrain tourism and entertainment website called BahrainNights.com.

Rewrite this attraction description to be more engaging, informative, and SEO-friendly. The description should:
- Be 2-3 paragraphs (100-150 words)
- Highlight unique features and experiences
- Include relevant keywords naturally
- Use an inviting, enthusiastic tone
- Not include prices or dates (those change)
- Be suitable for tourists and locals

Attraction Name: ${attraction.name}
Category: ${attraction.category || 'Things to Do'}
Location: ${attraction.area || 'Bahrain'}
Current Description: ${attraction.description || 'No description available'}

Return ONLY the new description text, no introduction or explanation.`;

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 500,
      messages: [{ role: 'user', content: prompt }],
    });

    const newDescription = (message.content[0] as { type: string; text: string }).text?.trim();

    if (!newDescription) {
      return NextResponse.json({ error: 'Failed to generate description' }, { status: 500 });
    }

    // Update the attraction with new description
    await updateAttraction(id, { description: newDescription });

    return NextResponse.json({
      success: true,
      description: newDescription,
    });
  } catch (error) {
    console.error('Rewrite error:', error);
    return NextResponse.json(
      { error: 'Failed to rewrite description', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
