"use client";

import React from "react";
import { motion } from "framer-motion";
import { Search, Sparkles } from "lucide-react";

/**
 * Hero Component for Bahrain Nights
 * Features:
 * - Animated gradient mesh background
 * - Staggered text reveal animations
 * - AI-powered search bar with pulse effect
 * - Responsive design
 */
const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
            {/* Animated Gradient Mesh */}
            <div className="absolute inset-0 -z-10 bg-night-black">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        x: [0, 100, 0],
                        y: [0, 50, 0],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] bg-royal-purple/20 blur-[120px] rounded-full"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        x: [0, -100, 0],
                        y: [0, -50, 0],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="absolute top-[20%] -right-[10%] w-[60%] h-[60%] bg-electric-gold/10 blur-[120px] rounded-full"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 180, 360],
                    }}
                    transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="absolute bottom-[-10%] left-[20%] w-[50%] h-[50%] bg-neon-cyan/10 blur-[120px] rounded-full"
                />
            </div>

            <div className="container max-w-7xl mx-auto px-6 relative z-10 text-center">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 animate-float"
                >
                    <Sparkles className="text-electric-gold w-4 h-4" />
                    <span className="text-sm font-medium">AI-powered • Always updated</span>
                </motion.div>

                {/* Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-5xl md:text-8xl font-black mb-6 tracking-tight leading-[1.1]"
                >
                    Discover Bahrain's <br />
                    <span className="text-gradient">Best Experiences</span>
                </motion.h1>

                {/* Subheadline */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-lg md:text-xl text-soft-white/60 mb-12 max-w-2xl mx-auto"
                >
                    Explore events, dining, and culture across the Kingdom. Over{" "}
                    <span className="text-soft-white font-bold">1,247 events</span> and{" "}
                    <span className="text-soft-white font-bold">847 venues</span> curated just for you.
                </motion.p>

                {/* Search Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="max-w-2xl mx-auto relative group"
                >
                    <div className="absolute -inset-1 bg-gradient-to-r from-electric-gold via-royal-purple to-neon-cyan rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                    <div className="relative flex items-center bg-night-black/80 glass rounded-2xl p-2 md:p-3">
                        <Search className="ml-4 text-soft-white/40" size={24} />
                        <input
                            type="text"
                            placeholder="What are you looking for tonight?"
                            className="w-full bg-transparent border-none focus:ring-0 px-4 py-3 text-lg outline-none placeholder:text-soft-white/20"
                        />
                        <button className="hidden md:block px-8 py-3 bg-gradient-to-r from-electric-gold to-orange-500 rounded-xl text-night-black font-bold text-sm shadow-lg hover:shadow-electric-gold/20 transition-all hover:scale-[1.02] active:scale-[0.98]">
                            Search AI
                        </button>
                    </div>
                </motion.div>

                {/* Quick Filters */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                    className="mt-12 flex flex-wrap justify-center gap-4 text-sm font-medium text-soft-white/40"
                >
                    <span className="text-soft-white/20">Trending:</span>
                    {["🎭 Culture", "🍽️ Dining", "🎵 Music", "🍿 Cinema", "🌙 Nightlife"].map(
                        (tag) => (
                            <button
                                key={tag}
                                className="hover:text-electric-gold transition-colors cursor-pointer"
                            >
                                {tag}
                            </button>
                        )
                    )}
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.5 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                >
                    <span className="text-[10px] uppercase tracking-[0.2em] text-soft-white/20">
                        Scroll to explore
                    </span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-px h-12 bg-gradient-to-b from-electric-gold/50 to-transparent"
                    />
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
