import { NextRequest, NextResponse } from 'next/server';
import { searchAll, type SearchResult, type SearchFilters } from '@/lib/db/search';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const type = searchParams.get('type') as 'all' | 'events' | 'places' | 'cinema' | 'offers' | undefined;
    const limitParam = searchParams.get('limit');
    const limit = limitParam ? parseInt(limitParam, 10) : 20;

    // Validate query
    if (!query.trim()) {
      return NextResponse.json(
        {
          query: '',
          totalResults: 0,
          results: {
            events: { count: 0, items: [] },
            places: { count: 0, items: [] },
            cinema: { count: 0, items: [] },
            offers: { count: 0, items: [] },
          },
          suggestions: [],
        },
        { status: 200 }
      );
    }

    // Map type filter to search types
    const filters: SearchFilters = { limit };
    if (type && type !== 'all') {
      const typeMap: Record<string, Array<'venue' | 'event' | 'offer' | 'movie'>> = {
        events: ['event'],
        places: ['venue'],
        cinema: ['movie'],
        offers: ['offer'],
      };
      filters.types = typeMap[type] || ['venue', 'event', 'offer', 'movie'];
    }

    // Perform search using database
    const searchResults = await searchAll(query, filters);

    // Group results by type
    const groupedResults: {
      events: { count: number; items: SearchResult[] };
      places: { count: number; items: SearchResult[] };
      cinema: { count: number; items: SearchResult[] };
      offers: { count: number; items: SearchResult[] };
    } = {
      events: { count: 0, items: [] },
      places: { count: 0, items: [] },
      cinema: { count: 0, items: [] },
      offers: { count: 0, items: [] },
    };

    searchResults.forEach(result => {
      switch (result.type) {
        case 'event':
          groupedResults.events.items.push(result);
          groupedResults.events.count++;
          break;
        case 'venue':
          groupedResults.places.items.push(result);
          groupedResults.places.count++;
          break;
        case 'movie':
          groupedResults.cinema.items.push(result);
          groupedResults.cinema.count++;
          break;
        case 'offer':
          groupedResults.offers.items.push(result);
          groupedResults.offers.count++;
          break;
      }
    });

    const totalResults = searchResults.length;

    return NextResponse.json({
      query,
      totalResults,
      results: groupedResults,
      suggestions: [],
    }, { status: 200 });
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json(
      { error: 'An error occurred while searching' },
      { status: 500 }
    );
  }
}
