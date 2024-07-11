/ i18n.js

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslations from './locales/en.json';
import esTranslations from './locales/es.json';
import hiTranslations from './locales/hi.json';
import ptTranslations from './locales/pt.json';
import zhTranslations from './locales/zh.json';
import frTranslations from './locales/fr.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslations },
      es: { translation: esTranslations },
      hi: { translation: hiTranslations },
      pt: { translation: ptTranslations },
      zh: { translation: zhTranslations },
      fr: { translation: frTranslations },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

// LanguageSelector.jsx

import React from 'react';
import { useTranslation } from 'react-i18next';

function LanguageSelector() {
  const { i18n } = useTranslation();

  const changeLanguage = async (lang) => {
    if (lang === 'fr') {
      // Implement email OTP verification
      const verified = await verifyEmailOTP();
      if (!verified) return;
    } else if (lang !== 'en') {
      // Implement mobile OTP verification
      const verified = await verifyMobileOTP();
      if (!verified) return;
    }

    await i18n.changeLanguage(lang);
    
    // Change background color based on language
    if (lang === 'hi') {
      document.body.style.backgroundColor = 'blue';
    } else if (lang === 'zh') {
      document.body.style.backgroundColor = 'green';
    } else if (lang === 'fr') {
      document.body.style.backgroundColor = 'yellow';
    } else {
      document.body.style.backgroundColor = 'white';
    }
  };

  return (
    <select onChange={(e) => changeLanguage(e.target.value)}>
      <option value="en">English</option>
      <option value="es">Español</option>
      <option value="hi">हिन्दी</option>
      <option value="pt">Português</option>
      <option value="zh">中文</option>
      <option value="fr">Français</option>
    </select>
  );
}
