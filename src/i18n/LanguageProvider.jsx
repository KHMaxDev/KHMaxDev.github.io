import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { DEFAULT_LANGUAGE, LANGUAGES, translations } from './translations.js';

const STORAGE_KEY = 'portfolio-language';
const LanguageContext = createContext(null);

function getInitialLanguage() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (LANGUAGES.includes(stored)) return stored;
  } catch {
    // Storage can be unavailable in private or embedded contexts.
  }

  return DEFAULT_LANGUAGE;
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(getInitialLanguage);

  useEffect(() => {
    document.documentElement.lang = language;

    try {
      window.localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // Keep the in-memory preference when storage is unavailable.
    }
  }, [language]);

  const toggleLanguage = useCallback(() => {
    setLanguage((current) => (current === 'es' ? 'en' : 'es'));
  }, []);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      toggleLanguage,
      t: translations[language],
    }),
    [language, toggleLanguage]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error('useLanguage must be used inside LanguageProvider');
  }

  return context;
}
