'use client';

import { useState, useEffect, useCallback } from 'react';
import { X, Calendar, Clock, Eye, Play, Share2, ArrowRight, MapPin, Ticket } from 'lucide-react';
import Link from 'next/link';

interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content?: string; // Now optional - fetched on-demand
  featured_image: string | null;
  country: string;
  city: string | null;
  category: string;
  read_time_minutes: number;
  view_count: number;
  published_at: string;
  event_date?: string | null;
  event_end_date?: string | null;
  event_venue?: string | null;
  affiliate_url?: string | null;
}

// Helper function to format event dates nicely
function formatEventDate(startDate: string, endDate?: string | null): string {
  const start = new Date(startDate);
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  };

  const startStr = start.toLocaleDateString('en-US', options);

  if (endDate) {
    const end = new Date(endDate);
    // If same day, just show one date
    if (start.toDateString() === end.toDateString()) {
      return startStr;
    }
    // If different days, show range
    const endStr = end.toLocaleDateString('en-US', options);
    return `${startStr} - ${endStr}`;
  }

  return startStr;
}

interface BlogModalProps {
  article: BlogArticle | null;
  isOpen: boolean;
  onClose: () => void;
}

export function BlogModal({ article, isOpen, onClose }: BlogModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [fullContent, setFullContent] = useState<string | null>(null);
  const [loadingContent, setLoadingContent] = useState(false);

  // Fetch full content on-demand when modal opens
  useEffect(() => {
    if (isOpen && article?.id) {
      // If content is already available (passed in), use it
      if (article.content) {
        setFullContent(article.content);
      } else {
        // Otherwise fetch it
        setLoadingContent(true);
        fetch(`/api/blog/${article.id}`)
          .then(res => res.json())
          .then(data => {
            setFullContent(data.content || null);
          })
          .catch(() => {
            setFullContent(null);
          })
          .finally(() => {
            setLoadingContent(false);
          });
      }
    }
  }, [isOpen, article?.id, article?.content]);

  // Reset content when modal closes
  useEffect(() => {
    if (!isOpen) {
      setFullContent(null);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      // Small delay for smooth animation
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimating(true);
        });
      });
      document.body.style.overflow = 'hidden';

      // Track view
      if (article?.id) {
        fetch(`/api/blog/${article.id}/view`, { method: 'POST' }).catch(() => {});
      }
    } else {
      setIsAnimating(false);
      document.body.style.overflow = 'unset';
      setTimeout(() => setIsVisible(false), 400);
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen, article?.id]);

  const handleEsc = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [handleEsc]);

  const handleShare = async () => {
    const url = `${window.location.origin}/blog/${article?.slug}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: article?.title, url });
      } catch {
        // User cancelled or error
      }
    } else {
      navigator.clipboard.writeText(url);
      alert('Link copied!');
    }
  };

  const countryFlags: Record<string, string> = {
    'bahrain': '🇧🇭',
    'uae': '🇦🇪',
    'saudi-arabia': '🇸🇦',
    'qatar': '🇶🇦',
    'uk': '🇬🇧',
  };

  const countryNames: Record<string, string> = {
    'bahrain': 'Bahrain',
    'uae': 'UAE',
    'saudi-arabia': 'Saudi Arabia',
    'qatar': 'Qatar',
    'uk': 'United Kingdom',
  };

  if (!isVisible || !article) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-start justify-center pt-10 md:pt-20 px-4 transition-all duration-500 ease-out ${
        isAnimating ? 'bg-black/90 backdrop-blur-md' : 'bg-transparent pointer-events-none'
      }`}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className={`relative w-full max-w-4xl max-h-[90vh] bg-gradient-to-b from-gray-900 to-gray-950 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10 transition-all duration-500 ease-out transform ${
          isAnimating ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-8'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-black/70 hover:bg-black p-2 rounded-full transition-colors"
          aria-label="Close modal"
        >
          <X size={24} className="text-white" />
        </button>

        <div className="overflow-y-auto max-h-[90vh]">
          {/* Hero Image */}
          <div className="relative aspect-video">
            {article.featured_image ? (
              <img
                src={article.featured_image}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-yellow-500/20 to-pink-500/20" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />

            {/* Category Badge */}
            {article.category && (
              <span className="absolute top-4 left-4 bg-yellow-500 text-black px-3 py-1 rounded text-sm font-bold">
                {article.category}
              </span>
            )}
          </div>

          {/* Content */}
          <div className="px-6 md:px-10 pb-10 -mt-20 relative z-10">
            <h1 className="text-2xl md:text-4xl font-bold text-white mb-4">
              {article.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-4">
              <span className="flex items-center gap-1">
                {countryFlags[article.country] || '📍'} {article.city || countryNames[article.country] || article.country}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={14} />
                {article.read_time_minutes} min read
              </span>
              <span className="flex items-center gap-1">
                <Eye size={14} />
                {article.view_count || 0} views
              </span>
            </div>

            {/* Event Info Banner - Shows event date prominently */}
            {article.event_date && (
              <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <p className="text-yellow-500 text-sm font-medium mb-1">📅 Event Date</p>
                    <p className="text-white text-xl font-bold">
                      {formatEventDate(article.event_date, article.event_end_date)}
                    </p>
                    {article.event_venue && (
                      <p className="text-gray-400 text-sm mt-1 flex items-center gap-1">
                        <MapPin size={14} />
                        {article.event_venue}{article.city ? `, ${article.city}` : ''}
                      </p>
                    )}
                  </div>

                  {article.affiliate_url && (
                    <a
                      href={article.affiliate_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold px-6 py-3 rounded-full hover:opacity-90 transition-opacity flex items-center gap-2 hover:scale-105 duration-300"
                    >
                      <Ticket size={18} />
                      Get Tickets
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mb-8">
              {/* Primary CTA - Always visible */}
              <Link
                href={`/blog/${article.slug}`}
                className="group flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold px-6 py-3 rounded-full hover:from-yellow-400 hover:to-orange-400 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/25"
              >
                <Play size={18} className="fill-current" />
                Read Full Story
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <button
                onClick={handleShare}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-5 py-3 rounded-full transition-all duration-300 hover:scale-105 backdrop-blur-sm"
              >
                <Share2 size={18} />
                Share
              </button>
            </div>

            {/* Divider */}
            <div className="h-px bg-gray-800 mb-8" />

            {/* Excerpt */}
            <p className="text-lg text-gray-300 mb-6">{article.excerpt}</p>

            {/* Content */}
            {loadingContent ? (
              <div className="space-y-4 animate-pulse">
                <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                <div className="h-4 bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-700 rounded w-5/6"></div>
                <div className="h-4 bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-700 rounded w-2/3"></div>
              </div>
            ) : fullContent ? (
              <div
                className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-p:text-gray-300 prose-a:text-yellow-500"
                dangerouslySetInnerHTML={{ __html: fullContent }}
              />
            ) : null}

            {/* Bottom CTA - Always visible */}
            <div className="mt-10 p-6 bg-gradient-to-r from-yellow-500/10 via-orange-500/10 to-pink-500/10 border border-yellow-500/20 rounded-2xl text-center">
              <h3 className="text-xl font-bold text-white mb-2">Want to know more?</h3>
              <p className="text-gray-400 mb-4">Read the full article for all the details</p>
              <Link
                href={`/blog/${article.slug}`}
                className="group inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold px-8 py-3 rounded-full hover:from-yellow-400 hover:to-orange-400 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/25"
              >
                <Play size={18} className="fill-current" />
                Read Full Story
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
