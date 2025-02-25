// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import translation files, only Swedish for the moment being
import sv from "./locales/sv/translation.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      sv: {
        translation: sv,
      },
    },
    fallbackLng: "sv",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
