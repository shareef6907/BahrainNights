'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Artist, ArtistCategory } from '@/types/database';
import ArtistCard from './ArtistCard';
import BookingRequestForm from './BookingRequestForm';

interface Props {
  artists: Artist[];
  categoryCounts: Record<string, number>;
}

const CATEGORY_LABELS: Record<ArtistCategory | 'all', string> = {
  all: 'All',
  dj: 'DJs',
  vocalist: 'Vocalists',
  instrumentalist: 'Instrumentalists',
  band: 'Bands',
  fire_show: 'Fire Shows',
  performer: 'Performers',
  kids_entertainment: 'Kids Entertainment',
  magician: 'Magicians',
};

const CATEGORIES: (ArtistCategory | 'all')[] = [
  'all',
  'dj',
  'vocalist',
  'instrumentalist',
  'band',
  'fire_show',
  'performer',
  'kids_entertainment',
  'magician',
];

export default function EntertainmentPageClient({ artists, categoryCounts }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<ArtistCategory | 'all'>('all');
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const artistsSectionRef = useRef<HTMLDivElement>(null);

  // Filter artists by category
  const filteredArtists = selectedCategory === 'all'
    ? artists
    : artists.filter(a => a.category === selectedCategory);

  // Scroll to artists section
  const scrollToArtists = () => {
    artistsSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Open booking form
  const openBookingForm = (artistName?: string) => {
    setSelectedArtist(artistName || null);
    setShowBookingForm(true);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Netflix-Style Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover scale-105 transition-transform duration-[20s] ease-linear"
            poster="/images/entertainment-poster.jpg"
          >
            <source src="https://bahrainnights-production.s3.me-south-1.amazonaws.com/processed/artists/header-video.mp4" type="video/mp4" />
          </video>
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/80 via-transparent to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex flex-col justify-end pb-20 px-6 md:px-12 lg:px-20">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 tracking-tight drop-shadow-2xl">
              Book World-Class
              <br />
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Entertainment
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 font-light opacity-0 animate-fade-in-up" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
              Bahrain's Premier Artist Booking Agency
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={scrollToArtists}
                className="px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                Browse Artists
              </button>
              <button
                onClick={() => openBookingForm()}
                className="px-8 py-4 bg-amber-500/90 text-white font-semibold rounded-lg hover:bg-amber-500 transition-all duration-300 shadow-lg hover:shadow-amber-500/30 hover:scale-105 backdrop-blur-sm"
              >
                Request a Booking
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Category Filter Bar */}
      <div ref={artistsSectionRef} className="sticky top-0 z-40 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {CATEGORIES.map((category) => {
              const count = category === 'all' 
                ? artists.length 
                : categoryCounts[category] || 0;
              
              // Don't show categories with 0 artists (except 'all')
              if (category !== 'all' && count === 0) return null;

              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/30'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
                  }`}
                >
                  {CATEGORY_LABELS[category]}
                  {count > 0 && (
                    <span className="ml-2 text-xs opacity-70">({count})</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Artists Grid */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white">
            {selectedCategory === 'all' ? 'All Artists' : CATEGORY_LABELS[selectedCategory]}
          </h2>
          <span className="text-gray-400 text-sm">
            {filteredArtists.length} {filteredArtists.length === 1 ? 'artist' : 'artists'}
          </span>
        </div>

        {filteredArtists.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No artists found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredArtists.map((artist, index) => (
              <ArtistCard
                key={artist.id}
                artist={artist}
                onBook={() => openBookingForm(artist.stage_name)}
                delay={index * 50}
              />
            ))}
          </div>
        )}
      </section>

      {/* Request Booking Section */}
      <section className="bg-gradient-to-b from-[#0a0a0a] to-[#111] py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Book?
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Tell us about your event and we'll match you with the perfect entertainment.
            Our team will get back to you within 24 hours.
          </p>
          <button
            onClick={() => openBookingForm()}
            className="px-10 py-4 bg-amber-500 text-white font-semibold rounded-lg hover:bg-amber-600 transition-all duration-300 shadow-lg hover:shadow-amber-500/30 text-lg"
          >
            Request a Booking
          </button>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="bg-[#111] border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400">
            Are you an artist? <Link href="/artists/join" className="text-amber-500 hover:text-amber-400 font-medium">Join our roster →</Link>
          </p>
          <p className="text-gray-500 text-sm">
            All bookings: <span className="text-white">bookings@bahrainnights.com</span>
          </p>
        </div>
      </section>

      {/* Booking Form Modal */}
      {showBookingForm && (
        <BookingRequestForm
          artists={artists}
          preselectedArtist={selectedArtist}
          onClose={() => setShowBookingForm(false)}
        />
      )}

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
