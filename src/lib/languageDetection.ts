/**
 * Language detection utilities for SEO and user experience
 */

// Supported languages
export const SUPPORTED_LANGUAGES = ['sv', 'en'] as const;
export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number];

/**
 * Detect browser language from navigator
 * @returns The detected language code or default language
 */
export function detectBrowserLanguage(): SupportedLanguage {
  if (typeof navigator === 'undefined') return 'sv'; // Default for SSR

  // Get browser language
  const browserLang = navigator.language.split('-')[0].toLowerCase();
  
  // Check if browser language is supported
  if (SUPPORTED_LANGUAGES.includes(browserLang as SupportedLanguage)) {
    return browserLang as SupportedLanguage;
  }
  
  // Default to Swedish
  return 'sv';
}

/**
 * Detect language from URL path
 * @param path Current URL path
 * @returns The detected language code or null if not found
 */
export function detectLanguageFromPath(path: string): SupportedLanguage | null {
  // Check if path starts with a language code
  const pathParts = path.split('/').filter(Boolean);
  const firstPart = pathParts[0];
  
  if (SUPPORTED_LANGUAGES.includes(firstPart as SupportedLanguage)) {
    return firstPart as SupportedLanguage;
  }
  
  return null;
}

/**
 * Get the language-specific URL for a given path
 * @param path Current path
 * @param language Target language
 * @returns URL with language prefix
 */
export function getLanguageUrl(path: string, language: SupportedLanguage): string {
  // Remove any existing language prefix
  const currentLanguage = detectLanguageFromPath(path);
  let cleanPath = path;
  
  if (currentLanguage) {
    cleanPath = '/' + path.split('/').slice(2).join('/');
  }
  
  // Default language (Swedish) doesn't need a prefix
  if (language === 'sv') {
    return cleanPath || '/';
  }
  
  // Add language prefix for non-default languages
  return `/${language}${cleanPath}`;
}

/**
 * Check if the user agent is likely a search engine bot
 * @param userAgent The user agent string
 * @returns True if the user agent is likely a bot
 */
export function isSearchBot(userAgent: string): boolean {
  const botPatterns = [
    'googlebot', 'bingbot', 'yandexbot', 'duckduckbot', 'slurp',
    'baiduspider', 'facebookexternalhit', 'twitterbot', 'rogerbot',
    'linkedinbot', 'embedly', 'quora link preview', 'showyoubot',
    'outbrain', 'pinterest', 'slackbot', 'vkshare', 'w3c_validator',
    'crawler', 'spider', 'bot'
  ];
  
  const lowerCaseUA = userAgent.toLowerCase();
  return botPatterns.some(pattern => lowerCaseUA.includes(pattern));
}
