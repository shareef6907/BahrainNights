"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Menu, X, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Events", href: "#events" },
        { name: "Dining", href: "#dining" },
        { name: "Cinema", href: "#cinema" },
        { name: "Explore", href: "#explore" },
    ];

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
                isScrolled ? "glass py-3" : "bg-transparent"
            )}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="w-10 h-10 rounded-xl bg-gradient-to-br from-electric-gold to-royal-purple flex items-center justify-center text-night-black font-bold text-xl shadow-lg"
                    >
                        BN
                    </motion.div>
                    <span className="text-xl font-bold tracking-tighter hidden sm:block">
                        BAHRAIN<span className="text-electric-gold">NIGHTS</span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium hover:text-electric-gold transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-4">
                    <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <Search size={20} />
                    </button>
                    <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full transition-all text-sm font-medium border border-white/10">
                        <Globe size={16} />
                        <span>EN</span>
                    </button>
                    <button
                        className="md:hidden p-2 hover:bg-white/10 rounded-full transition-colors"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <Menu size={20} />
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-0 z-[60] glass flex flex-col p-8"
                    >
                        <div className="flex justify-between items-center mb-12">
                            <span className="text-xl font-bold tracking-tighter">
                                BAHRAIN<span className="text-electric-gold">NIGHTS</span>
                            </span>
                            <button
                                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <X size={24} />
                            </button>
                        </div>
                        <div className="flex flex-col gap-6 text-2xl font-bold">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="hover:text-electric-gold transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                        <div className="mt-auto flex gap-4">
                            <button className="flex-1 py-4 bg-gradient-to-r from-electric-gold to-orange-500 rounded-2xl text-night-black font-bold">
                                Get Started
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
