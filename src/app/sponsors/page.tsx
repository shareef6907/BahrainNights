'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Crown,
  Medal,
  Check,
  Mail,
  Phone,
  Building2,
  Send,
  ChevronDown,
  Star,
  Eye,
  Link as LinkIcon,
  Users,
  Zap,
} from 'lucide-react';
import Image from 'next/image';

// Pricing tiers data
const tiers = [
  {
    name: 'Golden Sponsor',
    icon: Crown,
    price: 450,
    period: 'month',
    color: 'amber',
    description: 'Premium visibility with maximum brand exposure',
    features: [
      'Large logo display (180×100px)',
      'First row placement',
      'Full-color logo on hover',
      'Link to your website or venue page',
      'Featured in 4 per row on desktop',
      'Priority display order',
      'Social media mentions',
      'Newsletter feature (monthly)',
    ],
    popular: true,
  },
  {
    name: 'Silver Sponsor',
    icon: Medal,
    price: 300,
    period: 'month',
    color: 'gray',
    description: 'Great exposure at an affordable rate',
    features: [
      'Standard logo display (140×80px)',
      'Second row placement',
      'Full-color logo on hover',
      'Link to your website or venue page',
      'Featured in 5-6 per row on desktop',
      'Standard display order',
    ],
    popular: false,
  },
];

// Benefits data
const benefits = [
  {
    icon: Eye,
    title: '50,000+ Monthly Views',
    description: 'Your logo seen by thousands of locals and tourists discovering Bahrain.',
  },
  {
    icon: Users,
    title: 'Targeted Audience',
    description: 'Reach people actively looking for dining, nightlife, and entertainment.',
  },
  {
    icon: LinkIcon,
    title: 'Direct Traffic',
    description: 'Every logo click drives visitors directly to your website or venue page.',
  },
  {
    icon: Zap,
    title: 'Brand Recognition',
    description: 'Build trust and recognition among the Bahrain community.',
  },
];

// FAQ data
const faqs = [
  {
    question: 'How long is the sponsorship commitment?',
    answer: 'We offer flexible monthly sponsorships with no long-term commitment required. You can sponsor for a single month or set up recurring monthly payments.',
  },
  {
    question: 'Can I change my sponsorship tier?',
    answer: 'Yes! You can upgrade or downgrade your tier at any time. Changes take effect at the start of the next billing period.',
  },
  {
    question: 'What logo format do you need?',
    answer: 'We accept PNG, JPG, or SVG files. For best results, please provide a transparent PNG at least 400×300px. We\'ll optimize it for display.',
  },
  {
    question: 'How quickly will my logo appear?',
    answer: 'Once payment is confirmed and we receive your logo, your sponsorship goes live within 24 hours.',
  },
  {
    question: 'Do you offer discounts for longer commitments?',
    answer: 'Yes! Contact us for special rates on 3-month, 6-month, or annual sponsorship packages.',
  },
  {
    question: 'Can I link to a specific page on my website?',
    answer: 'Absolutely! You can link to your homepage, a special offer page, or your BahrainNights venue profile.',
  },
];

export default function SponsorsPage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    businessName: '',
    contactName: '',
    email: '',
    phone: '',
    tier: 'golden',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/sponsors/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          businessName: '',
          contactName: '',
          email: '',
          phone: '',
          tier: 'golden',
          message: '',
        });
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-amber-900/20 via-black to-black" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-amber-500/10 blur-[120px] rounded-full" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 text-amber-400 mb-6">
              <Sparkles className="w-5 h-5" />
              <span className="text-sm font-medium tracking-wider uppercase">
                Partner with Bahrain's #1 Nightlife Platform
              </span>
              <Sparkles className="w-5 h-5" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Become a{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                Sponsor
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
              Showcase your brand to thousands of locals and visitors discovering
              the best of Bahrain's dining, nightlife, and entertainment scene.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#pricing"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-semibold rounded-full transition-all duration-300 hover:scale-105"
              >
                <Crown className="w-5 h-5" />
                View Pricing
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-full transition-all duration-300 border border-white/20"
              >
                <Mail className="w-5 h-5" />
                Contact Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Why Sponsor BahrainNights?
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Join Bahrain's most trusted platform for discovering entertainment and nightlife.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-gradient-to-b from-gray-800/50 to-gray-900/50 border border-gray-700/50 hover:border-amber-500/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center mb-4">
                  <benefit.icon className="w-6 h-6 text-amber-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-400 text-sm">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Sponsorship Tiers
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Choose the perfect sponsorship level for your brand
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {tiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative rounded-3xl p-8 ${
                  tier.popular
                    ? 'bg-gradient-to-b from-amber-900/30 to-gray-900/50 border-2 border-amber-500/50'
                    : 'bg-gradient-to-b from-gray-800/30 to-gray-900/50 border border-gray-700/50'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 px-4 py-1 bg-amber-500 text-black text-sm font-semibold rounded-full">
                      <Star className="w-4 h-4" />
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <div
                    className={`w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center ${
                      tier.color === 'amber'
                        ? 'bg-amber-500/20'
                        : 'bg-gray-500/20'
                    }`}
                  >
                    <tier.icon
                      className={`w-8 h-8 ${
                        tier.color === 'amber' ? 'text-amber-400' : 'text-gray-400'
                      }`}
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {tier.name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    {tier.description}
                  </p>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-gray-400 text-lg">BD</span>
                    <span className="text-5xl font-bold text-white">
                      {tier.price}
                    </span>
                    <span className="text-gray-400">/{tier.period}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check
                        className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                          tier.color === 'amber'
                            ? 'text-amber-400'
                            : 'text-gray-400'
                        }`}
                      />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className={`block w-full py-3 px-6 rounded-full text-center font-semibold transition-all duration-300 ${
                    tier.popular
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black'
                      : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                  }`}
                >
                  Get Started
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 border-t border-gray-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-400">
              Everything you need to know about sponsoring BahrainNights
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="rounded-xl overflow-hidden border border-gray-700/50"
              >
                <button
                  onClick={() =>
                    setExpandedFaq(expandedFaq === index ? null : index)
                  }
                  className="w-full flex items-center justify-between p-5 text-left bg-gray-800/30 hover:bg-gray-800/50 transition-colors"
                >
                  <span className="font-medium text-white">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                      expandedFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {expandedFaq === index && (
                  <div className="p-5 bg-gray-900/30 border-t border-gray-700/50">
                    <p className="text-gray-400">{faq.answer}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-20 border-t border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Fill out the form below and our team will get back to you within 24 hours.
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            onSubmit={handleSubmit}
            className="bg-gradient-to-b from-gray-800/30 to-gray-900/50 rounded-3xl p-8 border border-gray-700/50"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Building2 className="w-4 h-4 inline mr-2" />
                  Business Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.businessName}
                  onChange={(e) =>
                    setFormData({ ...formData, businessName: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                  placeholder="Your business name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Contact Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.contactName}
                  onChange={(e) =>
                    setFormData({ ...formData, contactName: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Mail className="w-4 h-4 inline mr-2" />
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                  placeholder="you@business.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Phone className="w-4 h-4 inline mr-2" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                  placeholder="+973 XXXX XXXX"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Preferred Tier *
              </label>
              <div className="grid grid-cols-2 gap-4">
                <label
                  className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all ${
                    formData.tier === 'golden'
                      ? 'bg-amber-500/20 border-2 border-amber-500'
                      : 'bg-gray-800/50 border border-gray-700 hover:border-gray-600'
                  }`}
                >
                  <input
                    type="radio"
                    name="tier"
                    value="golden"
                    checked={formData.tier === 'golden'}
                    onChange={(e) =>
                      setFormData({ ...formData, tier: e.target.value })
                    }
                    className="sr-only"
                  />
                  <Crown
                    className={`w-6 h-6 ${
                      formData.tier === 'golden'
                        ? 'text-amber-400'
                        : 'text-gray-500'
                    }`}
                  />
                  <div>
                    <div className="font-medium text-white">Golden</div>
                    <div className="text-sm text-gray-400">BD 450/month</div>
                  </div>
                </label>
                <label
                  className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all ${
                    formData.tier === 'silver'
                      ? 'bg-gray-500/20 border-2 border-gray-400'
                      : 'bg-gray-800/50 border border-gray-700 hover:border-gray-600'
                  }`}
                >
                  <input
                    type="radio"
                    name="tier"
                    value="silver"
                    checked={formData.tier === 'silver'}
                    onChange={(e) =>
                      setFormData({ ...formData, tier: e.target.value })
                    }
                    className="sr-only"
                  />
                  <Medal
                    className={`w-6 h-6 ${
                      formData.tier === 'silver'
                        ? 'text-gray-300'
                        : 'text-gray-500'
                    }`}
                  />
                  <div>
                    <div className="font-medium text-white">Silver</div>
                    <div className="text-sm text-gray-400">BD 300/month</div>
                  </div>
                </label>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Message (Optional)
              </label>
              <textarea
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                rows={4}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors resize-none"
                placeholder="Tell us about your business and any questions you have..."
              />
            </div>

            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-500/10 border border-green-500/50 rounded-xl text-green-400 text-center">
                Thank you! We'll be in touch within 24 hours.
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-400 text-center">
                Something went wrong. Please try again or email us directly.
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-8 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 disabled:from-gray-600 disabled:to-gray-700 text-black font-semibold rounded-full transition-all duration-300 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Submit Inquiry
                </>
              )}
            </button>
          </motion.form>

          {/* Direct contact info */}
          <div className="mt-8 text-center">
            <p className="text-gray-400 mb-2">Or reach us directly:</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="mailto:sponsors@bahrainnights.com"
                className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors"
              >
                <Mail className="w-4 h-4" />
                sponsors@bahrainnights.com
              </a>
              <a
                href="tel:+97317000000"
                className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors"
              >
                <Phone className="w-4 h-4" />
                +973 1700 0000
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
