import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'ru' | 'en' | 'fr';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'ru',
  setLang: () => {},
  toggleLang: () => {},
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    // Default to Russian ('ru') as home page language
    const saved = localStorage.getItem('portfolio_lang_v2') || localStorage.getItem('portfolio_lang');
    return (saved === 'ru' || saved === 'en' || saved === 'fr') ? (saved as Language) : 'ru';
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('portfolio_lang_v2', newLang);
    localStorage.setItem('portfolio_lang', newLang);
  };

  const toggleLang = () => {
    setLang(lang === 'ru' ? 'en' : lang === 'en' ? 'fr' : 'ru');
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);