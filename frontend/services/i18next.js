import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { I18nManager } from 'react-native';
import en from '../locales/en.json';
import ar from '../locales/ar.json';

export const languageResources = {
  en: { translation: en },
  ar: { translation: ar },
};

// Initialize i18n 
i18next.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: 'en', 
  fallbackLng: 'en',
  resources: languageResources,
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});



export default i18next;