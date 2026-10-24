'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Clock, CheckCircle, MessageSquare, AlertTriangle, Loader2 } from 'lucide-react';

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [sentTo, setSentTo] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (status === 'sending') return;

    setStatus('sending');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, website: '' }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setStatus('error');
        setErrorMessage(
          data.error ||
            'We could not send your message just now. Please use the direct contact options below and we will pick it up straight away.'
        );
        return;
      }

      setStatus('sent');
      setSentTo(formData.email);

      // Only count the conversion once the enquiry has actually been delivered.
      if (typeof window !== 'undefined' && 'gtag' in window) {
        (window as any).gtag('event', 'contact_form_submit', {
          page: window.location.pathname,
          form_location: 'contact_page',
        });
      }
    } catch {
      setStatus('error');
      setErrorMessage(
        'We could not send your message just now. Please use the direct contact options below and we will pick it up straight away.'
      );
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Prefilled mailto so a visitor can always deliver the message themselves
  // even if our email pipeline is unavailable.
  const fallbackMailto = `mailto:sales@bahrainnights.com?subject=${encodeURIComponent(
    `Enquiry from bahrainnights.com: ${formData.subject || 'General Inquiry'}`
  )}&body=${encodeURIComponent(
    `Name: ${formData.name}\nEmail: ${formData.email}\nSubject: ${formData.subject}\n\n${formData.message}`
  )}`;

  if (status === 'sent') {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-400" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">Message Sent!</h1>
          <p className="text-gray-400 mb-8">
            Thanks {formData.name ? `, ${formData.name.split(' ')[0]}` : ''} — your message is with our
            team and we&apos;ll reply to <span className="text-gray-300">{sentTo}</span> within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
            >
              Back to Home
            </a>
            <a
              href="tel:+97339007750"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-white/20 text-white font-semibold rounded-xl hover:border-white/40 transition-all"
            >
              Call +973 3900 7750
            </a>
          </div>
        </motion.div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="w-20 h-20 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-10 h-10 text-amber-400" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">We couldn&apos;t send that yet</h1>
          <p className="text-gray-400 mb-8">{errorMessage}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={fallbackMailto}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
            >
              Send via email
            </a>
            <a
              href="tel:+97339007750"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-white/20 text-white font-semibold rounded-xl hover:border-white/40 transition-all"
            >
              Call +973 3900 7750
            </a>
            <button
              onClick={() => setStatus('idle')}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-white/20 text-white font-semibold rounded-xl hover:border-white/40 transition-all"
            >
              Back to form
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <section className="relative pt-24 pb-12 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-purple-500/5 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Get in{' '}
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Touch
              </span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
              Have questions? We&apos;d love to hear from you. Send us a message!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1 space-y-6"
          >
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                  <Mail className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Email Us</h3>
                  <a href="mailto:sales@bahrainnights.com" className="text-gray-400 hover:text-blue-400 transition-colors">
                    sales@bahrainnights.com
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                  <Phone className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Call Us</h3>
                  <a href="tel:+97339007750" className="text-gray-400 hover:text-purple-400 transition-colors">
                    +973 3900 7750
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-pink-500/20 rounded-xl flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-pink-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Location</h3>
                  <p className="text-gray-400">
                    Manama, Kingdom of Bahrain
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Response Time</h3>
                  <p className="text-gray-400">
                    Usually within 24 hours
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <MessageSquare className="w-6 h-6 text-blue-400" />
                Send a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6" data-ga-manual="true">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Subject *
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="listing">Event Listing</option>
                    <option value="advertising">Advertising</option>
                    <option value="partnership">Partnership</option>
                    <option value="feedback">Feedback</option>
                    <option value="support">Technical Support</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    placeholder="How can we help you?"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'sending' ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>

                <p className="text-xs text-gray-500 text-center">
                  We&apos;ll never share your details. You&apos;ll get a reply within 24 hours.
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
