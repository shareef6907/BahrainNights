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
  featured_image: string | null;
  country: string;
  city: string | null;
  category: string;
  read_time_minutes: number;
  view_count: number;
  published_at: string;
  is_featured?: boolean;
  event_date?: string | null;
  event_end_date?: string | null;
  event_venue?: string | null;
  affiliate_url?: string | null;
}

interface Props {
  featured: BlogArticle[];
  bahrain: BlogArticle[];
  dubai: BlogArticle[];
  abuDhabi: BlogArticle[];
  riyadh: BlogArticle[];
  jeddah: BlogArticle[];
  doha: BlogArticle[];
  london: BlogArticle[];
  trending: BlogArticle[];
  latest: BlogArticle[];
}

export function BlogPageClient({
  featured,
  bahrain,
  dubai,
  abuDhabi,
  riyadh,
  jeddah,
  doha,
  london,
  trending,
  latest,
}: Props) {
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

  const hasArticles = trending.length > 0 || latest.length > 0;

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Full-Screen Hero Trailer */}
      <HeroTrailerPlayer />

      {/* Content Rows */}
      <div className="relative z-10 -mt-20 pb-20">
        {!hasArticles ? (
          /* No Articles State */
          <div className="text-center py-32 px-4">
            <h2 className="text-4xl font-bold text-white mb-4">Coming Soon</h2>
            <p className="text-gray-400 text-lg max-w-md mx-auto">
              We&apos;re preparing amazing stories about events, culture & nightlife across the region.
            </p>
          </div>
        ) : (
          <>
            {/* Featured Stories */}
            {featured.length > 0 && (
              <BlogRow
                title="Featured Stories"
                icon="⭐"
                articles={featured}
                onSelectArticle={handleSelectArticle}
              />
            )}

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

            {/* Dubai */}
            {dubai.length > 0 && (
              <BlogRow
                title="Dubai"
                icon="🇦🇪"
                articles={dubai}
                onSelectArticle={handleSelectArticle}
                seeAllLink="/blog/places-to-go/uae"
              />
            )}

            {/* Abu Dhabi */}
            {abuDhabi.length > 0 && (
              <BlogRow
                title="Abu Dhabi"
                icon="🇦🇪"
                articles={abuDhabi}
                onSelectArticle={handleSelectArticle}
                seeAllLink="/blog/places-to-go/uae"
              />
            )}

            {/* Riyadh */}
            {riyadh.length > 0 && (
              <BlogRow
                title="Riyadh"
                icon="🇸🇦"
                articles={riyadh}
                onSelectArticle={handleSelectArticle}
                seeAllLink="/blog/places-to-go/saudi-arabia"
              />
            )}

            {/* Jeddah */}
            {jeddah.length > 0 && (
              <BlogRow
                title="Jeddah"
                icon="🇸🇦"
                articles={jeddah}
                onSelectArticle={handleSelectArticle}
                seeAllLink="/blog/places-to-go/saudi-arabia"
              />
            )}

            {/* Doha */}
            {doha.length > 0 && (
              <BlogRow
                title="Doha"
                icon="🇶🇦"
                articles={doha}
                onSelectArticle={handleSelectArticle}
                seeAllLink="/blog/places-to-go/qatar"
              />
            )}

            {/* London */}
            {london.length > 0 && (
              <BlogRow
                title="London"
                icon="🇬🇧"
                articles={london}
                onSelectArticle={handleSelectArticle}
                seeAllLink="/blog/places-to-go/uk"
              />
            )}
          </>
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
