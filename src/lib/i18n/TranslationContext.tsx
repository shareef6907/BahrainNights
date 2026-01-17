'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { en } from './translations/en';
import { LanguageCode, DEFAULT_LANGUAGE, LANGUAGES } from './config';

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

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export function TranslationProvider({ children }: { children: ReactNode }) {
  // Always use English - Arabic support removed
  const language = DEFAULT_LANGUAGE;

  const value: TranslationContextType = {
    language,
    setLanguage: () => {}, // No-op - only English supported
    t: en,
    isRTL: false,
    direction: 'ltr',
    toggleLanguage: () => {}, // No-op - only English supported
    languageInfo: LANGUAGES.en,
  };

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
