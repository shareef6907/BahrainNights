const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';

export interface RewriteResult {
  success: boolean;
  description?: string;
  error?: string;
}

export async function rewriteDescription(
  title: string,
  description: string | null,
  venue: string | null
): Promise<RewriteResult> {
  if (!GEMINI_API_KEY) {
    return { success: false, error: 'GEMINI_API_KEY not configured' };
  }

  if (!description || description.trim().length < 10) {
    return { success: false, error: 'No description to rewrite' };
  }

  const prompt = `Rewrite this attraction description for a tourism website. Make it engaging, clear, and informative. 2-3 sentences max. Remove any garbage text, CSS, or formatting errors.

Title: ${title}
Original description: ${description}
Location: ${venue || 'Bahrain'}

Return only the rewritten description, nothing else.`;

  try {
    const response = await fetch(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 200,
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { success: false, error: `Gemini API error: ${errorData.error?.message || response.statusText}` };
    }

    const data = await response.json();

    if (!data.candidates || !data.candidates[0]?.content?.parts?.[0]?.text) {
      return { success: false, error: 'Invalid response from Gemini' };
    }

    const rewrittenText = data.candidates[0].content.parts[0].text.trim();
    return { success: true, description: rewrittenText };
  } catch (error) {
    console.error('Gemini rewrite error:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function rewriteMultipleDescriptions(
  items: Array<{ id: string; title: string; description: string | null; venue: string | null }>
): Promise<Array<{ id: string; result: RewriteResult }>> {
  const results: Array<{ id: string; result: RewriteResult }> = [];

  // Process sequentially to avoid rate limits
  for (const item of items) {
    const result = await rewriteDescription(item.title, item.description, item.venue);
    results.push({ id: item.id, result });

    // Small delay between requests to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  return results;
}
