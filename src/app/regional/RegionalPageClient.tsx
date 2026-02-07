'use client';

import { useState } from 'react';
import Link from 'next/link';
import { HeroTrailerPlayer } from '@/components/regional/HeroTrailerPlayer';
import { BlogRow } from '@/components/regional/BlogRow';
import { BlogModal } from '@/components/regional/BlogModal';

interface RegionalItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featured_image: string | null;
  country: string;
  city: string | null;
  category: string;
  event_date: string | null;
  event_end_date: string | null;
  event_venue: string | null;
  affiliate_url: string | null;
  read_time_minutes?: number;
  view_count?: number;
  published_at?: string;
  is_featured?: boolean;
  isEvent?: boolean;
}

interface Props {
  featured: RegionalItem[];
  bahrain: RegionalItem[];
  dubai: RegionalItem[];
  abuDhabi: RegionalItem[];
  riyadh: RegionalItem[];
  jeddah: RegionalItem[];
  saudiOther: RegionalItem[];
  doha: RegionalItem[];
  kuwait: RegionalItem[];
  oman: RegionalItem[];
  egypt: RegionalItem[];
  london: RegionalItem[];
  trending: RegionalItem[];
  latest: RegionalItem[];
  hasContent: boolean;
  totalEvents: number;
}

export function RegionalPageClient({
  featured,
  bahrain,
  dubai,
  abuDhabi,
  riyadh,
  jeddah,
  saudiOther,
  doha,
  kuwait,
  oman,
  egypt,
  london,
  trending,
  latest,
  hasContent,
  totalEvents,
}: Props) {
  const [selectedArticle, setSelectedArticle] = useState<RegionalItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectArticle = (article: RegionalItem) => {
    // For events, redirect to affiliate URL or event page
    if (article.isEvent && article.affiliate_url) {
      window.open(article.affiliate_url, '_blank');
      return;
    }
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

      {/* Stats Bar */}
      <div className="relative z-10 -mt-24 mb-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-sm rounded-2xl p-6 border border-yellow-500/30">
            <div className="flex flex-wrap justify-center gap-8 text-center">
              <div>
                <p className="text-3xl font-black text-yellow-400">{totalEvents}</p>
                <p className="text-sm text-gray-400">Upcoming Events</p>
              </div>
              <div>
                <p className="text-3xl font-black text-yellow-400">10+</p>
                <p className="text-sm text-gray-400">Countries</p>
              </div>
              <div>
                <p className="text-3xl font-black text-yellow-400">
                  {bahrain.length + dubai.length + abuDhabi.length + riyadh.length + jeddah.length + doha.length}
                </p>
                <p className="text-sm text-gray-400">Gulf Events</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Rows */}
      <div className="relative z-10 pb-20">
        {!hasContent ? (
          /* No Content State */
          <div className="text-center py-32 px-4">
            <h2 className="text-4xl font-bold text-white mb-4">Coming Soon</h2>
            <p className="text-gray-400 text-lg max-w-md mx-auto">
              We&apos;re preparing amazing events across the region.
            </p>
          </div>
        ) : (
          <>
            {/* Featured */}
            {featured.length > 0 && (
              <BlogRow
                title="Featured Events"
                icon="⭐"
                articles={featured}
                onSelectArticle={handleSelectArticle}
              />
            )}

            {/* Bahrain - First! */}
            {bahrain.length > 0 && (
              <BlogRow
                title="Bahrain"
                icon="🇧🇭"
                articles={bahrain}
                onSelectArticle={handleSelectArticle}
                seeAllLink="/events"
              />
            )}

            {/* Dubai */}
            {dubai.length > 0 && (
              <BlogRow
                title="Dubai"
                icon="🇦🇪"
                articles={dubai}
                onSelectArticle={handleSelectArticle}
                seeAllLink="/international/uae"
              />
            )}

            {/* Abu Dhabi */}
            {abuDhabi.length > 0 && (
              <BlogRow
                title="Abu Dhabi"
                icon="🇦🇪"
                articles={abuDhabi}
                onSelectArticle={handleSelectArticle}
                seeAllLink="/international/uae"
              />
            )}

            {/* Saudi Arabia - Riyadh */}
            {riyadh.length > 0 && (
              <BlogRow
                title="Riyadh"
                icon="🇸🇦"
                articles={riyadh}
                onSelectArticle={handleSelectArticle}
                seeAllLink="/international/saudi-arabia"
              />
            )}

            {/* Saudi Arabia - Jeddah */}
            {jeddah.length > 0 && (
              <BlogRow
                title="Jeddah"
                icon="🇸🇦"
                articles={jeddah}
                onSelectArticle={handleSelectArticle}
                seeAllLink="/international/saudi-arabia"
              />
            )}

            {/* Saudi Arabia - Other */}
            {saudiOther.length > 0 && (
              <BlogRow
                title="Saudi Arabia"
                icon="🇸🇦"
                articles={saudiOther}
                onSelectArticle={handleSelectArticle}
                seeAllLink="/international/saudi-arabia"
              />
            )}

            {/* Qatar - Doha */}
            {doha.length > 0 && (
              <BlogRow
                title="Qatar"
                icon="🇶🇦"
                articles={doha}
                onSelectArticle={handleSelectArticle}
                seeAllLink="/international/qatar"
              />
            )}

            {/* Kuwait */}
            {kuwait.length > 0 && (
              <BlogRow
                title="Kuwait"
                icon="🇰🇼"
                articles={kuwait}
                onSelectArticle={handleSelectArticle}
                seeAllLink="/international/kuwait"
              />
            )}

            {/* Oman */}
            {oman.length > 0 && (
              <BlogRow
                title="Oman"
                icon="🇴🇲"
                articles={oman}
                onSelectArticle={handleSelectArticle}
                seeAllLink="/international/oman"
              />
            )}

            {/* Egypt */}
            {egypt.length > 0 && (
              <BlogRow
                title="Egypt"
                icon="🇪🇬"
                articles={egypt}
                onSelectArticle={handleSelectArticle}
                seeAllLink="/international/egypt"
              />
            )}

            {/* London / UK */}
            {london.length > 0 && (
              <BlogRow
                title="London"
                icon="🇬🇧"
                articles={london}
                onSelectArticle={handleSelectArticle}
                seeAllLink="/international/uk"
              />
            )}

            {/* Trending */}
            {trending.length > 0 && (
              <BlogRow
                title="Trending"
                icon="🔥"
                articles={trending}
                onSelectArticle={handleSelectArticle}
              />
            )}

            {/* Latest */}
            {latest.length > 0 && (
              <BlogRow
                title="Coming Soon"
                icon="📅"
                articles={latest}
                onSelectArticle={handleSelectArticle}
              />
            )}
          </>
        )}

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto px-4 mt-16">
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl p-8 text-center border border-purple-500/30">
            <h2 className="text-3xl font-bold text-white mb-4">
              Explore All International Events
            </h2>
            <p className="text-gray-400 mb-6">
              Find concerts, festivals, and experiences across the Middle East
            </p>
            <Link
              href="/international"
              className="inline-block px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-full hover:shadow-lg hover:shadow-orange-500/25 transition-all"
            >
              Browse All Events →
            </Link>
          </div>
        </div>
      </div>

      {/* Modal for articles */}
      <BlogModal
        article={selectedArticle}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
