'use client';

import { Globe } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface LanguageSwitcherProps {
  variant?: 'desktop' | 'mobile';
  className?: string;
}

export default function LanguageSwitcher({ variant = 'desktop', className = '' }: LanguageSwitcherProps) {
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  if (variant === 'mobile') {
    return (
      <button
        onClick={toggleLanguage}
        className={`w-full flex items-center justify-center space-x-2 py-3 text-gray-300 hover:text-white border border-white/10 rounded-xl hover:bg-white/5 transition-colors ${className}`}
      >
        <Globe className="w-5 h-5" />
        <span>{language === 'en' ? t('language.ar') : t('language.en')}</span>
      </button>
    );
  }

  return (
    <button
      onClick={toggleLanguage}
      className={`flex items-center space-x-1 text-gray-300 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/5 ${className}`}
      title={`${t('language.switchTo')} ${language === 'en' ? t('language.ar') : t('language.en')}`}
    >
      <Globe className="w-4 h-4" />
      <span>{language === 'en' ? 'AR' : 'EN'}</span>
    </button>
  );
}
