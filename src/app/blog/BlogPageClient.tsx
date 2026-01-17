'use client';

import { useState } from 'react';
import { HeroTrailerPlayer } from '@/components/blog/HeroTrailerPlayer';
import { BlogRow } from '@/components/blog/BlogRow';
import { BlogModal } from '@/components/blog/BlogModal';

interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string | null;
  country: string;
  city: string | null;
  category: string;
  read_time_minutes: number;
  view_count: number;
  published_at: string;
}

interface Props {
  bahrain: BlogArticle[];
  uae: BlogArticle[];
  saudi: BlogArticle[];
  qatar: BlogArticle[];
  uk: BlogArticle[];
  trending: BlogArticle[];
  latest: BlogArticle[];
}

export function BlogPageClient({ bahrain, uae, saudi, qatar, uk, trending, latest }: Props) {
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectArticle = (article: BlogArticle) => {
    setSelectedArticle(article);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedArticle(null), 300);
  };

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Full-Screen Hero Trailer */}
      <HeroTrailerPlayer />

      {/* Content Rows */}
      <div className="relative z-10 -mt-20 pb-20">
        {/* Trending */}
        {trending.length > 0 && (
          <BlogRow
            title="Trending Now"
            icon="🔥"
            articles={trending}
            onSelectArticle={handleSelectArticle}
          />
        )}

        {/* Latest */}
        {latest.length > 0 && (
          <BlogRow
            title="Latest Stories"
            icon="✨"
            articles={latest}
            onSelectArticle={handleSelectArticle}
          />
        )}

        {/* Bahrain */}
        {bahrain.length > 0 && (
          <BlogRow
            title="Bahrain"
            icon="🇧🇭"
            articles={bahrain}
            onSelectArticle={handleSelectArticle}
            seeAllLink="/blog/places-to-go/bahrain"
          />
        )}

        {/* UAE */}
        {uae.length > 0 && (
          <BlogRow
            title="UAE"
            icon="🇦🇪"
            articles={uae}
            onSelectArticle={handleSelectArticle}
            seeAllLink="/blog/places-to-go/uae"
          />
        )}

        {/* Saudi Arabia */}
        {saudi.length > 0 && (
          <BlogRow
            title="Saudi Arabia"
            icon="🇸🇦"
            articles={saudi}
            onSelectArticle={handleSelectArticle}
            seeAllLink="/blog/places-to-go/saudi-arabia"
          />
        )}

        {/* Qatar */}
        {qatar.length > 0 && (
          <BlogRow
            title="Qatar"
            icon="🇶🇦"
            articles={qatar}
            onSelectArticle={handleSelectArticle}
            seeAllLink="/blog/places-to-go/qatar"
          />
        )}

        {/* UK */}
        {uk.length > 0 && (
          <BlogRow
            title="United Kingdom"
            icon="🇬🇧"
            articles={uk}
            onSelectArticle={handleSelectArticle}
            seeAllLink="/blog/places-to-go/uk"
          />
        )}

        {/* Empty State */}
        {trending.length === 0 && latest.length === 0 && (
          <div className="text-center py-32 px-4">
            <h2 className="text-4xl font-bold text-white mb-4">Coming Soon</h2>
            <p className="text-gray-400 text-lg max-w-md mx-auto">
              We&apos;re preparing amazing stories about events, culture & nightlife across the region.
            </p>
          </div>
        )}
      </div>

      {/* Modal */}
      <BlogModal
        article={selectedArticle}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
