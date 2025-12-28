'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Search, Loader2 } from 'lucide-react';
import GlobalSearch from '@/components/search/GlobalSearch';
import SearchFilters, { SearchTab, DateFilter, SortOption } from '@/components/search/SearchFilters';
import SearchResults from '@/components/search/SearchResults';
import NoResults, { EmptyQueryState } from '@/components/search/NoResults';
import { addRecentSearch } from '@/components/search/RecentSearches';

// API response type
interface SearchResultItem {
  id: string;
  type: 'event' | 'place' | 'cinema' | 'offer';
  title: string;
  slug: string;
  description: string;
  image: string;
  url: string;
  date?: string;
  time?: string;
  venue?: string;
  cuisine?: string;
  priceRange?: string;
  rating?: number;
  area?: string;
  category?: string;
  tags?: string[];
  features?: string[];
}

interface SearchResultsType {
  query: string;
  totalResults: number;
  results: {
    events: { count: number; items: SearchResultItem[] };
    places: { count: number; items: SearchResultItem[] };
    cinema: { count: number; items: SearchResultItem[] };
    offers: { count: number; items: SearchResultItem[] };
  };
  suggestions: string[];
}

function SearchPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialQuery = searchParams?.get('q') || '';
  const initialType = (searchParams?.get('type') as SearchTab) || 'all';

  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<SearchResultsType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<SearchTab>(initialType);
  const [dateFilter, setDateFilter] = useState<DateFilter>('any');
  const [areaFilter, setAreaFilter] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('relevance');

  // Perform search using real API
  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults(null);
      return;
    }

    setIsLoading(true);

    try {
      const params = new URLSearchParams({
        q: searchQuery.trim(),
        type: activeTab,
        limit: '50',
      });

      const response = await fetch(`/api/search?${params.toString()}`);

      if (!response.ok) {
        throw new Error('Search request failed');
      }

      const data = await response.json();

      // Transform API response to match expected format
      const transformedResults: SearchResultsType = {
        query: data.query,
        totalResults: data.totalResults,
        results: {
          events: {
            count: data.results.events.count,
            items: data.results.events.items.map((item: { id: string; title: string; slug?: string; description?: string; image?: string; subtitle?: string; category?: string }) => ({
              id: item.id,
              type: 'event' as const,
              title: item.title,
              slug: item.slug || item.id,
              description: item.description || '',
              image: item.image || '',
              url: `/events/${item.slug || item.id}`,
              venue: item.subtitle,
              category: item.category,
            })),
          },
          places: {
            count: data.results.places.count,
            items: data.results.places.items.map((item: { id: string; title: string; slug?: string; description?: string; image?: string; subtitle?: string; category?: string }) => ({
              id: item.id,
              type: 'place' as const,
              title: item.title,
              slug: item.slug || item.id,
              description: item.description || '',
              image: item.image || '',
              url: `/places/${item.slug || item.id}`,
              area: item.subtitle,
              category: item.category,
            })),
          },
          cinema: {
            count: data.results.cinema.count,
            items: data.results.cinema.items.map((item: { id: string; title: string; slug?: string; description?: string; image?: string; subtitle?: string; category?: string }) => ({
              id: item.id,
              type: 'cinema' as const,
              title: item.title,
              slug: item.slug || item.id,
              description: item.description || '',
              image: item.image || '',
              url: `/cinema/${item.slug || item.id}`,
              category: item.category,
            })),
          },
          offers: {
            count: data.results.offers.count,
            items: data.results.offers.items.map((item: { id: string; title: string; slug?: string; description?: string; image?: string; subtitle?: string; category?: string }) => ({
              id: item.id,
              type: 'offer' as const,
              title: item.title,
              slug: item.slug || item.id,
              description: item.description || '',
              image: item.image || '',
              url: `/offers/${item.slug || item.id}`,
              venue: item.subtitle,
              category: item.category,
            })),
          },
        },
        suggestions: data.suggestions || [],
      };

      setResults(transformedResults);
    } catch (error) {
      console.error('Search error:', error);
      setResults(null);
    } finally {
      setIsLoading(false);
    }
  }, [activeTab]);

  // Initial search on mount or when URL params change
  useEffect(() => {
    if (initialQuery) {
      performSearch(initialQuery);
    }
  }, [initialQuery, performSearch]);

  // Handle search from input
  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    if (newQuery.trim()) {
      addRecentSearch(newQuery.trim());
      router.push(`/search?q=${encodeURIComponent(newQuery.trim())}&type=${activeTab}`, { scroll: false });
      performSearch(newQuery);
    } else {
      router.push('/search', { scroll: false });
      setResults(null);
    }
  };

  // Handle tab change
  const handleTabChange = async (tab: SearchTab) => {
    setActiveTab(tab);
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}&type=${tab}`, { scroll: false });
      // Re-search with new tab using API
      setIsLoading(true);
      try {
        const params = new URLSearchParams({
          q: query.trim(),
          type: tab,
          limit: '50',
        });
        const response = await fetch(`/api/search?${params.toString()}`);
        if (!response.ok) throw new Error('Search failed');
        const data = await response.json();

        const transformedResults: SearchResultsType = {
          query: data.query,
          totalResults: data.totalResults,
          results: {
            events: {
              count: data.results.events.count,
              items: data.results.events.items.map((item: { id: string; title: string; slug?: string; description?: string; image?: string; subtitle?: string; category?: string }) => ({
                id: item.id,
                type: 'event' as const,
                title: item.title,
                slug: item.slug || item.id,
                description: item.description || '',
                image: item.image || '',
                url: `/events/${item.slug || item.id}`,
                venue: item.subtitle,
                category: item.category,
              })),
            },
            places: {
              count: data.results.places.count,
              items: data.results.places.items.map((item: { id: string; title: string; slug?: string; description?: string; image?: string; subtitle?: string; category?: string }) => ({
                id: item.id,
                type: 'place' as const,
                title: item.title,
                slug: item.slug || item.id,
                description: item.description || '',
                image: item.image || '',
                url: `/places/${item.slug || item.id}`,
                area: item.subtitle,
                category: item.category,
              })),
            },
            cinema: {
              count: data.results.cinema.count,
              items: data.results.cinema.items.map((item: { id: string; title: string; slug?: string; description?: string; image?: string; subtitle?: string; category?: string }) => ({
                id: item.id,
                type: 'cinema' as const,
                title: item.title,
                slug: item.slug || item.id,
                description: item.description || '',
                image: item.image || '',
                url: `/cinema/${item.slug || item.id}`,
                category: item.category,
              })),
            },
            offers: {
              count: data.results.offers.count,
              items: data.results.offers.items.map((item: { id: string; title: string; slug?: string; description?: string; image?: string; subtitle?: string; category?: string }) => ({
                id: item.id,
                type: 'offer' as const,
                title: item.title,
                slug: item.slug || item.id,
                description: item.description || '',
                image: item.image || '',
                url: `/offers/${item.slug || item.id}`,
                venue: item.subtitle,
                category: item.category,
              })),
            },
          },
          suggestions: data.suggestions || [],
        };

        setResults(transformedResults);
      } catch (error) {
        console.error('Tab change search error:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Handle popular/recent search selection
  const handleSearchSelect = (selectedQuery: string) => {
    handleSearch(selectedQuery);
  };

  // Calculate counts for tabs
  const getCounts = () => {
    if (!results) {
      return { all: 0, events: 0, places: 0, cinema: 0, offers: 0 };
    }
    return {
      all: results.totalResults,
      events: results.results.events.count,
      places: results.results.places.count,
      cinema: results.results.cinema.count,
      offers: results.results.offers.count,
    };
  };

  const hasQuery = query.trim().length > 0;
  const hasResults = results && results.totalResults > 0;

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <div className="bg-gradient-to-b from-slate-900 to-slate-950 border-b border-white/10">
        <div className="container mx-auto px-4 py-8">
          {/* Search Input */}
          <div className="max-w-3xl mx-auto mb-6">
            <GlobalSearch
              variant="page"
              placeholder="Search events, places, movies, offers..."
              defaultValue={query}
              autoFocus={!hasQuery}
              onSearch={handleSearch}
            />
          </div>

          {/* Results Summary */}
          {hasQuery && results && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-4"
            >
              <p className="text-gray-400">
                Found{' '}
                <span className="text-white font-semibold">
                  {results.totalResults}
                </span>{' '}
                result{results.totalResults !== 1 ? 's' : ''} for{' '}
                <span className="text-yellow-400">&quot;{query}&quot;</span>
              </p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Empty State - No Query */}
        {!hasQuery && (
          <EmptyQueryState onSearchSelect={handleSearchSelect} />
        )}

        {/* Loading State */}
        {hasQuery && isLoading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-10 h-10 text-yellow-500 animate-spin mb-4" />
            <p className="text-gray-400">Searching...</p>
          </div>
        )}

        {/* Results */}
        {hasQuery && !isLoading && (
          <>
            {/* Filters */}
            {hasResults && (
              <div className="mb-8">
                <SearchFilters
                  activeTab={activeTab}
                  onTabChange={handleTabChange}
                  counts={getCounts()}
                  dateFilter={dateFilter}
                  onDateFilterChange={setDateFilter}
                  areaFilter={areaFilter}
                  onAreaFilterChange={setAreaFilter}
                  sortBy={sortBy}
                  onSortChange={setSortBy}
                />
              </div>
            )}

            {/* Results Grid */}
            {hasResults ? (
              <SearchResults
                results={results}
                activeTab={activeTab}
                query={query}
              />
            ) : (
              <NoResults query={query} onSearchSelect={handleSearchSelect} />
            )}
          </>
        )}
      </div>
    </div>
  );
}

// Loading fallback
function SearchLoading() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="flex flex-col items-center">
        <Search className="w-12 h-12 text-gray-600 mb-4" />
        <p className="text-gray-400">Loading search...</p>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchLoading />}>
      <SearchPageContent />
    </Suspense>
  );
}
