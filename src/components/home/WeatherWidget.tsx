'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Sun, Cloud, CloudRain, Wind, Thermometer, Droplets, ChevronRight, Waves, Building2, UtensilsCrossed, TreePalm, RefreshCw } from 'lucide-react';

interface WeatherData {
  temp_c: number;
  condition: string;
  humidity: number;
  wind_kph: number;
  feels_like_c: number;
  icon: string;
}

interface Suggestion {
  emoji: string;
  title: string;
  description: string;
  href: string;
  gradient: string;
}

function getWeatherIcon(condition: string) {
  const lower = condition.toLowerCase();
  if (lower.includes('rain') || lower.includes('drizzle') || lower.includes('shower')) {
    return <CloudRain className="w-8 h-8 text-blue-400" />;
  }
  if (lower.includes('cloud') || lower.includes('overcast')) {
    return <Cloud className="w-8 h-8 text-gray-400" />;
  }
  if (lower.includes('wind')) {
    return <Wind className="w-8 h-8 text-cyan-400" />;
  }
  return <Sun className="w-8 h-8 text-yellow-400" />;
}

function getSuggestions(temp: number, condition: string): Suggestion[] {
  const lower = condition.toLowerCase();
  const isHot = temp >= 35;
  const isWarm = temp >= 28 && temp < 35;
  const isRainy = lower.includes('rain') || lower.includes('drizzle');
  const isCloudy = lower.includes('cloud') || lower.includes('overcast');
  const isNiceWeather = !isHot && !isRainy && (temp >= 22 && temp <= 32);

  // Hot weather (35°C+): Indoor activities
  if (isHot) {
    return [
      {
        emoji: '🏢',
        title: 'Mall Adventures',
        description: 'Beat the heat at air-conditioned malls',
        href: '/explore/shopping',
        gradient: 'from-blue-500/20 to-cyan-500/20',
      },
      {
        emoji: '🎬',
        title: 'Cinema Time',
        description: 'Cool off with the latest blockbusters',
        href: '/cinema',
        gradient: 'from-purple-500/20 to-pink-500/20',
      },
      {
        emoji: '💆',
        title: 'Spa & Wellness',
        description: 'Relax in cool comfort',
        href: '/explore/spas',
        gradient: 'from-emerald-500/20 to-teal-500/20',
      },
    ];
  }

  // Rainy weather: Indoor cozy vibes
  if (isRainy) {
    return [
      {
        emoji: '☕',
        title: 'Cozy Cafés',
        description: 'Perfect weather for coffee and books',
        href: '/places?category=cafe',
        gradient: 'from-amber-500/20 to-orange-500/20',
      },
      {
        emoji: '🎬',
        title: 'Movie Marathon',
        description: 'Rainy day cinema vibes',
        href: '/cinema',
        gradient: 'from-purple-500/20 to-pink-500/20',
      },
      {
        emoji: '🍽️',
        title: 'Long Lunch',
        description: 'Indulge in a leisurely meal',
        href: '/places?category=restaurant',
        gradient: 'from-red-500/20 to-orange-500/20',
      },
    ];
  }

  // Nice weather (22-32°C, not rainy): Outdoor activities
  if (isNiceWeather) {
    return [
      {
        emoji: '🏖️',
        title: 'Beach Day',
        description: 'Perfect weather for sun and sand',
        href: '/places?category=beach-club',
        gradient: 'from-cyan-500/20 to-blue-500/20',
      },
      {
        emoji: '🚤',
        title: 'Boat Tours',
        description: 'Explore Bahrain by sea',
        href: '/attractions?category=boat-tour',
        gradient: 'from-blue-500/20 to-indigo-500/20',
      },
      {
        emoji: '🌴',
        title: 'Outdoor Dining',
        description: 'Al fresco dining weather',
        href: '/places',
        gradient: 'from-green-500/20 to-emerald-500/20',
      },
    ];
  }

  // Warm but manageable (28-35°C): Mix of indoor/outdoor
  if (isWarm) {
    return [
      {
        emoji: '🏊',
        title: 'Pool Clubs',
        description: 'Cool down in style',
        href: '/places?category=beach-club',
        gradient: 'from-cyan-500/20 to-blue-500/20',
      },
      {
        emoji: '🍸',
        title: 'Sunset Lounges',
        description: 'Evening drinks as it cools down',
        href: '/places?category=lounge',
        gradient: 'from-orange-500/20 to-pink-500/20',
      },
      {
        emoji: '🏢',
        title: 'Indoor Fun',
        description: 'AC-friendly activities',
        href: '/attractions?category=indoor',
        gradient: 'from-purple-500/20 to-indigo-500/20',
      },
    ];
  }

  // Default suggestions (cloudy or mild)
  return [
    {
      emoji: '🎢',
      title: 'Attractions',
      description: 'Great day to explore',
      href: '/attractions',
      gradient: 'from-teal-500/20 to-emerald-500/20',
    },
    {
      emoji: '🍽️',
      title: 'Dining Out',
      description: 'Discover new restaurants',
      href: '/places?category=restaurant',
      gradient: 'from-red-500/20 to-orange-500/20',
    },
    {
      emoji: '🎭',
      title: 'Events',
      description: 'See what\'s happening',
      href: '/events',
      gradient: 'from-purple-500/20 to-pink-500/20',
    },
  ];
}

export default function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchWeather = async () => {
    setLoading(true);
    setError(false);
    
    try {
      // Using wttr.in API - no key needed!
      const response = await fetch('https://wttr.in/Bahrain?format=j1', {
        headers: { 'Accept': 'application/json' },
        cache: 'no-store',
      });
      
      if (!response.ok) throw new Error('Weather fetch failed');
      
      const data = await response.json();
      const current = data.current_condition?.[0];
      
      if (current) {
        setWeather({
          temp_c: parseInt(current.temp_C),
          condition: current.weatherDesc?.[0]?.value || 'Clear',
          humidity: parseInt(current.humidity),
          wind_kph: parseInt(current.windspeedKmph),
          feels_like_c: parseInt(current.FeelsLikeC),
          icon: current.weatherCode || '113',
        });
      }
    } catch (err) {
      console.error('Weather fetch error:', err);
      setError(true);
      // Fallback to typical Bahrain weather
      setWeather({
        temp_c: 32,
        condition: 'Sunny',
        humidity: 65,
        wind_kph: 15,
        feels_like_c: 35,
        icon: '113',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
    // Refresh weather every 30 minutes
    const interval = setInterval(fetchWeather, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <section className="px-4 mb-12 md:mb-24">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/10 rounded-3xl p-8 animate-pulse">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-slate-700 rounded-full" />
              <div>
                <div className="h-6 w-48 bg-slate-700 rounded mb-2" />
                <div className="h-4 w-32 bg-slate-700 rounded" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-32 bg-slate-700/50 rounded-2xl" />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!weather) return null;

  const suggestions = getSuggestions(weather.temp_c, weather.condition);

  return (
    <section className="px-4 mb-12 md:mb-24">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="relative overflow-hidden bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Decorative gradient orbs */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Header */}
          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              {/* Weather Icon */}
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/20 flex items-center justify-center">
                {getWeatherIcon(weather.condition)}
              </div>
              
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
                  Weather in Bahrain
                  {error && (
                    <button
                      onClick={fetchWeather}
                      className="p-1 hover:bg-white/10 rounded-full transition-colors"
                      title="Refresh weather"
                    >
                      <RefreshCw className="w-4 h-4 text-gray-400" />
                    </button>
                  )}
                </h2>
                <p className="text-gray-400 text-sm">Perfect activities for today&apos;s weather</p>
              </div>
            </div>

            {/* Weather Stats */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Thermometer className="w-5 h-5 text-red-400" />
                <span className="text-3xl font-bold text-white">{weather.temp_c}°C</span>
              </div>
              <div className="hidden md:flex items-center gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-1">
                  <Droplets className="w-4 h-4 text-blue-400" />
                  {weather.humidity}%
                </span>
                <span className="flex items-center gap-1">
                  <Wind className="w-4 h-4 text-cyan-400" />
                  {weather.wind_kph} km/h
                </span>
              </div>
            </div>
          </div>

          {/* Condition Badge */}
          <div className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm">
              {getWeatherIcon(weather.condition)}
              <span className="text-white font-medium">{weather.condition}</span>
              <span className="text-gray-400">• Feels like {weather.feels_like_c}°C</span>
            </span>
          </div>

          {/* Suggestions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <AnimatePresence mode="wait">
              {suggestions.map((suggestion, index) => (
                <motion.div
                  key={suggestion.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={suggestion.href}
                    className={`group block p-5 rounded-2xl bg-gradient-to-br ${suggestion.gradient} border border-white/10 hover:border-white/30 transition-all hover:scale-[1.02]`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{suggestion.emoji}</span>
                        <div>
                          <h3 className="text-white font-semibold group-hover:text-yellow-400 transition-colors">
                            {suggestion.title}
                          </h3>
                          <p className="text-gray-400 text-sm">{suggestion.description}</p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-yellow-400 group-hover:translate-x-1 transition-all mt-1" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Footer tip */}
          <p className="mt-6 text-center text-gray-500 text-xs">
            💡 Suggestions update based on real-time weather conditions
          </p>
        </motion.div>
      </div>
    </section>
  );
}
