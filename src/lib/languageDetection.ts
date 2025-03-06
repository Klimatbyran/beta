/**
 * Language detection utilities for SEO and user experience
 */

// Supported languages
export const SUPPORTED_LANGUAGES = ["sv", "en"] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

/**
 * Detect browser language from navigator
 * @returns The detected language code or default language
 */
export function detectBrowserLanguage(): SupportedLanguage {
  if (typeof navigator === "undefined") return "sv"; // Default for SSR

  // Get browser language
  const browserLang = navigator.language.split("-")[0].toLowerCase();

  // Check if browser language is supported
  if (SUPPORTED_LANGUAGES.includes(browserLang as SupportedLanguage)) {
    return browserLang as SupportedLanguage;
  }

  // Default to Swedish
  return "sv";
}

/**
 * Detect language from URL path
 * @param path Current URL path
 * @returns The detected language code
 */
export function detectLanguageFromPath(path: string): SupportedLanguage {
  // Check if path starts with /en
  if (path.startsWith("/en")) {
    return "en";
  }
  
  // All other paths (including /sv/) are treated as Swedish
  return "sv";
}

/**
 * Get the language-specific URL for a given path
 * @param path Current path
 * @param language Target language
 * @returns URL with language prefix
 */
export function getLanguageUrl(
  path: string,
  language: SupportedLanguage
): string {
  // For English
  if (language === "en") {
    // If already has /en prefix, return as is
    if (path.startsWith("/en")) {
      return path;
    }
    // Add /en prefix
    return `/en${path === "/" ? "" : path}`;
  }

  // For Swedish
  if (path.startsWith("/en")) {
    // Remove /en prefix
    const newPath = path.substring(3);
    return newPath || "/";
  }
  
  // If path starts with /sv/, remove it
  if (path.startsWith("/sv")) {
    const newPath = path.substring(3);
    return newPath || "/";
  }

  return path;
}

/**
 * Check if the user agent is likely a search engine bot
 * @param userAgent The user agent string
 * @returns True if the user agent is likely a bot
 */
export function isSearchBot(userAgent: string): boolean {
  const botPatterns = [
    "googlebot",
    "bingbot",
    "yandexbot",
    "duckduckbot",
    "slurp",
    "baiduspider",
    "facebookexternalhit",
    "twitterbot",
    "rogerbot",
    "linkedinbot",
    "embedly",
    "quora link preview",
    "showyoubot",
    "outbrain",
    "pinterest",
    "slackbot",
    "vkshare",
    "w3c_validator",
    "crawler",
    "spider",
    "bot",
  ];

  const lowerCaseUA = userAgent.toLowerCase();
  return botPatterns.some((pattern) => lowerCaseUA.includes(pattern));
}
