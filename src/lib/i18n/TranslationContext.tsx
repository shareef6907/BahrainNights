'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { en } from './translations/en';
import { ar } from './translations/ar';
import { LanguageCode, DEFAULT_LANGUAGE, isRTL, LANGUAGES } from './config';

type Translations = typeof en;

interface TranslationContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: Translations;
  isRTL: boolean;
  direction: 'ltr' | 'rtl';
  toggleLanguage: () => void;
  languageInfo: typeof LANGUAGES[LanguageCode];
}

const translations: Record<LanguageCode, Translations> = {
  en,
  ar,
};

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>(DEFAULT_LANGUAGE);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Load saved language preference
    const saved = localStorage.getItem('bahrainnights-lang') as LanguageCode;
    if (saved && translations[saved]) {
      setLanguageState(saved);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Update document direction and lang attribute
    document.documentElement.dir = isRTL(language) ? 'rtl' : 'ltr';
    document.documentElement.lang = language;

    // Add/remove RTL class for styling
    if (isRTL(language)) {
      document.documentElement.classList.add('rtl');
    } else {
      document.documentElement.classList.remove('rtl');
    }
  }, [language, mounted]);

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    localStorage.setItem('bahrainnights-lang', lang);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  const value: TranslationContextType = {
    language,
    setLanguage,
    t: translations[language],
    isRTL: isRTL(language),
    direction: isRTL(language) ? 'rtl' : 'ltr',
    toggleLanguage,
    languageInfo: LANGUAGES[language],
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <TranslationContext.Provider value={{
        ...value,
        language: DEFAULT_LANGUAGE,
        t: en,
        isRTL: false,
        direction: 'ltr',
        languageInfo: LANGUAGES.en,
      }}>
        {children}
      </TranslationContext.Provider>
    );
  }

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within TranslationProvider');
  }
  return context;
}

export default TranslationContext;
