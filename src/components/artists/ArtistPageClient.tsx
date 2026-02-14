'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Artist, ArtistCategory } from '@/types/database';
import ArtistCard from './ArtistCard';
import BookingRequestForm from './BookingRequestForm';

interface Props {
  artist: Artist;
  relatedArtists: Artist[];
}

const CATEGORY_LABELS: Record<ArtistCategory, string> = {
  dj: 'DJ',
  vocalist: 'Vocalist',
  instrumentalist: 'Instrumentalist',
  band: 'Live Band',
  fire_show: 'Fire Show',
  performer: 'Performer',
  kids_entertainment: 'Kids Entertainment',
  magician: 'Magician',
};

const CATEGORY_COLORS: Record<ArtistCategory, string> = {
  dj: 'bg-purple-500',
  vocalist: 'bg-pink-500',
  instrumentalist: 'bg-blue-500',
  band: 'bg-indigo-500',
  fire_show: 'bg-orange-500',
  performer: 'bg-teal-500',
  kids_entertainment: 'bg-green-500',
  magician: 'bg-violet-500',
};

export default function ArtistPageClient({ artist, relatedArtists }: Props) {
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const displayCategory = artist.subcategory 
    ? artist.subcategory.charAt(0).toUpperCase() + artist.subcategory.slice(1).replace('_', ' ')
    : CATEGORY_LABELS[artist.category];

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Hero Section - Mobile Optimized */}
      <section className="relative">
        {/* Background gradient only - no blurred image on mobile for clarity */}
        <div className="absolute inset-0 h-[50vh] md:h-[60vh] bg-gradient-to-b from-amber-900/20 via-[#0a0a0a] to-[#0a0a0a]">
          {/* Desktop: show blurred background */}
          {artist.profile_image && (
            <div className="hidden md:block absolute inset-0">
              <Image
                src={artist.profile_image}
                alt=""
                fill
                className="object-cover opacity-20 blur-md"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/60 via-[#0a0a0a]/90 to-[#0a0a0a]" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 pt-16 md:pt-20 pb-8 md:pb-12">
          {/* Back Link */}
          <Link 
            href="/artists" 
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6 md:mb-8"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Artists
          </Link>

          {/* Mobile: Stack layout with image first, centered */}
          {/* Desktop: Side by side */}
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-12 items-center lg:items-start">
            
            {/* Artist Image - Full width on mobile, visible and prominent */}
            <div className="w-full max-w-sm lg:max-w-md mx-auto lg:mx-0">
              <div className="relative aspect-square md:aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
                {artist.profile_image ? (
                  <Image
                    src={artist.profile_image}
                    alt={artist.stage_name}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                    <span className="text-8xl md:text-9xl opacity-50">🎭</span>
                  </div>
                )}
                
                {/* Featured Badge */}
                {artist.is_featured && (
                  <div className="absolute top-3 left-3 md:top-4 md:left-4 px-3 py-1 md:px-4 md:py-1.5 bg-amber-500 text-white text-xs md:text-sm font-semibold rounded-full shadow-lg">
                    ⭐ Featured
                  </div>
                )}
              </div>
            </div>

            {/* Artist Info - Below image on mobile */}
            <div className="w-full text-center lg:text-left">
              {/* Category Badge */}
              <span className={`inline-block px-4 py-1.5 ${CATEGORY_COLORS[artist.category]} text-white text-sm font-medium rounded-full mb-3 md:mb-4`}>
                {displayCategory}
              </span>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-4">
                {artist.stage_name}
              </h1>

              {/* Short description or fallback */}
              <p className="text-lg md:text-xl text-gray-300 mb-4 md:mb-6">
                {artist.short_description || `Professional ${displayCategory.toLowerCase()} available for events in Bahrain`}
              </p>

              {/* Full bio - always show something */}
              <div className="prose prose-invert prose-base md:prose-lg max-w-none mb-6 md:mb-8 text-left">
                <p className="text-gray-400 whitespace-pre-wrap">
                  {artist.bio || `${artist.stage_name} is a talented ${displayCategory.toLowerCase()} bringing world-class entertainment to Bahrain. Perfect for private parties, corporate events, weddings, and special occasions. Contact us to check availability and rates.`}
                </p>
              </div>

              {/* Instagram Link */}
              {artist.instagram_handle && (
                <a
                  href={`https://instagram.com/${artist.instagram_handle.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-pink-400 hover:text-pink-300 transition-colors mb-6 md:mb-8 justify-center lg:justify-start"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  @{artist.instagram_handle.replace('@', '')}
                </a>
              )}

              {/* Book Button - Full width on mobile */}
              <button
                onClick={() => setShowBookingForm(true)}
                className="w-full lg:w-auto px-10 py-4 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-amber-500/30 text-lg"
              >
                Book This Artist
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Video Reel */}
      {artist.video_url && (
        <section className="max-w-4xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold text-white mb-6">Performance Reel</h2>
          <div className="relative aspect-video rounded-xl overflow-hidden bg-black">
            <iframe
              src={getEmbedUrl(artist.video_url)}
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </section>
      )}

      {/* Photo Gallery */}
      {artist.gallery_images && artist.gallery_images.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold text-white mb-6">Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {artist.gallery_images.map((image, index) => (
              <button
                key={index}
                onClick={() => setLightboxImage(image)}
                className="relative aspect-square rounded-lg overflow-hidden group"
              >
                <Image
                  src={image}
                  alt={`${artist.stage_name} - Photo ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                  <svg className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Related Artists */}
      {relatedArtists.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-12 border-t border-white/10">
          <h2 className="text-2xl font-bold text-white mb-6">More {CATEGORY_LABELS[artist.category]}s</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedArtists.map((related, index) => (
              <ArtistCard 
                key={related.id} 
                artist={related}
                delay={index * 100}
              />
            ))}
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="bg-gradient-to-b from-[#0a0a0a] to-[#111] py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to book {artist.stage_name}?
          </h2>
          <p className="text-gray-400 mb-8">
            Our team will help you arrange everything for your event.
          </p>
          <button
            onClick={() => setShowBookingForm(true)}
            className="px-10 py-4 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg transition-colors text-lg"
          >
            Request Booking
          </button>
        </div>
      </section>

      {/* Booking Form Modal */}
      {showBookingForm && (
        <BookingRequestForm
          artists={[artist]}
          preselectedArtist={artist.stage_name}
          onClose={() => setShowBookingForm(false)}
        />
      )}

      {/* Lightbox */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <button
            className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center text-white hover:bg-white/10 rounded-full transition-colors"
            onClick={() => setLightboxImage(null)}
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="relative max-w-5xl max-h-[90vh] w-full h-full">
            <Image
              src={lightboxImage}
              alt={artist.stage_name}
              fill
              className="object-contain"
              onClick={e => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
}

// Helper to convert video URLs to embed URLs
function getEmbedUrl(url: string): string {
  // YouTube
  const youtubeMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/);
  if (youtubeMatch) {
    return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
  }

  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  }

  // Return as-is if already an embed URL or unknown format
  return url;
}
