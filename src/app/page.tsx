'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Clock, Star, ChevronRight, Menu, X, Globe, Sparkles } from 'lucide-react';

// Animation variants - optimized for speed
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
};

const stagger = {
  visible: { transition: { staggerChildren: 0.05 } }
};

const cardHover = {
  y: -6,
  transition: { duration: 0.2 }
};

export default function BahrainNightsHomepage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  // Optimized scroll handler with throttling
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Data
  const adSlides = [
    { id: 1, title: "New Year's Eve at The Ritz", subtitle: "Ring in 2026 with elegance", cta: "Book Now", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1920&h=600&fit=crop", gradient: "from-purple-600/40 to-pink-600/40" },
    { id: 2, title: "Jazz Night Every Thursday", subtitle: "Live music at Cafe Lilou", cta: "Reserve Table", image: "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=1920&h=600&fit=crop", gradient: "from-blue-600/40 to-cyan-600/40" },
    { id: 3, title: "Bahrain Food Festival", subtitle: "50+ Local Vendors • Jan 15-20", cta: "Get Tickets", image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1920&h=600&fit=crop", gradient: "from-orange-600/40 to-red-600/40" }
  ];

  const categories = [
    { icon: "🎭", name: "Cultural", count: 47, color: "from-purple-500 to-pink-500" },
    { icon: "🍽️", name: "Dining", count: 123, color: "from-orange-500 to-red-500" },
    { icon: "🎵", name: "Live Music", count: 12, color: "from-blue-500 to-cyan-500" },
    { icon: "🌙", name: "Nightlife", count: 89, color: "from-indigo-500 to-purple-500" },
    { icon: "👨‍👩‍👧‍👦", name: "Family", count: 34, color: "from-green-500 to-emerald-500" },
    { icon: "⚽", name: "Sports", count: 8, color: "from-red-500 to-orange-500" }
  ];

  const todayEvents = [
    { id: 1, title: "Jazz Night", venue: "Cafe Lilou", time: "8:00 PM", image: "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=400&h=500&fit=crop", category: "Live Music" },
    { id: 2, title: "Ladies Night", venue: "The Orangery", time: "9:00 PM", image: "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=400&h=500&fit=crop", category: "Nightlife" },
    { id: 3, title: "Cinema Night", venue: "Cineco Seef", time: "7:00 PM", image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=500&fit=crop", category: "Entertainment" },
    { id: 4, title: "Beach Party", venue: "Coral Bay", time: "12:00 PM", image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=400&h=500&fit=crop", category: "Outdoor" }
  ];

  const movies = [
    { title: "Dune: Part Three", rating: 8.9, image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300&h=450&fit=crop" },
    { title: "Avatar 3", rating: 8.7, image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=300&h=450&fit=crop" },
    { title: "Inception 2", rating: 8.8, image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300&h=450&fit=crop" },
    { title: "The Matrix 5", rating: 8.5, image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=300&h=450&fit=crop" }
  ];

  // Auto-advance slider
  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide(prev => (prev + 1) % adSlides.length), 5000);
    return () => clearInterval(timer);
  }, [adSlides.length]);

  const navItems = ['Events', 'Venues', 'Cinema', 'Calendar'];
  const quickFilters = ['🎭 Culture', '🍽️ Dining', '🎵 Music', '🌙 Nightlife', '👨‍👩‍👧‍👦 Family'];

  return (
    <div className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white min-h-screen">
      {/* CSS Background Effect */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-purple-600/20 via-transparent to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-cyan-600/20 via-transparent to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-950/90 backdrop-blur-xl border-b border-white/10' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-2">
              <span className="text-3xl font-black bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent">
                BahrainNights
              </span>
              <span className="text-xs text-yellow-400 mt-2 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                AI-Powered
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              {navItems.map(item => (
                <a key={item} href={`#${item.toLowerCase()}`} className="text-gray-300 hover:text-white transition-colors relative group">
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 group-hover:w-full transition-all duration-200" />
                </a>
              ))}
              <button className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors">
                <Globe className="w-4 h-4" />
                <span>AR</span>
              </button>
              <button className="bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-black px-6 py-2 rounded-full font-semibold hover:shadow-lg hover:shadow-orange-500/25 transition-shadow">
                List Your Event
              </button>
            </div>

            <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="md:hidden bg-slate-900/95 backdrop-blur-xl border-t border-white/10"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="px-4 py-4 space-y-3">
                {navItems.map(item => (
                  <a key={item} href={`#${item.toLowerCase()}`} className="block text-gray-300 hover:text-white py-2">{item}</a>
                ))}
                <button className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 py-3 rounded-full font-semibold">
                  List Your Event
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div
            className="inline-block mb-6 px-6 py-3 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 hover:border-yellow-400/50 transition-colors"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-sm text-gray-300 flex items-center gap-2">
              <span className="text-xl">🇧🇭</span>
              Supporting Local Businesses
              <span className="text-yellow-400">•</span>
              Always Free
            </span>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent">
              Discover Bahrain&apos;s
            </span>
            <br />
            <span className="text-white">Best Experiences</span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-400 mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <span className="text-yellow-400">AI-powered</span> • Always updated •
            <span className="text-white font-semibold"> 1,247 events</span> •
            <span className="text-white font-semibold"> 847 venues</span>
          </motion.p>

          {/* Search Bar */}
          <motion.div
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
          >
            <div className="relative group">
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
              <input
                type="text"
                placeholder="What are you looking for tonight?"
                className="w-full pl-16 pr-6 py-6 bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-2xl text-white text-lg placeholder-gray-400 focus:outline-none focus:border-yellow-400/50 focus:shadow-xl focus:shadow-yellow-400/10 transition-all duration-200"
              />
            </div>

            {/* Quick Filters */}
            <motion.div className="flex flex-wrap justify-center gap-3 mt-8" variants={stagger} initial="hidden" animate="visible">
              {quickFilters.map(filter => (
                <motion.button
                  key={filter}
                  className="px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full hover:bg-white/10 hover:border-yellow-400/50 transition-all duration-200 text-sm font-medium"
                  variants={fadeIn}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {filter}
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Premium Ad Slider */}
      <section className="px-4 mb-24">
        <div className="max-w-7xl mx-auto">
          <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden">
            <AnimatePresence mode="wait">
              {adSlides.map((slide, index) => (
                index === currentSlide && (
                  <motion.div
                    key={slide.id}
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                    <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center text-center p-8">
                      <div className="max-w-3xl">
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-black mb-4 text-white drop-shadow-2xl">{slide.title}</h2>
                        <p className="text-xl md:text-2xl text-white/90 mb-8 drop-shadow-lg">{slide.subtitle}</p>
                        <button className="bg-white text-black px-10 py-4 rounded-full font-bold text-lg shadow-2xl hover:scale-105 transition-transform">
                          {slide.cta}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )
              ))}
            </AnimatePresence>

            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
              {adSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all duration-200 ${index === currentSlide ? 'bg-white w-8' : 'bg-white/50 w-2'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Happening Today */}
      <section className="px-4 mb-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="flex items-center justify-between mb-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-5xl font-bold flex items-center gap-3">
              🔥 Happening Today
            </h2>
            <button className="text-yellow-400 hover:text-yellow-300 flex items-center space-x-2 transition-colors group">
              <span className="font-medium">View All</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {todayEvents.map(event => (
              <motion.div
                key={event.id}
                className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden cursor-pointer hover:border-yellow-400/50 transition-colors"
                variants={fadeIn}
                whileHover={cardHover}
              >
                <div className="relative h-72 overflow-hidden">
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  <div className="absolute top-4 right-4 px-4 py-1.5 bg-yellow-400 text-black text-xs font-bold rounded-full">
                    {event.category}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-bold mb-3">{event.title}</h3>
                    <div className="flex items-center justify-between text-sm text-gray-300">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-yellow-400" />
                        <span>{event.venue}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-yellow-400" />
                        <span>{event.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Cinema Section */}
      <section className="px-4 mb-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="flex items-center justify-between mb-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-5xl font-bold">🎬 Now Showing in Cinemas</h2>
            <button className="text-yellow-400 hover:text-yellow-300 flex items-center space-x-2 transition-colors group">
              <span className="font-medium">All Movies</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {movies.map((movie, index) => (
              <motion.div
                key={index}
                className="group relative rounded-2xl overflow-hidden cursor-pointer"
                variants={fadeIn}
                whileHover={cardHover}
              >
                <img src={movie.image} alt={movie.title} className="w-full h-[450px] object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-bold text-xl mb-2">{movie.title}</h3>
                    <div className="flex items-center space-x-2 text-yellow-400">
                      <Star className="w-5 h-5 fill-current" />
                      <span className="text-lg font-semibold">{movie.rating}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="px-4 mb-24">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-3xl md:text-5xl font-bold mb-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            Explore by Category
          </motion.h2>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 gap-6"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {categories.map(category => (
              <motion.div
                key={category.name}
                className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 cursor-pointer overflow-hidden hover:border-yellow-400/50 transition-colors"
                variants={fadeIn}
                whileHover={cardHover}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-20 transition-opacity duration-200`} />
                <div className="relative">
                  <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-200">{category.icon}</div>
                  <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                  <p className="text-gray-400">{category.count} events</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
            <div>
              <div className="text-3xl font-black bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent mb-4">
                BahrainNights
              </div>
              <p className="text-gray-400">Supporting Bahrain&apos;s local businesses. Every voice matters.</p>
            </div>
            {[
              { title: 'Explore', links: ['Events', 'Venues', 'Cinema', 'Calendar'] },
              { title: 'For Businesses', links: ['List Your Event', 'Advertise', 'Contact Us'] },
              { title: 'Connect', links: ['Instagram', 'Facebook', 'Twitter'] }
            ].map(section => (
              <div key={section.title}>
                <h4 className="font-bold text-lg mb-4">{section.title}</h4>
                <ul className="space-y-3 text-gray-400">
                  {section.links.map(link => (
                    <li key={link} className="hover:text-white hover:translate-x-1 transition-all duration-200">
                      <a href="#">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="pt-10 border-t border-white/10 text-center text-gray-400">
            <p>© 2025 BahrainNights.com • Powered by AI • Made with ❤️ in Bahrain</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
