'use client';

import { Camera, Music, Globe, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface CrossPromoServicesProps {
  context?: 'event' | 'venue' | 'general';
  compact?: boolean;
}

/**
 * Cross-promotion banner for Cinematic Group services.
 * Designed to be helpful and contextual, not spammy.
 */
export default function CrossPromoServices({ context = 'general', compact = false }: CrossPromoServicesProps) {
  const services = [
    {
      name: 'Cinematic Web Works',
      tagline: context === 'venue'
        ? 'Need a website for your venue?'
        : 'Premium Web Development',
      description: 'Cinematic websites with video headers, custom-coded from scratch. No templates.',
      href: 'https://www.cinematicwebworks.com',
      icon: Globe,
      color: 'from-amber-500/20 to-yellow-500/20',
      borderColor: 'border-amber-500/20 hover:border-amber-500/40',
      iconBg: 'bg-amber-500/20',
      iconColor: 'text-amber-400',
    },
    {
      name: 'Events Bahrain',
      tagline: context === 'event' 
        ? 'Need equipment for your event?' 
        : 'Professional Event Equipment Rental',
      description: 'Sound systems, lighting, stages, LED screens & full event production services in Bahrain.',
      href: 'https://www.eventsbahrain.com',
      icon: Music,
      color: 'from-purple-500/20 to-indigo-500/20',
      borderColor: 'border-purple-500/20 hover:border-purple-500/40',
      iconBg: 'bg-purple-500/20',
      iconColor: 'text-purple-400',
    },
    {
      name: 'Film Production Bahrain',
      tagline: context === 'venue'
        ? 'Showcase your venue with professional video'
        : 'Professional Video & Film Production',
      description: 'Corporate videos, event coverage, commercials, drone filming & post-production in Bahrain.',
      href: 'https://www.filmproductionbahrain.com',
      icon: Camera,
      color: 'from-rose-500/20 to-orange-500/20',
      borderColor: 'border-rose-500/20 hover:border-rose-500/40',
      iconBg: 'bg-rose-500/20',
      iconColor: 'text-rose-400',
    },
  ];

  if (compact) {
    return (
      <div className="bg-white/5 border border-white/10 rounded-xl p-4 mt-6">
        <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">Event Production Services</p>
        <div className="flex flex-col sm:flex-row gap-3">
          {services.map((service) => (
            <a
              key={service.name}
              href={service.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-3 flex-1 px-4 py-3 bg-gradient-to-r ${service.color} border ${service.borderColor} rounded-lg transition-all group`}
            >
              <div className={`w-8 h-8 rounded-lg ${service.iconBg} flex items-center justify-center flex-shrink-0`}>
                <service.icon className={`w-4 h-4 ${service.iconColor}`} />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white group-hover:text-white/90">{service.name}</p>
                <p className="text-xs text-gray-400 truncate">{service.tagline}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-white/70 flex-shrink-0 ml-auto" />
            </a>
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Cinematic Group Services</p>
          <h2 className="text-2xl font-bold text-white">Web, Film & Event Production</h2>
          <p className="text-gray-400 mt-2 max-w-xl mx-auto">
            Need a website, video production, or event equipment? Our sister companies provide end-to-end services across Bahrain.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service) => (
            <a
              key={service.name}
              href={service.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`bg-gradient-to-br ${service.color} border ${service.borderColor} rounded-2xl p-6 transition-all group`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl ${service.iconBg} flex items-center justify-center flex-shrink-0`}>
                  <service.icon className={`w-6 h-6 ${service.iconColor}`} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-white/90 mb-1">
                    {service.name}
                  </h3>
                  <p className="text-sm text-gray-300 mb-2">{service.tagline}</p>
                  <p className="text-sm text-gray-400">{service.description}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-white/70 group-hover:text-white mt-3">
                    Learn more <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
