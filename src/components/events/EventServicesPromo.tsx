'use client';

import { motion } from 'framer-motion';
import { Tv, Volume2, Building2, Video, ArrowRight } from 'lucide-react';

const services = [
  {
    icon: Tv,
    title: 'LED Video Walls',
    description: 'High-resolution LED screens for events, conferences & exhibitions',
    href: 'https://www.eventsbahrain.com/led-video-wall-rental',
  },
  {
    icon: Volume2,
    title: 'Sound & Lighting',
    description: 'Professional audio & lighting systems for any venue size',
    href: 'https://www.eventsbahrain.com/sound-and-lights',
  },
  {
    icon: Building2,
    title: 'Exhibition Booths',
    description: 'Custom booth design & construction for trade shows',
    href: 'https://www.eventsbahrain.com/exhibition-booth-building',
  },
  {
    icon: Video,
    title: 'Video Production',
    description: 'Event coverage, corporate videos & live streaming',
    href: 'https://www.eventsbahrain.com/video-production',
  },
];

interface EventServicesPromoProps {
  className?: string;
}

export default function EventServicesPromo({ className = '' }: EventServicesPromoProps) {
  return (
    <section className={`py-12 bg-gradient-to-b from-purple-900/20 to-black ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <span className="inline-block px-4 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm font-medium mb-4">
            Planning an Event?
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Professional Event Production Services
          </h2>
          <p className="text-gray-400 mt-3 max-w-2xl mx-auto">
            From LED walls to sound systems — we provide everything you need to make your event unforgettable
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service, index) => (
            <motion.a
              key={service.title}
              href={service.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group p-5 bg-gray-900/50 hover:bg-gray-800/50 border border-gray-800 hover:border-purple-500/50 rounded-xl transition-all duration-300"
            >
              <service.icon className="w-8 h-8 text-purple-400 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-white font-semibold mb-1 group-hover:text-purple-300 transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-400 text-sm mb-3">
                {service.description}
              </p>
              <span className="inline-flex items-center text-purple-400 text-sm font-medium group-hover:gap-2 transition-all">
                Learn more <ArrowRight className="w-4 h-4 ml-1" />
              </span>
            </motion.a>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-8"
        >
          <a
            href="https://www.eventsbahrain.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
          >
            Get a Free Quote
            <ArrowRight className="w-5 h-5" />
          </a>
          <p className="text-gray-500 text-sm mt-3">
            Contact: +973 3900 7750 • shareef@eventsbahrain.com
          </p>
        </motion.div>
      </div>
    </section>
  );
}
