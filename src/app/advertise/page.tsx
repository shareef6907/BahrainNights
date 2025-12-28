'use client';

import { motion } from 'framer-motion';
import { Megaphone, Eye, Users, TrendingUp, Mail, Phone, CheckCircle } from 'lucide-react';
import Link from 'next/link';

const adPackages = [
  {
    name: 'Homepage Slider',
    price: 'BD 300-500',
    period: '/month',
    description: 'Premium rotating banner on homepage',
    features: [
      '1920x600 high-quality banner',
      'Rotating position (5 slots)',
      'Link to your website/event',
      'Average 50,000+ impressions/month',
      'Mobile optimized display',
    ],
    highlighted: true,
  },
  {
    name: 'Featured Event',
    price: 'BD 100',
    period: '/week',
    description: 'Highlighted in events section',
    features: [
      'Featured badge on event listing',
      'Priority placement in category',
      'Included in weekly newsletter',
      'Social media mention',
    ],
  },
  {
    name: 'Sponsored Content',
    price: 'BD 200',
    period: '/article',
    description: 'Custom content about your brand',
    features: [
      'Professional article/review',
      'High-quality photography',
      'Social media promotion',
      'Permanent on-site placement',
    ],
  },
];

export default function AdvertisePage() {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-orange-500/10 via-red-500/5 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 rounded-full text-orange-400 text-sm font-medium mb-6">
              <Megaphone className="w-4 h-4" />
              Reach Thousands in Bahrain
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Advertise{' '}
              <span className="bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent">
                With Us
              </span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
              Put your brand in front of Bahrain&apos;s most engaged audience
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-16"
          >
            {[
              { icon: Eye, label: 'Monthly Views', value: '100K+' },
              { icon: Users, label: 'Active Users', value: '25K+' },
              { icon: TrendingUp, label: 'Engagement Rate', value: '12%' },
              { icon: Megaphone, label: 'Businesses Served', value: '500+' },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center"
              >
                <stat.icon className="w-8 h-8 text-orange-400 mx-auto mb-3" />
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-white text-center mb-12"
        >
          Advertising Packages
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {adPackages.map((pkg, index) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative bg-white/5 backdrop-blur-sm border rounded-3xl p-8 ${
                pkg.highlighted
                  ? 'border-orange-500/50 shadow-lg shadow-orange-500/10'
                  : 'border-white/10'
              }`}
            >
              {pkg.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-bold rounded-full">
                  Most Popular
                </div>
              )}

              <h3 className="text-xl font-bold text-white mb-2">{pkg.name}</h3>
              <p className="text-gray-400 text-sm mb-4">{pkg.description}</p>

              <div className="mb-6">
                <span className="text-3xl font-bold text-orange-400">{pkg.price}</span>
                <span className="text-gray-400">{pkg.period}</span>
              </div>

              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href="mailto:advertise@bahrainnights.com"
                className={`block w-full text-center py-3 rounded-xl font-semibold transition-all ${
                  pkg.highlighted
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:shadow-lg'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                Get Started
              </a>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-3xl p-8 text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-4">Ready to Get Started?</h3>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            Contact our advertising team to discuss custom packages and availability
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:advertise@bahrainnights.com"
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
            >
              <Mail className="w-5 h-5" />
              advertise@bahrainnights.com
            </a>
            <a
              href="tel:+97317123456"
              className="flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-all"
            >
              <Phone className="w-5 h-5" />
              +973 1712 3456
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
