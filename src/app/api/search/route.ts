import { NextRequest, NextResponse } from 'next/server';
import { searchItems } from '@/lib/searchData';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const type = searchParams.get('type') as 'all' | 'events' | 'places' | 'cinema' | 'offers' | undefined;
    const limitParam = searchParams.get('limit');
    const limit = limitParam ? parseInt(limitParam, 10) : undefined;

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

    // Perform search
    const results = searchItems(query, type || 'all', limit);

    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json(
      { error: 'An error occurred while searching' },
      { status: 500 }
    );
  }
}
