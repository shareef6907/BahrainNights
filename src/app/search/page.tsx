'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Search, Loader2 } from 'lucide-react';
import GlobalSearch from '@/components/search/GlobalSearch';
import SearchFilters, { SearchTab, DateFilter, SortOption } from '@/components/search/SearchFilters';
import SearchResults from '@/components/search/SearchResults';
import NoResults, { EmptyQueryState } from '@/components/search/NoResults';
import { searchItems, SearchResults as SearchResultsType } from '@/lib/searchData';
import { addRecentSearch } from '@/components/search/RecentSearches';

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

  // Perform search
  const performSearch = useCallback((searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults(null);
      return;
    }

    setIsLoading(true);

    // Simulate API delay for realism
    setTimeout(() => {
      const searchResults = searchItems(searchQuery.trim(), activeTab);
      setResults(searchResults);
      setIsLoading(false);
    }, 200);
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
  const handleTabChange = (tab: SearchTab) => {
    setActiveTab(tab);
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}&type=${tab}`, { scroll: false });
      // Re-search with new tab
      setIsLoading(true);
      setTimeout(() => {
        const searchResults = searchItems(query.trim(), tab);
        setResults(searchResults);
        setIsLoading(false);
      }, 100);
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
