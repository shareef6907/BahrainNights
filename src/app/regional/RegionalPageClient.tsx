'use client';

import { useState } from 'react';
import Link from 'next/link';
import RegionalTrailerHero from '@/components/regional/RegionalTrailerHero';
import { BlogRow } from '@/components/regional/BlogRow';
import { BlogModal } from '@/components/regional/BlogModal';
import { EventModal } from '@/components/regional/EventModal';

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

interface RegionalTrailerFilm {
  id: string;
  title: string;
  synopsis?: string;
  genre?: string[];
  trailer_key?: string;
  poster_url?: string;
  backdrop_url?: string;
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
  localEvents: number;
  gccUkEvents: number;
  uniqueCountries: string[];
  /** Trailer films for the header hero, resolved on the server. */
  trailerFilms?: RegionalTrailerFilm[];
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
  localEvents,
  gccUkEvents,
  uniqueCountries,
  trailerFilms = [],
}: Props) {
  // State for blog article modal
  const [selectedArticle, setSelectedArticle] = useState<RegionalItem | null>(null);
  const [isArticleModalOpen, setIsArticleModalOpen] = useState(false);

  // State for event modal
  const [selectedEvent, setSelectedEvent] = useState<RegionalItem | null>(null);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);

  const handleSelectItem = (item: RegionalItem) => {
    if (item.isEvent) {
      // For events, open the event modal
      setSelectedEvent(item);
      setIsEventModalOpen(true);
    } else {
      // For blog articles, open the blog modal
      setSelectedArticle(item);
      setIsArticleModalOpen(true);
    }
  };

  const handleCloseArticleModal = () => {
    setIsArticleModalOpen(false);
    setTimeout(() => setSelectedArticle(null), 300);
  };

  const handleCloseEventModal = () => {
    setIsEventModalOpen(false);
    setTimeout(() => setSelectedEvent(null), 300);
  };

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Full-Screen Hero Trailer */}
      <RegionalTrailerHero movies={trailerFilms} />

      {/* Stats Bar - matches homepage pattern */}
      <div className="relative z-10 -mt-24 mb-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-sm rounded-2xl p-6 border border-yellow-500/30">
            {/*
             * THE STATS BAR.

             * Each number gets a FIXED WIDTH, and the row does not wrap.

             * WHY. This bar was the source of the /regional layout shift,
             * and the reason is the FONT, not the rail:

               t=1377ms  display=block  w=396 h=188  1 stylesheet
               t=2292ms  display=flex   w=330 h=144  2 stylesheets, fonts=loading
               t=3071ms  display=flex   w=330 h=56   fonts=loading -> Inter

             * The three numbers are `font-black` (Inter 900). The fallback
             * font's digits are wider than Inter's - "494" measured 121px
             * in the fallback and 116px in Inter - so when the webfont
             * arrived the flex row re-flowed, "11" jumped from the second
             * row to the first, and the bar's height fell from 144px to
             * 56px.

             * A bar that is 88px shorter moves EVERY section below it up by
             * 88px. Every BlogRow rail below it moved, and Chrome counted
             * each rail item as a shift - which is where the 0.881 came
             * from, on nodes at `left: 1032` that are off-screen in a
             * 412px viewport but inside a horizontal scroller, so Chrome
             * counts them.

             * A fixed width per number means the row's geometry does not
             * depend on the font at all: the widest number is 494 and the
             * block is sized for a four-digit number, so the fallback and
             * Inter produce the SAME box.
             */}
            <div className="flex flex-nowrap justify-center gap-6 sm:gap-8 text-center">
              <div className="w-24 sm:w-28 shrink-0">
                <p className="text-3xl font-black text-yellow-400 tabular-nums">{localEvents}</p>
                <p className="text-sm text-gray-400">Local Events</p>
              </div>
              <div className="w-24 sm:w-28 shrink-0">
                <p className="text-3xl font-black text-yellow-400 tabular-nums">{gccUkEvents}</p>
                <p className="text-sm text-gray-400">GCC + UK Events</p>
              </div>
              <div className="w-24 sm:w-28 shrink-0">
                <p className="text-3xl font-black text-yellow-400 tabular-nums">{uniqueCountries.length}</p>
                <p className="text-sm text-gray-400">Countries</p>
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
                onSelectArticle={handleSelectItem}
              />
            )}

            {/* Bahrain - First! */}
            {bahrain.length > 0 && (
              <BlogRow
                title="Bahrain"
                icon="🇧🇭"
                articles={bahrain}
                onSelectArticle={handleSelectItem}
                seeAllLink="/events"
              />
            )}

            {/* Dubai */}
            {dubai.length > 0 && (
              <BlogRow
                title="Dubai"
                icon="🇦🇪"
                articles={dubai}
                onSelectArticle={handleSelectItem}
                seeAllLink="/international/uae"
              />
            )}

            {/* Abu Dhabi */}
            {abuDhabi.length > 0 && (
              <BlogRow
                title="Abu Dhabi"
                icon="🇦🇪"
                articles={abuDhabi}
                onSelectArticle={handleSelectItem}
                seeAllLink="/international/uae"
              />
            )}

            {/* Saudi Arabia - Riyadh */}
            {riyadh.length > 0 && (
              <BlogRow
                title="Riyadh"
                icon="🇸🇦"
                articles={riyadh}
                onSelectArticle={handleSelectItem}
                seeAllLink="/international"
              />
            )}

            {/* Saudi Arabia - Jeddah */}
            {jeddah.length > 0 && (
              <BlogRow
                title="Jeddah"
                icon="🇸🇦"
                articles={jeddah}
                onSelectArticle={handleSelectItem}
                seeAllLink="/international"
              />
            )}

            {/* Saudi Arabia - Other */}
            {saudiOther.length > 0 && (
              <BlogRow
                title="Saudi Arabia"
                icon="🇸🇦"
                articles={saudiOther}
                onSelectArticle={handleSelectItem}
                seeAllLink="/international"
              />
            )}

            {/* Qatar - Doha */}
            {doha.length > 0 && (
              <BlogRow
                title="Qatar"
                icon="🇶🇦"
                articles={doha}
                onSelectArticle={handleSelectItem}
                seeAllLink="/international/qatar"
              />
            )}

            {/* Kuwait */}
            {kuwait.length > 0 && (
              <BlogRow
                title="Kuwait"
                icon="🇰🇼"
                articles={kuwait}
                onSelectArticle={handleSelectItem}
                seeAllLink="/international/kuwait"
              />
            )}

            {/* Oman */}
            {oman.length > 0 && (
              <BlogRow
                title="Oman"
                icon="🇴🇲"
                articles={oman}
                onSelectArticle={handleSelectItem}
                seeAllLink="/international/oman"
              />
            )}

            {/* Egypt */}
            {egypt.length > 0 && (
              <BlogRow
                title="Egypt"
                icon="🇪🇬"
                articles={egypt}
                onSelectArticle={handleSelectItem}
                seeAllLink="/international/egypt"
              />
            )}

            {/* London / UK */}
            {london.length > 0 && (
              <BlogRow
                title="London"
                icon="🇬🇧"
                articles={london}
                onSelectArticle={handleSelectItem}
                seeAllLink="/international/uk"
              />
            )}

            {/* Trending */}
            {trending.length > 0 && (
              <BlogRow
                title="Trending"
                icon="🔥"
                articles={trending}
                onSelectArticle={handleSelectItem}
              />
            )}

            {/* Latest */}
            {latest.length > 0 && (
              <BlogRow
                title="Coming Soon"
                icon="📅"
                articles={latest}
                onSelectArticle={handleSelectItem}
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

      {/* Modal for blog articles */}
      <BlogModal
        article={selectedArticle}
        isOpen={isArticleModalOpen}
        onClose={handleCloseArticleModal}
      />

      {/* Modal for events */}
      <EventModal
        event={selectedEvent}
        isOpen={isEventModalOpen}
        onClose={handleCloseEventModal}
      />
    </div>
  );
}
