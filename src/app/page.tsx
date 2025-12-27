'use client';

import React, { useState, useEffect } from 'react';
import { Search, Calendar, MapPin, Clock, Star, ChevronRight, Menu, X, Globe } from 'lucide-react';

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

  // Auto-advance slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % adSlides.length);
    }, 5000);
    return () => clearInterval(timer);
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

  return (
    <div className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white min-h-screen">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrollY > 50 ? 'bg-slate-950/80 backdrop-blur-xl border-b border-white/10' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="text-3xl font-black bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                BahrainNights
              </div>
              <span className="text-xs text-gray-400 mt-2">AI-Powered</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#events" className="text-gray-300 hover:text-white transition-colors">Events</a>
              <a href="#venues" className="text-gray-300 hover:text-white transition-colors">Venues</a>
              <a href="#cinema" className="text-gray-300 hover:text-white transition-colors">Cinema</a>
              <a href="#calendar" className="text-gray-300 hover:text-white transition-colors">Calendar</a>
              <button
                onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
                className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span>{language === 'en' ? 'AR' : 'EN'}</span>
              </button>
              <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 py-2 rounded-full font-semibold hover:shadow-lg hover:shadow-yellow-500/50 transition-all">
                List Your Event
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-900 border-t border-white/10">
            <div className="px-4 py-4 space-y-3">
              <a href="#events" className="block text-gray-300 hover:text-white">Events</a>
              <a href="#venues" className="block text-gray-300 hover:text-white">Venues</a>
              <a href="#cinema" className="block text-gray-300 hover:text-white">Cinema</a>
              <a href="#calendar" className="block text-gray-300 hover:text-white">Calendar</a>
              <button className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 py-2 rounded-full font-semibold">
                List Your Event
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-purple-600/20 via-transparent to-transparent rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-cyan-600/20 via-transparent to-transparent rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-block mb-4 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
            <span className="text-sm text-gray-300">🇧🇭 Supporting Local Businesses • Always Free</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent">
              Discover Bahrain's
            </span>
            <br />
            <span className="text-white">Best Experiences</span>
          </h1>

          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            AI-powered • Always updated • 1,247 events • 847 venues
          </p>

          {/* Search Bar */}
          <div className={`max-w-2xl mx-auto transition-all duration-300 ${searchFocused ? 'scale-105' : ''}`}>
            <div className="relative">
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="What are you looking for tonight?"
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className="w-full pl-14 pr-6 py-5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400/50 focus:shadow-lg focus:shadow-yellow-400/20 transition-all"
              />
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              {['🎭 Culture', '🍽️ Dining', '🎵 Music', '🌙 Nightlife', '👨‍👩‍👧‍👦 Family'].map((filter) => (
                <button
                  key={filter}
                  className="px-5 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full hover:bg-white/10 hover:border-yellow-400/50 transition-all text-sm"
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Premium Ad Slider */}
      <section className="px-4 mb-20">
        <div className="max-w-7xl mx-auto">
          <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden group">
            {adSlides.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`} />

                <div className="absolute inset-0 flex items-center justify-center text-center p-8">
                  <div className="max-w-3xl">
                    <h2 className="text-4xl md:text-6xl font-black mb-4 text-white drop-shadow-2xl">
                      {slide.title}
                    </h2>
                    <p className="text-xl md:text-2xl text-white/90 mb-8 drop-shadow-lg">
                      {slide.subtitle}
                    </p>
                    <button className="bg-white text-black px-8 py-4 rounded-full font-bold text-lg hover:scale-105 hover:shadow-2xl transition-all">
                      {slide.cta}
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Slider Navigation */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {adSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all ${index === currentSlide ? 'bg-white w-8' : 'bg-white/50'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Happening Today */}
      <section className="px-4 mb-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl md:text-4xl font-bold">
              🔥 Happening Today
            </h2>
            <button className="text-yellow-400 hover:text-yellow-300 flex items-center space-x-2 transition-colors">
              <span>View All</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {todayEvents.map((event) => (
              <div
                key={event.id}
                className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:scale-105 hover:border-yellow-400/50 hover:shadow-xl hover:shadow-yellow-400/20 transition-all cursor-pointer"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  <div className="absolute top-4 right-4 px-3 py-1 bg-yellow-400 text-black text-xs font-bold rounded-full">
                    {event.category}
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                    <div className="flex items-center justify-between text-sm text-gray-300">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{event.venue}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{event.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cinema Section */}
      <section className="px-4 mb-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl md:text-4xl font-bold">
              🎬 Now Showing in Cinemas
            </h2>
            <button className="text-yellow-400 hover:text-yellow-300 flex items-center space-x-2 transition-colors">
              <span>All Movies</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {movies.map((movie, index) => (
              <div
                key={index}
                className="group relative rounded-2xl overflow-hidden cursor-pointer hover:scale-105 transition-transform"
              >
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="font-bold mb-2">{movie.title}</h3>
                    <div className="flex items-center space-x-1 text-yellow-400">
                      <Star className="w-4 h-4 fill-current" />
                      <span>{movie.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="px-4 mb-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Explore by Category
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {categories.map((category) => (
              <div
                key={category.name}
                className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:scale-105 hover:border-yellow-400/50 transition-all cursor-pointer overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity`} />

                <div className="relative">
                  <div className="text-5xl mb-4">{category.icon}</div>
                  <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                  <p className="text-gray-400">{category.count} events</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-2xl font-black bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-4">
                BahrainNights
              </div>
              <p className="text-gray-400 text-sm">
                Supporting Bahrain's local businesses. Every voice matters.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Explore</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Events</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Venues</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cinema</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Calendar</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">For Businesses</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">List Your Event</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Advertise</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Facebook</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 text-center text-gray-400 text-sm">
            <p>© 2025 BahrainNights.com • Powered by AI • Made with ❤️ in Bahrain</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BahrainNightsHomepage;
