'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, MapPin, Film, Ticket, ArrowRight } from 'lucide-react';
import { SearchItem, SearchResults as SearchResultsType } from '@/lib/searchData';
import SearchResultCard, { SearchResultCardCompact } from './SearchResultCard';
import { SearchTab } from './SearchFilters';

interface SearchResultsProps {
  results: SearchResultsType;
  activeTab: SearchTab;
  query: string;
  showPreview?: number; // Number of items to show per category in "All" view
}

const sectionConfig: Record<
  string,
  {
    title: string;
    icon: React.ReactNode;
    color: string;
    bgColor: string;
    viewAllLink: string;
  }
> = {
  events: {
    title: 'Events',
    icon: <Calendar className="w-5 h-5" />,
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/20',
    viewAllLink: '/events',
  },
  places: {
    title: 'Places',
    icon: <MapPin className="w-5 h-5" />,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/20',
    viewAllLink: '/places',
  },
  cinema: {
    title: 'Cinema',
    icon: <Film className="w-5 h-5" />,
    color: 'text-red-400',
    bgColor: 'bg-red-500/20',
    viewAllLink: '/cinema',
  },
  offers: {
    title: 'Offers',
    icon: <Ticket className="w-5 h-5" />,
    color: 'text-green-400',
    bgColor: 'bg-green-500/20',
    viewAllLink: '/offers',
  },
};

export default function SearchResults({
  results,
  activeTab,
  query,
  showPreview = 4,
}: SearchResultsProps) {
  // Show all results view with sections
  if (activeTab === 'all') {
    return (
      <div className="space-y-10">
        {/* Events Section */}
        {results.results.events.count > 0 && (
          <ResultSection
            type="events"
            items={results.results.events.items}
            totalCount={results.results.events.count}
            query={query}
            showPreview={showPreview}
          />
        )}

        {/* Places Section */}
        {results.results.places.count > 0 && (
          <ResultSection
            type="places"
            items={results.results.places.items}
            totalCount={results.results.places.count}
            query={query}
            showPreview={showPreview}
          />
        )}

        {/* Cinema Section */}
        {results.results.cinema.count > 0 && (
          <ResultSection
            type="cinema"
            items={results.results.cinema.items}
            totalCount={results.results.cinema.count}
            query={query}
            showPreview={showPreview}
          />
        )}

        {/* Offers Section */}
        {results.results.offers.count > 0 && (
          <ResultSection
            type="offers"
            items={results.results.offers.items}
            totalCount={results.results.offers.count}
            query={query}
            showPreview={showPreview}
          />
        )}
      </div>
    );
  }

  // Show specific category results
  const categoryData = results.results[activeTab as keyof typeof results.results];
  const config = sectionConfig[activeTab];

  if (!categoryData || categoryData.count === 0) {
    return null;
  }

  return (
    <div>
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6">
        <div
          className={`w-10 h-10 ${config.bgColor} rounded-lg flex items-center justify-center ${config.color}`}
        >
          {config.icon}
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">{config.title}</h2>
          <p className="text-gray-400 text-sm">
            {categoryData.count} result{categoryData.count !== 1 ? 's' : ''} found
          </p>
        </div>
      </div>

      {/* Grid of all items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categoryData.items.map((item, index) => (
          <SearchResultCardCompact
            key={item.id}
            item={item}
            query={query}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}

// Section component for grouped "All Results" view
function ResultSection({
  type,
  items,
  totalCount,
  query,
  showPreview,
}: {
  type: string;
  items: SearchItem[];
  totalCount: number;
  query: string;
  showPreview: number;
}) {
  const config = sectionConfig[type];
  const previewItems = items.slice(0, showPreview);
  const hasMore = totalCount > showPreview;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="border-b border-white/10 pb-10 last:border-0"
    >
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 ${config.bgColor} rounded-lg flex items-center justify-center ${config.color}`}
          >
            {config.icon}
          </div>
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              {config.title}
              <span className="text-sm font-normal text-gray-400">
                ({totalCount} result{totalCount !== 1 ? 's' : ''})
              </span>
            </h2>
          </div>
        </div>

        {hasMore && (
          <Link
            href={`/search?q=${encodeURIComponent(query)}&type=${type}`}
            className={`flex items-center gap-1 ${config.color} hover:underline text-sm font-medium`}
          >
            View all {totalCount}
            <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {previewItems.map((item, index) => (
          <SearchResultCard
            key={item.id}
            item={item}
            query={query}
            index={index}
          />
        ))}
      </div>

      {/* View All Button (Mobile) */}
      {hasMore && (
        <Link
          href={`/search?q=${encodeURIComponent(query)}&type=${type}`}
          className="md:hidden mt-4 flex items-center justify-center gap-2 w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white transition-colors"
        >
          View all {totalCount} {config.title.toLowerCase()}
          <ArrowRight className="w-4 h-4" />
        </Link>
      )}
    </motion.section>
  );
}
