'use client';

import { useTranslation } from '@/lib/i18n/TranslationContext';
import { Globe } from 'lucide-react';

interface LanguageToggleProps {
  variant?: 'default' | 'compact' | 'text' | 'pill';
  className?: string;
}

export function LanguageToggle({ variant = 'default', className = '' }: LanguageToggleProps) {
  const { language, toggleLanguage } = useTranslation();

  if (variant === 'compact') {
    return (
      <button
        onClick={toggleLanguage}
        className={`flex items-center justify-center w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 transition-colors ${className}`}
        title={language === 'en' ? 'العربية' : 'English'}
        aria-label={language === 'en' ? 'Switch to Arabic' : 'Switch to English'}
      >
        <span className="text-sm font-semibold text-white">
          {language === 'en' ? 'ع' : 'EN'}
        </span>
      </button>
    );
  }

  if (variant === 'text') {
    return (
      <button
        onClick={toggleLanguage}
        className={`text-sm font-medium text-white/80 hover:text-white transition-colors ${className}`}
        aria-label={language === 'en' ? 'Switch to Arabic' : 'Switch to English'}
      >
        {language === 'en' ? 'العربية' : 'English'}
      </button>
    );
  }

  if (variant === 'pill') {
    return (
      <button
        onClick={toggleLanguage}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200 border border-white/10 ${className}`}
        aria-label={language === 'en' ? 'Switch to Arabic' : 'Switch to English'}
      >
        <Globe className="w-3.5 h-3.5 text-white/80" />
        <span className="text-xs font-medium text-white">
          {language === 'en' ? 'ع' : 'EN'}
        </span>
      </button>
    );
  }

  // Default variant
  return (
    <button
      onClick={toggleLanguage}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200 border border-white/10 ${className}`}
      aria-label={language === 'en' ? 'Switch to Arabic' : 'Switch to English'}
    >
      <Globe className="w-4 h-4 text-white/80" />
      <span className="text-sm font-medium text-white">
        {language === 'en' ? 'العربية' : 'English'}
      </span>
    </button>
  );
}

export default LanguageToggle;
