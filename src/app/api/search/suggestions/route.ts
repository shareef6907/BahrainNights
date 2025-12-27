import { NextRequest, NextResponse } from 'next/server';
import { getSearchSuggestions, getPopularSearches } from '@/lib/db/search';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const limitParam = searchParams.get('limit');
    const limit = limitParam ? parseInt(limitParam, 10) : 8;

    // Get popular searches for empty/short queries
    const popularSearches = await getPopularSearches(limit);

    // If no query, return popular searches
    if (!query.trim()) {
      return NextResponse.json(
        {
          query: '',
          suggestions: [],
          popularSearches: popularSearches,
        },
        { status: 200 }
      );
    }

    // Minimum 2 characters for suggestions
    if (query.trim().length < 2) {
      return NextResponse.json(
        {
          query: query,
          suggestions: [],
          popularSearches: popularSearches,
        },
        { status: 200 }
      );
    }

    // Get quick suggestions from database
    const suggestions = await getSearchSuggestions(query, limit);

    return NextResponse.json(
      {
        query: query,
        suggestions: suggestions,
        popularSearches: [],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Suggestions API error:', error);
    return NextResponse.json(
      { error: 'An error occurred while fetching suggestions' },
      { status: 500 }
    );
  }
}
