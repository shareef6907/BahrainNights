'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import SponsorLogo from './SponsorLogo';
import type { Sponsor } from '@/types/database';

interface SponsorsSectionProps {
  className?: string;
}

export default function SponsorsSection({ className = '' }: SponsorsSectionProps) {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSponsors() {
      try {
        const response = await fetch('/api/sponsors?status=active');
        if (response.ok) {
          const data = await response.json();
          setSponsors(data.sponsors || []);
        }
      } catch (error) {
        console.error('Error fetching sponsors:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchSponsors();
  }, []);

  // Group sponsors by tier
  const goldenSponsors = sponsors.filter(s => s.tier === 'golden');
  const silverSponsors = sponsors.filter(s => s.tier === 'silver');

  // Don't render if no sponsors and not loading
  if (!loading && sponsors.length === 0) {
    return null;
  }

  // Show loading skeleton
  if (loading) {
    return (
      <section className={`py-16 bg-gradient-to-b from-gray-900/50 to-black ${className}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="h-8 w-48 bg-gray-800 rounded animate-pulse mx-auto" />
          </div>
          <div className="flex justify-center gap-6 flex-wrap">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-[180px] h-[100px] bg-gray-800 rounded-xl animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`py-16 bg-gradient-to-b from-gray-900/50 to-black ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 text-amber-400 mb-4">
            <Sparkles className="w-5 h-5" />
            <span className="text-sm font-medium tracking-wider uppercase">
              Proudly Supported By
            </span>
            <Sparkles className="w-5 h-5" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Our Sponsors
          </h2>
          <p className="text-gray-400 mt-3 max-w-2xl mx-auto">
            These amazing partners help make BahrainNights possible
          </p>
        </motion.div>

        {/* Golden Sponsors Row */}
        {goldenSponsors.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-10"
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent flex-1 max-w-[100px]" />
              <span className="text-amber-400 text-sm font-medium tracking-wider uppercase px-4">
                Golden Sponsors
              </span>
              <div className="h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent flex-1 max-w-[100px]" />
            </div>
            <div className="flex flex-wrap justify-center gap-6 md:gap-8">
              {goldenSponsors.map((sponsor, index) => (
                <SponsorLogo
                  key={sponsor.id}
                  sponsor={sponsor}
                  tier="golden"
                  index={index}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Silver Sponsors Row */}
        {silverSponsors.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-10"
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="h-px bg-gradient-to-r from-transparent via-gray-500/50 to-transparent flex-1 max-w-[100px]" />
              <span className="text-gray-400 text-sm font-medium tracking-wider uppercase px-4">
                Silver Sponsors
              </span>
              <div className="h-px bg-gradient-to-r from-transparent via-gray-500/50 to-transparent flex-1 max-w-[100px]" />
            </div>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              {silverSponsors.map((sponsor, index) => (
                <SponsorLogo
                  key={sponsor.id}
                  sponsor={sponsor}
                  tier="silver"
                  index={index}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-12"
        >
          <Link
            href="/sponsors"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-amber-500/25"
          >
            <Sparkles className="w-5 h-5" />
            Become a Sponsor
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
