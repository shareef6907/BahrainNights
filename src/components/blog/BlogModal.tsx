'use client';

import { useState, useEffect } from 'react';
import { X, Calendar, Clock, Eye, Ticket, Share2, ExternalLink } from 'lucide-react';
import Link from 'next/link';

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
  affiliate_url?: string | null;
}

interface BlogModalProps {
  article: BlogArticle | null;
  isOpen: boolean;
  onClose: () => void;
}

export function BlogModal({ article, isOpen, onClose }: BlogModalProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';

      // Track view
      if (article?.id) {
        fetch(`/api/blog/${article.id}/view`, { method: 'POST' }).catch(() => {});
      }
    } else {
      document.body.style.overflow = 'unset';
      setTimeout(() => setIsVisible(false), 300);
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen, article?.id]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

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
      className={`fixed inset-0 z-[100] flex items-start justify-center pt-10 md:pt-20 px-4 transition-all duration-300 ${
        isOpen ? 'bg-black/90 backdrop-blur-sm' : 'bg-transparent pointer-events-none'
      }`}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className={`relative w-full max-w-4xl max-h-[90vh] bg-gray-900 rounded-xl overflow-hidden shadow-2xl transition-all duration-500 ${
          isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
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
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-6">
              <span className="flex items-center gap-1">
                {countryFlags[article.country] || '📍'} {article.city || countryNames[article.country] || article.country}
              </span>
              <span className="flex items-center gap-1">
                <Calendar size={14} />
                {new Date(article.published_at).toLocaleDateString()}
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

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mb-8">
              {article.affiliate_url && (
                <a
                  href={article.affiliate_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-pink-500 text-black font-bold px-6 py-3 rounded-full hover:opacity-90 transition"
                >
                  <Ticket size={18} />
                  Get Tickets
                </a>
              )}
              <button
                onClick={handleShare}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-5 py-3 rounded-full transition"
              >
                <Share2 size={18} />
                Share
              </button>
              <Link
                href={`/blog/${article.slug}`}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-5 py-3 rounded-full transition"
              >
                <ExternalLink size={18} />
                Full Article
              </Link>
            </div>

            {/* Divider */}
            <div className="h-px bg-gray-800 mb-8" />

            {/* Excerpt */}
            <p className="text-lg text-gray-300 mb-6">{article.excerpt}</p>

            {/* Content */}
            <div
              className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-p:text-gray-300 prose-a:text-yellow-500"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Bottom CTA */}
            {article.affiliate_url && (
              <div className="mt-10 p-6 bg-gradient-to-r from-yellow-500/10 to-pink-500/10 border border-yellow-500/20 rounded-xl text-center">
                <h3 className="text-xl font-bold text-white mb-2">Don&apos;t Miss Out!</h3>
                <p className="text-gray-400 mb-4">Secure your spot today</p>
                <a
                  href={article.affiliate_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-pink-500 text-black font-bold px-8 py-3 rounded-full"
                >
                  <Ticket size={18} />
                  Get Tickets Now
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
