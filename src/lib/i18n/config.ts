export const LANGUAGES = {
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    direction: 'ltr',
    flag: '🇬🇧',
  },
  ar: {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    direction: 'rtl',
    flag: '🇧🇭',
  },
} as const;

export type LanguageCode = keyof typeof LANGUAGES;
export const DEFAULT_LANGUAGE: LanguageCode = 'en';

export const isRTL = (lang: LanguageCode) => LANGUAGES[lang].direction === 'rtl';
