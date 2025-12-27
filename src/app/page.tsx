'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Clock, Star, ChevronRight, Menu, X, Globe, Sparkles } from 'lucide-react';

const BahrainNightsHomepage = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchFocused, setSearchFocused] = useState(false);
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sample data
  const adSlides = [
    {
      id: 1,
      title: "New Year's Eve at The Ritz",
      subtitle: "Ring in 2026 with elegance",
      cta: "Book Now",
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1920&h=600&fit=crop",
      gradient: "from-purple-600/40 to-pink-600/40"
    },
    {
      id: 2,
      title: "Jazz Night Every Thursday",
      subtitle: "Live music at Cafe Lilou",
      cta: "Reserve Table",
      image: "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=1920&h=600&fit=crop",
      gradient: "from-blue-600/40 to-cyan-600/40"
    },
    {
      id: 3,
      title: "Bahrain Food Festival",
      subtitle: "50+ Local Vendors • Jan 15-20",
      cta: "Get Tickets",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1920&h=600&fit=crop",
      gradient: "from-orange-600/40 to-red-600/40"
    }
  ];

  // Auto-advance slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % adSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [adSlides.length]);

  const categories = [
    { icon: "🎭", name: "Cultural", count: 47, color: "from-purple-500 to-pink-500" },
    { icon: "🍽️", name: "Dining", count: 123, color: "from-orange-500 to-red-500" },
    { icon: "🎵", name: "Live Music", count: 12, color: "from-blue-500 to-cyan-500" },
    { icon: "🌙", name: "Nightlife", count: 89, color: "from-indigo-500 to-purple-500" },
    { icon: "👨‍👩‍👧‍👦", name: "Family", count: 34, color: "from-green-500 to-emerald-500" },
    { icon: "⚽", name: "Sports", count: 8, color: "from-red-500 to-orange-500" }
  ];

  const todayEvents = [
    {
      id: 1,
      title: "Jazz Night",
      venue: "Cafe Lilou",
      time: "8:00 PM",
      image: "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=400&h=500&fit=crop",
      category: "Live Music"
    },
    {
      id: 2,
      title: "Ladies Night",
      venue: "The Orangery",
      time: "9:00 PM",
      image: "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=400&h=500&fit=crop",
      category: "Nightlife"
    },
    {
      id: 3,
      title: "Cinema Night",
      venue: "Cineco Seef",
      time: "7:00 PM",
      image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=500&fit=crop",
      category: "Entertainment"
    },
    {
      id: 4,
      title: "Beach Party",
      venue: "Coral Bay",
      time: "12:00 PM",
      image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=400&h=500&fit=crop",
      category: "Outdoor"
    }
  ];

  const movies = [
    { title: "Dune: Part Three", rating: 8.9, image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300&h=450&fit=crop" },
    { title: "Avatar 3", rating: 8.7, image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=300&h=450&fit=crop" },
    { title: "Inception 2", rating: 8.8, image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300&h=450&fit=crop" },
    { title: "The Matrix 5", rating: 8.5, image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=300&h=450&fit=crop" }
  ];

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const cardVariant = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" as const } }
  };

  return (
    <div className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white min-h-screen overflow-x-hidden">
      {/* Floating Particles Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400/30 rounded-full"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000)
            }}
            animate={{
              y: [null, -20, 20],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              repeatType: "reverse",
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrollY > 50 ? 'bg-slate-950/80 backdrop-blur-xl border-b border-white/10 shadow-2xl' : ''}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.div
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="text-3xl font-black bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                BahrainNights
              </div>
              <motion.span
                className="text-xs text-yellow-400 mt-2 flex items-center gap-1"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="w-3 h-3" />
                AI-Powered
              </motion.span>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {['Events', 'Venues', 'Cinema', 'Calendar'].map((item, i) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-300 hover:text-white transition-colors relative group"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i }}
                  whileHover={{ y: -2 }}
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 group-hover:w-full transition-all duration-300" />
                </motion.a>
              ))}
              <motion.button
                onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
                className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Globe className="w-4 h-4" />
                <span>{language === 'en' ? 'AR' : 'EN'}</span>
              </motion.button>
              <motion.button
                className="bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-black px-6 py-2 rounded-full font-semibold shadow-lg shadow-orange-500/25"
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(251, 146, 60, 0.4)" }}
                whileTap={{ scale: 0.95 }}
              >
                List Your Event
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileTap={{ scale: 0.9 }}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="md:hidden bg-slate-900/95 backdrop-blur-xl border-t border-white/10"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-4 py-4 space-y-3">
                {['Events', 'Venues', 'Cinema', 'Calendar'].map((item, i) => (
                  <motion.a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="block text-gray-300 hover:text-white py-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * i }}
                  >
                    {item}
                  </motion.a>
                ))}
                <motion.button
                  className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 py-3 rounded-full font-semibold"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  List Your Event
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-purple-600/30 via-transparent to-transparent rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-cyan-600/30 via-transparent to-transparent rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [0, -90, 0],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
          <motion.div
            className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div
            className="inline-block mb-6 px-6 py-3 bg-white/5 backdrop-blur-sm rounded-full border border-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.05, borderColor: "rgba(251, 191, 36, 0.5)" }}
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
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.span
              className="bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent inline-block"
              animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              style={{ backgroundSize: "200% auto" }}
            >
              Discover Bahrain&apos;s
            </motion.span>
            <br />
            <motion.span
              className="text-white inline-block"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Best Experiences
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-400 mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <span className="text-yellow-400">AI-powered</span> • Always updated •
            <span className="text-white font-semibold"> 1,247 events</span> •
            <span className="text-white font-semibold"> 847 venues</span>
          </motion.p>

          {/* Search Bar */}
          <motion.div
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <motion.div
              className="relative"
              animate={{ scale: searchFocused ? 1.02 : 1 }}
              transition={{ duration: 0.3 }}
            >
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
              <input
                type="text"
                placeholder="What are you looking for tonight?"
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className="w-full pl-16 pr-6 py-6 bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-2xl text-white text-lg placeholder-gray-400 focus:outline-none focus:border-yellow-400/50 focus:shadow-2xl focus:shadow-yellow-400/20 transition-all duration-300"
              />
              <motion.div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                animate={{
                  boxShadow: searchFocused
                    ? "0 0 40px rgba(251, 191, 36, 0.3)"
                    : "0 0 0px rgba(251, 191, 36, 0)"
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>

            {/* Quick Filters */}
            <motion.div
              className="flex flex-wrap justify-center gap-3 mt-8"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {['🎭 Culture', '🍽️ Dining', '🎵 Music', '🌙 Nightlife', '👨‍👩‍👧‍👦 Family'].map((filter) => (
                <motion.button
                  key={filter}
                  className="px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full hover:bg-white/10 hover:border-yellow-400/50 transition-all text-sm font-medium"
                  variants={cardVariant}
                  whileHover={{ scale: 1.05, y: -2, borderColor: "rgba(251, 191, 36, 0.5)" }}
                  whileTap={{ scale: 0.95 }}
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
          <motion.div
            className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <AnimatePresence mode="wait">
              {adSlides.map((slide, index) => (
                index === currentSlide && (
                  <motion.div
                    key={slide.id}
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.7 }}
                  >
                    <motion.img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover"
                      animate={{ scale: [1, 1.05] }}
                      transition={{ duration: 10, ease: "linear" }}
                    />
                    <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    <div className="absolute inset-0 flex items-center justify-center text-center p-8">
                      <div className="max-w-3xl">
                        <motion.h2
                          className="text-4xl md:text-6xl lg:text-7xl font-black mb-4 text-white drop-shadow-2xl"
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          {slide.title}
                        </motion.h2>
                        <motion.p
                          className="text-xl md:text-2xl text-white/90 mb-8 drop-shadow-lg"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                        >
                          {slide.subtitle}
                        </motion.p>
                        <motion.button
                          className="bg-white text-black px-10 py-4 rounded-full font-bold text-lg shadow-2xl"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.6 }}
                          whileHover={{ scale: 1.05, boxShadow: "0 25px 50px rgba(0,0,0,0.3)" }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {slide.cta}
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                )
              ))}
            </AnimatePresence>

            {/* Slider Navigation */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
              {adSlides.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all ${index === currentSlide ? 'bg-white' : 'bg-white/50'}`}
                  animate={{ width: index === currentSlide ? 32 : 8 }}
                  whileHover={{ scale: 1.2 }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Happening Today */}
      <section className="px-4 mb-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="flex items-center justify-between mb-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-5xl font-bold flex items-center gap-3">
              <motion.span
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
              >
                🔥
              </motion.span>
              Happening Today
            </h2>
            <motion.button
              className="text-yellow-400 hover:text-yellow-300 flex items-center space-x-2 transition-colors group"
              whileHover={{ x: 5 }}
            >
              <span className="font-medium">View All</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {todayEvents.map((event) => (
              <motion.div
                key={event.id}
                className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden cursor-pointer"
                variants={cardVariant}
                whileHover={{ y: -8, borderColor: "rgba(251, 191, 36, 0.5)" }}
              >
                <div className="relative h-72 overflow-hidden">
                  <motion.img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                  <motion.div
                    className="absolute top-4 right-4 px-4 py-1.5 bg-yellow-400 text-black text-xs font-bold rounded-full"
                    whileHover={{ scale: 1.1 }}
                  >
                    {event.category}
                  </motion.div>

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
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-5xl font-bold">
              🎬 Now Showing in Cinemas
            </h2>
            <motion.button
              className="text-yellow-400 hover:text-yellow-300 flex items-center space-x-2 transition-colors group"
              whileHover={{ x: 5 }}
            >
              <span className="font-medium">All Movies</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {movies.map((movie, index) => (
              <motion.div
                key={index}
                className="group relative rounded-2xl overflow-hidden cursor-pointer"
                variants={cardVariant}
                whileHover={{ y: -8 }}
              >
                <motion.img
                  src={movie.image}
                  alt={movie.title}
                  className="w-full h-[450px] object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-bold text-xl mb-2">{movie.title}</h3>
                    <div className="flex items-center space-x-2 text-yellow-400">
                      <Star className="w-5 h-5 fill-current" />
                      <span className="text-lg font-semibold">{movie.rating}</span>
                    </div>
                  </div>
                </motion.div>
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
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            Explore by Category
          </motion.h2>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {categories.map((category) => (
              <motion.div
                key={category.name}
                className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 cursor-pointer overflow-hidden"
                variants={cardVariant}
                whileHover={{ y: -8, borderColor: "rgba(251, 191, 36, 0.5)" }}
              >
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                />

                <div className="relative">
                  <motion.div
                    className="text-6xl mb-4"
                    whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.3 }}
                  >
                    {category.icon}
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                  <p className="text-gray-400">{category.count} events</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <motion.footer
        className="border-t border-white/10 px-4 py-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
            <div>
              <motion.div
                className="text-3xl font-black bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent mb-4"
                whileHover={{ scale: 1.05 }}
              >
                BahrainNights
              </motion.div>
              <p className="text-gray-400">
                Supporting Bahrain&apos;s local businesses. Every voice matters.
              </p>
            </div>

            {[
              { title: 'Explore', links: ['Events', 'Venues', 'Cinema', 'Calendar'] },
              { title: 'For Businesses', links: ['List Your Event', 'Advertise', 'Contact Us'] },
              { title: 'Connect', links: ['Instagram', 'Facebook', 'Twitter'] }
            ].map((section) => (
              <div key={section.title}>
                <h4 className="font-bold text-lg mb-4">{section.title}</h4>
                <ul className="space-y-3 text-gray-400">
                  {section.links.map((link) => (
                    <motion.li key={link} whileHover={{ x: 5, color: "#fff" }}>
                      <a href="#" className="hover:text-white transition-colors">{link}</a>
                    </motion.li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-10 border-t border-white/10 text-center text-gray-400">
            <p className="flex items-center justify-center gap-2">
              © 2025 BahrainNights.com • Powered by AI • Made with
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                ❤️
              </motion.span>
              in Bahrain
            </p>
          </div>
        </div>
      </motion.footer>
    </div>
  );
};

export default BahrainNightsHomepage;
