'use client';

import { motion } from 'framer-motion';
import { Megaphone, Eye, Users, TrendingUp, Mail, Phone, CheckCircle, Sparkles, Target, Globe, Zap, Heart, Code } from 'lucide-react';

const benefits = [
  {
    icon: Eye,
    title: 'Massive Reach',
    description: 'Get your brand in front of thousands of active users looking for events, dining, and entertainment in Bahrain.',
  },
  {
    icon: Target,
    title: 'Targeted Audience',
    description: 'Reach people actively searching for things to do - they\'re already interested and ready to engage.',
  },
  {
    icon: TrendingUp,
    title: 'High Engagement',
    description: 'Our users don\'t just browse - they take action. Book tables, buy tickets, and visit venues.',
  },
  {
    icon: Code,
    title: 'Superior SEO Performance',
    description: '100% custom-coded platform - not WordPress or Wix. Better search rankings, faster loading, and higher visibility on Google.',
  },
];

const adOptions = [
  {
    name: 'Homepage Banner',
    description: 'Premium rotating banner on our homepage - the first thing visitors see',
    features: [
      'Prime visibility on homepage slider',
      'High-quality banner display (1920x600)',
      'Direct link to your website or event',
      'Mobile-optimized for all devices',
      'Rotating position among premium spots',
    ],
    highlighted: true,
  },
  {
    name: 'Featured Listing',
    description: 'Stand out in our events and places sections with premium placement',
    features: [
      'Featured badge on your listing',
      'Priority placement in search results',
      'Highlighted in relevant categories',
      'Included in our weekly newsletter',
      'Social media mentions',
    ],
  },
  {
    name: 'Sponsored Content',
    description: 'Custom articles and reviews to tell your brand story',
    features: [
      'Professional article or review',
      'High-quality photography included',
      'Social media promotion',
      'Permanent placement on site',
      'SEO-optimized for search visibility',
    ],
  },
];

const whyAdvertise = [
  {
    icon: Globe,
    title: 'Free Platform for Venues',
    description: 'We\'re building Bahrain\'s largest events and venues directory - completely free for businesses to list. Your ad reaches this growing community.',
  },
  {
    icon: Users,
    title: 'Growing Community',
    description: 'Thousands of residents and tourists use BahrainNights to discover what\'s happening. Be where your customers are looking.',
  },
  {
    icon: Zap,
    title: 'AI-Powered Discovery',
    description: 'Our AI ensures your content reaches the right audience at the right time. Smart recommendations drive engagement.',
  },
  {
    icon: Heart,
    title: 'Supporting Local Business',
    description: 'We\'re passionate about promoting Bahrain\'s vibrant scene. Partner with us to grow together.',
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
              Grow Your Business{' '}
              <span className="bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent">
                With Us
              </span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
              Put your brand in front of Bahrain&apos;s most engaged audience - thousands of people actively looking for events, dining, and entertainment
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
              { icon: Megaphone, label: 'Businesses Listed', value: '500+' },
            ].map((stat) => (
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

      {/* Why Advertise Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-4">Why Advertise on BahrainNights?</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We&apos;re not just another advertising platform. We&apos;re building the go-to destination for everything happening in Bahrain.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {whyAdvertise.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 flex gap-4"
            >
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-orange-400" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white/[0.02] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">What You Get</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Advertising with us means more than just visibility - it means results.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-7 h-7 text-orange-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{benefit.title}</h3>
                <p className="text-gray-400 text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ad Options Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-4">Advertising Options</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Flexible solutions tailored to your goals and budget. Contact us for custom packages.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {adOptions.map((option, index) => (
            <motion.div
              key={option.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative bg-white/5 backdrop-blur-sm border rounded-3xl p-8 ${
                option.highlighted
                  ? 'border-orange-500/50 shadow-lg shadow-orange-500/10'
                  : 'border-white/10'
              }`}
            >
              {option.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-bold rounded-full flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Most Popular
                </div>
              )}

              <h3 className="text-xl font-bold text-white mb-2">{option.name}</h3>
              <p className="text-gray-400 text-sm mb-6">{option.description}</p>

              <ul className="space-y-3 mb-8">
                {option.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href="mailto:sales@bahrainnights.com?subject=Advertising Inquiry - ${option.name}"
                className={`block w-full text-center py-3 rounded-xl font-semibold transition-all ${
                  option.highlighted
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:shadow-lg'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                Get in Touch
              </a>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-3xl p-8 text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-4">Ready to Reach Thousands?</h3>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            Let&apos;s discuss how we can help grow your business. Custom packages available to fit your needs and budget.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:sales@bahrainnights.com?subject=Advertising Inquiry"
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
            >
              <Mail className="w-5 h-5" />
              sales@bahrainnights.com
            </a>
            <a
              href="tel:+97339007750"
              className="flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-all"
            >
              <Phone className="w-5 h-5" />
              +973 3900 7750
            </a>
          </div>

          <p className="text-gray-500 text-sm mt-6">
            We typically respond within 24 hours
          </p>
        </motion.div>
      </section>
    </div>
  );
}
