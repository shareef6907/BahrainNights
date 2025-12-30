'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Loader2 } from 'lucide-react';

interface GenerateButtonProps {
  type: 'blog' | 'feed' | 'story' | 'reel';
  label?: string;
  onGenerate: () => Promise<void>;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export default function GenerateButton({
  type,
  label,
  onGenerate,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
}: GenerateButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleClick = async () => {
    setIsGenerating(true);
    try {
      await onGenerate();
    } finally {
      setIsGenerating(false);
    }
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const variantClasses = {
    primary:
      'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg shadow-purple-500/25',
    secondary:
      'bg-white/5 hover:bg-white/10 text-white border border-white/10',
  };

  const defaultLabels = {
    blog: 'Generate Blog Post',
    feed: 'Generate Feed Post',
    story: 'Generate Stories',
    reel: 'Generate Reel Brief',
  };

  return (
    <motion.button
      onClick={handleClick}
      disabled={isGenerating}
      whileHover={{ scale: isGenerating ? 1 : 1.02 }}
      whileTap={{ scale: isGenerating ? 1 : 0.98 }}
      className={`
        flex items-center justify-center gap-2 rounded-xl font-medium transition-all
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${fullWidth ? 'w-full' : ''}
        disabled:opacity-70 disabled:cursor-not-allowed
      `}
    >
      <AnimatePresence mode="wait">
        {isGenerating ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex items-center gap-2"
          >
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Generating...</span>
          </motion.div>
        ) : (
          <motion.div
            key="idle"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>{label || defaultLabels[type]}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
