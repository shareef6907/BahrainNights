import { NextRequest, NextResponse } from 'next/server';
import { searchAll, type SearchResult } from '@/lib/db/search';

export const dynamic = 'force-dynamic';

export interface InstantSearchSuggestion {
  type: 'event' | 'place' | 'cinema' | 'offer';
  title: string;
  url: string;
  image?: string;
  subtitle?: string;
}

// GET /api/search/instant - Lightweight instant search for dropdown suggestions
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const limitParam = searchParams.get('limit');
    const limit = limitParam ? parseInt(limitParam, 10) : 8;

    // Validate query - need at least 2 characters
    if (!query.trim() || query.trim().length < 2) {
      return NextResponse.json({
        query: '',
        suggestions: [],
      }, { status: 200 });
    }

    // Perform search using database with limited results
    const searchResults = await searchAll(query, { limit: limit + 4 }); // Get a few extra to ensure diversity

    // Convert to lightweight suggestions format grouped by type
    const suggestions: InstantSearchSuggestion[] = [];

    // Group results by type for balanced distribution
    const byType: Record<string, SearchResult[]> = {
      event: [],
      venue: [],
      movie: [],
      offer: [],
    };

    searchResults.forEach(result => {
      if (byType[result.type]) {
        byType[result.type].push(result);
      }
    });

    // Map database types to frontend types
    const typeMapping: Record<string, 'event' | 'place' | 'cinema' | 'offer'> = {
      event: 'event',
      venue: 'place',
      movie: 'cinema',
      offer: 'offer',
    };

    // URL generators for each type
    const getUrl = (result: SearchResult): string => {
      switch (result.type) {
        case 'event':
          return `/events/${result.slug || result.id}`;
        case 'venue':
          return `/places/${result.slug || result.id}`;
        case 'movie':
          return `/cinema/${result.slug || result.id}`;
        case 'offer':
          return `/offers/${result.slug || result.id}`;
        default:
          return '#';
      }
    };

    // Take up to 3 from each type (balanced distribution)
    const maxPerType = Math.max(2, Math.ceil(limit / 4));

    ['event', 'venue', 'movie', 'offer'].forEach(type => {
      byType[type].slice(0, maxPerType).forEach(result => {
        // Generate subtitle based on type
        let subtitle: string | undefined;
        if (result.type === 'event' && result.date) {
          subtitle = result.date;
        } else if (result.category) {
          subtitle = result.category;
        }

        suggestions.push({
          type: typeMapping[type],
          title: result.title,
          url: getUrl(result),
          image: result.image || undefined,
          subtitle,
        });
      });
    });

    // Sort by relevance score if available, then limit
    const sortedSuggestions = suggestions
      .sort((a, b) => {
        // Keep order but interleave types for variety
        return 0;
      })
      .slice(0, limit);

    return NextResponse.json({
      query,
      suggestions: sortedSuggestions,
    }, { status: 200 });

  } catch (error) {
    console.error('Instant search API error:', error);
    return NextResponse.json(
      { error: 'An error occurred while searching', suggestions: [] },
      { status: 500 }
    );
  }
}
